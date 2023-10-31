const getGoogleApi = (apiKey, address) => {
  // const baseUrl = "https://api.google.com/map"; // Replace this with your actual base URL
  const baseUrl = "https://maps.googleapis.com/maps/api/geocode/json?";
  // let queryString = "";
  // if (args && args.length > 0) {
  //   queryString = args.join("&"); // Join the args array elements with '&'
  // }

  // const url = `${baseUrl}?apiKey=${apiKey}${
  //   queryString ? `&${queryString}` : ""
  // }`;
  const url = `${baseUrl}key=${apiKey}&address=${address}`;
  return url;
};
const getLocationByCallingGoogleApi = async (postcode) => {
  const apiKey = process.env.GOOGLE_API_KEY;
  // const param1 = "param1=test1";
  // const param2 = "param2=test2";
  const googleUrl = getGoogleApi(apiKey, postcode);

  // console.log(`Getting postcode: ${postcode} data from google map api`);

  // return mockPostCodeData[postcode];
  // return googleUrl;
  const response = await fetch(googleUrl);
  const data = await response.json();
  // const formatted_address = data.results[0].formatted_address;
  if (
    data.results &&
    data.results[0] &&
    data.results[0].geometry &&
    data.results[0].geometry.location
  ) {
    const location = await data.results[0].geometry.location;
    // const addressAndLocation = {
    //   [formatted_address]: {
    //     latitude: location.lat,
    //     longitude: location.lng,
    //   },
    // };
    const addressAndLocation = {
      longitude: location.lat,
      latitude: location.lng,
    };
    return addressAndLocation;
  } else {
    return { latitude: 0, longitude: 0 };
  }
};
// const mockPostCodeData = {
//   NW44BU: {
//     longitude: 51.5869609263975,
//     latitude: -0.22871675924011195,
//   },

//   AB2YW1: {
//     longitude: 57.239711224669634,
//     latitude: -2.2137043041535347,
//   },

//   N129QL: {
//     longitude: 51.61346536076805,
//     latitude: -0.1756191034176333,
//   },
// };

// getLocationByCallingGoogleApi("NW4 4BU"); // to test

module.exports = getLocationByCallingGoogleApi;
