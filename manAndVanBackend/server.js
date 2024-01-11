//for .env file
require("dotenv").config();

//require modules
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

//import custome modules
const connectToDatabase = require("./config/dbConn");
const { accessLogger } = require("./middleware/logger");
const whiteList = require("./config/whiteList");
const corsOptions = require("./config/corsOptions");

//some funtions
// const createQuote = require("./services/solutionService");
// const calculateDistanceBetweenTwoLocations = require("./utils/geolocation");
// const getLocationByCallingGoogleApi = require("./api/google/googleApi");
// const timeConverter = require("./utils/timeConverter");

//connect to database
connectToDatabase();

//create express app
const app = express();
//cors
app.use(cors(corsOptions));
// app.use(cors());
// app.use(cors({ origin: "*" }));

//add logger
app.use(accessLogger);

// json body using middleware
app.use(bodyParser.json());
const port = process.env.PORT;

//add the stripe payament method

//Router
app.use("/booking", require("./Routes/booking")); // booking for find and display userinput
app.use("/saveRetrieve", require("./Routes/saveRetrieve"));
app.use("/savebooking", require("./Routes/saveBooking")); //savebooking and later payment
app.use("/paymentbooking", require("./Routes/bookingpayment")); //button payment
app.use("/dashboard", require("./Routes/dashBoard")); //checking one
app.get("/", (req, res) => {
  res.send(
    `<h1>Hello from backend ${process.env.MY_URL_FRONT}</h1>${whiteList}`
  );
});
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
