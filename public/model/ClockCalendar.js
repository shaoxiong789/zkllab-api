'use strict';

//日签
module.exports = function () {
    var mongoose = require('../mongoConnect.js')();
    var Schema = mongoose.Schema;
    // ObjectId = Schema.ObjectId;
    var ClockCalendarSchema = new Schema({
        day: Date,
        morning: {
            bg: String,
            word: {
                text: String,
                fontSize: Number,
                color: String, //默认 #fff
                x: Number, //默认  0
                y: Number
            }
        },
        night: {
            bg: String,
            word: {
                text: String,
                fontSize: Number,
                color: String, //默认 #fff
                x: Number, //默认  0
                y: Number
            }
        },
        updateDate: Date, //打卡时间
        createDate: Date });
    var ClockCalendar = mongoose.model('ClockCalendar', ClockCalendarSchema);
    return ClockCalendar;
}();