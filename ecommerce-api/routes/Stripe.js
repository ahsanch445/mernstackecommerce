var express = require("express");
const StripePayment = require("../Controller/Stripe");
// const Webhooks = require("../Controller/Webhooks");
var router = express.Router();
var bodyParse = require("body-parser");
// router.post("/webhook", bodyParse.raw({ type: "*/*" }), Webhooks);

router.post("/create-checkout-session", StripePayment);

module.exports = router;
