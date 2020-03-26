"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.connect = undefined;

var _mongoose = require("mongoose");

var _mongoose2 = _interopRequireDefault(_mongoose);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//mongoose.Promise = global.Promise
var connect = exports.connect = function connect() {
  return _mongoose2.default.connect("mongodb://localhost/music_api");
};