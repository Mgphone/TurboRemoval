require("dotenv").config();
const express = require("express");
const createQuote = require("./services/solutionService");
const calculateDistanceBetweenTwoLocations = require("./utils/geolocation");
const getLocationByCallingGoogleApi = require("./api/google/googleApi");
const timeConverter = require("./utils/timeConverter");
const app = express();
const dbConnect = require("./config/dbConn");
const { accessLogger } = require("./middleware/logger");

const bodyParser = require("body-parser");
const port = process.env.PORT;
const cors = require("cors");
const corsOptions = require("./config/corsOptions");
//test ing for node sending retreive
dbConnect;
// app.use(cors(corsOptions));
// app.use(cors());
app.use(cors({ origin: "*" }));
app.use(accessLogger);

app.use(bodyParser.json());
app.get("/retrieve", (req, res) => {
  res.json({ message: "Data Received" });
});
app.post("/retrieve", (req, res) => {
  const bodyParam = req.body.param;
  const bodyCount = req.body.count + 1;

  console.log("Received data from client", bodyParam);
  console.log("Received data from Count", bodyCount);
  res.json({
    message: "Data received and processed successfully on the server",
  });
});

app.post("/booking", async (req, res) => {
  try {
    const receivedData = req.body;
    // console.log("receivedDatafrom front" + JSON.stringify(receivedData));
    const quote = await createQuote(receivedData);

    res.json(quote);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server error" });
  }
});

app.post("/saveretrieve", async (req, res) => {
  try {
    const newData = req.body;
    // newData.number = parseInt(newData.number, 10);

    // console.log(
    //   "that is going to the server to save to database" +
    //     JSON.stringify(newData)
    // );
    const Retrieve = require("./models/Retrieve");
    //save to database
    const newRetrieve = new Retrieve(newData);
    const savedData = await newRetrieve.save();
    // console.log("Data saved successfully from Node Server", savedData);
    //respond to the client with success
    res.status(200).json({ message: "Data received", data: savedData });
  } catch (error) {
    console.error("Error saving data", error);
    res.status(500).json({ errror: "Internal server error" });
  }
});

/**
 *
 * Change this endpoint to post and get all validPostcodes, typeOfVan and numberOfWorker from request body
 */
// app.get("/", async (req, res, next) => {
//   //assume u get postcode list from req
//   const formData = {
//     address: ["NW4 4BU", "NE4", "paris"],
//     typeOfVan: "Small",
//     numberOfWorker: 2,
//     Date: "22/01/2006",
//   };
//   try {
//     // const invalidPostcodes = ["NW4 4BU", "AB2 YW1", "HJ9 J73"]; //to test invalid one of the postcode

//     // const validPostcodes = ["NW4 4BU", "NE4", "paris"];
//     // const typeOfVan = "Small";
//     // const numberOfWorker = 2;

//     const {
//       address: validPostcodes,
//       typeOfVan,
//       numberOfWorker,
//       Date,
//     } = formData;
//     const quote = await createQuote(
//       validPostcodes,
//       typeOfVan,
//       numberOfWorker,
//       Date
//     );
//     res.send(quote);
//   } catch (error) {
//     next(error);
//   }
// });
app.get("/testing", async (req, res, next) => {
  try {
    const result = await getLocationByCallingGoogleApi("nw2 2ll");
    const result2 = await getLocationByCallingGoogleApi("Paris");
    const result3 = [result, result2];
    const distance = await calculateDistanceBetweenTwoLocations(
      result,
      result2
    );
    const time = timeConverter(distance.distanceInTime);
    res.send(
      `<h1>London and Paris difference ${distance.distanceInMiles} miles</h1><h2>${time}</h2> `
    );

    // res.send(result3);
  } catch (error) {
    next(error);
  }
});
app.get("/test", async (req, res, next) => {
  const distance = await calculateDistanceBetweenTwoLocations(
    { latitude: 51.5869609263975, longitude: -0.22871675924011195 },
    { latitude: 51.61346536076805, longitude: -0.1756191034176333 }
  );
  const time = timeConverter(distance.distanceInTime);
  res.send(`<h1>${distance.distanceInMiles}</h1><h2>${time}</h2>`);
});
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
