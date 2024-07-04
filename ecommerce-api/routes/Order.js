var express = require("express");
var router = express.Router();

const {
  getAllItems,
  updatePaymentStatus,
  deleteItem,
} = require("../Controller/AdminOrders");

router.get("/admin", getAllItems);
router.post("/admin/update", updatePaymentStatus);
router.post("/admin/delete", deleteItem);
module.exports = router;
