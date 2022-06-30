const fs = require('fs');
const async = require('async');
var ts = require('./tangshi');
var md5 = require('js-md5');

function saveFile (data) {
  fs.appendFile('.json', JSON.stringify(data) ,'utf-8', function (err) {
    if(err) throw new Error("appendFile failed...");
  });
}

ts.getByConditions({}, function (data) {
  saveToJson(data);
})

function saveToJson(data) {
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

    fs.appendFile('ts.json', JSON.stringify(dd) ,'utf-8', function (err) {
      callback();
    });
  }, function (data) {
    console.log('-------------OK-----------')
  })
}