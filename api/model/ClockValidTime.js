//打卡有效时间(用于管理员设置)
module.exports =
(function(){
  var mongoose = require('../mongoConnect.js')()
  var Schema = mongoose.Schema
  // ObjectId = Schema.ObjectId;
  var ClockValidTimeSchema = new Schema({
    morning:{
      startTime   :String,
      endTime     :String
    },
    night:{
      startTime   :String,
      endTime     :String
    },
    createTime    :Date,
    updateTime    :Date
  });
  var ClockValidTime = mongoose.model('ClockValidTime', ClockValidTimeSchema);
  return ClockValidTime;
})()
