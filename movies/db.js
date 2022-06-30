var MongoClient = require('mongodb').MongoClient;
var dbURL = 'mongodb://localhost:27017';
var data = require('./dytt_oumei_details3.json');
console.log(data.length)
MongoClient.connect(dbURL,function(err, db) {
const movies = db.db('movies');
const col = movies.collection('dytt_movie_oumei');
  col.insert(data, function(error, result) {
    console.log(result)
    db.close();
  })
})