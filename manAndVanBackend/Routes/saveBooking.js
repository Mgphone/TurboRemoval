const express = require("express");
const router = express.Router();
const Retrieve = require("../models/Retrieve");
const stripe = require("stripe")(process.env.STRIPE_API_KEY);
const { transport } = require("../services/emailService");
const mailOptions = require("../utils/mailOptions");
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
    const emailOptions = mailOptions(
      name,
      phone,
      email,
      quoteNumber,
      pickUpaddress,
      deliverAddress,
      isViaStop
    );

    // console.log("This is the result before" + JSON.stringify(result));
    if (result) {
      result.paymentStatus = "paid";
      await result.save();
      const info = await transport.sendMail(emailOptions);
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
