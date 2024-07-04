const mongoose = require("mongoose");
const DeliverySchema = mongoose.Schema({
  FirstName: {
    type: String,
    required: true,
  },
  LastName: {
    type: String,
    required: true,
  },
  Address: {
    type: String,
    required: true,
  },
  Zip: {
    type: Number,
    required: true,
  },
  State: {
    type: String,
    required: true,
  },
  PhoneNumber: {
    type: String,
    required: true,
  },
  User: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
  },
});
module.exports = mongoose.model("DeliveryAddres", DeliverySchema);
