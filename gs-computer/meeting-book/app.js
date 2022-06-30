var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const jsonfile = require('jsonfile');
const request = require('request')
const file = path.join(__dirname, '/data/meeting.json')

var schedule = require('node-schedule');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});


// 定时任务
schedule.scheduleJob('0 17 10 * * *', async () => {
  let data = await jsonfile.readFile(file)
  createTask(data)
  console.log('scheduleCronstyle:' + new Date());
});

async function createTask(tasks) {
  let list = tasks.filter(item => item.status === 'pending')
  let saveJson = tasks

  let sortName = {}
  list.map(item => {
    if (sortName[item.u]) {
      sortName[item.u].push(item)
    } else {
      sortName[item.u] = [item]
    }
  })

  for (let key in sortName) {
    let cookies = ''
    const curList = sortName[key]
    for (let i = 0; i < curList.length; i++) {
      const cur = curList[i]
      if (!i || !cookies) {
        const JSESSIONID = await createPromiseRequest('http://auth.test.biyao.com/auth/openLogin.do', 'GET', {}, '')
        const userData = `u=${cur.u}&p=${cur.p}&from=meeting.biyao.com`
        const by_auth_tid_test = await createPromiseRequest(
          'http://auth.test.biyao.com/login/login.do?from=meeting.biyao.com',
          'POST',
          {
            'User-Agent': 'PostmanRuntime/7.20.1',
            'Accept-Encoding':' gzip, deflate',
            'Accept': '*/*',
            'Content-Type': 'application/x-www-form-urlencoded',
            'Host': 'auth.test.biyao.com',
            Connection: 'keep-alive'
          },
          userData
        )
        cookies = `${JSESSIONID};${by_auth_tid_test}`
      }
      const bookData = `meetingname=${cur.meetingname}&starttime=${cur.starttime}&startdate=${cur.startdate}&duringtime=${cur.duringtime}&roomid=${cur.roomid}&description=&operation=0`
      const bookRes = await createPromiseRequest(
        'http://meeting.biyao.com/dobookmeeting',
        'POST',
        {
          'Content-Type': 'application/x-www-form-urlencoded',
          'Origin': 'http://meeting.biyao.com',
          'Host': 'meeting.biyao.com',
          'Connection': 'keep-alive',
          'Accept': '*/*',
          'Accept-Encoding': 'gzip, deflate',
          'Accept-Language': 'zh-CN,zh;q=0.9,en;q=0.8,mt;q=0.7,zh-TW;q=0.6,ja;q=0.5',
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/78.0.3904.108 Safari/537.36',
          'X-Requested-With': 'XMLHttpRequest',
          'Cookie': cookies
        },
        bookData
      )
      if (bookRes.indexOf('+.MNN-.') > -1) {
        saveJson = saveJson.map(item => {
          if (item.mId === cur.mId) {
            item.status = 'success'
            item.statusTxt = '预定成功'
          }
          return item
        })
      } else if (bookRes.indexOf('不能同时预定两个以上会议室') > -1) {
        saveJson = saveJson.map(item => {
          if (item.mId === cur.mId) {
            item.status = 'error'
            item.statusTxt = '不能同时预定两个以上会议室'
          }
          return item
        })
      } else if (bookRes.indexOf('能预定3天后的会议') > -1) {
        saveJson = saveJson.map(item => {
          if (item.mId === cur.mId) {
            item.status = 'pending'
            item.statusTxt = '等待'
          }
          return item
        })
      } else {
        saveJson = saveJson.map(item => {
          if (item.mId === cur.mId) {
            item.status = 'error'
            item.statusTxt = '已被别人预定'
          }
          return item
        })
      }
    }
  }

  jsonfile.writeFile(file, saveJson, { spaces: 2, EOL: '\r\n' })
}

const createPromiseRequest = (url, method, headers, data) => {
  return new Promise((resolve, reject) => {
    const params = {
      url: url,
      method: method,
      headers: headers
    }
    if (data) {
      params.body = data
    }
    request(params, function (err, res, body) {
      if (err) {
        reject('获取登录页出错')
      } else {
        if (res.headers['set-cookie']) {
          let cookie = res.headers['set-cookie']
          cookie = cookie[0]
          cookie = cookie.split(';')
          cookie = cookie[0]
          resolve(cookie)
        } else {
          resolve(body)
        }
      }
    })
  })
}

module.exports = app;
