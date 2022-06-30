var uuidv5 = require('uuid/v5');
var MY_NAMESPACE = '1b671a64-40d5-491e-99b0-da01ff1f3341';

var connectNum = 0;
var socketIds = {};
var chatrooms = {};
var allUsers = [];
var msgList = [];
var gMsgList = [];

function init (io) {
  io.on('connection', function(socket) {
    connectNum ++;
    // 二次登录
    var ip = getIp(socket);
    // var currUser = allUsers.filter(item => item.ip === ip)
    // if (currUser.length) {
    //   socket.emit('loginStatus', true);
    //   socket.emit('userInfo', currUser[0]);
    //   io.emit('userList', allUsers)
    // }
    // 正式内容
    // 登录
    socket.on('login', function (data) {
      var currentUser = {
        username: data.username,
        avatarUrl: data.avatarUrl,
        ip: ip,
        socketId: socket.id,
        order: connectNum,
        connectTime: +new Date()
      }
      allUsers.push(currentUser);
      socket.emit('loginStatus', true);
      socket.emit('userInfo', currentUser);
      io.emit('userList', allUsers);
    })
    // 初始化聊天内容
    socket.on('initMsg', function (data) {
      var list = msgList.filter(item => {
        if ((item.toSocketId === data.toSocketId && item.fromSocketId === data.fromSocketId) ||
          (item.toSocketId === data.fromSocketId && item.fromSocketId === data.toSocketId)) {
            return true
          }
        return false
      })
      socket.emit('getMsgList', list);
    })
    // 一对一聊天信息
    socket.on('msg', function (data) {
      msgList.push(data)
      var list = []
      if (data.toSocketId !== data.fromSocketId) {
        list = msgList.filter(item => {
          if ((item.toSocketId === data.toSocketId && item.fromSocketId === data.fromSocketId) ||
            (item.toSocketId === data.fromSocketId && item.fromSocketId === data.toSocketId)) {
              return true
            }
          return false
        })
        socket.broadcast.to(data.toSocketId).emit('getMsgList', list);
      }
      list = msgList.filter(item => {
        if ((item.toSocketId === data.toSocketId && item.fromSocketId === data.fromSocketId) ||
          (item.toSocketId === data.fromSocketId && item.fromSocketId === data.toSocketId)) {
            return true
          }
        return false
      })
      socket.emit('getMsgList', list);
    })
    // 群聊天
    socket.on('addGroup', function (data) {
      chatrooms[data.roomId] = data
      data.groupMember.forEach(item => {
        if (item === socket.id) {
          socket.emit('chatGroupList', data)
        } else {
          socket.broadcast.to(item).emit('chatGroupList', data)
        }
      });
    })
    // 初始化 群聊 聊天内容
    socket.on('initGroupMsg', function (data) {
      socket.join(data.roomId)
      var list = gMsgList.filter(item => data.roomId === item.toSocketId)
      socket.emit('getMsgList', list);
    })
    // 群聊 聊天信息
    socket.on('gMsg', function (data) {
      gMsgList.push(data);
      var list = gMsgList.filter(item => data.toSocketId === item.toSocketId);
      io.sockets.in(data.toSocketId).emit('getMsgList', list);
    })
  });
}

function getIp (socket) {
  var ip = null
  if (socket.handshake.headers['x-forwarded-for'] != null) {
    ip = socket.handshake.headers['x-forwarded-for'];
  } else {
    ip = socket.handshake.address;
  }
  ip = ip.split(':');
  ip = ip[ip.length - 1];
  return ip;
}

function createAccount (socketId) {
  var nickname = getName();
  var userid = uuidv5(socketId, MY_NAMESPACE);
  socketIds[userid] = socketId;
  connectNum++;
  return {
    nickname: nickname,
    userid: userid,
    socketId: socketId,
    order: connectNum
  }
}

function getName () {
  var familyNames = [
    "赵", "钱", "孙", "李", "周", "吴", "郑", "王", "冯", "陈",
    "褚", "卫", "蒋", "沈", "韩", "杨", "朱", "秦", "尤", "许",
    "何", "吕", "施", "张", "孔", "曹", "严", "华", "金", "魏",
    "陶", "姜", "戚", "谢", "邹", "喻", "柏", "水", "窦", "章",
    "云", "苏", "潘", "葛", "奚", "范", "彭", "郎", "鲁", "韦",
    "昌", "马", "苗", "凤", "花", "方", "俞", "任", "袁", "柳",
    "酆", "鲍", "史", "唐", "费", "廉", "岑", "薛", "雷", "贺",
    "倪", "汤", "滕", "殷", "罗", "毕", "郝", "邬", "安", "常",
    "乐", "于", "时", "傅", "皮", "卞", "齐", "康", "伍", "余",
    "元", "卜", "顾", "孟", "平", "黄", "和", "穆", "萧", "尹"
  ];
  var givenNames = [
    "子璇", "淼", "国栋", "夫子", "瑞堂", "甜", "敏", "尚", "国贤", "贺祥", "晨涛",
    "昊轩", "易轩", "益辰", "益帆", "益冉", "瑾春", "瑾昆", "春齐", "杨", "文昊",
    "东东", "雄霖", "浩晨", "熙涵", "溶溶", "冰枫", "欣欣", "宜豪", "欣慧", "建政",
    "美欣", "淑慧", "文轩", "文杰", "欣源", "忠林", "榕润", "欣汝", "慧嘉", "新建",
    "建林", "亦菲", "林", "冰洁", "佳欣", "涵涵", "禹辰", "淳美", "泽惠", "伟洋",
    "涵越", "润丽", "翔", "淑华", "晶莹", "凌晶", "苒溪", "雨涵", "嘉怡", "佳毅",
    "子辰", "佳琪", "紫轩", "瑞辰", "昕蕊", "萌", "明远", "欣宜", "泽远", "欣怡",
    "佳怡", "佳惠", "晨茜", "晨璐", "运昊", "汝鑫", "淑君", "晶滢", "润莎", "榕汕",
    "佳钰", "佳玉", "晓庆", "一鸣", "语晨", "添池", "添昊", "雨泽", "雅晗", "雅涵",
    "清妍", "诗悦", "嘉乐", "晨涵", "天赫", "玥傲", "佳昊", "天昊", "萌萌", "若萌"
  ];
  var i = parseInt(Math.random() * familyNames.length+1, 10);
  var familyName = familyNames[i];
  var j = parseInt(Math.random() * givenNames.length+1, 10);
  var givenName = givenNames[j];
  var name = familyName + givenName;
  return name;
}


// console.log('a user connected');
//   socket.on('disconnect', function() {
//     console.log('user disconnected');
//   });
//   socket.on('chat message', function(msg) {
//     console.log('message: ' + msg);
//     socket.emit('customEmit', {
//       customEmit: 'customEmit'
//     });
//     socket.broadcast.emit('userJoined', {
//       username: '111',
//       numUsers: 1
//     });
//   });
module.exports = init;