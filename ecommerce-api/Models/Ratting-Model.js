const mongoose = require("mongoose");
const { Schema } = mongoose;

// Rating and Review Schema
const ratingReviewSchema = new Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "product",
    required: true,
  },
  rating: {
    type: Number,
    min: 1,
    max: 5,
    required: true,
  },
  review: {
    type: String,
    required: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const RatingReview = mongoose.model("RatingReview", ratingReviewSchema);

module.exports = RatingReview;
