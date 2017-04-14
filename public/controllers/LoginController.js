'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _expressCommonController = require('express-common-controller');

var _Supervise = require('../model/Supervise.js');

var _Supervise2 = _interopRequireDefault(_Supervise);

var _asynFlow = require('asyn-flow');

var _asynFlow2 = _interopRequireDefault(_asynFlow);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var LoginController = function (_BaseController) {
  _inherits(LoginController, _BaseController);

  function LoginController() {
    _classCallCheck(this, LoginController);

    return _possibleConstructorReturn(this, (LoginController.__proto__ || Object.getPrototypeOf(LoginController)).call(this));
  }

  _createClass(LoginController, [{
    key: 'login',
    value: function () {
      var _ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee() {
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.next = 2;
                return this.render("登录");

              case 2:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function login() {
        return _ref.apply(this, arguments);
      }

      return login;
    }()
  }, {
    key: 'register',
    value: function register() {
      var request = this.req;
      var response = this.res;
      //注册管理员账号流程
      (0, _asynFlow2.default)({
        init: function init() {
          this.setNext('验证请求参数是否正确').setNext('验证数据库中是否存在').setNext('注册账号');
          this.next();
        },

        '验证请求参数是否正确': function _() {
          if (request.query.username && request.query.password) {
            this.nextData({
              username: request.query.username,
              password: request.query.password
            });
            this.next();
          } else {
            response.json({
              code: -1,
              message: '请求参数不正确'
            });
          }
        },
        '验证数据库中是否存在': function _() {
          console.log(8);
          _Supervise2.default.findOne({ username: 'admin' }).then(function (doc) {
            response.send(doc);
          });
        },
        '注册账号': function _() {
          new _Supervise2.default({ username: 'admin', password: 'password' }).save().then(function (doc) {
            console.log(doc);
            response.send(doc);
          });
        }
      });
    }
  }]);

  return LoginController;
}(_expressCommonController.BaseController);

exports.default = LoginController;