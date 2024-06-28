var express = require("express");
var router = express.Router();
var passport = require("passport");
const session = require("express-session");

// Session middleware

var {
  RegisterAuthencation,
  verifyEmail,
  LoginAuthencation,
  googleOuth,
  googleUserProfile,
} = require("../Controller/Authencation");

router.post("/register", RegisterAuthencation);
router.post("/login", LoginAuthencation);
router.get("/verifiy/:id", verifyEmail);
// Route for initiating Google OAuth authentication
router.post("/user", googleOuth);
// Route for handling Google OAuth callback

module.exports = router;
