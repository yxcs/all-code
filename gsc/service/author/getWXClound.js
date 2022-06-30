const fs = require('fs');
const async = require('async');
var cp = require('./author');

function saveFile (data) {
  fs.appendFile('.json', JSON.stringify(data) ,'utf-8', function (err) {
    if(err) throw new Error("appendFile failed...");
  });
}

cp.getByConditions({}, function (data) {
  saveToJson(data);
})

function saveToJson(data) {
  async.eachSeries(data, function(item, callback) {
    let li = {
      avatar: item.avatar,
      describe: item.describe,
      onlyId: item.onlyId,
      name: iGetInnerText(item.author),
      dynasty: iGetInnerText(item.dynasty),
      quantity: item.quantity,
      lifetime: item.lifetime,
      updateAt: item.updateAt,
    }
    fs.appendFile('./author.json', JSON.stringify(li) ,'utf-8', function (err) {
      callback();
    });
  }, function (data) {
    console.log('-------------OK-----------')
  })
}

function iGetInnerText(testStr) {
  var resultStr = testStr.replace(/\ +/g, ""); //去掉空格
  resultStr = testStr.replace(/[ ]/g, "");    //去掉空格
  resultStr = testStr.replace(/[\r\n]/g, ""); //去掉回车换行
  return resultStr;
}