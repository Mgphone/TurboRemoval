const express = require("express");
const router = express.Router();
const Retrieve = require("../models/Retrieve");
const stripe = require("stripe")(process.env.STRIPE_API_KEY);
router.post("/", async (req, res) => {
  try {
    const receivedData = req.body;
    console.log(
      "This is the received data from the server" + JSON.stringify(receivedData)
    );
    // res.json({ message: "I did receive your data from server Thanks" });
    res.json({ message: receivedData });
  } catch (error) {}
});
module.exports = router;
