const mongoose = require("mongoose");
const UserSchema = new mongoose.Schema({
  reviews: {
    type: String,
    required: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "product",
  },

  createdAt: {
    type: Date,
    default: Date.now(),
  },
});
const User = mongoose.model("reviews", UserSchema);
module.exports = User;
