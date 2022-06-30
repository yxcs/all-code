const request = require('request')


request('http://auth.test.biyao.com/auth/openLogin.do', function (err, res, body) {
  // console.log(err)
  if (err) {
    console.log('出错误了')
  } else {
    let cookie = res.headers['set-cookie']
    cookie = cookie[0]
    cookie = cookie.split(';')
    const JSESSIONID = cookie[0]
    doLogin(JSESSIONID)
  }
})

function doLogin (JSESSIONID) {
  request({
    url: 'http://auth.test.biyao.com/login/login.do?from=meeting.biyao.com',
    method: 'POST',
    headers: {
      'User-Agent': 'PostmanRuntime/7.20.1',
      'Accept-Encoding':' gzip, deflate',
      'Accept': '*/*',
      'Content-Type': 'application/x-www-form-urlencoded',
      'Host': 'auth.test.biyao.com',
      Connection: 'keep-alive'
    },
    body: 'u=yuxiaochao@idstaff.com&p=loveBY@2018&from=meeting.biyao.com'
  }, function (err, res, body) {
    if (err) {
      console.log('登录出错')
    } else {
      let cookie = res.headers['set-cookie']
      cookie = cookie[0]
      cookie = cookie.split(';')
      const by_auth_tid_test = cookie[0]
      bookMeeting(JSESSIONID, by_auth_tid_test)
    }
  })
}

function bookMeeting (JSESSIONID, by_auth_tid_test) {
  const cookie = JSESSIONID + ';' + by_auth_tid_test
  request({
    url: 'http://meeting.biyao.com/dobookmeeting',
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Origin': 'http://meeting.biyao.com',
      'Host': 'meeting.biyao.com',
      'Connection': 'keep-alive',
      'Accept': '*/*',
      'Accept-Encoding': 'gzip, deflate',
      'Accept-Language': 'zh-CN,zh;q=0.9,en;q=0.8,mt;q=0.7,zh-TW;q=0.6,ja;q=0.5',
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/78.0.3904.108 Safari/537.36',
      'X-Requested-With': 'XMLHttpRequest',
      'Cookie': cookie
    },
    body: 'meetingname=CR&starttime=19:00&startdate=2019-12-13&duringtime=1&roomid=78&description=&operation=0'
  }, function (err, res, body) {
    if (err) {
      console.log('预定出错')
    } else {
      console.log(body)
    }
  })
}
