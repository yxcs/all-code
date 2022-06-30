var createDataStructure = function (data, code, msg) {
  var backData = {
    code: code ? code : 0,
    msg: msg || '请求成功',
    data: data ? data : []
  }
  return backData
}

module.exports = createDataStructure
// 10000: 数据库链接失败
// 10001: 数据操作失败
// 10003: 数据库调用错误
// 0    : 请求成功
// 10010: 插入时，参数错误
// 20001: 用户名已存在
// 20002：用户名或密码错误
// 10401: 没有token
// 10402: token过期
// 10403: token错误或者其他错误