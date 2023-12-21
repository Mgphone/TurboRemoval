const mongoose = require("mongoose");
const closeDatabase = async () => {
  try {
    await mongoose.connection.close();
    console.log("Database is close");
  } catch (error) {
    console.error("Database is not close", error);
  }
};
module.exports = closeDatabase;
