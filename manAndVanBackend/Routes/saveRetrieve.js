const express = require("express");
const router = express.Router();
const Retrieve = require("../models/Retrieve");
const { transport } = require("../services/emailService");
const { emailLogStream } = require("../middleware/emaillogger");
const getISOtoGBtime = require("../utils/getISOtoGBtime");

// connectToDatabase();
router.post("/", async (req, res) => {
  try {
    const newData = req.body;

    //save to database
    const newRetrieve = new Retrieve(newData);
    const savedData = await newRetrieve.save();

    const linkAddress = `${process.env.MY_URL_FRONT}/retrieve/${savedData.randomNumber}`;
    const myAddress = process.env.MY_URL_FRONT;
    // const isViaStop = savedData.quote.totalAddress.length < 2;
    const vanSize = savedData && savedData.quote.typeofVan;
    const worker = savedData && savedData.quote.typeOfWorker;
    const totalPrice = savedData && savedData.quote.totalPrice.toFixed(2);
    const moveDate = savedData && getISOtoGBtime(savedData.quote.date);
    const vehicleHour = savedData && savedData.quote.totalHour;
    const totalSecond = savedData && savedData.quote.totalSecond;
    const halfanHour = ((totalPrice * 1800) / totalSecond).toFixed(2);
    //send email...
    const mailOptions = {
      from: process.env.GMAIL_USERNAME,
      to: savedData.quote.email,
      subject: "Thanks for using our service",
      html: `  <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 20px auto; background-color: #f9f9f9; padding: 20px; border-radius: 8px; box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);">
      <h1>Thank you very much for saving Quotation with us <a href="${linkAddress}">Your Quote</a> from ${myAddress}</h1>  

      <h2 style="color: #333333;">Dear ${savedData.quote.name},</h2>
      <p>Your pick-up address: ${savedData.quote.totalAddress[0].location}</p>
      <p>Your pick-up Building Address: ${
        savedData.quote.totalAddress[0].physicalAddress
      }</p>
      <p>You have via Stop ${savedData.quote.totalAddress.length - 2}</p>
      <p>Your drop-off address: ${
        savedData.quote.totalAddress[savedData.quote.totalAddress.length - 1]
          .location
      }</p>
      <p>Your drop-off Building Address: ${
        savedData.quote.totalAddress[savedData.quote.totalAddress.length - 1]
          .physicalAddress
      }</p>
      <p style="font-weight: bold; color: #4CAF50;">Your total amount: £${totalPrice}</p>
      <p>Van Size: ${vanSize}</p>
      <p>Worker Type: ${worker}</p>
      <p>Move Date: ${moveDate}</p>
      <p>Vehicle Hour: ${vehicleHour}</p>
      <p>Total Second: ${totalSecond}</p>
      <p>Half an Hour Price: £${halfanHour}</p>
      
      <p style="font-size: 18px; font-weight: bold; color: #4285F4;">Your unique code is: ${
        savedData.randomNumber
      }</p>
      <p>Your Link for Quotation:<a href="${linkAddress}"> Quotation</a></p>

  </div>`,
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
    //respond to the client with success
    res.status(200).json({ message: "Data received", data: savedData });
    logEmailInfo(info, savedData);
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
