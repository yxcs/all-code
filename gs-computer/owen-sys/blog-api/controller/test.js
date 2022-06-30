var test = require('../models/test')

function home (req, res, next) {
  test.getAllTest([], function (data) {
    res.send(data)
  })
}

module.exports = {
  home: home
}