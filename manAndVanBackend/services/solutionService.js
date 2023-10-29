// const { type } = require("@testing-library/user-event/dist/type");
const getLocationByCallingGoogleApi = require("../api/google/googleApi");
const calculateDistanceBetweenTwoLocations = require("../utils/geolocation");

const createQuote = async (postcodes, typeOfVan, numberOfWorker) => {
  const cleanupPostcodes = postcodes.map((postcode) => {
    return postcode.trim().split(" ").join("");
  });
  const totalMiles = await getTotalMilesOfAllPostcodes(cleanupPostcodes);
  let vanCharge = 50;
  if (typeOfVan === "SMALL") {
    vanCharge = 50;
  } else if (typeOfVan === "LARGE") {
    vanCharge = 100;
  } else if (typeOfVan === "EXTRA LARGE") {
    vanCharge = 150;
  }
  const charge = totalMiles * vanCharge * numberOfWorker;
  return {
    quote: {
      totalMiles: totalMiles,
      charge: `£${charge}`,
    },
  };
};

const getTotalMilesOfAllPostcodes = async (postcode) => {
  let index = 0;
  let totalMiles = 0;
  while (index < postcode.length) {
    if (postcode.length > index + 1) {
      const startPostcode = postcode[index];
      const destinationPostcode = postcode[index + 1];
      const pickupPoint = getLocationByCallingGoogleApi(startPostcode);
      const destination = getLocationByCallingGoogleApi(destinationPostcode);

      if (pickupPoint && destination) {
        // console.log(`Pick up point data: ${JSON.stringify(pickupPoint)}`);
        // console.log(`Destination data: ${JSON.stringify(destination)}`);
        const mileDistanceFromTwoLocations =
          await calculateDistanceBetweenTwoLocations(pickupPoint, destination);

        totalMiles += mileDistanceFromTwoLocations;
        index++;
      } else {
        throw new Error("One of the postcode is invalid.");
      }
    } else {
      break;
    }
  }
  return totalMiles;
};

module.exports = createQuote;
