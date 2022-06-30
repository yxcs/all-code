const fs = require('fs');
const async = require('async');
var ty = require('./category');

function saveFile (data) {
  fs.appendFile('.json', JSON.stringify(data) ,'utf-8', function (err) {
    if(err) throw new Error("appendFile failed...");
  });
}

ty.getByConditions({}, function (data) {
  saveToJson(data);
})

function saveToJson(data) {
  async.eachSeries(data, function(item, callback) {
    fs.appendFile('ty.json', JSON.stringify(item) ,'utf-8', function (err) {
      callback();
    });
  }, function (data) {
    console.log('-------------OK-----------')
  })
}