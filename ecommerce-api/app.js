var createError = require("http-errors");
var express = require("express");
var path = require("path");

var cookieParser = require("cookie-parser");
var logger = require("morgan");
require("dotenv").config();
require("./Database/db.Connection");
var users = require("./routes/User");
var auth = require("./routes/Authencation");
const product = require("./routes/Product");
var categories = require("./routes/Categories");
var app = express();
const session = require("express-session");
var cors = require("cors");
const passport = require("passport");

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(
  session({
    resave: false,
    secret: "Ahsan ch ",
    saveUninitialized: false,
  })
);

app.use(passport.initialize());
app.use(passport.session());
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.use(cors());
app.use("/auth", auth);
app.use("/users", users);
app.use("/product", product);
app.use("/categories", categories);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
