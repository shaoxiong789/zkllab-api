'use strict';

module.exports = function () {
  var mongoose = require('../mongoConnect.js')();
  var Schema = mongoose.Schema;
  // ObjectId = Schema.ObjectId;
  var ClockRecordSchema = new Schema({
    userId: String, //用户ID
    batchId: String, //连续打卡批次号
    clockTime: Date, //打卡时间
    clockType: Number });
  var ClockRecord = mongoose.model('ClockRecord', ClockRecordSchema);
  return ClockRecord;
}();