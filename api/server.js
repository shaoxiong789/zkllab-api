var express = require('express');
var bodyParser = require('body-parser')
var app = express();
var routers = require('./routers.js')
var request = require('request')
var http = require('http');
var url = require('url');
require('date-format-lite')

// parse application/json
app.use(bodyParser.json())

app.use(routers)


var server = app.listen(8088,'0.0.0.0' ,function () {

  var host = server.address().address
  var port = server.address().port

  console.log("应用实例，访问地址为 http://%s:%s", host, port)

})


// hojdDOyvyc77BIWTSoHnsXlxYYh0XBpBbtYNJ5ZraVQ
