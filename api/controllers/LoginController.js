import { BaseController } from 'express-common-controller';
import Supervise from '../model/Supervise.js'
import flowJs from 'asyn-flow'
class LoginController extends BaseController {
  constructor() {
    super();
  }

  async login() {
      await this.render("登录")
  }
  register(){
    var request = this.req;
    var response = this.res;
    //注册管理员账号流程
    flowJs({
      init(){
        this.setNext('验证请求参数是否正确').setNext('验证数据库中是否存在').setNext('注册账号');
        this.next();
      },
      '验证请求参数是否正确':function(){
        if(request.query.username&&request.query.password){
          this.nextData({
            username:request.query.username,
            password:request.query.password
          });
          this.next();
        }else{
          response.json({
            code:-1,
            message:'请求参数不正确'
          })
        }

      },
      '验证数据库中是否存在':function(){
        console.log(8)
        Supervise.findOne({username:'admin'}).then(function(doc){
          response.send(doc);
        })
      },
      '注册账号':function(){
        new Supervise({username:'admin',password:'password'}).save()
        .then(doc =>{
          console.log(doc);
          response.send(doc)
        })
      }
    })
  }
}

export default LoginController;
