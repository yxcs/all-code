var TS = require("./tangshiModel");

/**  插入  */
function insert(params, cb) {
  var ts = new TS(params);
  ts.save(function (err, res) {
    if (err) {
      console.log("Error:" + err);
    } else {
      console.log('---插入成功---');
      cb();
    }
  });
}

function insertMany(params, callback) {
  TS.insertMany(params, function (err, res) {
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
  TS.update(wherestr, updatestr, function(err, res){
    if (err) {
      console.log("Error:" + err);
    }
    else {
      console.log("Res:" + res);
    }
  })
}

function findByIdAndUpdate(id, updatestr) {
  TS.findByIdAndUpdate(id, updatestr, function(err, res){
    if (err) {
      console.log("Error:" + err);
    }
    else {
      console.log("Res:" + res);
    }
  })
}

function del(wherestr) {
  TS.remove(wherestr, function(err, res){
    if (err) {
      console.log("Error:" + err);
    }
    else {
      console.log("Res:" + res);
    }
  })
}

function getByConditions(wherestr, callback) {
  TS.find(wherestr, function(err, res){
    if (err) {
      console.log("Error:" + err);
    }
    else {
      callback(res);
    }
  })
}

function showOption(wherestr, opt, callback){
  TS.find(wherestr, opt, function(err, res){
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
  var skipnum = (curr - 1) * size;
  
  TS.find(wherestr).skip(skipnum).limit(size).sort(sort).exec(function (err, res) {
    if (err) {
      console.log("Error:" + err);
    }
    else {
      console.log("Res:" + res);
      callback();
    }
  })
}

function distinct(callback) {
  TS.distinct('linkTo', function (err, res) {
    callback()
  })
}

module.exports = {
  insert,
  insertMany,
  update,
  findByIdAndUpdate,
  del,
  getByConditions,
  showOption,
  getByPager,
  distinct
}