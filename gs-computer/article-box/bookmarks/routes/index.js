var express = require('express');
const jsonfile = require('jsonfile')
const path = require('path')
var router = express.Router();

var storeData = []
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/bookmark', function(req, res, next) {
  let { page, limit } = req.query
  const file = path.join(__dirname, '../data/data.json')
  let data = jsonfile.readFileSync(file)
  storeData = data
  if (req.query.type) {
    data = data.filter(item => item.type === req.query.type)
  }
  if (req.query.title) {
    data = data.filter(item => item.title.indexOf(req.query.title) > -1)
  }
  let pageStart = (page - 1) * limit
  let pageEnd =  pageStart + (+limit)
  let list = data.slice(pageStart, pageEnd)
  list = list.map((item, idx) => {
    item.id = pageStart + idx
    item.dateTxt = item.date ? new Date(+item.date * 1000) : new Date(1577009270173)
    item.dateTxt = dateToString(item.dateTxt)
    item.sourceTxt = item.source ? '点击查看' : '暂无'
    return item
  })
  res.send({
    code: 0,
    msg: '请求成功',
    count: data.length,
    data: list
  })
});

router.post('/add/bookmark', function(req, res, next) {
  const file = path.join(__dirname, '../data/data.json')
  const body = req.body
  body.date = parseInt(+new Date() / 1000)
  storeData.unshift(body)
  jsonfile.writeFileSync(file, storeData)
  res.send({
    code: 0,
    msg: '添加成功'
  })
})

function dateToString(date){
  var year = date.getFullYear();
  var month =(date.getMonth() + 1).toString();
  var day = (date.getDate()).toString();
  if (month.length == 1) {
      month = "0" + month;
  } 
  if (day.length == 1) {
      day = "0" + day;
  }
  var dateTime = year + "-" + month + "-" + day;
  return dateTime;
}

module.exports = router;
