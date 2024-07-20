const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema(
  {
    orderData: {
      type: Array,
      default: [],
      required: true,
    },
    deliveryAddrss: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,

      ref: "DeliveryAddres",
    },

    deliveryStatus: {
      type: String,
      default: "Pending",
    },
    paymentMethod: {
      type: String,
      required: true,
    },
    quantity: {
      type: Number,
    },

    paymentStatus: {
      type: String,
      default: "Pending",
    },
    totalPrice: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);
const Product = mongoose.model("Adminorders", ProductSchema);

module.exports = Product;
