import { BaseController } from 'express-common-controller';
import fs from 'fs';
import path from 'path';
import images from 'images'
const resolve = file => path.resolve(__dirname, file)
class ImagerController extends BaseController {
  constructor() {
    super();
  }

  card(){
    var img = fs.readFileSync(resolve('../../img/晚安日签修改.png'));
    console.log(resolve('../../img/晚安日签修改.png'))
    images(resolve('../../img/晚安日签修改.png'))
    console.log(img);
    //写http头部信息
    this.res.writeHead('200', {'Content-Type': 'image/jpeg'});
    this.res.end(img,'binary');
  }
}

export default ImagerController;
