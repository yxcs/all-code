var request = require('request');
var fs = require('fs');
var cheerio=require('cheerio');
var eventproxy=require('eventproxy');
var async = require('async');

var mount = 50;
var baseUrl = 'https://cnodejs.org/?tab=all&page=';
var pages = [];
var urlLists = [];

for(var i = 1; i < mount + 1; i ++) {
    pages.push(baseUrl + i);
}

var ep = new eventproxy();

var options = {
    url: '',
    headers: {
        'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_9_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/55.0.2883.95 Safari/537.36',
        'Cookie': 'connect.sid=s%3A7xT6iwy0VFZuCio9GOIQWkITojN1EVQg.bcLCumdT5PDlVUTUKOH6a15eSPAIz0uU%2F3L6t4Q%2FayY; UM_distinctid=15d49cf635b381-06a25b355752f6-641f2177-1fa400-15d49cf635c311; CNZZDATA1254020586=1414315222-1500176733-https%253A%252F%252Fwww.baidu.com%252F%7C1500188892; _ga=GA1.2.1588634430.1500181918; _gid=GA1.2.1857293543.1500181918'
    }
}

function savedImg(url, filename, cb) {
    filename = filename + '.jpg';
    try {
      request.head(url,function(err,res,body){
        if (err){
            console.log(err);
        } else {
            request(url).pipe(fs.createWriteStream('./images/'+filename));
        }
      });
    } catch (error) {
        console.log(error)    
    }
    cb()
}

async.eachSeries(pages, function(item, callback) {
    options.url = item;
    request(options, function(err, res, body) {
        var $ = cheerio.load(body, {decodeEntities: false});
        $(".user_avatar").find('img').each(function(element) {
            urlLists.push($(this).attr('src'))
        })
        callback()
    })
}, function (err) {
    console.log('----------------------------------------------')
    var i = 1; 
    async.eachSeries(urlLists, function (item, cb) { 
        console.log(i);
        i ++;
        savedImg(item, Date.now(), cb)
     })
 })