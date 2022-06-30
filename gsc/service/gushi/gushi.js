var GuShi = require("./gushiModel");

/**  插入  */
function insert(params, cb) {
  var gs = new GuShi(params);
  gs.save(function (err, res) {
    if (err) {
      console.log("Error:" + err);
    } else {
      console.log('---插入成功---');
      cb();
    }
  });
}

function insertMany(params, callback) {
  GuShi.insertMany(params, function (err, res) {
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
  GuShi.update(wherestr, updatestr, function(err, res){
    if (err) {
      console.log("Error:" + err);
    }
    else {
      console.log("Res:" + res);
    }
  })
}

function findByIdAndUpdate(id, updatestr) {
  GuShi.findByIdAndUpdate(id, updatestr, function(err, res){
    if (err) {
      console.log("Error:" + err);
    }
    else {
      console.log("Res:" + res);
    }
  })
}

function del(wherestr) {
  GuShi.remove(wherestr, function(err, res){
    if (err) {
      console.log("Error:" + err);
    }
    else {
      console.log("Res:" + res);
    }
  })
}

function getByConditions(wherestr, callback) {
  GuShi.find(wherestr, function(err, res){
    if (err) {
      console.log("Error:" + err);
    }
    else {
      callback(res);
    }
  })
}

function showOption(wherestr, opt, callback){
  GuShi.find(wherestr, opt, function(err, res){
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
  
  GuShi.find(wherestr).skip(skipnum).limit(size).sort(sort).exec(function (err, res) {
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
  GuShi.distinct('linkTo', function (err, res) {
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