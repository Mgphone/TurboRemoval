const calculateDistance = (point1) => {
  const center = { lat: 51.59034573602164, lng: -0.2221804055444608 };
  const R = 3958.8; // Earth radius in miles
  const lat1 = point1.lat;
  const lon1 = point1.lng;
  const lat2 = center.lat;
  const lon2 = center.lng;
  const dLat = toRadians(lat2 - lat1);
  const dLon = toRadians(lon2 - lon1);

  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRadians(lat1)) *
      Math.cos(toRadians(lat2)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  const distance = R * c;

  return distance;
};
const toRadians = (angle) => {
  return (angle * Math.PI) / 180;
};

export default calculateDistance;
