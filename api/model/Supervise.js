module.exports =
(function(){
  var mongoose = require('../mongoConnect.js')()
  var Schema = mongoose.Schema,
  ObjectId = Schema.ObjectId;
  var SuperviseSchema = new Schema({
      username     : String,
      password     : String,
      createTime   : Date,
      updateTime   : Date
  });
  var Supervise = mongoose.model('Supervise', SuperviseSchema);
  return Supervise;
})()
