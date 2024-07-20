const mongoose = require("mongoose");
const DeliverySchema = mongoose.Schema({
  productname: {
    type: String,
  },
  descripsion: {
    type: String,
  },
  productimage: {
    type: [String],
  },
  discountParacentage: {
    type: Number,
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

  sections: {
    type: String,
    required: true,
  },
  Categoryname: {
    type: String,
  },

  item: {
    type: String,
  },

  brandname: {
    type: String,
  },

  price: {
    type: Number,
  },
  selling_price: {
    type: Number,
    required: true,
  },
  ratting: {
    type: Number,
    default: 0,
  },
  reviews: {
    type: String,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },

  createdAt: {
    type: Date,
    default: Date.now(),
  },
});
module.exports = mongoose.model("product", DeliverySchema);
