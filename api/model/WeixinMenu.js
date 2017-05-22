module.exports =
(function(){
  var mongoose = require('../mongoConnect.js')()
  var Schema = mongoose.Schema,
  ObjectId = Schema.ObjectId;
  var MenuSchema = new Schema({
      menu          : Object,
      createTime   : Date,
      updateTime   : Date
  });
  var WeixinMenu = mongoose.model('WeixinMenu', MenuSchema);
  return WeixinMenu;
})()
