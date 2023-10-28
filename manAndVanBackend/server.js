const express = require("express");
const createQuote = require("./services/solutionService");
const app = express();
const port = 4000;

/**
 *
 * Change this endpoint to post and get all validPostcodes, typeOfVan and numberOfWorker from request body
 */
app.get("/", (req, res, next) => {
  //assume u get postcode list from req

  try {
    // const invalidPostcodes = ["NW4 4BU", "AB2 YW1", "HJ9 J73"]; //to test invalid one of the postcode
    const validPostcodes = ["NW4 4BU", "AB2 YW1", "N12 9QL"];
    const typeOfVan = "Small";
    const numberOfWorker = 2;

    res.send(createQuote(validPostcodes, typeOfVan, numberOfWorker));
  } catch (error) {
    next(error);
  }
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
