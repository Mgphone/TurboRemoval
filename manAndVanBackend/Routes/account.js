const express = require("express");
const router = express.Router();
const User = require("../models/User");
const back_uniquecode = process.env.uniquecode;
router.post("/register", async (req, res) => {
  try {
    const { username, password, uniquecode } = req.body;
    console.log("Client Code" + uniquecode);
    console.log("Backend Code" + back_uniquecode);
  } catch (error) {}
});
router.post("/login", (req, res) => {});
