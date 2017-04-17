module.exports =
(function(){
  var mongoose = require('mongoose');

  mongoose.Promise = global.Promise;
  var index = 0;
  mongoose.connect('mongodb://test:test@106.15.45.242:27017/seeker');
  return function(){
    return mongoose;
  }
})()
