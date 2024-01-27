const express = require("express");
const router = express.Router();
const Retrieve = require("../models/Retrieve");
const stripe = require("stripe")(process.env.STRIPE_API_KEY);
const { transport } = require("../services/emailService");
const mailOptions = require("../utils/mailOptions");
const { emailLogStream } = require("../middleware/emaillogger");
router.post("/", async (req, res) => {
  try {
    const query = req.body;
    const objectId = query[0]._id;
    const result = await Retrieve.findById(objectId);
    const totalPrice = result.quote.totalPrice;
    const percentage = query[0].percentage;
    const userPayment = ((percentage / 100) * totalPrice).toFixed(2);
    const totalInCent = Math.round(parseFloat(userPayment) * 100);
    const paymentIntent = await stripe.paymentIntents.create({
      amount: totalInCent,
      currency: "gbp",
    });
    result.paymentIntentId = paymentIntent.id;
    result.percentage = percentage;
    await result.save();
    res.status(200).json({
      success: true,
      paymentIntentId: paymentIntent.id,
      percentage: percentage,
      clientSecret: paymentIntent.client_secret,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});
router.post("/updatepaymentstatus", async (req, res) => {
  try {
    const query = req.body;
    const objectId = query[0]._id;
    const result = await Retrieve.findById(objectId);
    const totalAmount = result.quote.totalPrice.toFixed(2);
    const percentage = result.percentage;
    const customerPaid = (percentage / 100) * totalAmount;

    //this is for email details
    const name = result.quote.name.toUpperCase();
    const email = result.quote.email;
    const phone = result.quote.phone;
    const quoteNumber = result.randomNumber;
    const pickUpaddress = result.quote.totalAddress[0].location;
    const pickUpPhysicalAddress = result.quote.totalAddress[0].physicalAddress;
    const deliverAddress =
      result.quote.totalAddress[result.quote.totalAddress.length - 1].location;
    const deliverPhysicalAddress =
      result.quote.totalAddress[result.quote.totalAddress.length - 1]
        .physicalAddress;
    const typeofVan = result.quote.typeofVan;
    const totalHour = result.quote.totalHour;
    const date = result.quote.date;
    const outstandingBalance = totalAmount - (percentage / 100) * totalAmount;
    const totalSecond = result.quote.totalSecond;
    const halfanHour = ((totalAmount * 1800) / totalSecond).toFixed(2);
    const isViaStop = result.quote.places.length > 2;
    const emailOptions = mailOptions(
      name,
      phone,
      email,
      quoteNumber,
      pickUpaddress,
      deliverAddress,
      isViaStop,
      pickUpPhysicalAddress,
      deliverPhysicalAddress,
      typeofVan,
      totalHour,
      date,
      outstandingBalance,
      halfanHour
    );
    const logEmailInfo = (info) => {
      const timeStamp = new Date().toISOString();
      emailLogStream.write(
        `[${timeStamp}]Reason:customerPaid email:${email} amount:£${totalAmount} ${info.response}`
      );
    };
    const info = await transport.sendMail(emailOptions);
    if (percentage === 50) {
      result.paymentStatus = "50percentage";
      const checkerValue = (totalAmount - customerPaid).toFixed(2);
      result.OutstandingBalance = checkerValue;
      await result.save();
      logEmailInfo(info);
      console.log("Email Sent" + info.response);

      res.json({ success: true, emailSent: true });
    } else if (percentage === 100) {
      result.paymentStatus = "paid";
      const checkerValue = (totalAmount - customerPaid).toFixed(2);
      result.OutstandingBalance = checkerValue;
      await result.save();
      logEmailInfo(info);
      console.log("Email Sent" + info.response);

      res.json({ success: true, emailSent: true });
    } else if (percentage === 30) {
      result.paymentStatus = "30percentage";
      const checkerValue = (totalAmount - customerPaid).toFixed(2);
      result.OutstandingBalance = checkerValue;
      await result.save();
      logEmailInfo(info);
      console.log("Email Sent" + info.response);

      res.json({ success: true, emailSent: true });
    } else {
      res.status(404).json({ error: "Document not found" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server Error" });
  }
});
// router.post("/", async (req, res) => {
//   try {
//     const query = req.body;
//     const objectId = query[0]._id;
//     const result = await Retrieve.findById(objectId);
//     if (result) {
//       const totalAmount = await result.quote.totalPrice.toFixed(2);
//       const totalInCent = Math.round(parseFloat(totalAmount) * 100);
//       // console.log(totalInCent);
//       // console.log(stripe.paymentIntents);
//       const paymentIntent = await stripe.paymentIntents.create({
//         amount: totalInCent,
//         currency: "gbp",
//       });
//       result.paymentIntentId = paymentIntent.id;
//       await result.save();
//       res.json({ clientSecret: paymentIntent.client_secret });
//     } else {
//       res.status(404).json({ error: "Your code not found on my Server" });
//     }
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: "Internal server Error" });
//   }

// const query = req.body;
// const objectId = query[0]._id;

// // console.log("myobjectId: " + objectId);

// Retrieve.findById(objectId)
//   .then((result) => {
//     if (result) {
//       const totalAmount = result.quote.totalPrice.toFixed(2) * 100;

//       console.log("This is the result from server" + totalAmount);
//       res.json(result);
//     } else {
//       res.status(404).json({ error: "Your code not found on my Server" });
//     }
//   })
//   .catch((error) => {
//     console.error(error);
//     res.status(500).json({ error: "Internal server Error" });
//   });
// });

// router.post("/updatepaymentstatus", async (req, res) => {
//   try {
//     const query = req.body;
//     const objectId = query[0]._id;

//     // console.log("This is an objectId" + JSON.stringify(objectId));
//     const result = await Retrieve.findById(objectId);
//     // console.log("This is result after search" + JSON.stringify(result));
//     //this is for email details
//     const name = result.quote.name.toUpperCase();
//     const email = result.quote.email;
//     const phone = result.quote.phone;
//     const quoteNumber = result.randomNumber;
//     const pickUpaddress = result.quote.totalAddress[0].location;
//     const pickUpPhysicalAddress = result.quote.totalAddress[0].physicalAddress;
//     const deliverAddress =
//       result.quote.totalAddress[result.quote.totalAddress.length - 1].location;
//     const deliverPhysicalAddress =
//       result.quote.totalAddress[result.quote.totalAddress.length - 1]
//         .physicalAddress;

//     const isViaStop = result.quote.places.length > 2;
//     const totalAmount = result.quote.totalPrice.toFixed(2);
//     const emailOptions = mailOptions(
//       name,
//       phone,
//       email,
//       quoteNumber,
//       pickUpaddress,
//       deliverAddress,
//       isViaStop,
//       pickUpPhysicalAddress,
//       deliverPhysicalAddress
//     );

//     // console.log("This is the result before" + JSON.stringify(result));
//     if (result) {
//       result.paymentStatus = "paid";
//       await result.save();
//       const logEmailInfo = (info) => {
//         const timeStamp = new Date().toISOString();
//         emailLogStream.write(
//           `[${timeStamp}]Reason:customerPaid email:${email} amount:£${totalAmount} ${info.response}`
//         );
//       };
//       const info = await transport.sendMail(emailOptions);
//       logEmailInfo(info);
//       console.log("Email Sent" + info.response);

//       res.json({ success: true, emailSent: true });
//     } else {
//       res.status(404).json({ error: "Document not found" });
//     }
//     // console.log("This is result after" + JSON.stringify(result));
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: "Internal server Error" });
//   }
// });
// router.get("/updatepaymentstatus", (req, res) => {
//   // console.log("Just say hi from server");
//   const query = req.body;
//   console.log(JSON.stringify(query));
// });

router.get("/testingpaymentstatus", (req, res) => {
  res.json("Hi from server");
  console.log("Helo from server");
});

module.exports = router;
