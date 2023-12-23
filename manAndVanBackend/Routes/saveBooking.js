const express = require("express");
const router = express.Router();
const Retrieve = require("../models/Retrieve");
const stripe = require("stripe")(process.env.STRIPE_API_KEY);
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

module.exports = router;
