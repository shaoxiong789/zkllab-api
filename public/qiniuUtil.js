'use strict';

module.exports = function () {
  var qiniu = require('qiniu');
  var _request = require('request');

  //需要填写你的 Access Key 和 Secret Key
  qiniu.conf.ACCESS_KEY = 'gHZ8ZjFPyIaFm7VBv2lyNrVqfMnLw0V98YLvFi3-';
  qiniu.conf.SECRET_KEY = 'LzJcf2wurvhnh-1KpY3O9d2fWtDfsdBy0BM65ZWJ';

  //要上传的空间
  var bucket = 'mjq8kmnrfgmwctlxhctljrxmwkwscwvq';

  //构建上传策略函数
  function uptoken(bucket, key) {
    var putPolicy = new qiniu.rs.PutPolicy(bucket + ":" + key);
    return putPolicy.token();
  }

  //构造上传函数
  function uploadFile(uptoken, key, localFile, succeed, error) {
    var extra = new qiniu.io.PutExtra();
    qiniu.io.put(uptoken, key, localFile, extra, function (err, ret) {
      if (!err) {
        // 上传成功， 处理返回值
        // console.log(ret);
        // self.res.send("上传成功");
        succeed(ret);
      } else {
        error();
      }
    });
  };

  return {
    upload: function upload(img, key, succeed, error) {
      var token = uptoken(bucket, key);
      uploadFile(token, key, img, succeed, error);
    },
    remove: function remove(key, succeed, error) {
      //构建bucketmanager对象
      var client = new qiniu.rs.Client();
      //删除资源
      client.remove(bucket, key, function (err, ret) {
        if (!err) {
          // ok
          succeed(ret);
        } else {
          error(err);
        }
      });
    },
    stat: function stat(key, succeed, error) {
      //构建bucketmanager对象
      var client = new qiniu.rs.Client();
      //你要测试的空间， 并且这个key在你空间中存在

      //获取文件信息
      client.stat(bucket, key, function (err, ret) {
        if (!err) {
          succeed(ret);
        } else {
          error(err);
        }
      });
    },

    request: function request(key) {
      return new Promise(function (resolve, reject) {
        _request.get({
          url: 'http://oo8xbcend.bkt.clouddn.com/' + key,
          encoding: null
        }, function (err, resp, body) {
          if (!err) {
            resolve({
              response: resp,
              body: body
            });
          } else {
            reject(err);
          }
          // // console.log(body.toString('base64'));
          // this.res.writeHead(200, {"Content-Type": 'image/jpeg'});
          // this.res.write(body, "binary");
          // this.res.end();
        });
      });
    }
  };
}();