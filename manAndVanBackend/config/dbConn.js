const mongoose = require("mongoose");

const connectToDatabase = async () => {
  try {
    await mongoose.connect(process.env.DATABASEURI);
    console.log("You connected to Database");
  } catch (error) {
    console.error("Error Connecting to Database", error);
  }
};
module.exports = connectToDatabase;
