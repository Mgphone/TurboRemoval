const express = require("express");
const router = express.Router();
const Retrieve = require("../models/Retrieve");
const stripe = require("stripe")(process.env.STRIPE_API_KEY);
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
    if (transition) {
      transition.paymentStatus = "paid";
      await transition.save();
    } else {
      console.error("Transition not found");
      return res.status(404).json({ error: "Transition not Found" });
    }
    // console.log("This is my session id" + JSON.stringify(sessionId));
    // console.log("This is my id after thinking" + sessionId.session_id);
  } catch (error) {
    console.error("Error Updating the payment");
    res.status(500).json({ error: "Error updating the payment" });
  }
});

module.exports = router;
