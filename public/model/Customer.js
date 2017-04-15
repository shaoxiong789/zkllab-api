'use strict';

module.exports = function () {
    var mongoose = require('../mongoConnect.js')();
    var Schema = mongoose.Schema;
    // ObjectId = Schema.ObjectId;
    var CustomerSchema = new Schema({
        country: String, //国家
        province: String, //省份
        city: String, //城市
        area: String, //地区
        realname: String, //真实姓名
        sex: Number, //性别 0未设置 1.男 2.女
        credits: Number, //总积分
        usableCredits: Number, //可用积分
        mornCredits: Number, //早上打卡的积分
        nightCredits: Number, //晚上打卡的积分
        openid: String, //微信唯一标示
        headUrl: String, //头像url
        friends: Array
    });
    var Customer = mongoose.model('Customer', CustomerSchema);
    return Customer;
}();