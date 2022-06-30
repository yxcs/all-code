var cheerio = require('cheerio'); 
var async = require('async'); 
var fs = require('fs');
var request = require('request');
var iconv = require('iconv-lite');
var md5 = require('js-md5');

request({
  method: 'GET',
  uri: 'http://www.happi123.com/jianpu/qyiBa1mPa.html',
  encoding: null
}, function (error, response, body) {
  if (error) {
    console.log(error)
  }
  var baseData = iconv.decode(body, 'utf8');
  console.log(baseData)
  var $ = cheerio.load(baseData, { decodeEntities: false });


})