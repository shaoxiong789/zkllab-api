import { BaseController } from 'express-common-controller';
import ClockRecord from '../model/ClockRecord.js'
import ClockValidTime from '../model/ClockValidTime.js'
import ClockCalendar from '../model/ClockCalendar.js'
import mongoUtil from '../mongoUtil.js'
import result from '../result.js'
import fs from 'fs'
import path from 'path';
import images from 'images'
import qiniuUtil from '../qiniuUtil.js'
import http from 'http'
import request from 'request'
import axios from 'axios';
import WeixinController from './WeixinController.js'
const resolve = file => path.resolve(__dirname, file)
class ClockRecordController extends BaseController {
  constructor() {
    super();
  }

  //获取当天日签设置
  async clockCalendar(){
    var clockCalendar = await ClockCalendar.findOne({day:new Date(new Date().format('YYYY-MM-DD'))})

    return clockCalendar
  }

  //用户打卡
  async tap(){
    //打卡人
    var userId = this.req.body.userId;
    //获取打卡设置的时间
    var timesetting = await ClockValidTime.findOne()
    if(!timesetting){
      this.res.json(result.error({
        msg:"管理员未设置打卡时间"
      }))
    }
    var clockCalendar = await this.clockCalendar()

    if(!clockCalendar){
      this.res.json(result.error({
        msg:"管理员未开放今日打卡"
      }))
    }


    var currentHours = new Date().getHours()
    //得出是上午打卡，还是下午打卡
    var clockType ;//打卡类型 （1:早上，2:晚上）
    //判断是否
    if(timesetting.morning.startTime<=currentHours&&timesetting.morning.endTime>currentHours){
      clockType = 1;
    }else if(timesetting.night.startTime<=currentHours&&timesetting.night.endTime>currentHours){
      clockType = 2;
    }
    if(!clockType){
      this.res.json(result.error({
        msg:"当前不在打卡时间内"
      }))
    }
    //查询是否已经打过卡
    var clockRecordQuery = ClockRecord.findOne({clockType:clockType});
    var clockRecord = await clockRecordQuery.where('clockTime').gte(new Date(new Date().getFullYear(),new Date().getMonth(),new Date().getDate()))
    .lt(new Date(new Date().getFullYear(),new Date().getMonth(),new Date().getDate()+1))

    // var todayImgRes = await qiniuUtil.request('029b0ac9a13e306c66c5ec2d.png');
    //
    // var img = images(todayImgRes.body).encode("png")
    // this.res.writeHead(200, {"Content-Type": todayImgRes.response.headers['content-type']});
    // this.res.write(img);
    // this.res.end();
    //
    // return ;




    // var imgs = images(640,800).fill(255,255,255)
    // .draw(images(resolve('../../img/WechatIMG482.jpeg')).size(640,500), 0, 0)
    //
    // .encode("png", {operation:50})

    var todayImgRes = await qiniuUtil.request('029b0ac9a13e306c66c5ec2d.png');

    var imgs = images(todayImgRes.body).encode("png");

    this.res.writeHead(200, {"Content-Type": todayImgRes.response.headers['content-type']});
    this.res.write(imgs);
    this.res.end();


    return ;

    if(!clockRecord){
      let doc = await mongoUtil.updateOrSave(ClockRecord,{
        userId:userId,
        clockTime:new Date(),
        clockType:clockType
      })

      this.res.json(result.success(doc))
    }else{
      this.res.json(result.error({
        msg:"你已经打过卡"
      }))
    }

  }

  //打卡时间获取
  async getting(){
    var doc = await ClockValidTime.findOne()
    this.res.json(result.success(doc))
  }

  //打卡时间设置
  async setting(){
    var bean;
    var doc =  await ClockValidTime.findOne();
    if(doc){
      console.log(this.req.body)
      doc.morning = this.req.body.morning;
      doc.night   = this.req.body.night;
      doc.updateTime = new Date();
      bean = doc;
    }else{
      bean = {
        morning:this.req.body.morning,
        night:this.req.body.night,
        createTime: new Date()
      }
    }
    var response =await mongoUtil.updateOrSave(ClockValidTime,bean);
    this.res.json(result.success(response));

  }

  //打卡用户信息
  async user(){
    // https://api.weixin.qq.com/cgi-bin/user/info?access_token=ACCESS_TOKEN&openid=OPENID&lang=zh_CN
    var accesstoken = await new WeixinController().getAccessToken();
    var docs = await axios.post('https://api.weixin.qq.com/cgi-bin/user/info?access_token='+accesstoken
    +"&openid="+"o64OHt7dDtvWYm-OWc8j8VMYtrGo");
    this.res.send(result.success(docs.data))
  }

}
export default ClockRecordController;
