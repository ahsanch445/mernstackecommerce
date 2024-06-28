const mongoose = require("mongoose");
const DeliverySchema = mongoose.Schema({
  productname: {
    type: String,
    required: true,
  },
  descripsion: {
    type: String,
  },
  productimage: {
    type: [String],

    required: true,
  },
  discountParacentage: {
    type: Number,
    required: true,
  },
  productQuantity: {
    type: Number,
    default: 1,
  },
  Size: {
    type: [String],
    default: ["S", "M", "L", "XL", "2XL"],
  },
  isProductDetails: {
    type: Boolean,
    default: false,
  },
  productSize: {
    type: String,
    default: "S",
  },
  sections: {
    type: String,
    required: true,
  },
  Categoryname: {
    type: String,
    required: true,
  },

  item: {
    type: String,
    required: true,
  },

  brandname: {
    type: String,
    required: true,
  },

  price: {
    type: Number,
    required: true,
  },
  selling_price: {
    type: Number,
    required: true,
  },

  createdAt: {
    type: Date,
    default: Date.now(),
  },
});
module.exports = mongoose.model("product", DeliverySchema);
