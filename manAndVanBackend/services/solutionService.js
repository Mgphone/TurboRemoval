// const { type } = require("@testing-library/user-event/dist/type");
const getLocationByCallingGoogleApi = require("../api/google/googleApi");
const calculateDistanceBetweenTwoLocations = require("../utils/geolocation");
const createQuote = async (receivedData) => {
  const cleanupPostcodes = await Promise.all(
    receivedData.addresses.map((address) => address.location)
  );
  const totalResult = await getTotalResultOfAllPostcodes(cleanupPostcodes);
  const totalStairCount = await receivedData.addresses.reduce((sum, item) => {
    if (item.stair !== "undefined" && item.stair !== undefined) {
      return sum + Number(item.stair);
    }
    return sum;
  }, 0);
  let typeofVan = await receivedData.vanSize;
  let vanCharge = 50;
  if (typeofVan === "Small") {
    vanCharge = 50;
  } else if (typeofVan === "Medium") {
    vanCharge = 75;
  } else if (typeofVan === "Large") {
    vanCharge = 100;
  } else if (typeofVan === "Luton") {
    vanCharge = 125;
  }
  let typeOfWorker = await receivedData.driverHelp;
  let workerCharge = 30;
  if (typeOfWorker === "No-Help") {
    workerCharge = 30;
  } else if (typeOfWorker === "Driver-Help") {
    workerCharge = 45;
  } else if (typeOfWorker === "Driver-Plus-One") {
    workerCharge = 60;
  } else if (typeOfWorker === "Driver-Plus-Two") {
    workerCharge = 75;
  }
  const totalPrice =
    (totalResult.distance < 5 ? 15 : totalResult.distance * 1.5) +
    totalStairCount * 10 +
    vanCharge +
    workerCharge;

  return {
    yourinfo: { receivedData },
    quote: {
      totalMiles: totalResult.distance,
      totalHour: totalResult.time,
      places: cleanupPostcodes,
      stairTotal: totalStairCount,
      vanCharge: vanCharge,
      workerCharge: workerCharge,
      totalPrice: totalPrice,
      typeofVan: typeofVan,
      typeOfWorker: typeOfWorker,
    },
  };
};
// const createQuote = async (postcodes, typeOfVan, numberOfWorker, Date) => {
//   const cleanupPostcodes = postcodes.map((postcode) => {
//     return postcode.trim().split(" ").join("");
//   });
//   const totalResult = await getTotalResultOfAllPostcodes(cleanupPostcodes);
//   let vanCharge = 50;
//   if (typeOfVan === "SMALL") {
//     vanCharge = 50;
//   } else if (typeOfVan === "LARGE") {
//     vanCharge = 100;
//   } else if (typeOfVan === "EXTRA LARGE") {
//     vanCharge = 150;
//   }
//   const charge = totalResult.distance * vanCharge * numberOfWorker;
//   return {
//     quote: {
//       totalMiles: totalResult.distance,
//       charge: `£${charge}`,
//       totalHour: totalResult.time,
//       Date: Date,
//     },
//   };
// };
const getTotalResultOfAllPostcodes = async (postcodes) => {
  const coordinates = await Promise.all(
    postcodes.map((postcode) => getLocationByCallingGoogleApi(postcode))
  );

  let distance = 0;
  let time = 0;

  for (let i = 0; i < coordinates.length - 1; i++) {
    const currentCoordinate = coordinates[i];
    const nextCorordinate = coordinates[i + 1];
    if (currentCoordinate && nextCorordinate) {
      const result = await calculateDistanceBetweenTwoLocations(
        coordinates[i],
        coordinates[i + 1]
      );
      if (result) {
        distance += result.distanceInMiles;
        time += result.distanceInTime;
      }
    } else {
      console.error(
        "Coordinate is missing for indexes " + i + " and " + (i + 1)
      );
    }
  }

  return { distance: distance, time: time };
};

module.exports = createQuote;
