var express = require("express");
const StripePayment = require("../Controller/Stripe");
var router = express.Router();

router.post("/create-checkout-session", StripePayment);

module.exports = router;
