var cheerio = require('cheerio');
var async = require('async');
var fs = require('fs');
var request = require('request');
var iconv = require('iconv-lite');
var md5 = require('js-md5');

var al = require('../author/authorLinks');
var link = require('./links');

var startAt = 1207;
al.getByConditions({}, function (data) {
  data = data.slice(startAt);
  getList(data);
})

function getList(list) {
  async.eachSeries(list, function (item, callback) {
    var arr = [];
    var uuid = item.worksLink.split('\/');
    uuid = uuid[uuid.length - 1];
    uuid = uuid.replace('1.aspx', '');
    if (!item.pager) {
      item.pager = 1;
      arr.push('https://so.gushiwen.org/authors/'+ uuid +'1.aspx')
    } else {
      for (var i = 1; i <= item.pager; i ++) {
        arr.push('https://so.gushiwen.org/authors/'+ uuid + i +'.aspx')
      }
    }
    console.log('开始爬取  ' + item.worksLink + '  数据, 第 ' + startAt + ' 条');
    console.log('共  ' + arr.length + '  页');
    startAt ++;
    getPage(arr, callback);
  },
  function () {
    console.log('---------------All OK-----------------')
  })
}

function getPage(arr, callback) {
  var pageNum = 1;
  async.eachSeries(arr, function (url, cb) {
    console.log('开始爬取第 ' + pageNum + ' 页');
    pageNum ++;
    getLinks(url, cb);
  },
  function () {
    console.log('---------------Page OK-----------------')
    callback();
  })
}

function getLinks(url, cb) {
  var list = []
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
    $('.sons').each(function (idx, item) {
      var li = {
        type: '作者'
      }
      li.linkTo = $(item).find('p').eq(0).find('a').attr('href');
      li.linkTo = 'https://so.gushiwen.org' + li.linkTo;
      list.push(li);
    })
    link.insertMany(list, cb);
  })
}