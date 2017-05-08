import { BaseController } from 'express-common-controller';
import ClockCalendar from '../model/ClockCalendar.js'
import ClockValidTime from '../model/ClockValidTime.js'
import mongoUtil from '../mongoUtil.js'
import result from '../result.js'
import fs from 'fs'
import path from 'path';
import images from 'images'
import qiniuUtil from '../qiniuUtil.js'
import http from 'http'
import request from 'request'
const resolve = file => path.resolve(__dirname, file)
// 日签日历管理
class ClockCalendarController extends BaseController {
  constructor() {
    super();
  }

  //修改或者保存日签设置
  async save(){

    var clockCalendar = await ClockCalendar.findOne({day:new Date(this.req.body.day)})
    //如果已经设置日签
    if(clockCalendar){
      clockCalendar.day = new Date(this.req.body.day);
      clockCalendar.morning = this.req.body.morning
      clockCalendar.night = this.req.body.night
      clockCalendar.updateDate = new Date()
    }else{
      clockCalendar = {};
      clockCalendar.day = new Date(this.req.body.day)
      clockCalendar.morning = this.req.body.morning
      clockCalendar.night = this.req.body.night
      clockCalendar.createDate = new Date()
    }
    var doc = await mongoUtil.updateOrSave(ClockCalendar,clockCalendar)
    this.res.json(result.success(doc))

  }

  async detail(){
    if(!this.req.query.day){
      this.res.json(result.error({
        msg:"日期不能为空"
      }))
      return;
    }
    var clockCalendar = await ClockCalendar.findOne({day:new Date(this.req.query.day)})
    if(!clockCalendar){
      this.res.json(result.error({
        msg:"数据不存在"
      }))
      return;
    }

    this.res.json(result.success(clockCalendar))
  }

  //获取日签列表
  async list(){
    var startDay = this.req.query.startDay;
    var endDay = this.req.query.endDay;
    var query = ClockCalendar.find();
    var list = await query.where("day").gte(new Date(startDay)).lte(new Date(endDay));
    this.res.json(result.success(list))
  }



}
export default ClockCalendarController;
