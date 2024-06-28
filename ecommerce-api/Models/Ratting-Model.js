const mongoose = require("mongoose");
const UserSchema = new mongoose.Schema({
  ratting: {
    type: Number,
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
const User = mongoose.model("ratting", UserSchema);
module.exports = User;
