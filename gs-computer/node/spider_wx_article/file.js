var lineReader = require('line-reader');
var Promise = require('bluebird');
var async = require('async');
var mysql = require('mysql');

var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : 'Keqi_123',
  database : 'mytest'
});

connection.connect();

var data = [];
var eachLine = Promise.promisify(lineReader.eachLine);
eachLine('url.txt', function(line) {
  data.push(line);
}).then(function() {
  console.log('done');

  async.eachSeries(data, function(item, cb) {
      var params = {article_url: item, type: '前端大全'};
      connection.query('INSERT INTO web SET ?', params, function(err, result) {
        cb();
      });
  }, function(err) {
      connection.end();
  })

}).catch(function(err) {
  console.error(err);
});