var MongoClient = require('mongodb').MongoClient;
var DB_CONN_STR = 'mongodb://localhost:27017/movies';

var insertData = function(db, callback) {  
  //获得指定的集合 
  var collection = db.collection('users');
  //插入数据
  var data = [{_id:7,"name":'rose',"age":21},{_id:8,"name":'mark',"age":22}];
  collection.insert(data, function(err, result) { 
      //如果存在错误
      if(err)
      {
          console.log('Error:'+ err);
          return;
      } 
      //调用传入的回调方法，将操作结果返回
      callback(result);
  });
}

function fetchList (ecb) {
  var MongoClient = require('mongodb').MongoClient;
  var dbURL = 'mongodb://localhost:27017';
  MongoClient.connect(dbURL,function(err, db) {
    const music = db.db('music_taodi');
    const col= music.collection('music_list_all');
    col.find().toArray(function(err, docs){
     ecb(docs)
     db.close();
    });
  })
}

function insertSvg(svg, ecb) {
  var MongoClient = require('mongodb').MongoClient;
  var dbURL = 'mongodb://localhost:27017';
  MongoClient.connect(dbURL,function(err, db) {
    const music = db.db('music_taodi');
    const col= music.collection('test');
    col.insertOne({svg: svg}, function(error, result) {
      ecb(result);
      db.close();
    })
  })
}

module.exports = {
  fetchList,
  insertSvg
}