import { BaseController } from 'express-common-controller';
var wx = require("wechat-toolkit");

var config = {
  token: 'helloToken',
  appid: 'wx1461086a049a6883',
  encodingAESKey: 'ELTp5IOAQIaOa9pP99xnqNviw0Ofn1Wy06KHDtqoYqC',
  checkSignature: true // 可选，默认为true。由于微信公众平台接口调试工具在明文模式下不发送签名，所以如要使用该测试工具，请将其设置为false
};
class TokenController extends BaseController {
  constructor() {
    super();
  }

  token() {
    // var echostr = this.req.query.echostr;
    //   this.render(echostr)
    wx.enable_dev_mode('helloToken')(this.req,this.res)
  }

}

export default TokenController;
