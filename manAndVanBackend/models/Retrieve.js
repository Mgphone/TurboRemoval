const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const RetrieveSchema = Schema(
  {
    date: String,
    quote: Object,
    randomNumber: Number,
    paymentStatus: {
      type: String,
      enum: ["paid", "unpaid", "30percentage", "50percentage"],
      default: "unpaid",
    },
    paymentIntentId: String,
    percentage: Number,
    OutstandingBalance: Number,
    reviewRequest: { type: Boolean, default: false },
  },
  { timestamps: true }
);
// const Retreive = (module.exports = mongoose.model("Retrieve", RetrieveSchema));
module.exports = mongoose.model("Retrieve", RetrieveSchema);
