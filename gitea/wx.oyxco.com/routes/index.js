const router = require('koa-router')()
const crypto = require('crypto')

// 全局存储
var access_token = ''
var expires_in = ''
var startTime = ''

var ticket = ''
var ticket_expires_in = ''
var ticketStartTime = ''

router.get('/', function *(next) {
  yield this.render('index', {
    title: 'Hello World Koa!'
  });
});

router.get('/MP_verify_wXFlUkKrIuTXQO44.txt', function *(next) {
  this.body = 'wXFlUkKrIuTXQO44'
});

router.get('/wx', function *(next) {
  yield this.render('wx', {
    title: 'Hello World Koa!'
  });
});
router.get('/foo', function *(next) {
  yield this.render('index', {
    title: 'Hello World foo!'
  });
});

// 验证后端服务器用
function signFn(arr) {
  const sha1  = crypto.createHash('sha1');//sha1
  var str = arr.sort().join('');
  sha1.update(encodeURI(str));//添加需要的加密数据
  return sha1.digest('hex');//加密,(hex表示16进制)
}

router.get('/url_token', function *(next) {
  var obj = ['server', this.query.timestamp, this.query.nonce];
  var sign = signFn(obj);
  if (sign == this.query.signature) {
    yield this.body = this.query.echostr //对比成功原样返回微信请求的echostr 字段
  } else {
    yield this.body = '不匹配'
  }
})

router.get('/fetch_access_token', function *(next) {
  startTime = Date.now()
  var res = yield kq.get(`https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=${wx_config.appId}&secret=${wx_config.appSecret}`)
  var body = JSON.parse(res.body)
  access_token = body.access_token
  expires_in = body.expires_in
  yield this.body = {
    access_token,
    expires_in,
    startTime
  }
})

router.get('/jsapi_ticket', function *(next) {
  if (ticket && Date.now() < (ticketStartTime + ticket_expires_in * 1000)) {
    yield this.body = {
      ticket: ticket,
      expires_in: ticket_expires_in,
      startTime: ticketStartTime
    }
  } else {
    var aToken = ''
    if (access_token && Date.now() < (startTime + expires_in * 1000)) {
      aToken = access_token
    } else {
      var res = yield kq.get(`${BASE_URL}/fetch_access_token`)
      var body = JSON.parse(res.body)
      aToken = body.access_token
    }
    ticketStartTime = Date.now()
    var ticketData = yield kq.get(`https://api.weixin.qq.com/cgi-bin/ticket/getticket?access_token=${aToken}&type=jsapi`)
    var tBody = JSON.parse(ticketData.body)
    ticket = tBody.ticket
    ticket_expires_in = tBody.expires_in
    yield this.body = {
      ticket,
      expires_in: ticket_expires_in,
      startTime: ticketStartTime
    } 
  }
})

router.get('/fetch_signature', function *(next) {
  var res = yield kq.get(`${BASE_URL}/jsapi_ticket`)
  var body = JSON.parse(res.body)
  var timestamp = moment().unix()
  var jsapi_ticket = body.ticket
  let nonceStr = Math.random().toString(36).substr(2);
  var url = this.query.url.split('#')[0]

  var str = `jsapi_ticket=${jsapi_ticket}&noncestr=${nonceStr}&timestamp=${timestamp}&url=${url}`
  var sha1  = crypto.createHash('sha1');
  var signature = sha1.update(str).digest('hex');
  
  yield this.body = {
    appId: wx_config.appId,
    timestamp,
    nonceStr,
    signature
  }
})

module.exports = router


// ---------ctx.query-----------
// signature =>  4fa41c4ec476bb560ec73f5ad4e46dd3c6ee0c14
// nonce =>  681051286
// timestamp =>  1596989024
// echostr =>  7399254313509068513
// ---------ctx.query-----------
// /url_token?signature=4fa41c4ec476bb560ec73f5ad4e46dd3c6ee0c14&echostr=7399254313509068513&timestamp=1596989024&nonce=681051286