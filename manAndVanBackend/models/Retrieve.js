const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const RetrieveSchema = Schema(
  {
    date: String,
    quote: Object,
    number: Number,
  },
  { timestamps: true }
);
// const Retreive = (module.exports = mongoose.model("Retrieve", RetrieveSchema));
module.exports = mongoose.model("Retrieve", RetrieveSchema);
