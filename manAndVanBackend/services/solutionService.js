// const { type } = require("@testing-library/user-event/dist/type");
const getLocationByCallingGoogleApi = require("../api/google/googleApi");
const calculateDistanceBetweenTwoLocations = require("../utils/geolocation");
const lateBook = require("./lateBook");
const outOfHour = require("./outOfHour");
const createQuote = async (receivedData) => {
  const cleanupPostcodes = await Promise.all(
    receivedData.addresses.map((address) => address.location)
  );

  // const checkPickupStair = receivedData.addresses[0]?.stair || 0;
  const checkPickupStair = receivedData.addresses[0].stair
    ? receivedData.addresses[0].stair
    : 0;

  // const pickupStair = checkPickupStair === 0 ? "" : checkPickupStair;
  const pickupStair = checkPickupStair ? Number(checkPickupStair) : 0;

  const checkDeliverStair =
    receivedData.addresses[0].stair &&
    receivedData.addresses[receivedData.addresses.length - 1].stair
      ? receivedData.addresses[receivedData.addresses.length - 1].stair
      : 0;
  const deliveryStair = checkDeliverStair ? Number(checkDeliverStair) : 0;

  const hourtosecond = (time) => {
    // totalHour: "06hr:30Min";
    const splitTime = time.split(":");
    const [hours, minutes] = splitTime.map((part) => parseInt(part, 10));
    return hours * 3600 + minutes * 60;
  };
  const totalHour = receivedData.hour;
  const totalSecond = totalHour && hourtosecond(totalHour);
  const date = receivedData.date;
  const description = receivedData.description;
  const email = receivedData.email;
  const phone = receivedData.phone;
  const name = receivedData.name;
  const totalAddress = receivedData.addresses;
  const travelResult = await getTotalResultOfAllPostcodes(cleanupPostcodes);
  const totalStairCount = await receivedData.addresses.reduce((sum, item) => {
    if (item.stair !== "undefined" && item.stair !== undefined) {
      return sum + Number(item.stair);
    }
    return sum;
  }, 0);
  let isViaStop = receivedData.addresses.length > 2;
  let viaStop = isViaStop ? receivedData.addresses.length - 2 : 0;
  const checkViaStopStair =
    Number(totalStairCount) -
    (Number(checkDeliverStair) + Number(checkPickupStair));
  let typeofVan = await receivedData.vanSize;
  let vanCharge = 35;
  if (typeofVan === "Small") {
    vanCharge = 35;
  } else if (typeofVan === "Medium") {
    vanCharge = 40;
  } else if (typeofVan === "Large") {
    vanCharge = 45;
  } else if (typeofVan === "Luton") {
    vanCharge = 55;
  }
  let typeOfWorker = await receivedData.driverHelp;
  let workerCharge = 0;
  if (typeOfWorker === "No-Help") {
    workerCharge = 0;
  } else if (typeOfWorker === "Driver-Help") {
    workerCharge = 5;
  } else if (typeOfWorker === "Driver-Plus-One") {
    workerCharge = 25;
  } else if (typeOfWorker === "Driver-Plus-Two") {
    workerCharge = 65;
  }
  const numberOfSecond = totalSecond / 3600;

  let stairChargeWithDriver = 1;
  if (typeOfWorker === "No-Help") {
    stairChargeWithDriver = 0;
  } else if (typeOfWorker === "Driver-Help") {
    stairChargeWithDriver = 5;
  } else if (typeOfWorker === "Driver-Plus-One") {
    stairChargeWithDriver = 10;
  } else if (typeOfWorker === "Driver-Plus-Two") {
    stairChargeWithDriver = 15;
  }
  //stair charge
  const stairTotalHour = numberOfSecond < 2 ? 2 : numberOfSecond;
  const stairCharge =
    stairTotalHour * (stairChargeWithDriver * totalStairCount);
  //get late hour charge
  const lastMinutes = receivedData.date ? lateBook(receivedData.date) : false;
  const totalLateMinutes = lastMinutes ? 20 : 0;
  //get out of hour charge
  const outHour = receivedData.date ? outOfHour(receivedData.date) : false;
  const totalOutHour = outHour ? 20 : 0;
  let mileCharge = travelResult.distance < 5 ? 0 : travelResult.distance * 1.5;
  let viaCharge = viaStop && viaStop * 20;
  const timeCalculate = numberOfSecond < 2 ? 2 : numberOfSecond;
  const totalPrice =
    timeCalculate * (vanCharge + workerCharge) +
    stairCharge +
    totalLateMinutes +
    totalOutHour +
    viaCharge +
    mileCharge;

  return {
    yourinfo: { receivedData },
    quote: {
      totalAddress: totalAddress,
      travelMiles: travelResult.distance,
      travelHour: travelResult.time,
      totalSecond: totalSecond,
      places: cleanupPostcodes,
      stairTotal: totalStairCount,
      vanCharge: vanCharge,
      workerCharge: workerCharge,
      totalPrice: totalPrice,
      typeofVan: typeofVan,
      typeOfWorker: typeOfWorker,
      totalHour: totalHour,
      date: date,
      description: description,
      email: email,
      phone: phone,
      name: name,
      pickupStair: pickupStair,
      deliveryStair: deliveryStair,
      viaStopStair: checkViaStopStair,
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

module.exports = createQuote;
