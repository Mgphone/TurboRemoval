const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const UserSchema = Schema({
  username: { type: String, unique: true, required: true },
  password: { type: String, require: true },
  // uniquecode: { type: String, require: true },
});
module.exports = mongoose.model("User", UserSchema);
