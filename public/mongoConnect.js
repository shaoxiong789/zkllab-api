'use strict';

module.exports = function () {
  var mongoose = require('mongoose');

  mongoose.Promise = global.Promise;
  var index = 0;
  console.log('初始化' + index);
  mongoose.connect('mongodb://test:test@106.15.45.242:27017/seeker');
  return function () {
    console.log(index++);
    return mongoose;
  };
}();