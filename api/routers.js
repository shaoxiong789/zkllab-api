import path from 'path';
import ExpressCommonControllerRouter from 'express-common-controller';
const router = new ExpressCommonControllerRouter();

router.path = path.join(__dirname, './controllers');

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
router.get('/imager/list','ImagerController#list')

//打卡时间设置
router.post('/clock/setting','ClockRecordController#setting')

//获取打卡时间
router.get('/clock/setting','ClockRecordController#getting')

//用户打卡
router.get('/clock/tap','ClockRecordController#tap')

//保存日签设置
router.post('/clock/calendar/save','ClockCalendarController#save')

//获取日签设置
router.get('/clock/calendar/detail','ClockCalendarController#detail')

//获取日签列表
router.get('/clock/calendar/list','ClockCalendarController#list')


//微信设置模块

// 服务器token校验
router.get('/weixin/message','WeixinController#message')

//同步图文消息
router.get('/weixin/sync/news','WeixinController#syncNews')

//获取图文消息分页信息
router.get('/weixin/news/list','WeixinController#newsList')

//获取素材数量
router.get('/weixin/news/count','WeixinController#newsCount')

module.exports = router.routes();
