var cheerio = require('cheerio');
var async = require('async');
var fs = require('fs');
var request = require('request');
var iconv = require('iconv-lite');
var md5 = require('js-md5');

var category = require('./category');

var base_url = 'https://www.gushiwen.org/shiwen/';
var links = [];
var type = ''

function start(url) {
  var list = [];
  request({
    method: 'GET',
    uri: url,
    encoding: null
  }, function (error, response, body) {
    if (error) {
      console.log(error)
    }
    var baseData = iconv.decode(body, 'utf8');
    var $ = cheerio.load(baseData, {
      decodeEntities: false
    });
    $('#type1 .sright').find('a').each(function (idx, item) {
      var li = {};
      li.linkTo = $(item).attr('href');
      li.name = $(item).text();
      li.type = md5(li.name);
      li.mainName = '类型';
      li.category = md5(li.mainName);
      li.onlyId = li.linkTo.split('_')[1];
      li.onlyId = li.onlyId.replace('1.aspx', '');
      list.push(li);
    })
    $('#type2 .sright').find('a').each(function (idx, item) {
      var li = {};
      li.linkTo = $(item).attr('href');
      li.name = $(item).text();
      li.type = md5(li.name);
      li.mainName = '作者';
      li.category = md5(li.mainName);
      li.onlyId = li.linkTo.split('_')[1];
      li.onlyId = li.onlyId.replace('1.aspx', '');
      list.push(li);
    })
    $('#type3 .sright').find('a').each(function (idx, item) {
      var li = {};
      li.linkTo = $(item).attr('href');
      li.name = $(item).text();
      li.type = md5(li.name);
      li.mainName = '朝代';
      li.category = md5(li.mainName);
      li.onlyId = li.linkTo.split('_')[1];
      li.onlyId = li.onlyId.replace('1.aspx', '');
      list.push(li);
    })

    category.insertMany(list, function() {
      console.log('ok')
    })
  })
}

start(base_url);