const express = require("express");
const router = express.Router();
const Retrieve = require("../models/Retrieve");
const stripe = require("stripe")(process.env.STRIPE_API_KEY);
const mailOptions = require("../utils/mailOptions");
const { transport } = require("../services/emailService");
const { emailLogStream } = require("../middleware/emaillogger");
const getISOtoGBtime = require("../utils/getISOtoGBtime");
// const { connect } = require("mongoose");
router.post("/", async (req, res) => {
  try {
    const receivedData = req.body;
    const date = receivedData.date;
    const dropAddress = receivedData.places[receivedData.places.length - 1];
    const pickupAddress = receivedData.places[0];
    const description = `Pickup Address ${pickupAddress} and Drop Address ${dropAddress}`;
    const totalAmount = receivedData.totalPrice.toFixed(2);
    const randomNumber = Math.floor(Math.random() * 10000000 + 1);
    const percentage = receivedData.percentage;
    const customerStripePay = (percentage / 100) * totalAmount;
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency: "gbp",
            product_data: {
              name: `Your Moving at ${date}`,
              description: `${description}`,
            },
            unit_amount: Math.round(customerStripePay * 100),
          },
          quantity: 1,
        },
      ],
      mode: "payment",
      success_url: `${process.env.MY_URL_FRONT}/paymentbooking/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.MY_URL_FRONT}/paymentbooking/fail`,
    });

    // Save to the database
    const newTransitions = new Retrieve({
      date,
      quote: receivedData,
      randomNumber,
      paymentStatus: "unpaid", // Assuming it's initially unpaid
      paymentIntentId: session.id,
      reviewRequest: false,
    });

    await newTransitions.save();

    // Send the Checkout Session ID back to the client
    res.json({ sessionId: session.id });
  } catch (error) {
    console.error("Error processing payment", error);
    res.status(500).json({ error: "Error Processing Payment" });
  }
});

router.post("/success", async (req, res) => {
  try {
    const sessionId = req.body.session_id;
    const transition = await Retrieve.findOne({ paymentIntentId: sessionId });
    const totalAmount = transition.quote.totalPrice.toFixed(2);
    const percentage = transition.quote.percentage;

    if (!transition) {
      // console.error("Transition not found");
      return res.status(404).json({ error: "Transition not Found" });
    }

    // If transition is found, update payment status and send email
    else if (transition.quote.percentage === 30) {
      transition.paymentStatus = "30percentage";
      transition.percentage = 30;
      transition.OutstandingBalance =
        totalAmount - (percentage / 100) * totalAmount;
      // transition.percentage
    } else if (transition.quote.percentage === 50) {
      transition.paymentStatus = "50percentage";
      transition.percentage = 50;
      transition.OutstandingBalance =
        totalAmount - (percentage / 100) * totalAmount;
    } else if (transition.quote.percentage === 100) {
      transition.paymentStatus = "paid";
      transition.percentage = 100;
      transition.OutstandingBalance = 0;
    }

    // transition.paymentStatus = "paid";

    //this is for email options
    const name = transition.quote.name;
    const phone = transition.quote.phone;
    const email = transition.quote.email;
    const quoteNumber = transition.randomNumber;
    const pickUpaddress = transition.quote.places[0];
    const deliverAddress =
      transition.quote.places[transition.quote.places.length - 1];
    const isViaStop = transition.quote.places.length > 2;
    const pickUpPhysicalAddress =
      transition.quote.totalAddress[0].physicalAddress;
    const deliverPhysicalAddress =
      transition.quote.totalAddress[transition.quote.totalAddress.length - 1]
        .physicalAddress;
    const typeofVan = transition.quote.typeofVan;
    const totalHour = transition.quote.totalHour;
    const date = getISOtoGBtime(transition.quote.date);
    const outstandingBalance = totalAmount - (percentage / 100) * totalAmount;
    const totalSecond = transition.quote.totalSecond;
    const halfanHour = ((totalAmount * 1800) / totalSecond).toFixed(2);
    const pickupAddressStair = transition.quote.totalAddress[0].stair;
    const deliverAddressStair =
      transition.quote.totalAddress[transition.quote.totalAddress.length - 1]
        .stair;
    const description = transition.quote.description;
    const totalAddress = transition.quote.totalAddress;
    const emailOptions = mailOptions(
      // transition,
      name || transition.quote.name,
      phone || transition.quote.phone,
      email || transition.quote.email,
      quoteNumber || transition.randomNumber,
      pickUpaddress || transition.quote.places[0],
      deliverAddress ||
        transition.quote.places[transition.quote.places.length - 1],
      // isViaStop || transition.quote.places.length > 2,
      pickUpPhysicalAddress,
      deliverPhysicalAddress,
      typeofVan,
      totalHour,
      date,
      outstandingBalance,
      halfanHour,
      totalAmount,
      pickupAddressStair,
      deliverAddressStair,
      description,
      totalAddress
    );
    // console.log("This is date" + date);
    //send email and save
    try {
      // console.log("This is result" + JSON.stringify(transition));
      const info = await transport.sendMail(emailOptions);
      // console.log("Email sent for directBook Payment", info.response);

      // Log email information
      const timeStamp = new Date().toISOString();
      emailLogStream.write(
        `[${timeStamp}] Reason: customerPaid email: ${email} amount: £${totalAmount} ${info.response}`
      );

      // Save transition to the database
      await transition.save();
      res
        .status(200)
        .json({ message: "Payment updated successfully and email sent." });
    } catch (emailError) {
      console.error("Error sending email", emailError);
      res.status(500).json({ error: "Error sending email" });
    }
  } catch (error) {
    console.error("Error updating the payment or sending email", error);
    res
      .status(500)
      .json({ error: "Error updating the payment or sending email" });
  }
});

module.exports = router;
