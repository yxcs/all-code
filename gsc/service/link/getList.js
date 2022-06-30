var cheerio = require('cheerio'); 
var async = require('async'); 
var fs = require('fs');
var request = require('request');
var iconv = require('iconv-lite');
var md5 = require('js-md5');

var link = require('./links');

var ooArr = [
  'https://so.gushiwen.org/gushi/shijing.aspx',    // 诗经
  'https://so.gushiwen.org/gushi/xiaoxue.aspx',    // 小学古诗
  'https://so.gushiwen.org/gushi/chuzhong.aspx',   // 初中古诗
  'https://so.gushiwen.org/gushi/gaozhong.aspx',   // 高中古诗
  'https://so.gushiwen.org/wenyan/chuwen.aspx',    // 初中文言文
  'https://so.gushiwen.org/wenyan/gaowen.aspx',    // 高中文言文
  'https://so.gushiwen.org/gushi/shijiu.aspx',     // 古诗十九首
  'https://so.gushiwen.org/gushi/tangshi.aspx',    // 唐诗三百首
  'https://so.gushiwen.org/gushi/sanbai.aspx',     // 古诗三百首
  'https://so.gushiwen.org/gushi/songsan.aspx',    // 宋词三百首
]
var base_url = 'https://www.gushiwen.org/shiwen/default_1Ab26259653a5dA1.aspx';
var pager = 'default_2.aspx';      // null
var linkArr = [];
var idx = 1;

var len = 1000;
var type = '诗文'
var uuid = 'default_0AA';

console.log(type);

for (var i = 1; i <= len; i ++) {
  if (i == 1) {
    linkArr.push('https://www.gushiwen.org/shiwen/')
  } else {
    linkArr.push('https://www.gushiwen.org/shiwen/' + uuid + i + '.aspx');
  }
  // linkArr.push('https://www.gushiwen.org/shiwen/'+ uuid + i + '.aspx');
}

// link.del({linkTo: null})

function getList(url, callback) {
  request({
    method: 'GET',
    uri: url,
    encoding: null
  }, function (error, response, body) {
    if (error) {
      console.log(error)
    }
    var baseData = iconv.decode(body, 'GBK');
    var $ = cheerio.load(baseData, { decodeEntities: false });
    var detailLinks = [];
    $('.cont').each(function (idx, item) {
      var link = $(item).find('p').eq(0).find('a').attr('href');
      if (!!link) {
        detailLinks.push(link);
      }
    })
    if (detailLinks.length) {
      detailLinks = detailLinks.map(function (item) {
        return {
          linkTo: item,
          type: type
        };
      })
      link.insertMany(detailLinks, callback);
    } else {
      callback();
    }
  })
}

function getOther(url, callback) {
  request({
    method: 'GET',
    uri: url,
    encoding: null
  }, function (error, response, body) {
    if (error) {
      console.log(error)
    }
    var baseData = iconv.decode(body, 'GBK');
    var $ = cheerio.load(baseData, { decodeEntities: false });
    var detailLinks = [];
    $('.sons .typecont').each(function (idx, item) {
      var myType = $(item).find('.bookMl').text();
      myType = '古文观止 ' + myType;
      $(item).find('span').each(function (sIdx, sItem) {
        var linkTo = $(sItem).find('a').attr('href');
        if (!!linkTo) {
          detailLinks.push({
            linkTo: linkTo,
            type: myType
          })
        }
      })
    })
    if (detailLinks.length) {
      link.insertMany(detailLinks, callback);
    } else {
      callback();
    }
  })
}

getOther('https://so.gushiwen.org/wenyan/guanzhi.aspx', function () {
  console.log('----ok----')
});


// async.eachSeries(linkArr, function (url, callback) {
//   console.log('当前第'+idx+'页');
//   idx ++;
//   getList(url, callback);
// }, function (data) {
//   console.log('-------------OK-----------')
//   console.log(data)
// })

