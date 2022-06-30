var CiPai= require('./cipai');
var Link= require('./links');

var cheerio = require('cheerio'); 
var async = require('async'); 
var fs = require('fs');
var request = require('request');
var iconv = require('iconv-lite');
var md5 = require('js-md5');



CiPai.getByConditions({}, function (data) {
  var list = data;
  var flag = false;
  list = list.filter(function (item) {
    if (item.name == '柳梢青') {
      flag = true;
    }
    return flag;
  })
  async.eachSeries(list, function (item, callback) {
    getPage(item, callback);
  }, function () {
    console.log('---------OK--------')
  })
})

var type = '词牌'

function getList(url, callback) {
  request({
    method: 'GET',
    uri: url,
    encoding: null
  }, function (error, response, body) {
    if (error) {
      console.log(error)
    }
    var baseData = iconv.decode(body, 'utf8');
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
      Link.insertMany(detailLinks, callback);
    } else {
      callback();
    }
  })
}


function getPage(list, callback) {
  var linkArr = [];
  var url = list.sourceLinkTo.replace('1.aspx', '');
  for (var i = 1; i <= list.pager; i++) {
    linkArr.push(url + i + '.aspx');
  }

  console.log('爬取' + list.name + '开始');

  async.eachSeries(linkArr, function (currUrl, smCb) {
    console.log(currUrl + '  ==>   开始')
    getList(currUrl, smCb);
  }, function () {
    console.log(list.name + '爬取完成')
    callback();
  })
}