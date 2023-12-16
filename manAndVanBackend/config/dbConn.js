const mongoose = require("mongoose");
mongoose
  .connect(process.env.DATABASEURI)
  .then(() => console.log("You connected to Databse"))
  .catch((err) => console.log(err));
