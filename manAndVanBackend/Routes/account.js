const express = require("express");
const router = express.Router();
const User = require("../models/User");
const bcrypt = require("bcrypt");
const secret = "mgphonechitsoneaf";
const back_uniquecode = process.env.uniquecode;
router.post("/register", async (req, res) => {
  const { name, password, uniquecode } = req.body;
  if (uniquecode !== back_uniquecode) {
    res.json({
      errormessage: "Check your admin to check UniqueCode",
    });
  }
  try {
    const salt = bcrypt.genSaltSync(10);
    const userDoc = await User.create({
      username: name,
      password: bcrypt.hashSync(password + secret, salt),
    });
    res.json({
      user: userDoc,
      message: "Register Success Please Login Back",
    });
  } catch (error) {
    console.error(error);
    if (error.code === 11000 && error.keyPattern && error.keyPattern.username) {
      res.json({ errormessage: "Username already exists." });
    } else {
      res.status(500).json({ error: "Internal Server Error" });
    }
  }
});
router.post("/login", (req, res) => {});
module.exports = router;
