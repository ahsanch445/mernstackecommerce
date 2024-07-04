const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // Assuming you have a User model
      required: true,
    },
    productQuantity: {
      type: Number,
      required: true,
    },
    Size: {
      type: [String],
      required: true,
    },

    productSize: {
      type: String,
      required: true,
    },
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
  },
  { timestamps: true }
);

const Product = mongoose.model("myOrders", ProductSchema);

module.exports = Product;
