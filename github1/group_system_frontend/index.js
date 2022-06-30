const fs = require('fs');
const Robot = require('wechat4u');
const path = require('path');
const http = require('http');
const express = require('express');
const app = express();
const server = http.createServer(app);
const bodyParser = require('body-parser');
const socket = require('socket.io');
const axios = require('axios');
let io = null;
const config = {
  baseUrl: 'http://api-sjz-gp-sys.mdscj.com',
  port: 80
  // baseUrl: 'http://10.8.85.36',
  // port: 8080
};

let robots = [];

// 代理静态资源
app.use(express.static('./build'));
// 引入bodyparser
// conen-type for application/json
app.use(bodyParser.json());
// content-type for application/x-www-form-urlencode
app.use(bodyParser.urlencoded({extended: false}));

app.post('/getRobotsStatus', (req, res) => {
  let { clientRobots } = req.body;
  let result = [];
  robots.forEach(robot => {
    clientRobots.forEach(clientRobot => {
      console.log(clientRobot.id);
      console.log(robot.robotId);
      if ((clientRobot.id | 0) === (robot.robotId | 0)) {
        clientRobot.status = robot.taskStatus;
        result.push(clientRobot);
      }
    })
  });
  res.send({result});
});

app.get(/^\/(group_manage|activity_page|h5\/\d*)$/, (req, res) => {
  res.sendFile(`${__dirname}/build/index.html`);
});
app.get('/log', (req, res) => {
  let { account } = req.query;
  res.sendFile(`${__dirname}/src/log/${account}.log`);
});

let pushMemberCount = (robot, memberNum) => {
  axios.post(
    // `${devUrl}/group/update`,
    `${config.baseUrl}:${config.port}/group/update`,
    {
      id: robot.groupId,
      avatar: robot.avatar,
      memberNum,
      memberMaxNum: robot.memberMaxNum,
      qrcodeUrl: robot.groupQrcodeUrl,
      invalidDate: robot.invalidDate
    }
  ).then(res => {
    if (res.data.status === 1) {
      console.log('更新群信息成功');
    } else {
      console.log(res.data.details);
    }
  }).catch(e => {
    console.log('更新群信息失败');
    console.log(e.message);
  });
};

server.listen(3000, _ => {
  io = socket(server);
  io.on('connection', currentSocket => {
    let robot = null;
    console.log('新连接开启');
    // 客户端请求绑定或登录机器人时响应
    currentSocket.on('bind-robot', _ => {
      console.log('get bind event');
      robot = new Robot();
      (function (a) {
        let robot = a;
        robot.task = [];
        // 开始定时扫任务表
        robot.intervalId = setInterval(_ => {
          // 通过申请
          let len = robot.task.length;
          if (robot.taskStatus === 'RUNNING' && len > 0) {
            let taskIndex = Math.floor(Math.random() * len);
            let currentTask = robot.task[taskIndex];
            robot.verifyUser(currentTask.userKey, currentTask.userTicket)
            .then(_ => {
              // 调接口获取机器人拉群情况
              axios({
                method: 'get',
                // url: `${devUrl}/robot/checkAddMember/${robot.robotId}`
                url: `${config.baseUrl}:${config.port}/robot/checkAddMember/${robot.robotId}`
              }).then(res => {
                if (res.data.status === 1) {
                  if (res.data.data) {
                    // 发送消息
                    robot.sendMsg(robot.addMemberReply ,currentTask.userKey)
                    .then(_ => {
                      console.log('消息发送成功');
                    })
                    .catch(e => {
                      console.log(e);
                    });
                    // 尝试直接拉入群
                    robot.updateChatroom(
                      robot.groupKey,
                      [currentTask.userKey],
                      'addmember'
                    ).then(_ => {
                      console.log('----拉入群----');
                      axios.post(
                        `${config.baseUrl}:${config.port}/robot/addMemberSuccess`, {
                        // `${devUrl}/robot/addMemberSuccess`, {
                        robotId: robot.robotId,
                        name: currentTask.userNick
                      }).then(res => {
                        if (res.data.status === 1) {
                          console.log('----上报拉人成功----');
                          // 拉人成功之后，从任务列表删除任务
                          robot.task.splice(taskIndex, 1);
                          fs.appendFileSync(
                            `./src/log/${robot.user.NickName}.log`,
                            `${new Date(Date.now()).toLocaleString()} ----成功将好友${currentTask.userNick}拉入群${robot.groupName }----\r\n`
                          );
                        } else {
                          console.log(res.details);
                        }
                      });
                    }).catch(e => {
                      console.log('----直接拉入群失败，尝试发送入群邀请----');
                      robot.updateChatroom(
                        robot.groupKey,
                        [currentTask.userKey],
                        'invitemember'
                      ).then(_ => {
                        console.log('----入群邀请发送成功----');
                        axios.post(`${config.baseUrl}:${config.port}/robot/addMemberSuccess`, {
                        // axios.post(`${devUrl}/robot/addMemberSuccess`, {
                          robotId: robot.robotId,
                          name: currentTask.userNick
                        }).then(res => {
                          if (res.data.status === 1) {
                            console.log('----上报拉人成功----');
                            // 拉人成功之后，从任务列表删除任务
                            robot.task.splice(taskIndex, 1);
                            fs.appendFileSync(
                            `./src/log/${robot.user.NickName}.log`,
                            `${new Date(Date.now()).toLocaleString()} ----成功向好友${currentTask.userNick}发送群${robot.groupName}的入群邀请----\r\n`
                          );
                          } else {
                            console.log(res.details);
                          }
                        });
                      }).catch(e => {
                        console.log('----入群邀请发送失败，群主开启了群验证----');
                        fs.appendFileSync(
                          `./src/log/${robot.user.NickName}.log`,
                          `${new Date(Date.now()).toLocaleString()} ----邀请好友${currentTask.userNick}入群失败----\r\n
                          ${new Date(Date.now()).toLocaleString()} ----${e}----\r\n`
                        );
                      });
                    });
                  } else {
                    console.log('----被限制拉群----');
                    fs.appendFileSync(
                      `./src/log/${robot.user.NickName}.log`,
                      `${new Date(Date.now()).toLocaleString()} ----被限制将好友${currentTask.userNick}拉群，限额已用完----\r\n`
                    );
                  }
                }
              });
            }).catch(e => {
              console.log();
              if (e.toString().indexOf('1205') >= 0) {
                console.log('----通过好友${currentTask.userNick}请求失败，频繁操作，任务暂停，1h后重启任务--------');
                robot.taskStatus = 'FORBIDDEN';
                setTimeout(_ => {
                  if (robot.taskStatus === 'FORBIDDEN') {
                    robot.taskStatus = 'RUNNING';
                  }
                }, 60 * 1000 * 60);
              }
              fs.appendFileSync(
                `./src/log/${robot.user.NickName}.log`,
                `${new Date(Date.now()).toLocaleString()} ----通过好友${currentTask.userNick}请求失败，任务暂停，1h后重启任务----\r\n${new Date(Date.now()).toLocaleString()} ----${e}----\r\n\r\n`
              );
            });
          }
        }, Math.floor(60 + Math.random() * 30) * 1000);
        robot.taskStatus = 'PAUSE';
        robot.on('uuid', uuid => {
          console.log('getuuid');
          currentSocket.emit('send-uuid', {uuid});
        });
        robot.on('user-avatar', avatar => {
          console.log
          currentSocket.emit('avatar', {avatar});
        });
        robot.on('login', _ => {
          currentSocket.emit(
            'login',
            {
              name: robot.user.NickName,
              Uin: robot.user.Uin
            }
          );
        });
        robot.on('logout', _ => {
          let robotIndex = -1;
          robots.some((item, index) => {
            if (item.robotId === robot.robotId) {
              robotIndex = index;
              return true;
            } else {
              return false;
            }
          });
          if (robotIndex >= 0) {
            let deleteRobot = robots.splice(robotIndex, 1);
            clearInterval(deleteRobot.intervalId);
          }
          currentSocket.emit('exit-succeed', {robotId: robot.robotId});
        });
        robot.on('error', e => {
          fs.appendFileSync(
            `./src/log/${robot.user.NickName}.log`,
            `${new Date(Date.now()).toLocaleString()} ${e}\r\n`
          );
        });
        robot.on('contacts-updated', contacts => {
          Object.keys(robot.contacts).forEach(key => {
            if (robot.contacts[key].getDisplayName() === `[群] ${robot.groupName}`) {
              // 每次更新群信息，下发信息到client，由client发送到服务端
              robot.groupId && pushMemberCount(robot, robot.contacts[key].MemberCount);
              robot.groupKey = key;
              if (robot.taskStatus === 'WAITING') {
                robot.taskStatus = 'RUNNING';
                console.log('----绑定成功，任务开启----');
                robots.push(robot);
                currentSocket.emit('bind-success', {robotId: robot.robotId});
                fs.appendFileSync(
                  `./src/log/${robot.user.NickName}.log`,
                  `${new Date(Date.now()).toLocaleString()} ----机器人${robot.user.NickName}成功绑定群${robot.groupName}----\r\n`
                );
              } else if (robot.taskStatus === 'PAUSE') {
                robot.taskStatus = 'WAITING';
              }
            }
          });
        });
        robot.on('message', msg => {
          switch (msg.MsgType) {
            case robot.CONF.MSGTYPE_VERIFYMSG:
              console.log('----好友添加认证----');
              let userKey = msg.RecommendInfo.UserName;
              let userNick = robot.Contact.getDisplayName(msg.RecommendInfo);
              let userTicket = msg.RecommendInfo.Ticket;
              let isInTask = false;
              fs.appendFileSync(
                `./src/log/${robot.user.NickName}.log`,
                `${new Date(Date.now()).toLocaleString()} ----收到好友${userNick}的添加请求----\r\n`
              );
              // 去重处理
              robot.task.some(item => {
                if (item.userKey === userKey) {
                  isInTask = true;
                  return true;
                } else {
                  return false;
                }
              });
              if (!isInTask) {
                robot.task.push({
                  userKey,
                  userNick,
                  userTicket
                });
              }
              break;
            default:
              break;
          }
        });
        robot.start();
      })(robot);
      // 客户端主动退出机器人
      (function (a) {
        let robot = a;
        currentSocket.on('exit-robot', data => {
          console.log('----退出机器人----');
          robots.some((robot, index) => {
            console.log(robot.robotId);
            console.log(data.robotId);
            if (robot.robotId && robot.robotId === data.robotId) {
              robot.stop();
              fs.appendFileSync(
                `./src/log/${robot.user.NickName}.log`,
                `${new Date(Date.now()).toLocaleString()} ----机器人${robot.user.NickName}退出登录----\r\n`
              );
              return true;
            } else {
              return false;
            }
          });
          // data.robotId
        });
      })(robot);
      (function (a) {
        let robot = a;
        currentSocket.on('update-bind', data => {
          console.log('----绑定----');
          console.log(data);
          robot.robotId = data.robotId;
          robot.groupName = data.groupName;
          robot.addMemberReply = data.addMemberReply;
          robot.groupId = data.groupId;
          robot.avatar = data.avatar;
          robot.groupQrcodeUrl = data.groupQrcodeUrl;
          robot.memberMaxNum = data.memberMaxNum;
          robot.invalidDate = data.invalidDate;
          // 信息绑定成功之后，可以开始拉人
          Object.keys(robot.contacts).forEach(key => {
            if (robot.contacts[key].getDisplayName() === `[群] ${robot.groupName}`) {
              let hasRobot = false;
              robot.groupKey = key;
              robot.taskStatus = 'RUNNING';
              console.log('----绑定成功，任务开启----');
              fs.appendFileSync(
                `./src/log/${robot.user.NickName}.log`,
                `${new Date(Date.now()).toLocaleString()} ----机器人${robot.user.NickName}成功绑定群${robot.groupName}----\r\n`
              );
              robot.groupId && pushMemberCount(robot, robot.contacts[key].MemberCount);
              robots.some(item => {
                if (item.robotId === robot.robotId) {
                  hasRobot = true;
                  return true;
                } else {
                  return false;
                }
              });
              if (!hasRobot) {
                robots.push(robot);
              } else {
                robot.taskStatus = ''
              }
              currentSocket.emit('bind-success', {robotId: robot.robotId});
            }
          });
          // 如果遍历完，没有群联系人，则在联系人更新事件中更改状态
          if (robot.taskStatus === 'PAUSE') {
            robot.taskStatus = 'WAITING';
          }
        });
      })(robot);
    });
  });
  console.log('server listen on port 3000');
});

