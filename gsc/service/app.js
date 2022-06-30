var cheerio = require('cheerio'); 
var async = require('async'); 
var fs = require('fs');
var request = require('request');
var iconv = require('iconv-lite');
var md5 = require('js-md5');

var base_url = 'https://www.gushiwen.org/';
var pager = 'default_2.aspx';      // null
var linkArr = [];
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
      detailLinks.push(link);
    })
  })
}

function detailEach(detailLinks, callback) {
  async.eachSeries(detailLinks, function (url, dCb) {

  }, function (data) {
    console.log('-------------OK-----------')
    console.log(data)
  })
}

function getDetail(url, cb) {
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
    var obj = {
      sourceLink: url,
      name: '',
      onlyId:　'',
      dynasty: '',
      author: '',
      content: [],
      translate: [],
      translate_res: [],
      tags: [],
      notes: [],
      reference: [],
      appreciation: [],
      appreciation_res: [],
      sourceLink: '',
      type: '',
      form: ''
    };

    obj.name = $('.sons').eq(0).find('h1').text();
    obj.onlyId = md5(obj.name);
    obj.dynasty = $('.sons').eq(0).find('.source a').eq(0).text();
    obj.author = $('.sons').eq(0).find('.source a').eq(1).text();
    obj.content = $('.sons').eq(0).find('.contson').html();
    obj.content = obj.content.split('<br>');
    
    // obj.translate = $('.sons').eq(1).find('.contyishang').find('p').eq(0).html();
    // obj.translate = obj.translate.split('<br>');
    // obj.notes = $('.sons').eq(1).find('.contyishang').find('p').eq(1).html();
    // obj.notes = obj.notes.split('<br>');
    // if ($('.cankao').length) {
    //   $('.cankao').eq(0).find('div').each(function(idx, item) {[]
    //     var ck = $(item).find('span').eq(1).text();
    //     obj.translate_res.push(ck);
    //   })
    //   $('.cankao').eq(1).find('div').each(function(idx, item) {
    //     var ck = $(item).find('span').eq(1).text();
    //     obj.appreciation_res.push(ck);
    //   })
    // }
    // $('.tag').eq(0).find('a').each(function (idx, item) {
    //   var tag = $(item).text();
    //   obj.tags.push(tag)
    // })
  })
}

async.eachSeries(linkArr, function (url, callback) {

}, function (data) {
  console.log('-------------OK-----------')
  console.log(data)
})