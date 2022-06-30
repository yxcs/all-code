var Gsc = require('./gushici');
var Link = require('../link/links');

var cheerio = require('cheerio');
var async = require('async');
var fs = require('fs');
var request = require('request');
var iconv = require('iconv-lite');
var md5 = require('js-md5');

var pager = 1749;
var size = 100;
var end = 2200;

start()

function start() {
  Link.getByPager(size, pager, {}, {}, function(data) {
    fetchDetails(data);
  })
}

function fetchDetails(links) {
  // links = links.filter(item => {
  //   return item.linkTo && item.linkTo.indexOf('http' > -1);
  // })
  async.eachSeries(links, function (item, callback) {
    try {
      fetchDetail(item, callback)
    } catch (e) {
      console.log(' <<<<<<<<<<<<<<<<<<<<出错重启>>>>>>>>>>>>>>>>>>>>> ')
      start()
    }
  }, function (data) {
    console.log('第  ' + pager + '  爬取完毕');
    pager ++;
    if (pager === 1000) {
      pager = 1043;
    }
    if (pager <= end) {
      start();
    } else {
      console.log('---全部爬取完毕---');
    }
  })
}

function fetchDetail(list, callback) {
  if (list.linkTo.indexOf('http') < 0) {
    list.linkTo = 'https://so.gushiwen.org' + list.linkTo;
  }
  var li = {
    onlyId: '',
    name: '',
    dynasty: '',
    author: '',
    content: [],
    tags: [],
    translate: [],
    translate_res: [],
    reference: [],
    notes: [],
    appreciation: [],
    appreciation_res: [],
    sourceLink: list.linkTo,
    type: list.type,
    format: '古诗词'
  };

  var id = list.linkTo.split('_')[1];
  if (!!id && typeof id === 'string') {
    id = id.replace('.aspx', '');
    async.waterfall([
      function (wCb) {
        request({
          method: 'GET',
          uri: list.linkTo,
          encoding: null
        }, function (error, response, body) {
          if (error) {
            console.log(error)
          }
          var baseData = iconv.decode(body, 'utf8');
          var $ = cheerio.load(baseData, { decodeEntities: false });
  
          var sons = $('.sons').eq(0);
          li.name = $(sons).find('.cont h1').text();
          li.onlyId = md5(li.name);
          li.dynasty = $(sons).find('.cont .source a').eq(0).text();
          li.author = $(sons).find('.cont .source a').eq(1).text();
          var con = $(sons).find('.cont .contson').html();
          if (con && typeof con == 'string') {
            con = con.split('<br>');
          } else {
            console.error('---------------------------------error------------------------------------------')
          }
          li.content = con;
          $(sons).find('.tag a').each(function (idx, item) {
            var tag = $(item).text();
            li.tags.push(tag);
          })
  
          wCb(null);
        })
      },
      function (wCb) {
        var currUrl = 'https://so.gushiwen.org/shiwen2017/ajaxshiwencont.aspx';
        var value = 'yi';
        currUrl = currUrl +　'?id=' + id + '&value=' + value;
        request({
          method: 'GET',
          uri: currUrl,
          encoding: null
        }, function (error, response, body) {
          if (error) {
            console.log(error)
          }
          var baseData = iconv.decode(body, 'utf8');
          var $ = cheerio.load(baseData, { decodeEntities: false });
          $('p').each(function (idx, item) {
            var fontSize = $(item).css('font-size');
            if (fontSize != '12px') {
              li.translate.push($(item).find('span').text());
            }
          })
  
          $('div').each(function(idx, item) {
            var res = $(item).find('span').eq(1).text();
            li.translate_res.push(res);
          })
  
          wCb(null);
        })
      },
      function (wCb) {
        var currUrl = 'https://so.gushiwen.org/shiwen2017/ajaxshiwencont.aspx';
        var value = 'zhu';
        currUrl = currUrl +　'?id=' + id + '&value=' + value;
        request({
          method: 'GET',
          uri: currUrl,
          encoding: null
        }, function (error, response, body) {
          if (error) {
            console.log(error)
          }
          var baseData = iconv.decode(body, 'utf8');
          var $ = cheerio.load(baseData, { decodeEntities: false });
          $('p').each(function (idx, item) {
            var fontSize = $(item).css('font-size');
            if (fontSize != '12px') {
              var appItem = $(item).html();
              appItem = appItem.replace(/\<span style\=\"color\:\#286345\;\"\>/ig, '');
              appItem = appItem.replace(/\<\/span\>/ig, '');
              appItem = appItem.replace(/\<br \/\>/ig, '');
              appItem = appItem.replace(/\<br\>/ig, '');
              appItem = appItem.replace(/\\n>/ig, '');
              appItem = appItem.replace(/\\r>/ig, '');
              li.notes.push(appItem);
            }
          })
  
          wCb(null);
        })
      },
      function (wCb) {
        var currUrl = 'https://so.gushiwen.org/shiwen2017/ajaxshiwencont.aspx';
        var value = 'shang';
        currUrl = currUrl +　'?id=' + id + '&value=' + value;
        request({
          method: 'GET',
          uri: currUrl,
          encoding: null
        }, function (error, response, body) {
          if (error) {
            console.log(error)
          }
          var baseData = iconv.decode(body, 'utf8');
          var $ = cheerio.load(baseData, { decodeEntities: false });
          $('p').each(function (idx, item) {
            var fontSize = $(item).css('font-size');
            if (fontSize != '12px') {
              li.appreciation.push($(item).text());
            }
          })
  
          $('div').not('.hr').each(function(idx, item) {
            var res = $(item).find('span').eq(1).text();
            li.appreciation_res.push(res);
          })
  
          wCb(null);
        })
      }
    ], function (err, result) {
      console.log('----------'+ list.linkTo +' end----------')
      Gsc.insert(li, callback);
    });
  } else {
    callback()
  }

}