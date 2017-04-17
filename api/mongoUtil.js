var mongoose = require('mongoose');
module.exports = {
  updateOrSave(Class,json){
    json._id = mongoose.Types.ObjectId(json._id)
    return this.findById(Class,json._id)
    .then((doc)=>{
      if(doc==null){
        return new Promise((resolve, reject)=> {
          json.createTime = new Date()
          Class(json).save().then((doc)=>{
            resolve(doc)
          })
        })
      }else{
        return new Promise((resolve, reject)=> {
          json.updateTime = new Date()
          Class.update({_id:json._id},{'$set':json},()=>{
            resolve(doc)
          })
        })
      }
    })
  },
  findById(Class,id){
    return new Promise((resolve, reject)=> {
      Class.findById(mongoose.Types.ObjectId(id),(error,doc)=> {
        if(!error){
          resolve(doc);
        }else{
          reject(error);
        }
      })
    });
  },
  removeById(Class,id){
    return new Promise((resolve, reject)=> {
      Class.remove({_id:mongoose.Types.ObjectId(id)},function(err,result){
        if(err){
          reject(err)
        }else{
          resolve(result)
        }
      });
    })
  },
  count(query){
    return new Promise((resolve, reject)=> {
      query.count().then((count)=>{
        resolve(count)
      })
    })
  },
  //Page {currentPage:null,pageSize:null,total:null}
  findPageList(query,page){
    return this.count(query).then((count)=>{
      page.total = count;
      return new Promise((resolve, reject)=> {
        query.limit(Number(page.pageSize))
        query.skip(Number(page.pageSize*(page.currentPage-1)))
        query.model.find(query).then((docs)=>{
          resolve({
            page:page,
            content:docs
          })
        })
      })
    })
  }
}
