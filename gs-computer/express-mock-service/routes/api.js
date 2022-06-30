var express = require('express');
var router = express.Router();
var Mock = require('mockjs');
var Random = Mock.Random;

function buildStruct (data, code, message) {
  return {
    code: code || 0,
    message: message || '请求成功',
    data: data
  }
}

router.get('/', function(req, res, next) {
  res.send('Hello World!');
});

router.get('/test', function(req, res, next) {
  var data = Mock.mock({
    'list|10-20': [{
      'id|+1': 1,
      title: Random.title(3, 5),
      time: Random.date(),
      _now: Random.now(),
      email: '@email',
      imgUrl: '@image',
      _float: '@float'
    }],
    page: 1,
    pageSize: 20
  })
  var resData = buildStruct(data)
  res.status(200).send(resData);
});

module.exports = router;
