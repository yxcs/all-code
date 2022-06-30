"use strict";

var router = require('koa-router')();

var crypto = require('crypto'); // 全局存储


var access_token = '';
var expires_in = '';
var startTime = '';
var ticket = '';
var ticket_expires_in = '';
var ticketStartTime = '';
router.get('/',
/*#__PURE__*/
regeneratorRuntime.mark(function _callee(next) {
  return regeneratorRuntime.wrap(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return this.render('index', {
            title: 'Hello World Koa!'
          });

        case 2:
        case "end":
          return _context.stop();
      }
    }
  }, _callee, this);
}));
router.get('/MP_verify_wXFlUkKrIuTXQO44.txt',
/*#__PURE__*/
regeneratorRuntime.mark(function _callee2(next) {
  return regeneratorRuntime.wrap(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          this.body = 'wXFlUkKrIuTXQO44';

        case 1:
        case "end":
          return _context2.stop();
      }
    }
  }, _callee2, this);
}));
router.get('/wx',
/*#__PURE__*/
regeneratorRuntime.mark(function _callee3(next) {
  return regeneratorRuntime.wrap(function _callee3$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          _context3.next = 2;
          return this.render('wx', {
            title: 'Hello World Koa!'
          });

        case 2:
        case "end":
          return _context3.stop();
      }
    }
  }, _callee3, this);
}));
router.get('/foo',
/*#__PURE__*/
regeneratorRuntime.mark(function _callee4(next) {
  return regeneratorRuntime.wrap(function _callee4$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          _context4.next = 2;
          return this.render('index', {
            title: 'Hello World foo!'
          });

        case 2:
        case "end":
          return _context4.stop();
      }
    }
  }, _callee4, this);
})); // 验证后端服务器用

function signFn(arr) {
  var sha1 = crypto.createHash('sha1'); //sha1

  var str = arr.sort().join('');
  sha1.update(encodeURI(str)); //添加需要的加密数据

  return sha1.digest('hex'); //加密,(hex表示16进制)
}

router.get('/url_token',
/*#__PURE__*/
regeneratorRuntime.mark(function _callee5(next) {
  var obj, sign;
  return regeneratorRuntime.wrap(function _callee5$(_context5) {
    while (1) {
      switch (_context5.prev = _context5.next) {
        case 0:
          obj = ['server', this.query.timestamp, this.query.nonce];
          sign = signFn(obj);

          if (!(sign == this.query.signature)) {
            _context5.next = 7;
            break;
          }

          _context5.next = 5;
          return this.body = this.query.echostr;

        case 5:
          _context5.next = 9;
          break;

        case 7:
          _context5.next = 9;
          return this.body = '不匹配';

        case 9:
        case "end":
          return _context5.stop();
      }
    }
  }, _callee5, this);
}));
router.get('/fetch_access_token',
/*#__PURE__*/
regeneratorRuntime.mark(function _callee6(next) {
  var res, body;
  return regeneratorRuntime.wrap(function _callee6$(_context6) {
    while (1) {
      switch (_context6.prev = _context6.next) {
        case 0:
          startTime = Date.now();
          _context6.next = 3;
          return kq.get("https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=".concat(wx_config.appId, "&secret=").concat(wx_config.appSecret));

        case 3:
          res = _context6.sent;
          body = JSON.parse(res.body);
          access_token = body.access_token;
          expires_in = body.expires_in;
          _context6.next = 9;
          return this.body = {
            access_token: access_token,
            expires_in: expires_in,
            startTime: startTime
          };

        case 9:
        case "end":
          return _context6.stop();
      }
    }
  }, _callee6, this);
}));
router.get('/jsapi_ticket',
/*#__PURE__*/
regeneratorRuntime.mark(function _callee7(next) {
  var aToken, res, body, ticketData, tBody;
  return regeneratorRuntime.wrap(function _callee7$(_context7) {
    while (1) {
      switch (_context7.prev = _context7.next) {
        case 0:
          if (!(ticket && Date.now() < ticketStartTime + ticket_expires_in * 1000)) {
            _context7.next = 5;
            break;
          }

          _context7.next = 3;
          return this.body = {
            ticket: ticket,
            expires_in: ticket_expires_in,
            startTime: ticketStartTime
          };

        case 3:
          _context7.next = 24;
          break;

        case 5:
          aToken = '';

          if (!(access_token && Date.now() < startTime + expires_in * 1000)) {
            _context7.next = 10;
            break;
          }

          aToken = access_token;
          _context7.next = 15;
          break;

        case 10:
          _context7.next = 12;
          return kq.get("".concat(BASE_URL, "/fetch_access_token"));

        case 12:
          res = _context7.sent;
          body = JSON.parse(res.body);
          aToken = body.access_token;

        case 15:
          ticketStartTime = Date.now();
          _context7.next = 18;
          return kq.get("https://api.weixin.qq.com/cgi-bin/ticket/getticket?access_token=".concat(aToken, "&type=jsapi"));

        case 18:
          ticketData = _context7.sent;
          tBody = JSON.parse(ticketData.body);
          ticket = tBody.ticket;
          ticket_expires_in = tBody.expires_in;
          _context7.next = 24;
          return this.body = {
            ticket: ticket,
            expires_in: ticket_expires_in,
            startTime: ticketStartTime
          };

        case 24:
        case "end":
          return _context7.stop();
      }
    }
  }, _callee7, this);
}));
router.get('/fetch_signature',
/*#__PURE__*/
regeneratorRuntime.mark(function _callee8(next) {
  var res, body, timestamp, jsapi_ticket, nonceStr, url, str, sha1, signature;
  return regeneratorRuntime.wrap(function _callee8$(_context8) {
    while (1) {
      switch (_context8.prev = _context8.next) {
        case 0:
          _context8.next = 2;
          return kq.get("".concat(BASE_URL, "/jsapi_ticket"));

        case 2:
          res = _context8.sent;
          body = JSON.parse(res.body);
          timestamp = moment().unix();
          jsapi_ticket = body.ticket;
          nonceStr = Math.random().toString(36).substr(2);
          url = this.query.url.split('#')[0];
          str = "jsapi_ticket=".concat(jsapi_ticket, "&noncestr=").concat(nonceStr, "&timestamp=").concat(timestamp, "&url=").concat(url);
          sha1 = crypto.createHash('sha1');
          signature = sha1.update(str).digest('hex');
          _context8.next = 13;
          return this.body = {
            appId: wx_config.appId,
            timestamp: timestamp,
            nonceStr: nonceStr,
            signature: signature
          };

        case 13:
        case "end":
          return _context8.stop();
      }
    }
  }, _callee8, this);
}));
module.exports = router; // ---------ctx.query-----------
// signature =>  4fa41c4ec476bb560ec73f5ad4e46dd3c6ee0c14
// nonce =>  681051286
// timestamp =>  1596989024
// echostr =>  7399254313509068513
// ---------ctx.query-----------
// /url_token?signature=4fa41c4ec476bb560ec73f5ad4e46dd3c6ee0c14&echostr=7399254313509068513&timestamp=1596989024&nonce=681051286