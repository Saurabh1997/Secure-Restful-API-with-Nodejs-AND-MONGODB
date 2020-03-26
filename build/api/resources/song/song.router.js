'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.songRouter = undefined;

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var songRouter = exports.songRouter = _express2.default.Router();
//difference betweeen  express() and express.Router() 
//var app = express() is called, an app object is returned. Think of this as the main app
// In case of express.Router() -- mini app is returned. to create modular, mountable route handlers