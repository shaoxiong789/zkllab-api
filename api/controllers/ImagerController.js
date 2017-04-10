import { BaseController } from 'express-common-controller';
import path from 'path';
import images from 'images'
import gm from 'gm'
const resolve = file => path.resolve(__dirname, file)
class ImagerController extends BaseController {
  constructor() {
    super();
  }

  card(){
    // var img = fs.readFileSync(resolve('../../img/晚安日签修改.png'));
    // console.log(resolve('../../img/晚安日签修改.png'))
    var self = this;
    gm(resolve('../../img/晚安日签修改.png')).
    toBuffer('PNG',function (err, buffer) {
      if (err) return handle(err);
      console.log('done!');
      self.res.writeHead('200', {'Content-Type': 'image/jpeg'});
      self.res.end(buffer,'binary');
    })
    // var img = images(640,800).fill(255, 255, 255)
    // .draw(images(resolve('../../img/WechatIMG482.jpeg')).size(640,500), 0, 0)
    // .encode("png", {operation:50})
    // console.log(img);
    //写http头部信息
    // this.res.writeHead('200', {'Content-Type': 'image/jpeg'});
    // this.res.end(img,'binary');
  }
}

export default ImagerController;
