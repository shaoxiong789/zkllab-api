"use strict";

require("babel-polyfill");
require("./server.js");

//
// // var routes = require('./api/routes/todoListRoutes');
//
// app.get('/save', (req, res) => {
//     new User({username:'user'}).save().then(function(doc){
//       console.log(doc)
//     })
//     res.send('hello');
// })
// app.get('/query', (req, res) => {
//     User.findOne({username:'shaoxiong'}).then(function(doc){
//       res.send(doc);
//     })
//     // res.send('hello');
// })
// app.get('/update', (req, res) => {
//     User.findOne({username:'shaoxiong'}).then(function(doc){
//       doc.username = 'shaoxiong'
//       console.log(doc);
//       res.send(doc)
//       doc.save();
//     })
//     // res.send('hello');
// })