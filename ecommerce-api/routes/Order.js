var express = require("express");
var router = express.Router();

var {
  getAllYourModels,
  updatePaymentStatus,
  deleteItem,
  allMyOrders,
} = require("../Controller/Orders");

router.get("/admin", getAllYourModels);
router.post("/admin/update", updatePaymentStatus);
router.post("/admin/delete", deleteItem);
router.post("/myorders", allMyOrders);

module.exports = router;
