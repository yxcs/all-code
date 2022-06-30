var express = require('express');
var router = express.Router();
var db = require('../db/db');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/find', function(req, res, next) {
  db.fetchList(function (data) {
    res.json(data);
    res.end();
  })
});

router.post('/add', function(req, res, next) {
  var svg = req.body;
  svg = JSON.parse(svg);
  svg = decodeURIComponent(svg);
  db.insertSvg(svg.data, function (data) {
    res.send(data)
    res.end();
  })
});

module.exports = router;
