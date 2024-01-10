// corsOptions.js
const whiteList = require("./whiteList");

const corsOptions = {
  origin: (origin, callback) => {
    console.log("Received origin", origin);
    // console.log(JSON.stringify(whiteList));
    if (whiteList.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true,
  // optionsSuccessStatus: 200,
};

module.exports = corsOptions;
