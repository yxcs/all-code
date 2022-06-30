var Article = require("./article.js");

function getByPager(){
    
  var pageSize = 5;                   //一页多少条
  var currentPage = 1;                //当前第几页
  var sort = {'logindate':-1};        //排序（按登录时间倒序）
  var condition = {};                 //条件
  var skipnum = (currentPage - 1) * pageSize;   //跳过数
  
  Article.find(condition).skip(skipnum).limit(pageSize).sort(sort).exec(function (err, res) {
      if (err) {
          console.log("Error:" + err);
      }
      else {
          console.log("Res:" + res);
      }
  })
}

function getByPages(page, size, cb){
    
  var pageSize = size || 50;                   //一页多少条
  var currentPage = page || 1;                //当前第几页
  var condition = {};                 //条件
  var skipnum = (currentPage - 1) * pageSize;   //跳过数
  
  Article.find(condition).skip(skipnum).limit(pageSize).exec(function (err, res) {
    if (err) {
      console.log("Error:" + err);
    }
    else {
      if (!!cb && typeof cb === 'function') {
        cb(res);
      }
    }
  })
}

function getCount(cb) {
  Article.count({}, function(err, count) {
    if (!!cb && typeof cb === 'function') {
      cb(count);
    }
  })
}

module.exports = {
  getByPages: getByPages,
  getCount: getCount
}