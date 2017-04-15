//打卡有效时间
module.exports =
(function(){
  var mongoose = require('../mongoConnect.js')()
  var Schema = mongoose.Schema
  // ObjectId = Schema.ObjectId;
  var ClockValidTimeSchema = new Schema({
    morning:{
      startTime   :Number,
      endTime     :Number
    },
    night:{
      startTime   :Number,
      endTime     :Number
    },
    createTime    :Date,
    updateTime    :Date
  });
  var ClockValidTime = mongoose.model('ClockValidTime', ClockValidTimeSchema);
  return ClockValidTime;
})()
