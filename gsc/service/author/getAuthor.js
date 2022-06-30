var cheerio = require('cheerio');
var async = require('async');
var fs = require('fs');
var request = require('request');
var iconv = require('iconv-lite');
var md5 = require('js-md5');

var authL = require('./authorLinks');
var author = require('./author');

var startAt = 10000;
start(startAt);
function start(startAt) {
  authL.getByConditions({}, function (data) {
    data = data.slice(startAt);
    fetchDetails(data)
  })
}

function fetchDetails(data) {
  async.eachSeries(data, function (item, callback) {
    console.log('开始爬取第'+startAt+'个');
    startAt ++;
    fetchDetail(item, callback)
  }, function (data) {
    console.log('-------------OK-----------')
  })
}

function fetchDetail(list, callback) {
  var li = {
    onlyId: '',
    author: '',
    dynasty: '',
    quantity: '',
    lifetime: '',
    avatar: '',
    describe: []
  };

  var id = list.detailLink.split('_')[1];
  id = id.replace('.aspx', '');
  li.onlyId = id;

  request({
    method: 'GET',
    uri: list.detailLink,
    encoding: null
  }, function (error, response, body) {
    if (error) {
      console.log(error)
    }
    var baseData = iconv.decode(body, 'utf8');
    var $ = cheerio.load(baseData, { decodeEntities: false });
    var detail = $('.sonspic .cont');
    if ($(detail).find('.divimg').length) {
      li.avatar = $(detail).find('.divimg img').attr('src');
    }
    li.author = $(detail).find('h1').text();
    li.lifetime = $(detail).find('p').eq(0).text();
    li.quantity = $(detail).find('p').eq(0).find('a').last().text();
    li.lifetime = li.lifetime.replace(li.quantity, '');
    li.quantity = li.quantity.replace('► ', '');
    li.quantity = parseInt(li.quantity);
    li.dynasty = $('.sons .cont').eq(0).find('.source a').eq(0).text();
    var ids = [];
    $('.contyishang').each(function (idx, item) {
      var flag = false;
      $(item).find('div').each(function (iidx, sItem) {
        if($(sItem).css('text-align') == 'center') {
          var id = $(sItem).find('a').attr('href');
          id = id.replace('javascript:ziliaoShow(','');
          id = parseInt(id);
          ids.push(id);
          flag = true;
        }
      })

      if (!flag) {
        var describe = {
          type: '',
          content: [],
          res: []
        }

        describe.type = $(item).find('h2').text();
        $(item).find('p').each(function (idx, item) {
          describe.content.push($(item).text());
        })
        $(item).find('.cankao span').each(function (idx, item) {
          if ($(item).css('width') === '610px') {
            describe.res.push($(item).text());
          }
        })
        li.describe.push(describe);
      }
      
    })

    fetchContent(ids, li, callback);
  })
}

function fetchContent(ids, li, callback) {
  var url = 'https://so.gushiwen.org/authors/ajaxziliao.aspx?id=536'
  async.eachSeries(ids, function (id, sCb) {
    var describe = {
      type: '',
      content: [],
      res: []
    }
    request({
      method: 'GET',
      uri: 'https://so.gushiwen.org/authors/ajaxziliao.aspx?id=' + id,
      encoding: null
    }, function (error, response, body) {
      if (error) {
        console.log(error)
      }
      var baseData = iconv.decode(body, 'utf8');
      var $ = cheerio.load(baseData, { decodeEntities: false });
      describe.type = $('.contyishang').find('h2').text();
      $('.contyishang p').each(function (idx, item) {
        describe.content.push($(item).text());
      })
      $('.cankao span').each(function (idx, item) {
        if ($(item).css('width') === '610px') {
          describe.res.push($(item).text());
        }
      })
      li.describe.push(describe);
      sCb();
    })
  }, function (data) {
    author.insert(li, callback);
    console.log('-------------详情页 OK-----------');
  })
}