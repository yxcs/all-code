var db = require('../db/index');

// 前台用户管理
function insertUser (data, cb) {
  if (!(data instanceof Array) || data.length !== 4) {
    cb({
      code: 10010,
      msg: '插入用户信息错误',
      data: []
    })
    return false
  }
  db.query('INSERT INTO user(nickname, avatar, account, password) VALUES(?,?,?,?)', data, function (res, fields) {
    if(res.data.insertId) {
      res.data = {
        userId: res.data.insertId
      }
      cb(res)
    } else {
      cb({
        code: 10003,
        msg: '插入用户信息失败',
        data: []
      })
    }
  })
}

function selectUserByAccount (account, cb) {
  db.query('SELECT * FROM user WHERE account = ?', account, function (res, fields) {
    cb(res)
  })
}

function selectUserCurrentCount (account, cb) {
  db.query('SELECT COUNT(id) FROM user WHERE account = ?', account, function (res, fields) {
    res.data = res.data[0]['COUNT(id)']
    cb(res)
  })
}

// 后端用户管理
function insertAdmin (data, cb) {
  if (!(data instanceof Array) || data.length !== 4) {
    cb({
      code: 10010,
      msg: '插入用户信息错误',
      data: []
    })
    return false
  }
  db.query('INSERT INTO admin(nickname, avatar, account, password) VALUES(?,?,?,?)', data, function (res, fields) {
    if(res.data.insertId) {
      res.data = {
        userId: res.data.insertId
      }
      cb(res)
    } else {
      cb({
        code: 10003,
        msg: '插入用户信息失败',
        data: []
      })
    }
  })
}

function selectAdminByAccount (account, cb) {
  db.query('SELECT * FROM admin WHERE account = ?', account, function (res, fields) {
    cb(res)
  })
}

function selectAdminCurrentCount (account, cb) {
  db.query('SELECT COUNT(id) FROM admin WHERE account = ?', account, function (res, fields) {
    res.data = res.data[0]['COUNT(id)']
    cb(res)
  })
}

module.exports = {
  insertUser: insertUser,
  selectUserByAccount: selectUserByAccount,
  selectUserCurrentCount: selectUserCurrentCount,

  insertAdmin: insertAdmin,
  selectAdminByAccount: selectAdminByAccount,
  selectAdminCurrentCount: selectAdminCurrentCount
}