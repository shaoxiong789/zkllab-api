'use strict';

var mongoose = require('mongoose');
module.exports = {
  updateOrSave: function updateOrSave(Class, json) {
    json._id = mongoose.Types.ObjectId(json._id);
    return this.findById(Class, json._id).then(function (doc) {
      if (doc == null) {
        return new Promise(function (resolve, reject) {
          json.createTime = new Date();
          Class(json).save().then(function (doc) {
            resolve(doc);
          });
        });
      } else {
        return new Promise(function (resolve, reject) {
          json.updateTime = new Date();
          Class.update({ _id: json._id }, { '$set': json }, function () {
            resolve(doc);
          });
        });
      }
    });
  },
  findById: function findById(Class, id) {
    return new Promise(function (resolve, reject) {
      Class.findById(mongoose.Types.ObjectId(id), function (error, doc) {
        if (!error) {
          resolve(doc);
        } else {
          reject(error);
        }
      });
    });
  },
  removeById: function removeById(Class, id) {
    return new Promise(function (resolve, reject) {
      Class.remove({ _id: mongoose.Types.ObjectId(id) }, function (err, result) {
        if (err) {
          reject(err);
        } else {
          resolve(result);
        }
      });
    });
  },
  count: function count(query) {
    return new Promise(function (resolve, reject) {
      query.count().then(function (count) {
        resolve(count);
      });
    });
  },

  //Page {currentPage:null,pageSize:null,total:null}
  findPageList: function findPageList(query, page) {
    return this.count(query).then(function (count) {
      page.total = count;
      return new Promise(function (resolve, reject) {
        query.limit(Number(page.pageSize));
        query.skip(Number(page.pageSize * (page.currentPage - 1)));
        query.model.find(query).then(function (docs) {
          resolve({
            page: page,
            content: docs
          });
        });
      });
    });
  }
};
