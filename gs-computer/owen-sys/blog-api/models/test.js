var db = require('../db/index');

function insertTest (data, cb) {
  db.query('INSERT INTO test(name, age, sex) VALUES(?,?,?)', ['test', 22, 1], function (res, fields) {
    console.log(fields)
  })
}

function getAllTest (data, cb) {
  db.query('SELECT * FROM test', data, function (res, fields) {
    cb(res)
  })
}

module.exports = {
  insertTest: insertTest,
  getAllTest: getAllTest
}