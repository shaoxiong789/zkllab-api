'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _expressCommonController = require('express-common-controller');

var _ClockRecord = require('../model/ClockRecord.js');

var _ClockRecord2 = _interopRequireDefault(_ClockRecord);

var _ClockValidTime = require('../model/ClockValidTime.js');

var _ClockValidTime2 = _interopRequireDefault(_ClockValidTime);

var _ClockCalendar = require('../model/ClockCalendar.js');

var _ClockCalendar2 = _interopRequireDefault(_ClockCalendar);

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

var ClockRecordController = function (_BaseController) {
  _inherits(ClockRecordController, _BaseController);

  function ClockRecordController() {
    _classCallCheck(this, ClockRecordController);

    return _possibleConstructorReturn(this, (ClockRecordController.__proto__ || Object.getPrototypeOf(ClockRecordController)).call(this));
  }

  //获取当天日签设置


  _createClass(ClockRecordController, [{
    key: 'clockCalendar',
    value: function () {
      var _ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee() {
        var clockCalendar;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.next = 2;
                return _ClockCalendar2.default.findOne({ day: new Date(new Date().format('YYYY-MM-DD')) });

              case 2:
                clockCalendar = _context.sent;
                return _context.abrupt('return', clockCalendar);

              case 4:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function clockCalendar() {
        return _ref.apply(this, arguments);
      }

      return clockCalendar;
    }()

    //用户打卡

  }, {
    key: 'tap',
    value: function () {
      var _ref2 = _asyncToGenerator(regeneratorRuntime.mark(function _callee2() {
        var userId, timesetting, clockCalendar, currentHours, clockType, clockRecordQuery, clockRecord, todayImgRes, imgs, doc;
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                //打卡人
                userId = this.req.body.userId;
                //获取打卡设置的时间

                _context2.next = 3;
                return _ClockValidTime2.default.findOne();

              case 3:
                timesetting = _context2.sent;

                if (!timesetting) {
                  this.res.json(_result2.default.error({
                    msg: "管理员未设置打卡时间"
                  }));
                }
                _context2.next = 7;
                return this.clockCalendar();

              case 7:
                clockCalendar = _context2.sent;


                if (!clockCalendar) {
                  this.res.json(_result2.default.error({
                    msg: "管理员未开放今日打卡"
                  }));
                }

                currentHours = new Date().getHours();
                //得出是上午打卡，还是下午打卡

                //打卡类型 （1:早上，2:晚上）
                //判断是否
                if (timesetting.morning.startTime <= currentHours && timesetting.morning.endTime > currentHours) {
                  clockType = 1;
                } else if (timesetting.night.startTime <= currentHours && timesetting.night.endTime > currentHours) {
                  clockType = 2;
                }
                if (!clockType) {
                  this.res.json(_result2.default.error({
                    msg: "当前不在打卡时间内"
                  }));
                }
                //查询是否已经打过卡
                clockRecordQuery = _ClockRecord2.default.findOne({ clockType: clockType });
                _context2.next = 15;
                return clockRecordQuery.where('clockTime').gte(new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate())).lt(new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate() + 1));

              case 15:
                clockRecord = _context2.sent;
                _context2.next = 18;
                return _qiniuUtil2.default.request('029b0ac9a13e306c66c5ec2d.png');

              case 18:
                todayImgRes = _context2.sent;
                imgs = (0, _images2.default)(todayImgRes.body).encode("png");


                this.res.writeHead(200, { "Content-Type": todayImgRes.response.headers['content-type'] });
                this.res.write(imgs);
                this.res.end();

                return _context2.abrupt('return');

              case 27:
                doc = _context2.sent;


                this.res.json(_result2.default.success(doc));
                _context2.next = 32;
                break;

              case 31:
                this.res.json(_result2.default.error({
                  msg: "你已经打过卡"
                }));

              case 32:
              case 'end':
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function tap() {
        return _ref2.apply(this, arguments);
      }

      return tap;
    }()

    //打卡时间获取

  }, {
    key: 'getting',
    value: function () {
      var _ref3 = _asyncToGenerator(regeneratorRuntime.mark(function _callee3() {
        var doc;
        return regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                _context3.next = 2;
                return _ClockValidTime2.default.findOne();

              case 2:
                doc = _context3.sent;

                this.res.json(_result2.default.success(doc));

              case 4:
              case 'end':
                return _context3.stop();
            }
          }
        }, _callee3, this);
      }));

      function getting() {
        return _ref3.apply(this, arguments);
      }

      return getting;
    }()

    //打卡时间设置

  }, {
    key: 'setting',
    value: function () {
      var _ref4 = _asyncToGenerator(regeneratorRuntime.mark(function _callee4() {
        var bean, doc, response;
        return regeneratorRuntime.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                _context4.next = 2;
                return _ClockValidTime2.default.findOne();

              case 2:
                doc = _context4.sent;

                if (doc) {
                  doc.morning = this.req.body.morning;
                  doc.night = this.req.body.night;
                  doc.updateTime = new Date();
                  bean = doc;
                } else {
                  bean = {
                    morning: this.req.body.morning,
                    night: this.req.body.night,
                    createTime: new Date()
                  };
                }
                _context4.next = 6;
                return _mongoUtil2.default.updateOrSave(_ClockValidTime2.default, bean);

              case 6:
                response = _context4.sent;

                this.res.json(_result2.default.success(response));

              case 8:
              case 'end':
                return _context4.stop();
            }
          }
        }, _callee4, this);
      }));

      function setting() {
        return _ref4.apply(this, arguments);
      }

      return setting;
    }()
  }]);

  return ClockRecordController;
}(_expressCommonController.BaseController);

exports.default = ClockRecordController;