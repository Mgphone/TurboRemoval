const express = require("express");
const router = express.Router();
router.get("/", async (req, res) => {
  const myAddress = process.env.MY_URL_FRONT;
  res.json({ serverIp: myAddress, server: "I am at your local" });
});
router.get("/health", async (req, res) => {
  res.json({ health: "ok" });
});
module.exports = router;

// module.exports = router;
