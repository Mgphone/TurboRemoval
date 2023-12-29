const express = require("express");
const router = express.Router();
const Retrieve = require("../models/Retrieve");
const stripe = require("stripe")(process.env.STRIPE_API_KEY);
const mailOptions = require("../utils/mailOptions");
const { transport } = require("../services/emailService");
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
// router.post("/success", async (req, res) => {
//   try {
//     const sessionId = req.body.session_id;
//     const transition = await Retrieve.findOne({ paymentIntentId: sessionId });
//     console.log("this is transition" + JSON.stringify(transition));
//     const name = transition.quote.name;
//     const email = transition.quote.email;
//     const phone = transition.quote.phone;
//     const quoteNumber = transition.randomNumber;
//     const pickUpaddress = transition.quote.places[0];
//     const deliverAddress =
//       transition.quote.places[transition.quote.places.length - 1];
//     const isViaStop = transition.quote.places.length > 2;

//     const emailOptions = mailOptions(
//       name,
//       email,
//       phone,
//       quoteNumber,
//       pickUpaddress,
//       deliverAddress,
//       isViaStop
//     );
//     if (!transition) {
//       console.error("Transition not found");
//       return res.status(404).json({ error: "Transition not Found" });
//     }
//     //if transition found....
//     transition.paymentStatus = "paid";
//     await transition.save();
//     console.log("Payment status updated successfully.");

//     //send email

//     const info = await transport.sendMail(emailOptions);

//     console.log("Email sent for directBook Payment" + info.response);
//     res
//       .status(200)
//       .json({ message: "Payment updated successfully and email sent." });
//   } catch (error) {
//     console.error("Error Updating the payment");
//     res.status(500).json({ error: "Error updating the payment" });
//   }
// });
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
    const email = transition.quote.email;
    const phone = transition.quote.phone;
    const quoteNumber = transition.randomNumber;
    const pickUpaddress = transition.quote.places[0];
    const deliverAddress =
      transition.quote.places[transition.quote.places.length - 1];
    const isViaStop = transition.quote.places.length > 2;

    const emailOptions = mailOptions(
      name,
      phone,
      email,
      quoteNumber,
      pickUpaddress,
      deliverAddress,
      isViaStop
    );
    // console.log("This is email options" + JSON.stringify(emailOptions));
    await transition.save();
    // console.log("Payment status updated successfully.");

    const info = await transport.sendMail(emailOptions);
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
