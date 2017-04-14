'use strict';

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _expressCommonController = require('express-common-controller');

var _expressCommonController2 = _interopRequireDefault(_expressCommonController);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = new _expressCommonController2.default();

router.path = _path2.default.join(__dirname, './controllers');

/** 登录模块 */
// 登录验证
router.get('/login', 'LoginController#login');
// 注册
router.get('/register', 'LoginController#register');

// 生产打卡图片
router.get('/imager/card', 'ImagerController#card');

router.post('/imager/upload', 'ImagerController#upload');

router.post('/imager/remove', 'ImagerController#remove');

router.get('/imager/list', 'ImagerController#list');

module.exports = router.routes();