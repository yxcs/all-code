var cheerio = require('cheerio');
var async = require('async');
var fs = require('fs');
var request = require('request');
var iconv = require('iconv-lite');
var md5 = require('js-md5');

var al = require('./authorLinks');

var base_url = 'https://so.gushiwen.org/authors/default.aspx?p=1&c=';
var links = [];
var len = 1000;
var k = 1;

for (var i = 1; i <= len; i++) {
  links.push('https://so.gushiwen.org/authors/default.aspx?p='+i+'&c=');
}

function start() {
  async.eachSeries(links, function (item, callback) {
    console.log('----------爬去 '+ item + ' 开始--------       ' + k);
    k ++;
    var li = [];
    request({
      method: 'GET',
      uri: item,
      encoding: null
    }, function (error, response, body) {
      if (error) {
        console.log(error)
      }
      var baseData = iconv.decode(body, 'utf8');
      var $ = cheerio.load(baseData, {
        decodeEntities: false
      });
      $('.sonspic').each(function (idx, item) {
        var detailLink = $(item).find('p').first().find('a').attr('href');
        var worksLink = $(item).find('p').last().find('a').last().attr('href');
        var worksNum = $(item).find('p').last().find('a').last().text();
        worksNum = worksNum.replace('► ', '');
        worksNum = parseInt(worksNum);
        pager = Math.ceil(worksNum / 10);
        li.push({
          detailLink: 'https://so.gushiwen.org' + detailLink,
          worksLink: 'https://so.gushiwen.org' + worksLink,
          worksNum: worksNum,
          pager: pager
        })
      })
      al.insertMany(li, callback);
    })
  }, function (data) {
    console.log('-------------OK-----------')
  })
}

start()