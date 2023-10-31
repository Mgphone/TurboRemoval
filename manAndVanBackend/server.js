require("dotenv").config();
const express = require("express");
const createQuote = require("./services/solutionService");
const calculateDistanceBetweenTwoLocations = require("./utils/geolocation");
const getLocationByCallingGoogleApi = require("./api/google/googleApi");
const timeConverter = require("./utils/timeConverter");
const app = express();
const port = process.env.PORT;

/**
 *
 * Change this endpoint to post and get all validPostcodes, typeOfVan and numberOfWorker from request body
 */
app.get("/", async (req, res, next) => {
  //assume u get postcode list from req

  try {
    // const invalidPostcodes = ["NW4 4BU", "AB2 YW1", "HJ9 J73"]; //to test invalid one of the postcode

    const validPostcodes = ["NW4 4BU", "NE4", "paris"];
    const typeOfVan = "Small";
    const numberOfWorker = 2;
    const quote = await createQuote(validPostcodes, typeOfVan, numberOfWorker);
    res.send(quote);
  } catch (error) {
    next(error);
  }
});
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
    { longitude: 51.5869609263975, latitude: -0.22871675924011195 },
    { longitude: 51.61346536076805, latitude: -0.1756191034176333 }
  );
  const time = timeConverter(distance.distanceInTime);
  res.send(`<h1>${distance.distanceInMiles}</h1><h2>${time}</h2>`);
});
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
