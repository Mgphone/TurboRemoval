const express = require("express");
const router = express.Router();
const Retrieve = require("../models/Retrieve");
const stripe = require("stripe")(process.env.STRIPE_API_KEY);
const { transport } = require("../services/emailService");

router.post("/", async (req, res) => {
  try {
    const query = req.body;
    const objectId = query[0]._id;
    const result = await Retrieve.findById(objectId);
    if (result) {
      const totalAmount = await result.quote.totalPrice.toFixed(2);
      const totalInCent = Math.round(parseFloat(totalAmount) * 100);
      // console.log(totalInCent);
      // console.log(stripe.paymentIntents);
      const paymentIntent = await stripe.paymentIntents.create({
        amount: totalInCent,
        currency: "gbp",
      });
      result.paymentIntentId = paymentIntent.id;
      await result.save();
      res.json({ clientSecret: paymentIntent.client_secret });
    } else {
      res.status(404).json({ error: "Your code not found on my Server" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server Error" });
  }

  // const query = req.body;
  // const objectId = query[0]._id;

  // // console.log("myobjectId: " + objectId);

  // Retrieve.findById(objectId)
  //   .then((result) => {
  //     if (result) {
  //       const totalAmount = result.quote.totalPrice.toFixed(2) * 100;

  //       console.log("This is the result from server" + totalAmount);
  //       res.json(result);
  //     } else {
  //       res.status(404).json({ error: "Your code not found on my Server" });
  //     }
  //   })
  //   .catch((error) => {
  //     console.error(error);
  //     res.status(500).json({ error: "Internal server Error" });
  //   });
});

router.post("/updatepaymentstatus", async (req, res) => {
  try {
    const query = req.body;
    const objectId = query[0]._id;

    // console.log("This is an objectId" + JSON.stringify(objectId));
    const result = await Retrieve.findById(objectId);
    // console.log("This is result after search" + JSON.stringify(result));
    //this is for email details
    const name = result.quote.name.toUpperCase();
    const email = result.quote.email;
    const phone = result.quote.phone;
    const quoteNumber = result.randomNumber;
    const pickUpaddress = result.quote.places[0];
    const deliverAddress = result.quote.places[result.quote.places.length - 1];
    const isViaStop = result.quote.places.length > 2;

    const viaStopInfo = isViaStop
      ? `<li><strong>Via Stop:</strong> Yes</li>`
      : `<li><strong>Via Stop:</strong> No</li>`;

    const mailOptions = {
      from: process.env.GMAIL_USERNAME,
      to: email,
      subject: "Important Details for Your Upcoming Move",
      html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 20px auto; background-color: #f9f9f9; padding: 20px; border-radius: 8px; box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);">
        <h1>Dear ${name},</h1>
    
        <p>Thank you for choosing our service from www.lifitinglondon.com.</p>
         <p>We appreciate your trust in us. Here are the essential details for your upcoming move:</p>
    
        <h2>Contact Information:</h2>
        <ul>
            <li><strong>Your Phone Number:</strong> ${phone}</li>
        </ul>
    
        <h2>Addresses:</h2>
        <ul>
            <li><strong>Pickup Address:</strong> ${pickUpaddress}</li>
            <li><strong>Delivery Address:</strong> ${deliverAddress}</li>
            ${viaStopInfo}
        </ul>
    
        <h2>Driver Details:</h2>
        <ul>
            <li><strong>Your Assigned Driver's Information:</strong> {driver details}</li>
        </ul>
    
        <p>If you have any further inquiries or require additional information, please feel free to reach out. We're here to assist you every step of the way.</p>
        <p>If you want to see your quote details, you can check it on the website with the quote number: <strong>${quoteNumber}</strong></p>
        <p>We look forward to seeing you on the scheduled moving date. Safe travels!</p>
    
        <p><strong>Best regards,<br>
       Lifiting London</strong></p>
      </div>`,
    };

    // console.log("This is the result before" + JSON.stringify(result));
    if (result) {
      result.paymentStatus = "paid";
      await result.save();
      const info = await transport.sendMail(mailOptions);
      console.log("Email Sent" + info.response);

      res.json({ success: true, emailSent: true });
    } else {
      res.status(404).json({ error: "Document not found" });
    }
    // console.log("This is result after" + JSON.stringify(result));
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server Error" });
  }
});
router.get("/updatepaymentstatus", (req, res) => {
  console.log("Just say hi from server");
});

module.exports = router;
