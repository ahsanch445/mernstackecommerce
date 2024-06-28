var express = require("express");
var router = express.Router();
var { getUserProfile, getAllUser, userUpdate } = require("../Controller/Users");
const Protected = require("../MiddleWares/Protected");

/* GET users listing. */

router.get("/profile", Protected, getUserProfile);
router.get("/alluser", getAllUser);
router.put("/updaterole", userUpdate);

module.exports = router;
