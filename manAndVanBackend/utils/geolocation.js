const calculateDistanceBetweenTwoLocations = (
  firstLocation,
  secondLocation
) => {
  const { longitude: firstLong, latitude: firstLat } = firstLocation;
  const { longitude: secondLong, latitude: secondLat } = secondLocation;

  if (firstLong && firstLat && secondLong && secondLat) {
    //replace your distance in miles logic from asia villa
    const R = 6371; // Radius of the Earth in kilometers.
    const dLat = (secondLat - firstLat) * (Math.PI / 180);
    const dLon = (secondLong - firstLong) * (Math.PI / 180);

    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(firstLat * (Math.PI / 180)) *
        Math.cos(secondLat * (Math.PI / 180)) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);

    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distanceInKilometers = R * c;

    const distanceInMiles = distanceInKilometers * 0.621371;

    return distanceInMiles;

    // return firstLong + firstLat - (secondLong - secondLat);
  } else {
    throw new Error("Longitude or latitude data is missing");
  }
};

module.exports = calculateDistanceBetweenTwoLocations;
