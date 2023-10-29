const getGoogleApi = (apiKey, ...args) => {
  const baseUrl = "https://api.google.com/map"; // Replace this with your actual base URL

  let queryString = "";
  if (args && args.length > 0) {
    queryString = args.join("&"); // Join the args array elements with '&'
  }

  const url = `${baseUrl}?apiKey=${apiKey}${
    queryString ? `&${queryString}` : ""
  }`;
  return url;
};

const getLocationByCallingGoogleApi = (postcode) => {
  const apiKey = "your_api_key";
  const param1 = "param1=test1";
  const param2 = "param2=test2";
  const googleUrl = getGoogleApi(apiKey, param1, param2);

  // console.log(`Getting postcode: ${postcode} data from google map api`);

  return mockPostCodeData[postcode];
};

const mockPostCodeData = {
  NW44BU: {
    longitude: 51.5869609263975,
    latitude: -0.22871675924011195,
  },

  AB2YW1: {
    longitude: 57.239711224669634,
    latitude: -2.2137043041535347,
  },

  N129QL: {
    longitude: 51.61346536076805,
    latitude: -0.1756191034176333,
  },
};

// getLocationByCallingGoogleApi("NW4 4BU"); // to test

module.exports = getLocationByCallingGoogleApi;
