const mongoose = require("mongoose");
mongoose
  .connect(process.env.DATABASEURI)
  .then(() => console.log("You connected to Database"))
  .catch((err) => console.log(err));
