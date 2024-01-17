const express = require("express");
const router = express.Router();
const Retrieve = require("../models/Retrieve");
const { transport } = require("../services/emailService");
const { emailLogStream } = require("../middleware/emaillogger");

// const nodemailer = require("nodemailer");
// // const connectToDatabase = require("../config/dbConn");
// // const closeDatabase = require("../config/closeDatabase");
// const transport = nodemailer.createTransport({
//   service: "gmail",
//   auth: { user: process.env.GMAIL_USERNAME, pass: process.env.GMAIL_PASSWORD },
// });

// connectToDatabase();
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
    const linkAddress = `${process.env.MY_URL_FRONT}retrieve/${savedData.randomNumber}`;
    const myAddress = process.env.MY_URL_FRONT;
    // const isViaStop = savedData.quote.totalAddress.length < 2;

    //send email...
    const mailOptions = {
      from: process.env.GMAIL_USERNAME,
      to: savedData.quote.email,
      subject: "Thanks for using our service",
      html: `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 20px auto; background-color: #f9f9f9; padding: 20px; border-radius: 8px; box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);">
    <h1>Thank you very much for saving <a href="${linkAddress}">Your Quote</a> from ${myAddress}</h1>  
  <h2 style="color: #333333;">Dear ${savedData.quote.name},</h2>
    <h2 style="color: #333333;">Dear ${savedData.quote.name},</h2>
      <p>Your pick-up address: ${savedData.quote.totalAddress[0].location}</p>
      <p>Your pick-up Buidling Address: ${
        savedData.quote.totalAddress[0].physicalAddress
      }</p>
      <p>You have via Stop ${savedData.quote.totalAddress.length - 2}</p>
      <p>Your drop-off address: ${
        savedData.quote.totalAddress[savedData.quote.totalAddress.length - 1]
          .location
      }</p>
      <p>Your drop-off Buidling Address: ${
        savedData.quote.totalAddress[savedData.quote.totalAddress.length - 1]
          .physicalAddress
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
    const logEmailInfo = (info) => {
      const timeStamp = new Date().toISOString();
      emailLogStream.write(
        `[${timeStamp}]Reason:customerSaveQuote email:${
          savedData.quote.email
        } amount:£${savedData.quote.totalPrice.toFixed(2)} ${info.response}\n`
      );
    };
    const info = await transport.sendMail(mailOptions);
    console.log("Email Sent" + info.response);
    // console.log("Data saved successfully from Node Server", savedData);
    //respond to the client with success
    res.status(200).json({ message: "Data received", data: savedData });
    logEmailInfo(info);
    // closeDatabase();
  } catch (error) {
    console.error("Error saving data", error);
    res.status(500).json({ errror: "Internal server error" });
  }
});

router.get("/", async (req, res) => {
  try {
    //connect to database
    const query = req.query;
    const retrieveData = await Retrieve.find(query);
    if (retrieveData.length === 0) {
      return res.status(404).json({ error: "No Retrieve Data found" });
    }
    res.json(retrieveData);
    // closeDatabase();
  } catch (error) {
    console.error("Error gettting data from server", error);
    res.status(500).json({ error: "Internal server error" });
    // closeDatabase();
  }
});
module.exports = router;
