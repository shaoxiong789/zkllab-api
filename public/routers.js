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
// router.get('/imager/card', 'ImagerController#card');

//上传图片
router.post('/imager/upload', 'ImagerController#upload');

//删除图片
router.post('/imager/remove', 'ImagerController#remove');

//图片资源列表
router.get('/imager/list', 'ImagerController#list');

//打卡时间设置
router.post('/clock/setting', 'ClockRecordController#setting');

//获取打卡时间
router.get('/clock/setting', 'ClockRecordController#getting');

//用户打卡
router.get('/clock/tap', 'ClockRecordController#tap');

//保存日签设置
router.post('/clock/calendar/save', 'ClockCalendarController#save');

//获取日签列表
router.get('/clock/calendar/list', 'ClockCalendarController#list');

//微信设置模块

// 服务器token校验
router.get('/token', 'TokenController#token');

module.exports = router.routes();