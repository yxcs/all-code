var Link = require("./linksModel");

/**  插入  */
function insert(params) {
  var link = new Link(params);
  link.save(function (err, res) {
    if (err) {
      console.log("Error:" + err);
    } else {
      console.log("Res:" + res);
    }
  });
}

function insertMany(params, callback) {
  Link.insertMany(params, function (err, res) {
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
  Link.update(wherestr, updatestr, function(err, res){
    if (err) {
      console.log("Error:" + err);
    }
    else {
      console.log("Res:" + res);
    }
  })
}

function findByIdAndUpdate(id, updatestr) {
  Link.findByIdAndUpdate(id, updatestr, function(err, res){
    if (err) {
      console.log("Error:" + err);
    }
    else {
      console.log("Res:" + res);
    }
  })
}

function del(wherestr) {
  Link.remove(wherestr, function(err, res){
    if (err) {
      console.log("Error:" + err);
    }
    else {
      console.log("Res:" + res);
    }
  })
}

function getByConditions(wherestr, callback) {
  Link.find(wherestr, function(err, res){
    if (err) {
      console.log("Error:" + err);
    }
    else {
      console.log("Res:" + res);
      callback();
    }
  })
}

function showOption(wherestr, opt, callback){
  Link.find(wherestr, opt, function(err, res){
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
  
  Link.find(wherestr).skip(skipnum).limit(size).sort(sort).exec(function (err, res) {
    if (err) {
      console.log("Error:" + err);
    } else {
      console.log('共获取到  ' + res.length + '  条数据');
      callback(res);
    }
  })
}

function distinct(callback) {
  Link.distinct('linkTo', function (err, res) {
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