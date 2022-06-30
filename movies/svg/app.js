const cheerio = require('cheerio'); 
const async = require('async'); 
const fs = require('fs');
var request = require('request');
const iconv = require('iconv-lite')
var parse = require('parse-svg-path')

var list = require('./other.json')

let kk = 'hot'
list = list.map(function (item) {
  item.pageType = kk;
  if (item.uuid === 's5AHa1uV6') {
    kk = 'new'
  } else if (item.uuid === '8fuIg13uQ') {
    kk = 'simple'
  }
  return item;
})


function saveFile (data) {
  fs.appendFile('test.svg', data ,'utf-8', function (err) {
    if(err) throw new Error("appendFile failed...");
  });
}

function downloadSong (uri, key) {
  request(uri)
      .pipe(fs.createWriteStream(uri + ".mp3"))
      .on("error",function(err){
          callback2(null);
      })
      .on("close",() => {
          console.log(title," is downloaded!");
          callback2(null);
      })
}

// var words = [];
// for(var i=0;i<26;i++){
//   words.push(String.fromCharCode(97+i));
// }
// console.log(words)

function fetchAllUuid(col, db) {
  async.eachSeries(words, function (current, callback) {
    request({
      method: 'GET',
      uri: 'http://www.happi123.com/web/index.php?action=category&category_id='+current,
      encoding: null
    }, function (error, response, body) {
      var json = body.toString();
      json = JSON.parse(json);
      if (json && json.result) {
        json = json.result.map(function (item) {
          item.song_name = decodeURIComponent(item.song_name);
          item.href = 'http://www.happi123.com/jianpu/'+ item.song_uuid +'.html'
          item.wordType = current;
          return item;
        })
        col.insert(json, function(error, result) {
          console.log(current + '    ==>    已完成');
          callback();
        })
      } else {
        callback();
      }
    })
  }, function (err) {
    db.close();
  })
}

function updateUuid(col, db, data) {

}

var MongoClient = require('mongodb').MongoClient;
var dbURL = 'mongodb://localhost:27017';
MongoClient.connect(dbURL,function(err, db) {
  const music = db.db('music_taodi');
  const col = music.collection('music_list');
  const colAll = music.collection('music_list_all');
  col.find().toArray(function(err, docs){
    console.log('find');
    // updateUuid(col, db, docs);
    docs.forEach(function (item) {
      item.pageType = 'all';
      list.forEach(function (subItem) {
        if (item.song_uuid === subItem.uuid) {
          item.pageType = subItem.pageType;
        }
      })
    })
    colAll.insert(docs, function(error, result) {
      if (!error) {
        console.log('保存成功')
      }
    })

  });
  // fetchAllUuid(col, db);
})

// let hot = [];
// $('.card').each(function (idx, item) {
//   var obj = {
//     type: 'hot'
//   }
//   var href = $(item).find('a').attr('href');
//   obj.href = 'http://www.happi123.com' + href;
//   var uuid = href.split('\/');
//   uuid = uuid[uuid.length - 1].split('\.');
//   uuid = uuid[0];
//   obj.uuid = uuid;
//   obj.name = $(item).find('p').text();
//   hot.push(obj);
// })
// hot = JSON.stringify(hot);