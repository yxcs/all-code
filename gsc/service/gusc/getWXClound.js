const fs = require('fs');
const async = require('async');
var ts = require('./gushici');
var md5 = require('js-md5');

function saveFile (data) {
  fs.appendFile('.json', JSON.stringify(data) ,'utf-8', function (err) {
    if(err) throw new Error("appendFile failed...");
  });
}
var arr = [];
var start = 201;
var end = 221;
for (var i =start; i < end; i++) {
  arr.push(i);
}
arr.push(50)
arr.push(100)
arr.push(150)
arr.push(200)
async.eachSeries(arr, function (item, mainCall) {
  ts.getByPager(1000, item, {}, {}, function (data) {
    saveToJson(data, mainCall);
  })
}, function () {
  console.log('-------------end-----------')
})

function saveToJson(data, mainCall) {
  async.eachSeries(data, function(item, callback) {
    let dd = {
      content: item.content,
      translate: item.translate,
      translate_res: item.translate_res,
      tags: item.tags,
      notes: item.notes,
      reference: item.reference,
      appreciation: item.appreciation,
      appreciation_res: item.appreciation_res,
      onlyId: item.onlyId,
      name: item.name,
      dynasty: item.dynasty,
      author: item.author,
      sourceLink: item.sourceLink,
      type: item.type,
      format: item.format,
      updateAt: item.updateAt,
    }

    fs.appendFile('gusic22w.json', JSON.stringify(dd) ,'utf-8', function (err) {
      callback();
    });
  }, function (data) {
    console.log('-------------OK-----------')
    mainCall();
  })
}