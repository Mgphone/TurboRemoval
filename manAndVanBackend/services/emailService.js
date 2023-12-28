const nodemailer = require("nodemailer");
// const connectToDatabase = require("../config/dbConn");
// const closeDatabase = require("../config/closeDatabase");
const transport = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.GMAIL_USERNAME,
    pass: process.env.GMAIL_PASSWORD,
  },
});
module.exports = { transport };
