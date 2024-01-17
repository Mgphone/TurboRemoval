const express = require("express");
const router = express.Router();
const Retrieve = require("../models/Retrieve");
const stripe = require("stripe")(process.env.STRIPE_API_KEY);
const mailOptions = require("../utils/mailOptions");
const { transport } = require("../services/emailService");
const { emailLogStream } = require("../middleware/emaillogger");
router.post("/", async (req, res) => {
  try {
    // const receivedData = req.body;
    // console.log(
    //   "This is the received data from the server" + JSON.stringify(receivedData)
    // );
    // // res.json({ message: "I did receive your data from server Thanks" });
    // res.json({ message: receivedData });
    const receivedData = req.body;
    const date = receivedData.date;
    const dropAddress = receivedData.places[receivedData.places.length - 1];
    const pickupAddress = receivedData.places[0];
    const description = `Pickup Address ${pickupAddress} and Drop Address ${dropAddress}`;
    const totalAmount = receivedData.totalPrice.toFixed(2);
    const randomNumber = Math.floor(Math.random() * 10000000 + 1);

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency: "gbp",
            product_data: {
              name: `Your Moving at ${date}`,
              description: `${description}`,
            },
            unit_amount: Math.round(totalAmount * 100),
          },
          quantity: 1,
        },
      ],
      mode: "payment",
      success_url: `http://192.168.1.216:3000/paymentbooking/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: "http://192.168.1.216:3000/paymentbooking/cancel",
    });

    // Save to the database
    const newTransitions = new Retrieve({
      date,
      quote: receivedData,
      randomNumber,
      paymentStatus: "unpaid", // Assuming it's initially unpaid
      paymentIntentId: session.id,
    });

    await newTransitions.save();

    // Send the Checkout Session ID back to the client
    res.json({ sessionId: session.id });
  } catch (error) {
    console.error("Error processing payment", error);
    res.status(500).json({ error: "Error Processing Payment" });
  }
});

router.post("/success", async (req, res) => {
  try {
    const sessionId = req.body.session_id;
    const transition = await Retrieve.findOne({ paymentIntentId: sessionId });
    // console.log("This is my trranstion" + JSON.stringify(transition));
    if (!transition) {
      // console.error("Transition not found");
      return res.status(404).json({ error: "Transition not Found" });
    }

    // If transition is found, update payment status and send email
    transition.paymentStatus = "paid";
    const name = transition.quote.name;
    const phone = transition.quote.phone;
    const email = transition.quote.email;
    const quoteNumber = transition.randomNumber;
    const pickUpaddress = transition.quote.places[0];
    const deliverAddress =
      transition.quote.places[transition.quote.places.length - 1];
    const isViaStop = transition.quote.places.length > 2;
    const totalAmount = transition.quote.totalPrice.toFixed(2);
    const pickUpPhysicalAddress =
      transition.quote.totalAddress[0].physicalAddress;
    const deliverPhysicalAddress =
      transition.quote.totalAddress[transition.quote.totalAddress.length - 1]
        .physicalAddress;

    const emailOptions = mailOptions(
      name || transition.quote.name,
      phone || transition.quote.phone,
      email || transition.quote.email,
      quoteNumber || transition.randomNumber,
      pickUpaddress || transition.quote.places[0],
      deliverAddress ||
        transition.quote.places[transition.quote.places.length - 1],
      isViaStop || transition.quote.places.length > 2,
      pickUpPhysicalAddress,
      deliverPhysicalAddress
    );

    // console.log("This is email options" + JSON.stringify(emailOptions));
    await transition.save();
    // console.log("Payment status updated successfully.");
    const logEmailInfo = (info) => {
      const timeStamp = new Date().toISOString();
      emailLogStream.write(
        `[${timeStamp}]Reason:customerPaid email:${email} amount:£${totalAmount} ${info.response}`
      );
    };
    //sending email

    const info = await transport.sendMail(emailOptions);
    logEmailInfo(info);
    console.log("Email sent for directBook Payment", info.response);

    res
      .status(200)
      .json({ message: "Payment updated successfully and email sent." });
  } catch (error) {
    console.error("Error updating the payment or sending email", error);
    res
      .status(500)
      .json({ error: "Error updating the payment or sending email" });
  }
});

module.exports = router;
