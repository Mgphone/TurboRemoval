require("dotenv").config();
const express = require("express");

const app = express();
const { accessLogger } = require("./middleware/logger");

const bodyParser = require("body-parser");
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
//add the stripe payament method

//Router
app.use("/booking", corsWithWhiteList, require("./Routes/booking")); // booking for find and display userinput
app.use("/saveRetrieve", corsWithWhiteList, require("./Routes/saveRetrieve"));
app.use("/savebooking", corsWithWhiteList, require("./Routes/saveBooking")); //savebooking and later payment
app.use(
  "/paymentbooking",
  corsWithWhiteList,
  require("./Routes/bookingpayment")
);
//button payment
app.use("/dashboard", corsWithWhiteList, require("./Routes/dashBoard")); //checking one
app.use("/google", corsWildCard, require("./Routes/google"));
//contact
app.use("/contact", corsWithWhiteList, require("./Routes/contact"));
//login
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
