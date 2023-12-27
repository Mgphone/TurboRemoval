const express = require("express");
const router = express.Router();
const Retrieve = require("../models/Retrieve");
const stripe = require("stripe")(process.env.STRIPE_API_KEY);
router.post("/", async (req, res) => {
  try {
    const receivedData = req.body;
    const date = receivedData.date;
    const dropAddress = receivedData.places[receivedData.places.length - 1];
    const pickupAddress = receivedData.places[0];
    const description = `Pickup Address ${pickupAddress} and Drop Address ${dropAddress}`;
    const totalAmount = receivedData.totalPrice.toFixed(2);
    const randomNumber = Math.floor(Math.random() * 10000000 + 1);

    // console.log(Math.floor(totalAmount * 100));
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],

      line_items: [
        {
          price_data: {
            currency: "gbp",
            product_data: {
              name: `Your Moving at ${date}`, // Replace with your product name
              description: `${description}`,
            },
            unit_amount: Math.floor(totalAmount * 100), // Convert amount to cents
          },
          quantity: 1,
        },
      ],
      mode: "payment",
      success_url: "http://192.168.1.216:3000/success", // Replace with your success URL
      cancel_url: "http://192.168.1.216:3000/fail", // Replace with your cancel URL
    });
    // save to database
    const newTransitions = new Retrieve({
      date,
      quote: receivedData,
      randomNumber,
      paymentStatus: "unpaid",
      paymentIntentId: session.id,
    });
    await newTransitions.save();
    // Send the Checkout Session ID back to the client
    console.log("This is data from server" + JSON.stringify(newTransitions));
    res.json({ sessionId: session.id });
  } catch (error) {
    console.error("Error processing payment", error);
    res.status(500).json({ error: "Error Processing Payment" });
  }
});
router.post("/success", async (req, res) => {
  try {
    const query = req.body;
    const sessionId = req.body.checkout_session;
    console.log("This is ur sessioID" + sessionId);
    console.log("this is ur reqbody" + JSON.stringify(query));
    const transition = await Retrieve.findOne({ paymentIntentId: sessionId });
    if (transition) {
      console.log("checking your database" + JSON.stringify(transition));
    }
    // if (transition) {
    //   transition.paymentStatus = "paid";
    //   await transition.save();
    // } else {
    //   console.error("Transition not found");
    //   return res.status(404).json({ error: "Transition not found" });
    // }
  } catch (error) {
    console.error("Error updating the payment");
    res.status(500).json({ error: "Error updating your payment" });
  }
  // try {
  //   const sessionId = req.body.checkout_session;
  //   console.log("Hi sessionID" + sessionId);
  //   // const transition = await Retrieve.findOne({ paymentIntentId: sessionId });
  //   // if (transition) {
  //   //   res.send("Your database data" + JSON.stringify(transition));
  //   // }
  // } catch (error) {
  //   console.error("SOmething wrong");
  // }
});

router.get("/success", async (req, res) => {
  res.send("Hello Phone Naing");
});
module.exports = router;
