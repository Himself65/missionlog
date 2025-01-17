"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.tag = exports.log = exports.LogLevel = exports.Log = void 0;
var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));
/**
 * @author Ray Martone
 * @copyright Copyright (c) 2019-2022 Ray Martone
 * @license MIT
 * @description log adapter that provides level based filtering and tagging
 */
let LogLevel;
exports.LogLevel = LogLevel;
(function (LogLevel) {
  LogLevel["DEBUG"] = "DEBUG";
  LogLevel["TRACE"] = "TRACE";
  LogLevel["INFO"] = "INFO";
  LogLevel["WARN"] = "WARN";
  LogLevel["ERROR"] = "ERROR";
  LogLevel["OFF"] = "OFF";
})(LogLevel || (exports.LogLevel = LogLevel = {}));
var Level;
(function (Level) {
  Level[Level["DEBUG"] = 1] = "DEBUG";
  Level[Level["TRACE"] = 2] = "TRACE";
  Level[Level["INFO"] = 3] = "INFO";
  Level[Level["WARN"] = 4] = "WARN";
  Level[Level["ERROR"] = 5] = "ERROR";
  Level[Level["OFF"] = 6] = "OFF";
})(Level || (Level = {}));
const tag = {};
exports.tag = tag;
class Log {
  constructor() {
    (0, _defineProperty2.default)(this, "_tagToLevel", {});
  }
  init(config, callback) {
    for (const k in config) {
      this._tagToLevel[k] = Level[config[k]] || 1;
    }
    if (callback !== undefined) {
      this._callback = callback;
    }
    for (const key in this._tagToLevel) {
      tag[key] = key;
    }
    return this;
  }
  error(tag, message, ...optionalParams) {
    this.log(Level.ERROR, tag, message, optionalParams);
  }
  warn(tag, message, ...optionalParams) {
    this.log(Level.WARN, tag, message, optionalParams);
  }
  info(tag, message, ...optionalParams) {
    this.log(Level.INFO, tag, message, optionalParams);
  }
  trace(tag, message, ...optionalParams) {
    this.log(Level.TRACE, tag, message, optionalParams);
  }
  debug(tag, message, ...optionalParams) {
    this.log(Level.DEBUG, tag, message, optionalParams);
  }
  log(level, tag, message, optionalParams) {
    var _this$_tagToLevel$tag;
    if (this._callback && level >= ((_this$_tagToLevel$tag = this._tagToLevel[tag]) !== null && _this$_tagToLevel$tag !== void 0 ? _this$_tagToLevel$tag : Level.DEBUG)) {
      this._callback(Level[level], tag, message, optionalParams);
    }
  }
}
exports.Log = Log;
const log = new Log();
exports.log = log;