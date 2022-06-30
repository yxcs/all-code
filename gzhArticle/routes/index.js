var express = require('express');
var router = express.Router();
var fetchList = require('../db/fetchList.js');

router.get('/', function (req, res, next) {
  var page = req.query.page;
  page = parseInt(page);
  if (!page || page <= 0) {
    page = 1;
  }
  fetchList.getCount(function (count) {
    fetchList.getByPages(page, 20, function(data) {
      res.render('home', { 
        title: 'Blog',
        list: data,
        pager: {page: page, count: Math.ceil(count/20) }
      });
    });
  })
});

module.exports = router;
