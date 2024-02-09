const express = require("express");
const router = express.Router();
const Retrieve = require("../models/Retrieve");
// const User = require("../models/User");
router.get("/all", async (req, res) => {
  try {
    // console.log("Route /backdata/all accessed");
    const data = await Retrieve.find({});
    // const data = await User.find({});
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
// router.get("/all", async (req, res) => {
//   res.json({ message: "Hello From server" });
// });
module.exports = router;
