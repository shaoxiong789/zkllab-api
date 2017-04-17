'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _expressCommonController = require('express-common-controller');

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _images = require('images');

var _images2 = _interopRequireDefault(_images);

var _multiparty = require('multiparty');

var _multiparty2 = _interopRequireDefault(_multiparty);

var _util = require('util');

var _util2 = _interopRequireDefault(_util);

var _qiniu = require('qiniu');

var _qiniu2 = _interopRequireDefault(_qiniu);

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _qiniuUtil = require('../qiniuUtil.js');

var _qiniuUtil2 = _interopRequireDefault(_qiniuUtil);

var _md = require('md5');

var _md2 = _interopRequireDefault(_md);

var _Imager = require('../model/Imager.js');

var _Imager2 = _interopRequireDefault(_Imager);

var _mongoUtil = require('../mongoUtil.js');

var _mongoUtil2 = _interopRequireDefault(_mongoUtil);

var _result = require('../result.js');

var _result2 = _interopRequireDefault(_result);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var mongoose = require('mongoose');

var resolve = function resolve(file) {
  return _path2.default.resolve(__dirname, file);
};

var ImagerController = function (_BaseController) {
  _inherits(ImagerController, _BaseController);

  function ImagerController() {
    _classCallCheck(this, ImagerController);

    return _possibleConstructorReturn(this, (ImagerController.__proto__ || Object.getPrototypeOf(ImagerController)).call(this));
  }
  // 上传图片


  _createClass(ImagerController, [{
    key: 'upload',
    value: function upload() {
      var _this2 = this;

      // var img = fs.readFileSync(resolve('../../img/brandNewImg.jpeg'));
      // console.log(md5(img));
      // 解析一个文件上传
      var form = new _multiparty2.default.Form();
      form.parse(this.req, function (err, fields, files) {
        if (fields.img) {
          var img = fields.img[0];
          var md5id = (0, _md2.default)(img).substr(0, 24);
          var imgname = md5id + '.png';
          _qiniuUtil2.default.upload(img, imgname, function (ret) {
            _mongoUtil2.default.updateOrSave(_Imager2.default, {
              _id: md5id,
              pathname: imgname
            }).then(function (doc) {
              _this2.res.json(_result2.default.success(doc));
            });
          }, function () {
            _this2.res.json(_result2.default.error({
              msg: "上传文件失败"
            }));
          });
        } else {
          _this2.res.json(_result2.default.error({
            msg: "请检查请求参数"
          }));
        }
      });
    }
    // 删除图片

  }, {
    key: 'remove',
    value: function remove() {
      var _this3 = this;

      _qiniuUtil2.default.remove(this.req.body.pathname, function () {
        console.log('删除数据库中图片');
        _Imager2.default.remove({ pathname: _this3.req.body.pathname }, function (err, doc) {
          _this3.res.json(_result2.default.success(doc));
        });
      }, function () {
        _this3.res.json(_result2.default.error());
      });
    }

    // 图片列表

  }, {
    key: 'list',
    value: function list() {
      var _this4 = this;

      // {currentPage:null,pageSize:null,total:null}
      _mongoUtil2.default.findPageList(_Imager2.default.find(), {
        currentPage: this.req.query.currentPage,
        pageSize: this.req.query.pageSize
      }).then(function (docs) {
        _this4.res.json(_result2.default.success(docs));
      });
    }
  }, {
    key: 'card',
    value: function card() {
      // var img = fs.readFileSync(resolve('../../img/晚安日签修改.png'));
      // console.log(resolve('../../img/晚安日签修改.png'))
      // var self = this;
      // gm(200, 400, "#ddff99f3")
      // .drawText(10, 50, "from scratch")
      // .drawText(30, 700, "GMagick!")
      // .toBuffer('PNG',function (err, buffer) {
      //   if (err) return console.log(err);
      //   console.log('done!');
      //   self.res.writeHead('200', {'Content-Type': 'image/jpeg'});
      //   self.res.end(buffer,'binary');
      // })

      // var form = new multiparty.Form();
      // var self = this;
      // form.parse(this.req,(err, fields, files)=>{
      //
      this.res.writeHead('200', { 'Content-Type': 'image/jpeg' });
      this.res.end(new Buffer(fields.imgData[0], 'base64'), 'binary');
      // });


      var img = (0, _images2.default)(640, 800).fill(255, 255, 255).draw((0, _images2.default)(resolve('../../img/WechatIMG482.jpeg')).size(640, 500), 0, 0).encode("png", { operation: 50 });
      console.log(img);

      this.res.writeHead('200', { 'Content-Type': 'image/jpeg' });
      this.res.end(img, 'binary');
    }
  }]);

  return ImagerController;
}(_expressCommonController.BaseController);

exports.default = ImagerController;