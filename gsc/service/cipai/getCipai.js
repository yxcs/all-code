var cheerio = require('cheerio'); 
var async = require('async'); 
var fs = require('fs');
var request = require('request');
var iconv = require('iconv-lite');
var md5 = require('js-md5');

var CiPai = require('./cipai');
var base_url = 'https://www.gushiwen.org/shiwen/cipai/';
var linkArr = [];
var saveObj = [];
var idx = 1;

for (var  i = 1; i <= 9; i++) {
  if (i == 1) {
    linkArr.push('https://www.gushiwen.org/shiwen/cipai/')
  } else {
    linkArr.push('https://www.gushiwen.org/shiwen/cipai/default_'+i+'.aspx')
  }
}

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

    $('.sons .bookcont').each(function (idx, item) {
      $(item).find('span').each(function (sIdx, sItem) {
        var sourceLinkTo = $(sItem).find('a').attr('href');
        var name = $(sItem).find('a').text();
        if (!!sourceLinkTo) {
          saveObj.push({
            sourceLinkTo: 'https://www.gushiwen.org' + sourceLinkTo,
            name: name
          })
        }
      })
    })

    callback();

  })
}

function getDetail(item, callback) {
  request({
    method: 'GET',
    uri: item.sourceLinkTo,
    encoding: null
  }, function (error, response, body) {
    if (error) {
      console.log(error)
    }
    var baseData = iconv.decode(body, 'utf8');
    var $ = cheerio.load(baseData, { decodeEntities: false });
    item.description = $('.sonspic').eq(0).find('.cont p').text();
    var pager = $('#sumPage').text();
    pager = parseInt(pager);
    item.pager = pager
    CiPai.insert(item, callback);
  })
}


function start() {
  async.eachSeries(linkArr, function (url, callback) {
    console.log('当前第'+idx+'页');
    idx ++;
    getList(url, callback);
  }, function (data) {
    console.log('-------------OK-----------')
    console.log(saveObj)
    async.eachSeries(saveObj, function (item, callback) {
      getDetail(item, callback)
    }, function (data) {
      console.log('-------------detail OK-----------')
    })
  })
}

function getNoLink() {
  linkArr = []
  for (var  i = 5; i <= 9; i++) {
    if (i == 1) {
      linkArr.push('https://www.gushiwen.org/shiwen/cipai/')
    } else {
      linkArr.push('https://www.gushiwen.org/shiwen/cipai/default_'+i+'.aspx')
    }
  }
  async.eachSeries(linkArr, function (url, callback) {
    
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
  
      $('.sons .bookcont').each(function (idx, item) {
        $(item).find('span').each(function (sIdx, sItem) {
          var sourceLinkTo = $(sItem).find('a').attr('href');
          var name = $(sItem).find('a').text();
          if (!sourceLinkTo) {
            saveObj.push({
              sourceLinkTo: '',
              name: name,
              description: '',
              pager: 0
            })
          }
        })
      })
  
      callback();
  
    })

  }, function (data) {
    CiPai.insertMany(saveObj, function () {

    })
    console.log('-------------detail OK-----------')
  })
}

getNoLink();