module.exports = {
  success(result){

    return {
      code : 1,
      msg  : '操作成功',
      result : result?result:null
    }
  },
  error(code,msg){

    return {
      code : code?code:-1,
      msg  : msg?msg:"操作失败"
    }
  }
}
