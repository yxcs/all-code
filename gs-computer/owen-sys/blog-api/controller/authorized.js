var jwt = require('jsonwebtoken');
var config = require('../config')
var authorized = require('../models/authorized');

function adminLogin (req, res, next) {
  var params = req.body
  if (!params.password) {
    res.send({
      code: 10010,
      msg: '`password`不可空',
      data: []
    })
    return false
  }
  if (!params.account) {
    res.send({
      code: 10010,
      msg: '`account`不可空',
      data: []
    })
    return false
  }
  authorized.selectAdminByAccount(params.account, function (data) {
    if (data.data && data.data.length) {
      var user = data.data[0]
      if(user.password === params.password) {
        var token = jwt.sign(
          {
            name: user.account,
            userId: user.id,
            createAt: +new Date(),
            expireAt: +new Date() + 24 * 60 * 60 * 1000
          },
          config.secretKey,
          {expiresIn: '24h'}
        )
        res.send({
          code: 0,
          msg: '请求成功',
          data: user,
          token: token // 仅登录时有
        })
        return false
      }
    }
    res.send({
      code: 20002,
      msg: '用户名或密码错误',
      data: []
    })
  })
}
function adminRegister (req, res, next) {
  var params = req.body
  if (!params.nickname) {
    res.send({
      code: 10010,
      msg: '`nickname`不可空',
      data: []
    })
    return false
  }
  if (!params.account) {
    res.send({
      code: 10010,
      msg: '`account`不可空',
      data: []
    })
    return false
  }
  if (!params.avatar) {
    params.avatar = 'http://img.oyxco.com/avatar.jpg'
  }
  if (!params.password) {
    res.send({
      code: 10010,
      msg: '`password`不可空',
      data: []
    })
    return false
  }
  authorized.selectAdminCurrentCount(params.account, function (data) {
    if (data.data) {
      res.send({
        code: 20001,
        msg: '用户名称已存在',
        data: []
      })
    } else {
      authorized.insertAdmin([params.nickname, params.avatar, params.account, params.password], function (data) {
        res.send(data)
      })
    }
  })
}
function login (req, res, next) {
  var params = req.body
  if (!params.password) {
    res.send({
      code: 10010,
      msg: '`password`不可空',
      data: []
    })
    return false
  }
  if (!params.account) {
    res.send({
      code: 10010,
      msg: '`account`不可空',
      data: []
    })
    return false
  }
  authorized.selectUserByAccount(params.account, function (data) {
    if (data.data && data.data.length) {
      var user = data.data[0]
      if(user.password === params.password) {
        var token = jwt.sign(
          {
            name: user.account,
            userId: user.id,
            createAt: +new Date(),
            expireAt: +new Date() + 24 * 60 * 60 * 1000
          },
          config.secretKey,
          {expiresIn: '24h'}
        )
        res.send({
          code: 0,
          msg: '请求成功',
          data: user,
          token: token // 仅登录时有
        })
        return false
      }
    }
    res.send({
      code: 20002,
      msg: '用户名或密码错误',
      data: []
    })
  })
}
function register (req, res, next) {
  var params = req.body
  if (!params.nickname) {
    res.send({
      code: 10010,
      msg: '`nickname`不可空',
      data: []
    })
    return false
  }
  if (!params.account) {
    res.send({
      code: 10010,
      msg: '`account`不可空',
      data: []
    })
    return false
  }
  if (!params.avatar) {
    params.avatar = 'http://img.oyxco.com/avatar.jpg'
  }
  if (!params.password) {
    res.send({
      code: 10010,
      msg: '`password`不可空',
      data: []
    })
    return false
  }
  authorized.selectUserCurrentCount(params.account, function (data) {
    if (data.data) {
      res.send({
        code: 20001,
        msg: '用户名称已存在',
        data: []
      })
    } else {
      authorized.insertUser([params.nickname, params.avatar, params.account, params.password], function (data) {
        res.send(data)
      })
    }
  })
}

module.exports = {
  adminLogin: adminLogin,
  adminRegister: adminRegister,
  login: login,
  register: register
}