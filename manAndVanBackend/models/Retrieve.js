const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const RetrieveSchema = Schema(
  {
    date: String,
    quote: Object,
    randomNumber: Number,
  },
  { timestamps: true }
);
// const Retreive = (module.exports = mongoose.model("Retrieve", RetrieveSchema));
module.exports = mongoose.model("Retrieve", RetrieveSchema);
