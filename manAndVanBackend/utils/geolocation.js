const calculateDistanceBetweenTwoLocations = async (
  firstLocation,
  secondLocation
) => {
  if ((firstLocation, secondLocation)) {
    const { longitude: firstLong, latitude: firstLat } = firstLocation;
    const { longitude: secondLong, latitude: secondLat } = secondLocation;
    if (firstLong && firstLat && secondLong && secondLat) {
      const apiKey = process.env.GOOGLE_API_KEY;
      const apiUrl = `https://maps.googleapis.com/maps/api/directions/json?origin=${firstLat},${firstLong}&destination=${secondLat},${secondLong}&key=${apiKey}`;
      try {
        const response = await fetch(apiUrl);
        if (!response.ok) {
          throw new Error(`Request Error${response.status}`);
        }
        const data = await response.json();
        if (data.status === "OK") {
          const distanceInMeters = data.routes[0].legs[0].distance.value;
          const distanceInTime = data.routes[0].legs[0].duration.value;

          const distanceInMiles = distanceInMeters * 0.000621;
          return {
            distanceInMiles: distanceInMiles,
            distanceInTime: distanceInTime,
          };
        } else {
          console.error(`Request Error : ${data.status}`);
        }
      } catch (error) {
        console.error("Error", error.message);
      }
    } else {
      throw new Error("Longitude or latitude data is missing");
    }
  } else {
    throw new Error("Location Missing");
  }
};
module.exports = calculateDistanceBetweenTwoLocations;
