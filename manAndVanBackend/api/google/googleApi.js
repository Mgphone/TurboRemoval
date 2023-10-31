const getGoogleApi = (apiKey, address) => {
  const baseUrl = "https://maps.googleapis.com/maps/api/geocode/json?";

  const url = `${baseUrl}key=${apiKey}&address=${address}`;
  return url;
};
const getLocationByCallingGoogleApi = async (postcode) => {
  const apiKey = process.env.GOOGLE_API_KEY;
  // const param1 = "param1=test1";
  // const param2 = "param2=test2";
  const googleUrl = getGoogleApi(apiKey, postcode);

  const response = await fetch(googleUrl);
  const data = await response.json();

  if (
    data.results &&
    data.results[0] &&
    data.results[0].geometry &&
    data.results[0].geometry.location
  ) {
    const location = await data.results[0].geometry.location;

    const addressAndLocation = {
      longitude: location.lng,
      latitude: location.lat,
    };
    return addressAndLocation;
  } else {
    return { latitude: 0, longitude: 0 };
  }
};

module.exports = getLocationByCallingGoogleApi;
