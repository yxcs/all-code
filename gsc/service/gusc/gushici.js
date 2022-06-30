var GSC = require("./gushiciModel");

/**  插入  */
function insert(params, cb) {
  var gsc = new GSC(params);
  gsc.save(function (err, res) {
    if (err) {
      console.log("Error:" + err);
    } else {
      console.log('---插入成功---');
      cb();
    }
  });
}

function insertMany(params, callback) {
  GSC.insertMany(params, function (err, res) {
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
  GSC.update(wherestr, updatestr, function(err, res){
    if (err) {
      console.log("Error:" + err);
    }
    else {
      console.log("Res:" + res);
    }
  })
}

function findByIdAndUpdate(id, updatestr) {
  GSC.findByIdAndUpdate(id, updatestr, function(err, res){
    if (err) {
      console.log("Error:" + err);
    }
    else {
      console.log("Res:" + res);
    }
  })
}

function del(wherestr) {
  GSC.remove(wherestr, function(err, res){
    if (err) {
      console.log("Error:" + err);
    }
    else {
      console.log("Res:" + res);
    }
  })
}

function getByConditions(wherestr, callback) {
  GSC.find(wherestr, function(err, res){
    if (err) {
      console.log("Error:" + err);
    }
    else {
      callback(res);
    }
  })
}

function showOption(wherestr, opt, callback){
  GSC.find(wherestr, opt, function(err, res){
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
  
  GSC.find(wherestr).skip(skipnum).limit(size).sort(sort).exec(function (err, res) {
    if (err) {
      console.log("Error:" + err);
    }
    else {
      console.log('共获取到  ' + res.length + '  条数据');
      callback(res);
    }
  })
}

function distinct(callback) {
  GSC.distinct('linkTo', function (err, res) {
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