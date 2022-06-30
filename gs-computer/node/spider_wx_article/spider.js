var async = require('async');
var cheerio = require('cheerio');
var request = require('request');
var fs = require('fs');
var os = require('os');

var page = 42;
var pageList = [];
var urlList = [];

for(var i = 1; i <= page; i ++) {
  pageList.push(i);
}

var url = 'http://zs.xiguaji.com/MBiz/GetMBizHistory/d923c3/813220/';
var cookie = 'SERVERID=2e7fd5d7f4caba1a3ae6a9918d4cc9a6|'+parseInt(Date.now() / 1000)+'1499506803|1499501554;Path=/';
var options = {
	url: url,
    headers: {
        "User-Agent": "Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.96 Safari/537.36",
        'Set-Cookie': cookie
    }
}

async.eachSeries(pageList, function(item, callback) {
    options.url = url + item;
    request.get(options, function(err, res, body) {
        console.log(body);
        var $ = cheerio.load(body, { decodeEntities: false });
        $('a').each(function(index, ele) {
            var url = $(this).attr('href')
            if(url.indexOf('mp.weixin.qq.com') > -1) {
                console.log(url);
                append2Text(url, 'url1')
            }
        })
        callback();
    })
}, function(err) {
   console.log('下载完成!')
})

function append2Text(url, file) {
  var log = fs.createWriteStream(file+'.txt', {'flags': 'a'});
  log.write(url+os.EOL);
}