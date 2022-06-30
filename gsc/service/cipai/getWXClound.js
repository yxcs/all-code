const fs = require('fs');
const async = require('async');
var cp = require('./cipai');

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
    console.log(item)
    fs.appendFile('./cp.json', JSON.stringify(item) ,'utf-8', function (err) {
      callback();
    });
  }, function (data) {
    console.log('-------------OK-----------')
  })
}