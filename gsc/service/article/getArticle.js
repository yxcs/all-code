var cheerio = require('cheerio'); 
var async = require('async'); 
var fs = require('fs');
var request = require('request');
var iconv = require('iconv-lite');
var md5 = require('js-md5');

var CiPai = require('./cipai');
var Article = require('./article');