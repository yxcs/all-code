var cheerio = require('cheerio');
var async = require('async');
var fs = require('fs');
var request = require('request');
var iconv = require('iconv-lite');
var md5 = require('js-md5');

var ts = require('./tangshi');

var base_url = 'https://so.gushiwen.org/gushi/tangshi.aspx';
var links = [];
var type = '唐诗三百首'

function fetchLinks(url) {
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
    $('.typecont').each(function (idx, item) {
      var format = $(item).find('.bookMl strong').text();
      $(item).find('span').each(function (idx, sItem) {
        var href = $(sItem).find('a').attr('href');
        links.push({
          link: 'https://so.gushiwen.org' + href,
          format: format
        })
      })
    })
    console.log('----------links----------')
    fetchDetails(links);
  })
}

function fetchDetails(links) {
  async.eachSeries(links, function (item, callback) {
    fetchDetail(item, callback)
  }, function (data) {
    console.log('-------------OK-----------')
  })
}

function fetchDetail(list, callback) {
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

    sourceLink: list.link,
    type: type,
    format: list.format
  };

  var id = list.link.split('_')[1];
  id = id.replace('.aspx', '');

  async.waterfall([
    function (wCb) {
      request({
        method: 'GET',
        uri: list.link,
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
        con = con.split('<br>');
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
    console.log('----------'+list.link+' end----------')
    ts.insert(li, callback);
  });

}


fetchLinks(base_url);