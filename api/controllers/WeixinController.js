import { BaseController } from 'express-common-controller';
import result from '../result.js'
import axios from 'axios';
import News from '../model/News.js'
import mongoUtil from '../mongoUtil.js'
var wx = require("wechat-toolkit");

var config = {
  token: 'helloToken',
  appid: 'wx1461086a049a6883',
  encodingAESKey: 'ELTp5IOAQIaOa9pP99xnqNviw0Ofn1Wy06KHDtqoYqC',
  appSecret: '497429c8c195a0ad3009a3aeaa1a6033',
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
  async getAccessToken() {
    return new Promise((resolve, reject)=>{
      wx.getAccessToken(config.appid, config.appSecret, function(err, access_token){
          if(err){
            reject(err)
            console.log(err);
            return;
          }
          resolve(access_token)
      });
    })
  }

  //获取素材列表
  async mediaList() {
    var accesstoken = await this.getAccessToken();
    this.res.send(accesstoken)
  }

  //图文素材列表接口
  async newsList() {

    var query = {};
    if(this.req.query.title){
      query['content.news_item.title'] = {$regex:this.req.query.title}
    }
    var docs = await mongoUtil.findPageList(News.find(query),{
      currentPage:this.req.query.currentPage,
      pageSize:this.req.query.pageSize
    });
    this.res.json(result.success(docs))
  }

  //图文素材同步接口
  async syncNews() {
    var accesstoken = await this.getAccessToken();
    var docs = await axios.post('https://api.weixin.qq.com/cgi-bin/material/batchget_material?access_token='+accesstoken,{
      "type":"news",
      "offset":Number(this.req.query.pageSize*(this.req.query.currentPage-1)),
      "count":Number(this.req.query.pageSize)
    });

    for(var index in docs.data.item){
      var news = await News.findOne({'media_id':docs.data.item[index].media_id});
      if(!news){
        await News({
          media_id:docs.data.item[index].media_id,
          content:{
            news_item:docs.data.item[index].content.news_item[0]
          },
          create_time:docs.data.item[index].content.create_time,
          update_time:docs.data.item[index].update_time
        }).save()
      }
    }
    var page = {};
    page.currentPage = this.req.query.currentPage;
    page.pageSize = this.req.query.pageSize;
    page.total = docs.data.total_count;
    this.res.json(result.success({
      page:page
    }));
  }

}

export default WeixinController;
