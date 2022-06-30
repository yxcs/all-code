var Cipai = require("./cipaiModel");

/**  插入  */
function insert(params, callback) {
  var cipai = new Cipai(params);
  cipai.save(function (err, res) {
    if (err) {
      console.log("Error:" + err);
    } else {
      console.log("Res:" + res);
    }
    callback();
  });
}

function insertMany(params, callback) {
  Cipai.insertMany(params, function (err, res) {
    if (err) {
      console.log('插入失败');
      callback()
    } else {
      console.log(res.length + '插入成功');
      callback();
    }
  });
}

/**  更新  */
function update(wherestr, updatestr) {
  Cipai.update(wherestr, updatestr, function(err, res){
    if (err) {
      console.log("Error:" + err);
    }
    else {
      console.log("Res:" + res);
    }
  })
}

function findByIdAndUpdate(id, updatestr) {
  Cipai.findByIdAndUpdate(id, updatestr, function(err, res){
    if (err) {
      console.log("Error:" + err);
    }
    else {
      console.log("Res:" + res);
    }
  })
}

function del(wherestr) {
  Cipai.remove(wherestr, function(err, res){
    if (err) {
      console.log("Error:" + err);
    }
    else {
      console.log("Res:" + res);
    }
  })
}

function getByConditions(wherestr, callback) {
  Cipai.find(wherestr, function(err, res){
    if (err) {
      console.log("Error:" + err);
    }
    else {
      callback(res);
    }
  })
}

function showOption(wherestr, opt, callback){
  Cipai.find(wherestr, opt, function(err, res){
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
  
  Cipai.find(wherestr).skip(skipnum).limit(size).sort(sort).exec(function (err, res) {
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
  getByPager,
  insertMany
}