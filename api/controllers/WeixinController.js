import { BaseController } from 'express-common-controller';
var wx = require("wechat-toolkit");

var config = {
  token: 'helloToken',
  appid: 'wx1461086a049a6883',
  encodingAESKey: 'ELTp5IOAQIaOa9pP99xnqNviw0Ofn1Wy06KHDtqoYqC',
  checkSignature: true // 可选，默认为true。由于微信公众平台接口调试工具在明文模式下不发送签名，所以如要使用该测试工具，请将其设置为false
};
class WeixinController extends BaseController {
  constructor() {
    super();
  }

  message() {
    // var echostr = this.req.query.echostr;
    //   this.render(echostr)
    console.log(this.req.query)
    wx.enable_dev_mode('helloToken')(this.req,this.res)
  }

  //创建微信菜单
  createMenu() {
    var obj = {
        "button" : [
            {
                "name" : "我要购买",
                "type" : "click",
                "key" : "BUY"
            },
            {
                "name" : "商务",
                "type" : "click",
                "key" : "BUSINESS"
            },
            {
                "name" : "关于",
                "sub_button" : [
                    {
                        "name" : "官网",
                        "type" : "view",
                        "url" : "http://www.baidu.com/"
                    },
                    {
                        "name" : "团队介绍",
                        "type" : "click",
                        "key" : "ABOUT"
                    }
                ]
            }
        ]
    };

    menus.createMenu(access_token, obj, function(err, error_code, error_message){

        if(err){
            console.log(err);
            return;
        }

        console.log(error_code);
        console.log(error_message)
    });
  }

  //获取公众号access_token
  getAccessToken() {
    return Promise((resolve, reject)=>{
      wx.getAccessToken("app_id", "app_secret", function(err, access_token){

          if(err){
            reject(err)
            console.log(err);
            return;
          }
          resolve(access_token)
          console.log(access_token);
      });
    })

  }

}

export default WeixinController;
