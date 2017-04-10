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
router.get('/imager/card', 'ImagerController#card');

module.exports = router.routes();
