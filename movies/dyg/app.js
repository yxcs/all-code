const cheerio = require('cheerio'); 
const async = require('async'); 
const fs = require('fs');
var request = require('request');
const iconv = require('iconv-lite');

var MongoClient = require('mongodb').MongoClient;
var dbURL = 'mongodb://localhost:27017';
MongoClient.connect(dbURL,function(err, db) {
  const movies = db.db('movies');
  const col = movies.collection('movies_categray');
  pachong(col, db);
})

function saveFile (data) {
  fs.appendFile('dytt_oumei_details3.json', JSON.stringify(data) ,'utf-8', function (err) {
    if(err) throw new Error("appendFile failed...");
  });
}

function pachong(col, db) {
  let base = 'http://www.dygang.net/';
  let enumArr = ['ys', 'bd', 'gy', 'gp', 'dsj', 'dsj1', 'yx', 'dmq', '1080p', '4K', '3d'];
  let len = 622;
  let list = [];
  let start = 0;
  for (var i = start; i <= len; i ++) {
    // if (i === 1) {
    //   list.push('http://www.dygang.net/3d/');
    // } else {
      list.push('http://www.dygang.net/e/search/result/index.php?page='+i+'&searchid=179216');
    // }
  }

  console.log('共'+len+'个');

  let count = start;
  async.eachSeries(list, function (url, callback) {
    request({
      method: 'GET',
      uri: url,
      encoding: null
    }, function (error, response, body) {
      if (error) {
        console.log(error)
      }
      let baseData = iconv.decode(body, 'GBK');
      let $ = cheerio.load(baseData, { decodeEntities: false });
      let li = [];
      $('.border1').each(function (idx, item) {
        let linkTo = $(item).find('a').attr('href');
        let updateTime = $(item).next().find('td').text();
        li.push({
          linkTo: linkTo,
          updateTime: updateTime,
          categray: 'juqing',
          source: 'dyg'
        })
      })
      col.insert(li, function(error, result) {
        console.log('已完成'+count+'个');
        count ++;
        if (count >= len) {
          console.log('爬取完成！');
          db.close();
        }
        callback();
        // console.log(result)
      })
    })
  }, function (err) {
    console.log('--')
  })
}