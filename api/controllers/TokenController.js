import { BaseController } from 'express-common-controller';
class TokenController extends BaseController {
  constructor() {
    super();
  }

  token() {
      this.render("helloToken")
  }

}

export default TokenController;
