const express = require("express");
const router = express.Router();
const createQuote = require("../services/solutionService");

router.post("/", async (req, res) => {
  try {
    const receivedData = req.body;

    const quote = await createQuote(receivedData);

    res.json(quote);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server error" });
  }
});
module.exports = router;
