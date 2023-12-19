const express = require("express");
const router = express.Router();
const Retrieve = require("../models/Retrieve");

router.post("/", async (req, res) => {
  try {
    const newData = req.body;
    // newData.number = parseInt(newData.number, 10);

    // console.log(
    //   "that is going to the server to save to database" +
    //     JSON.stringify(newData)
    // );

    //save to database
    const newRetrieve = new Retrieve(newData);
    const savedData = await newRetrieve.save();
    // console.log("Data saved successfully from Node Server", savedData);
    //respond to the client with success
    res.status(200).json({ message: "Data received", data: savedData });
  } catch (error) {
    console.error("Error saving data", error);
    res.status(500).json({ errror: "Internal server error" });
  }
});
module.exports = router;
