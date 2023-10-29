const fetch = require("node-fetch");
const calculateDistanceBetweenTwoLocations = async (
  firstLocation,
  secondLocation
) => {
  const { longitude: firstLong, latitude: firstLat } = firstLocation;
  const { longitude: secondLong, latitude: secondLat } = secondLocation;

  if (firstLong && firstLat && secondLong && secondLat) {
    const apiKey = process.env.GOOGLE_API_KEY;
    const apiUrl = `https://maps.googleapis.com/maps/api/directions/json?origin=${firstLong},${firstLat}&destination=${secondLong},${secondLat}&key=${apiKey}`;
    try {
      const response = await fetch(apiUrl);
      if (!response.ok) {
        throw new Error(`Request Error${response.status}`);
      }
      const data = await response.json();
      const distanceInMeters = data.routes[0].legs[0].distance.value;
      const distanceInMiles = distanceInMeters * 0.000621;

      // return console.log("this is from geolocaiton " + distanceInMiles);
      return distanceInMiles;
    } catch (error) {
      console.error("Error", error.message);
    }
  } else {
    throw new Error("Longitude or latitude data is missing");
  }
};
module.exports = calculateDistanceBetweenTwoLocations;
