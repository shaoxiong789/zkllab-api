'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _expressCommonController = require('express-common-controller');

var _ClockCalendar = require('../model/ClockCalendar.js');

var _ClockCalendar2 = _interopRequireDefault(_ClockCalendar);

var _ClockValidTime = require('../model/ClockValidTime.js');

var _ClockValidTime2 = _interopRequireDefault(_ClockValidTime);

var _mongoUtil = require('../mongoUtil.js');

var _mongoUtil2 = _interopRequireDefault(_mongoUtil);

var _result = require('../result.js');

var _result2 = _interopRequireDefault(_result);

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _images = require('images');

var _images2 = _interopRequireDefault(_images);

var _qiniuUtil = require('../qiniuUtil.js');

var _qiniuUtil2 = _interopRequireDefault(_qiniuUtil);

var _http = require('http');

var _http2 = _interopRequireDefault(_http);

var _request = require('request');

var _request2 = _interopRequireDefault(_request);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var resolve = function resolve(file) {
  return _path2.default.resolve(__dirname, file);
};
// 日签日历管理

var ClockCalendarController = function (_BaseController) {
  _inherits(ClockCalendarController, _BaseController);

  function ClockCalendarController() {
    _classCallCheck(this, ClockCalendarController);

    return _possibleConstructorReturn(this, (ClockCalendarController.__proto__ || Object.getPrototypeOf(ClockCalendarController)).call(this));
  }

  //修改或者保存日签设置


  _createClass(ClockCalendarController, [{
    key: 'save',
    value: function () {
      var _ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee() {
        var clockCalendar, doc;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.next = 2;
                return _ClockCalendar2.default.findOne({ day: new Date(this.req.body.day) });

              case 2:
                clockCalendar = _context.sent;

                //如果已经设置日签
                if (clockCalendar) {
                  clockCalendar.day = new Date(this.req.body.day);
                  clockCalendar.morning = this.req.body.morning;
                  clockCalendar.night = this.req.body.night;
                  clockCalendar.updateDate = new Date();
                } else {
                  clockCalendar = {};
                  clockCalendar.day = new Date(this.req.body.day);
                  clockCalendar.morning = this.req.body.morning;
                  clockCalendar.night = this.req.body.night;
                  clockCalendar.createDate = new Date();
                }
                _context.next = 6;
                return _mongoUtil2.default.updateOrSave(_ClockCalendar2.default, clockCalendar);

              case 6:
                doc = _context.sent;

                this.res.json(_result2.default.success(doc));

              case 8:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function save() {
        return _ref.apply(this, arguments);
      }

      return save;
    }()

    //获取日签列表

  }, {
    key: 'list',
    value: function () {
      var _ref2 = _asyncToGenerator(regeneratorRuntime.mark(function _callee2() {
        var startDay, endDay, query, list;
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                startDay = this.req.query.startDay;
                endDay = this.req.query.endDay;
                query = _ClockCalendar2.default.find();
                _context2.next = 5;
                return query.where("day").gte(new Date(startDay)).lte(new Date(endDay));

              case 5:
                list = _context2.sent;

                this.res.json(_result2.default.success(list));

              case 7:
              case 'end':
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function list() {
        return _ref2.apply(this, arguments);
      }

      return list;
    }()
  }]);

  return ClockCalendarController;
}(_expressCommonController.BaseController);

exports.default = ClockCalendarController;