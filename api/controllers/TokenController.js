import { BaseController } from 'express-common-controller';
class TokenController extends BaseController {
  constructor() {
    super();
  }

  token() {
    var echostr = this.req.query.echostr;
      this.render(echostr)
  }

}

export default TokenController;
