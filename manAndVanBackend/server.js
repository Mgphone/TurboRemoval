require("dotenv").config();
const express = require("express");

const app = express();
const { accessLogger } = require("./middleware/logger");

const bodyParser = require("body-parser");
// const cookieParser = require("cookie-parser");
const port = process.env.PORT;
const cors = require("cors");
const corsOptions = require("./config/corsOptions");
const connectToDatabase = require("./config/dbConn");
connectToDatabase();
//testing for node sending retreive
const corsWithWhiteList = cors(corsOptions);
const corsWildCard = require("./config/corsWildCard");

app.use(accessLogger);

app.use(bodyParser.json());
// app.use(cookieParser());
//add the stripe payament method

//Router
// booking for find and display userinput
app.use("/booking", corsWithWhiteList, require("./Routes/booking"));

app.use("/saveRetrieve", corsWithWhiteList, require("./Routes/saveRetrieve")); //savebooking
app.use("/savebooking", corsWithWhiteList, require("./Routes/saveBooking")); //savebooking and later payment
app.use(
  "/paymentbooking",
  corsWithWhiteList,
  require("./Routes/bookingpayment")
); //this is payment on straight
//button payment
app.use("/dashboard", corsWithWhiteList, require("./Routes/dashBoard")); //checking one
app.use("/google", corsWildCard, require("./Routes/google"));
//contact
app.use("/contact", corsWithWhiteList, require("./Routes/contact"));
//login
app.use("/account", corsWithWhiteList, require("./Routes/account"));
app.use("/backdata", corsWithWhiteList, require("./Routes/backmoondata"));

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
