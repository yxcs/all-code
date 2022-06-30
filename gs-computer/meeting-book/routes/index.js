const express = require('express');
const router = express.Router();
const request = require('request');
const path = require('path');
const jsonfile = require('jsonfile');

const file = path.join(__dirname, '../data/meeting.json')
const names = {
  69: '必玉',
  67: '必静',
  73: '必将',
  74: '必然',
  77: '必辉',
  78: '必月',
  79: '必果',
  80: '必行',
  81: '必定',
  82: '培训室',
  83: '极致',
  84: '简单',
  85: '知行合一',
  87: '洽谈室',
  88: '必需',
  89: '会客室'
}
const time = [
  '10:00',
  '10:30',
  '11:00',
  '11:30',
  '13:30',
  '14:00',
  '14:30',
  '15:00',
  '15:30',
  '16:00',
  '16:30',
  '17:00',
  '17:30',
  '18:00',
  '18:30',
  '19:00',
  '19:30',
  '20:00'
]
const during = [0.5, 1]
const statusTxt = {
  pending: '等待',
  doing: '进行中',
  end: '已完成',
  error: '出错'
}

let access_token = ''
let expires_in = ''
let endTime = ''
let orderIdx = 10004

function date2str (val) {
  if (!val) return null
  val = new Date(val)
  let Y = val.getFullYear()
  let M = val.getMonth() + 1
  let D = val.getDate()
  let h = val.getHours()
  let m = val.getMinutes()
  let s = val.getSeconds()
  return [[Y, M > 9 ? M : '0' + M, D > 9 ? D : '0' + D].join('-'), [h > 9 ? h : '0' + h, m > 9 ? m : '0' + m, s > 9 ? s : '0' + s].join(':')].join(' ')
}

/* GET home page. */
router.get('/', async (req, res, next) => {
  let data = await jsonfile.readFile(file)
  data = data instanceof Array ? data : [data]
  res.render('index', { title: 'Express', list: data });
});

router.get('/add/meeting', (req, res, next) => {
  res.render('addMeeting', { title: 'Express' });
});

router.post('/save/json', async (req, res, next) => {
  let data = await jsonfile.readFile(file)
  if (!(data instanceof Array)) {
    data = [data]
  }
  const item = req.body
  item.roomName = names[item.roomid]
  item.preBookDateTxt = date2str(item.preBookTime)
  item.statusTxt = statusTxt[item.status]
  data.push(item)
  await jsonfile.writeFile(file, data, { spaces: 2, EOL: '\r\n' })
  res.send({code: 1, msg: 'success'})
});

router.get('/mp/update', async (req, res, next) => {
  res.render('update', { title: 'Express' });
});

router.post('/mp/save', async (req, res, next) => {
  if (!endTime || endTime < +new Date()) {
    let options = {
    　method: 'GET',
      url: 'https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=wx14f9e0fdf55d8eaa&secret=328544c267281827ebb73972e355f1de',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    };
    let authData = await createPromiseRequest(options)
    authData = typeof authData === 'string' ? JSON.parse(authData) : authData
    if (authData.access_token) {
      access_token = authData.access_token
      expires_in = authData.expires_in
      endTime = +new Date() + expires_in * 1000 - 20 * 60 * 1000
    }
  }
  let content = req.body.content.split('\n')
  content = content.filter(item => !!item)
  const searchData = {
  　method: 'POST',
    url: `https://api.weixin.qq.com/tcb/databasequery?access_token=${access_token}`,
    headers: {
      'Content-Type': 'application/json'
    },
    json: {
      // "access_token": access_token,
      'env': 'develop-094aba',
      'query': `db.collection(\"poems\").where({ author: \"${req.body.author}\", name: \"${req.body.name}\" }).limit(1).get()`
    }
  };
  const searchRes = await createPromiseRequest(searchData)
  let currentPoem = searchRes.data[0]
  currentPoem = typeof currentPoem === 'string' ? JSON.parse(currentPoem) : currentPoem
  const body = {
    "content": content,
    "dynasty": currentPoem.dynasty,
    "poemsId": currentPoem._id,
    "title": currentPoem.name,
    "updateAt": +new Date(),
    "author": currentPoem.author,
    "order": ++orderIdx,
    "createAt": +new Date(),
    "type": "txt",
    "bgType": "color",
    "imgUrl": "cloud://develop-094aba.6465-develop-094aba-1257623689/cover/bg16.jpg",
    "bgColor": "#f00",
    "bgUrl": "cloud://develop-094aba.6465-develop-094aba-1257623689/cover/bg16.jpg",
    "isShow": req.body.recommend
  }
  let params = {
    method: 'POST',
    url: `https://api.weixin.qq.com/tcb/databaseadd?access_token=${access_token}`,
    headers: {
      'Content-Type': 'application/json'
    },
    json: {
      "env": "develop-094aba",
      "query": "db.collection(\"recommend\").add({ data: [" + JSON.stringify(body) + "] })"
    }
  }
  let insertRes = await createPromiseRequest(params)
  console.log(insertRes)
  insertRes = typeof insertRes === 'string' ? JSON.parse(insertRes) : insertRes
  if (!insertRes.errcode) {
    res.send({
      code: 1,
      msg: 'success'
    })
  } else {
    res.send({
      code: 0,
      msg: 'error'
    })
  }
});

const createPromiseRequest = (options) => {
  return new Promise((resolve, reject) => {
    request(options, function (err, res, body) {
      if (err) {
        reject({code: 0, msg: 'error'})
      } else {
        resolve(body)
      }
    })
  })
}

module.exports = router;
