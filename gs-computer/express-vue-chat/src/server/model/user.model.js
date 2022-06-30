import User from '../dao/user.schema'
let uuid = require('uuid');

// function uuid() {
//   var s = [];
//   var hexDigits = "0123456789abcdef";
//   for (var i = 0; i < 36; i++) {
//       s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1);
//   }
//   s[14] = "4"; // bits 12-15 of the time_hi_and_version field to 0010
//   s[19] = hexDigits.substr((s[19] & 0x3) | 0x8, 1); // bits 6-7 of the clock_seq_hi_and_reserved to 01
//   s[8] = s[13] = s[18] = s[23] = "-";

//   var uuid = s.join("");
//   return uuid;
// }

function insertUser (params, cb = (() => {})) {
  var user = new User({
    name: params.name,
    password: params.pwd,
    uuid: uuid.v4(),
    loginTime: + new Date(),
    lastMsg: {
      location: '',
      time: ''
    }
  });
  
  user.save(function (err, res) {
    if (err) {
      throw err
    } else {
      cb({
        code: 0,
        msg: '注册成功，自动登录',
        data: {
          name: res.name,
          uuid: res.uuid,
          loginTime: res.loginTime
        }
      })
    }
  });
}

function login(param, cb = () => {}) {
  User.find({name: param.name}, function(err, user) {
    if(err) throw err;
    if (user.length) {
      const current = user[0]
      if (current.password !== param.pwd) {
        cb({
          code: 1,
          msg: '用户名或密码有误',
          data: {}
        })
      } else {
        cb({
          code: 0,
          msg: '登录成功',
          data: {
            name: current.name,
            uuid: current.uuid,
            loginTime: current.loginTime
          }
        })
        current.loginTime = + new Date()
        User.update({_id: current._id} , current, function (err,res) {
          if(err) throw err
          console.log(res)
        });
      }
    } else {
      cb({
        code: 5001,
        msg: '该用户不存在',
        data: {}
      })
    }
  });
}

export {
  insertUser,
  login
}

// User.find({},function (err,users) {
//   if(err) throw err;
//   console.log(users);
// });

// User.find({name:"vidor"}, function(err, user) {
//   if(err) throw err;

//   console.log("Specify User:");
//   console.log(user);
// });

// // ============add=================

// var a = new User({
//   name:"admin2",
//   password:"admin2"
// });

// a.save(function (err) {
//   if(err) throw err;
//   console.log('user saved')
// });

// // ============update=================

// let oldU = {'name':'admin2'};
// let newU = {'name':'adminNew'}
// User.update(oldU,newU,function (err,res) {
//   if(err) throw err;
//   console.log(res);
// });
// // ============delete=================

// User.remove({'name':'admin3'},function (err,res) {
//   if(err) throw err;
//   console.log(res);
// });