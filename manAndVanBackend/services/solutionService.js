// const { type } = require("@testing-library/user-event/dist/type");
const getLocationByCallingGoogleApi = require("../api/google/googleApi");
const calculateDistanceBetweenTwoLocations = require("../utils/geolocation");

const createQuote = async (postcodes, typeOfVan, numberOfWorker) => {
  const cleanupPostcodes = postcodes.map((postcode) => {
    return postcode.trim().split(" ").join("");
  });
  const totalResult = await getTotalResultOfAllPostcodes(cleanupPostcodes);
  let vanCharge = 50;
  if (typeOfVan === "SMALL") {
    vanCharge = 50;
  } else if (typeOfVan === "LARGE") {
    vanCharge = 100;
  } else if (typeOfVan === "EXTRA LARGE") {
    vanCharge = 150;
  }
  const charge = totalResult.distance * vanCharge * numberOfWorker;
  // const totalHour=await getTotalHour(cleanupPostcodes)
  return {
    quote: {
      totalMiles: totalResult.distance,
      charge: `£${charge}`,
      totalHour: totalResult.time,
    },
  };
};
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

// const getTotalMilesOfAllPostcodes = async (postcode) => {
// // console.log(`postcode1 ${JSON.stringify(postcode[0])}`);
// console.log(`postcode2 ${JSON.stringify(postcode[1])}`);
// // console.log(`postcode3 ${JSON.stringify(postcode[2])}`);
// const cororidnate = await Promise.all(
//   postcode.map((postcode) => getLocationByCallingGoogleApi(postcode))
// );
// return cororidnate;
// let index = 0;
// let totalMiles = 0;
// while (index < postcode.length) {
//   if (postcode.length > index + 1) {
//     const startPostcode = postcode[index];
//     const destinationPostcode = postcode[index + 1];
//     const pickupPoint = await getLocationByCallingGoogleApi(startPostcode);
//     const destination = await getLocationByCallingGoogleApi(
//       destinationPostcode
//     );
//     if (pickupPoint && destination) {
//       console.log(`Pick up point data: ${JSON.stringify(pickupPoint)}`);
//       console.log(`Destination data: ${JSON.stringify(destination)}`);
//       const mileDistanceFromTwoLocations =
//         await calculateDistanceBetweenTwoLocations(pickupPoint, destination);
//       totalMiles += mileDistanceFromTwoLocations;
//       index++;
//     } else {
//       throw new Error("One of the postcode is invalid.");
//     }
//   } else {
//     break;
//   }
// }
// return totalMiles;
// };

module.exports = createQuote;
