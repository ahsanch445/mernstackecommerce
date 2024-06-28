const mongoose = require("mongoose");
const tokenSchema = mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  token: {
    type: String,
    required: true,
  },
});
module.exports = mongoose.model("token", tokenSchema);
