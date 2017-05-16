module.exports =
(function(){
  var mongoose = require('../mongoConnect.js')()
  var Schema = mongoose.Schema,
  ObjectId = Schema.ObjectId;
  var NewsSchema = new Schema({
      media_id      : String,
      content       : Object,
      create_time   : Number,
      update_time   : Number
  });
  var News = mongoose.model('News', NewsSchema);
  return News;
})()
