const mongoose = require("mongoose");

const orderItemSchema = new mongoose.Schema(
  {
    orderData: {
      type: Array,
      default: [],
      required: true,
    },
    productId: {
      type: String,
      required: true,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "user",
    },
    deliveryStatus: {
      type: String,
      default: "Pending",
    },
    adminOrderId: {
      type: String,
      required: true,
    },
  },

  { timestamps: true }
);

const Order = mongoose.model("myOrder", orderItemSchema);

module.exports = Order;
