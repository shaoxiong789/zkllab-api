'use strict';

module.exports = function () {
  var mongoose = require('../../mongopool.js')();
  var Schema = mongoose.Schema,
      ObjectId = Schema.ObjectId;
  var SuperviseSchema = new Schema({
    username: String,
    password: String,
    createTime: Date,
    updateTime: Date
  });
  var Supervise = mongoose.model('Supervise', SuperviseSchema);
  return Supervise;
}();