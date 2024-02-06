const express = require("express");
const router = express.Router();
const User = require("../models/User");
const bcrypt = require("bcrypt");
const secret = "mgphonechitsoneaf";
const back_uniquecode = process.env.uniquecode;
const jwt = require("jsonwebtoken");
//middleware
const authenticateToken = require("../middleware/authenticateToken");
// const authenticateToken = (req, res, next) => {
//   const token = req.cookies.token;

//   if (!token) {
//     return res.status(401).json({ success: false, message: "Unauthorised" });
//   }
//   jwt.verify(token, secret, (err, user) => {
//     if (err)
//       return res.status(403).json({ success: false, message: "Forbidden" });
//     req.user = user;
//     next();
//   });
// };
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
      password: bcrypt.hashSync(password, salt),
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

router.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;
    const userDoc = await User.findOne({ username });
    if (!userDoc) {
      res.json({ errormessage: "Username does not exit" });
    } else {
      const userEnter = userDoc.password;
      const passwordValid = bcrypt.compareSync(password, userEnter);
      if (passwordValid) {
        // res.json({ message: "User Login Successful" });
        const token = jwt.sign({ username: username }, secret, {
          expiresIn: "1h",
        });
        res.cookie("token", token, { httpOnly: true, maxAge: 3600000 });

        res.json({ success: true, message: "Login successful" });
        //userlogin
      } else {
        res.json({ errormessage: "Password is invalid" });
      }
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ errormessage: "Internal Server Error" });
  }
});
router.get("/admindashboard", authenticateToken, async (req, res) => {
  res.json({
    success: true,
    message: "Protected Route",
    username: req.user,
  });
});
router.post("/logout", async (req, res) => {
  res.clearCookie("token").json({ message: "Logout Successful" });
});
module.exports = router;
