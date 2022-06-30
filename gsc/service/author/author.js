var Author = require("./authorModel");

/**  插入  */
function insert(params, cb) {
  var author = new Author(params);
  author.save(function (err, res) {
    if (err) {
      console.log("Error:" + err);
    } else {
      console.log('一条数据插入成功');
      cb();
    }
  });
}

/**  更新  */
function update(wherestr, updatestr) {
  Author.update(wherestr, updatestr, function(err, res){
    if (err) {
      console.log("Error:" + err);
    }
    else {
      console.log("Res:" + res);
    }
  })
}

function findByIdAndUpdate(id, updatestr) {
  Author.findByIdAndUpdate(id, updatestr, function(err, res){
    if (err) {
      console.log("Error:" + err);
    }
    else {
      console.log("Res:" + res);
    }
  })
}

function del(wherestr) {
  Author.remove(wherestr, function(err, res){
    if (err) {
      console.log("Error:" + err);
    }
    else {
      console.log("Res:" + res);
    }
  })
}

function getByConditions(wherestr, callback) {
  Author.find(wherestr, function(err, res){
    if (err) {
      console.log("Error:" + err);
    }
    else {
      console.log('共' + res.length + '条');
      callback(res);
    }
  })
}

function showOption(wherestr, opt, callback){
  Author.find(wherestr, opt, function(err, res){
    if (err) {
      console.log("Error:" + err);
    }
    else {
      console.log("Res:" + res);
      callback();
    }
  })
}

function getByPager(size, curr, wherestr, sort, callback){
  // var sort = {'logindate':-1};        //排序（按登录时间倒序）
  var skipnum = (curr - 1) * size;
  
  Author.find(wherestr).skip(skipnum).limit(size).sort(sort).exec(function (err, res) {
    if (err) {
      console.log("Error:" + err);
    }
    else {
      console.log("Res:" + res);
      callback();
    }
  })
}

module.exports = {
  insert,
  update,
  findByIdAndUpdate,
  del,
  getByConditions,
  showOption,
  getByPager
}