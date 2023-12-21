const express = require("express");
const router = express.Router();
const Retrieve = require("../models/Retrieve");
const nodemailer = require("nodemailer");
const connectToDatabase = require("../config/dbConn");
const closeDatabase = require("../config/closeDatabase");
const transport = nodemailer.createTransport({
  service: "gmail",
  auth: { user: process.env.GMAIL_USERNAME, pass: process.env.GMAIL_PASSWORD },
});

router.post("/", async (req, res) => {
  try {
    connectToDatabase();
    const newData = req.body;
    // newData.number = parseInt(newData.number, 10);

    // console.log(
    //   "that is going to the server to save to database" +
    //     JSON.stringify(newData)
    // );

    //save to database
    const newRetrieve = new Retrieve(newData);
    const savedData = await newRetrieve.save();
    //send email...
    const mailOptions = {
      from: process.env.GMAIL_USERNAME,
      to: savedData.quote.email,
      subject: "Thankss for using our service",
      html: `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 20px auto; background-color: #f9f9f9; padding: 20px; border-radius: 8px; box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);">
    <h1>Thank you very much for saving my quote. from www.lifitinglondon.com</h1>  
    <h2 style="color: #333333;">Dear ${savedData.quote.name},</h2>
      <p>Your pick-up address: ${savedData.quote.places[0]}</p>
      <p>Your drop-off address: ${
        savedData.quote.places[savedData.quote.places.length - 1]
      }</p>
      <p style="font-weight: bold; color: #4CAF50;">Your total amount: £${savedData.quote.totalPrice.toFixed(
        2
      )}</p>
      
      <p style="font-size: 18px; font-weight: bold; color: #4285F4;">Your unique code is: ${
        savedData.randomNumber
      }</p>
    </div>
  `,
    };
    const info = await transport.sendMail(mailOptions);
    console.log("Email Sent" + info.response);
    // console.log("Data saved successfully from Node Server", savedData);
    //respond to the client with success
    res.status(200).json({ message: "Data received", data: savedData });
    closeDatabase();
  } catch (error) {
    console.error("Error saving data", error);
    res.status(500).json({ errror: "Internal server error" });
  }
});
connectToDatabase();
router.get("/", async (req, res) => {
  try {
    //connect to database
    const query = req.query;
    const retrieveData = await Retrieve.find(query);
    if (retrieveData.length === 0) {
      return res.status(404).json({ error: "No Retrieve Data found" });
    }
    res.json({ quote: retrieveData });
    // closeDatabase();
  } catch (error) {
    console.error("Error gettting data from server", error);
    res.status(500).json({ error: "Internal server error" });
    // closeDatabase();
  }
});
module.exports = router;
