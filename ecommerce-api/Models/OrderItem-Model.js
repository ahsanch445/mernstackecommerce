const mongoose = require("mongoose");

const orderItemSchema = new mongoose.Schema({
  productName: String,
  description: String,
  images: [String],
  brandName: String,
  productSize: String,
  sellingPrice: Number,
  productQuantity: Number,
  userId: {
    type: mongoose.Schema.Types.ObjectId,

    ref: "user",
  },
  deliveryStatus: {
    type: String,
    default: "Pending",
  },
});

const orderSchema = new mongoose.Schema(
  {
    items: [orderItemSchema],
    totalPrice: Number,
    stripeSessionId: String,
    orderAddress: {
      type: mongoose.Schema.Types.ObjectId,

      ref: "DeliveryAddres",
    },
    paymentStatus: {
      type: String,
      enum: ["pending", "paid", "failed"],
      default: "pending",
    },
  },
  { timestamps: true }
);

const Order = mongoose.model("Order", orderSchema);

module.exports = Order;
