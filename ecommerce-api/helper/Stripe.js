const Stripe = require("stripe");
var stripe = Stripe(
  "sk_test_51PWx9YCdwAPgZ0JngOazR8JDeFtKHnwDiva2ZnUhEGw4r5dfevyVMgU5Crcph18vUIiATSTAW1fIZG4oLNBIScUM006INJNogn"
);
module.exports = stripe;
