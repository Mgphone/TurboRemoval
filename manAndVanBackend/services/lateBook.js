//7200000 in milli second

const getUkTime = require("../utils/getuktime");

const fetchUkTime = async () => {
  try {
    const result = await getUkTime();
    return result;
  } catch (error) {
    console.error("Error", error.message);
    throw error;
  }
};

let currentTime; // Declare currentTime at the top level

const init = async () => {
  try {
    currentTime = await fetchUkTime();
  } catch (error) {
    console.error("Error", error.message);
    throw error;
  }
};

const lateBook = (date) => {
  try {
    if (!currentTime) {
      console.error("Error: Current time not initialized");
      return false;
    }
    const timeDifference = new Date(date) - new Date(currentTime);
    if (timeDifference < 7200000) {
      //that is milli second and within 2 hours
      return true;
    }
    return false;
  } catch (error) {
    console.error("Error", error.message);
    throw error;
  }
};

init();

module.exports = lateBook;
