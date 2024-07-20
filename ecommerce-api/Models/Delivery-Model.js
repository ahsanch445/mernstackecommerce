const mongoose = require("mongoose");
const DeliverySchema = mongoose.Schema({
  fullName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },

  city: {
    type: String,
    required: true,
  },
  country: {
    type: String,
    required: true,
  },
  line1: {
    type: String,
    required: true,
  },
  line2: {
    type: String,
    required: true,
  },
  postal_code: {
    type: String,
    required: true,
  },

  PhoneNumber: {
    type: String,
    required: true,
  },
});
module.exports = mongoose.model("DeliveryAddres", DeliverySchema);
