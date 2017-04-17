'use strict';

module.exports = function () {
    var mongoose = require('../mongoConnect.js')();
    var Schema = mongoose.Schema,
        ObjectId = Schema.ObjectId;
    var ImagerSchema = new Schema({
        _id: ObjectId,
        pathname: String, //图片name
        createTime: Date,
        updateTime: Date,
        size: Number,
        type: String
    });
    var Imager = mongoose.model('Imager', ImagerSchema);
    return Imager;
}();