const express = require("express");
const router = express.Router();
const { transport } = require("../services/emailService");

router.post("/sendemail", async (req, res) => {
  try {
    const query = req.body;
    const name = query.name ? query.name.toUpperCase() : "";
    const email = query.email;
    const phone = query.phone ? query.phone : null;
    const title = query.title;
    const message = query.message;
    const htmlTemplate = `<div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; max-width: 600px; margin: 20px auto; background-color: #f4f4f4; padding: 30px; border-radius: 10px; box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);">
    <h2 style="color: #4c7ef3;">Dear Admin,</h2>
    <p style="font-size: 16px; color: #333;">A new message from a customer:</p>
    <p style="font-size: 18px; font-weight: bold; color: #2c3e50;">Name: ${name}</p>
    <p style="font-size: 18px; font-weight: bold; color: #2c3e50;">Email: ${email}</p>
    <p style="font-size: 16px; color: #333;">Message:</p>
    <p style="font-size: 18px; font-weight: bold; color: #2cd;">${message}</p>
    ${
      phone
        ? `<p style="font-size: 18px; font-weight: bold; color: #2c3e50;">Phone: ${phone}</p>`
        : ""
    }
    <p style="font-size: 16px; color: #333;">Thank you!</p>
  </div>
  `;
    const mailOptions = {
      from: process.env.GMAIL_USERNAME,
      to: process.env.GMAIL_USERNAME,
      subject: title,
      html: htmlTemplate,
    };
    const info = await transport.sendMail(mailOptions);
    if (info.accepted && info.accepted.length > 0) {
      res.status(200).json({
        message:
          "Your email has been sent, and I'll get in touch with you at my earliest convenience.",
      });
    }
  } catch (error) {
    console.error("Can not send email", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;
