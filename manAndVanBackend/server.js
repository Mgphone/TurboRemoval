require("dotenv").config();
const express = require("express");
// const createQuote = require("./services/solutionService");
// const calculateDistanceBetweenTwoLocations = require("./utils/geolocation");
// const getLocationByCallingGoogleApi = require("./api/google/googleApi");
// const timeConverter = require("./utils/timeConverter");
const app = express();
const { accessLogger } = require("./middleware/logger");

const bodyParser = require("body-parser");
const port = process.env.PORT;
const cors = require("cors");
const corsOptions = require("./config/corsOptions");
const connectToDatabase = require("./config/dbConn");
connectToDatabase();
//testing for node sending retreive

// app.use(cors(corsOptions));
app.use(cors());
// app.use(cors({ origin: "*" }));
app.use(accessLogger);

app.use(bodyParser.json());
//add the stripe payament method

//Router
app.use("/booking", require("./Routes/booking")); // booking for find and display userinput
app.use("/saveRetrieve", require("./Routes/saveRetrieve"));
app.use("/savebooking", require("./Routes/saveBooking")); //savebooking and later payment
app.use("/paymentbooking", require("./Routes/bookingpayment")); //button payment
app.use("/dashboard", require("./Routes/dashBoard")); //checking one
app.use("/google", require("./Routes/google"));

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
