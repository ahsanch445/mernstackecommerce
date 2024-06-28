const mongoose = require("mongoose");
const UserSchema = new mongoose.Schema({
  fullname: {
    type: String,
  },
  username: {
    type: String,
  },
  email: {
    type: String,
  },
  password: {
    type: String,
  },
  roll: {
    type: String,
    required: true,
    default: "CUSTOMER",
  },
  address: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Address",
    },
  ],
  ratting: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Ratting",
    },
  ],
  review: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Review",
    },
  ],
  isVerified: {
    type: Boolean,
    default: false,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  sub: {
    type: String,
    unique: true,
  },
});
const User = mongoose.model("User", UserSchema);
module.exports = User;
