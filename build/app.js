"use strict";

var _express = require("express");

var _express2 = _interopRequireDefault(_express);

var _morgan = require("morgan");

var _morgan2 = _interopRequireDefault(_morgan);

var _db = require("./config/db");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var app = (0, _express2.default)();
var PORT = 3000;
app.use((0, _morgan2.default)("dev"));
(0, _db.connect)();

app.get("/", function (req, res) {
  return res.json({ msg: "Welcome to Build and Secure Restful APIS" });
});
app.use(function (req, res, next) {
  var error = new Error("Not found");
  error.message = "Invalid route";
  error.status = 404;
  next(error);
});
app.use(function (error, req, res, next) {
  res.status(error.status || 500);
  return res.json({
    error: {
      message: error.message
    }
  });
});

app.listen(PORT, function () {
  console.log("Server is running at PORT http://localhost:" + PORT);
});