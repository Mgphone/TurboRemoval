const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const RetrieveSchema = Schema(
  {
    date: String,
    quote: Object,
    randomNumber: Number,
    paymentStatus: {
      type: String,
      enum: ["paid", "unpaid"],
      default: "unpaid",
    },
    paymentIntentId: String,
  },
  { timestamps: true }
);
// const Retreive = (module.exports = mongoose.model("Retrieve", RetrieveSchema));
module.exports = mongoose.model("Retrieve", RetrieveSchema);
