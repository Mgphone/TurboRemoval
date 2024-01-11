// whiteList.js
// const whiteList = [process.env.MY_URL_FRONT];
// module.exports = whiteList;
// whiteList.js
const whiteList = [
  "http://localhost:3000",
  "http://192.168.1.216:3000",
  `${process.env.MY_URL_FRONT}`,
  "https://liftinglondon.netlify.app/",
  "https://turboremovals.netlify.app/",
];
module.exports = whiteList;
