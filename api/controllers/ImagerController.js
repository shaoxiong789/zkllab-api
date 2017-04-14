import { BaseController } from 'express-common-controller';
import path from 'path';
import images from 'images'
import multiparty from 'multiparty'
import util from 'util'
import qiniu from 'qiniu'
import fs from 'fs'
import qiniuUtil from '../qiniuUtil.js'
import md5 from 'md5'
import Imager from '../model/Imager.js'
import mongoUtil from '../mongoUtil.js'
import result from '../result.js'
var mongoose = require('mongoose');

const resolve = file => path.resolve(__dirname, file)
class ImagerController extends BaseController {
  constructor() {
    super();
  }
  // 上传图片
  upload(){
    // var img = fs.readFileSync(resolve('../../img/brandNewImg.jpeg'));
    // console.log(md5(img));
    // 解析一个文件上传
    var form = new multiparty.Form();
    form.parse(this.req, (err, fields, files) =>{
      if(fields.img){
        var img = fields.img[0];
        var md5id = md5(img).substr(0,24);
        var imgname = `${md5id}.png`
        qiniuUtil.upload(img,imgname,(ret)=>{
          mongoUtil.updateOrSave(Imager,{
            _id:md5id,
            pathname:imgname
          }).then((doc)=>{
            this.res.json(result.success(doc))
          })
        },()=>{
          this.res.json(result.error("上传文件失败"))
        });
      }else{
        this.res.json(result.error("请检查请求参数错误"))
      }
    })

  }
  // 删除图片
  remove(){
    qiniuUtil.remove(this.req.body.pathname,()=>{
      console.log('删除数据库中图片');
      Imager.remove({pathname:this.req.body.pathname},(err,doc)=>{
        this.res.json(result.success(doc))
      })
    },()=>{
      this.res.json(result.error())
    })

  }

  // 图片列表
  list(){
    // {currentPage:null,pageSize:null,total:null}
    mongoUtil.findPageList(Imager.find(),{
      currentPage:this.req.query.currentPage,
      pageSize:this.req.query.pageSize
    }).then((docs)=>{
      this.res.json(result.success(docs))
    })
  }


  card(){
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
      this.res.writeHead('200', {'Content-Type': 'image/jpeg'});
      this.res.end(new Buffer(fields.imgData[0], 'base64'),'binary');
    // });


    var img = images(640,800).fill(255, 255, 255)
    .draw(images(resolve('../../img/WechatIMG482.jpeg')).size(640,500), 0, 0)
    .encode("png", {operation:50})
    console.log(img);

    this.res.writeHead('200', {'Content-Type': 'image/jpeg'});
    this.res.end(img,'binary');
  }
}

export default ImagerController;
