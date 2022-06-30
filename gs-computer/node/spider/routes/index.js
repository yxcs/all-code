var express = require('express');
var router = express.Router();

var superagent=require("superagent");
var cheerio=require("cheerio");
var url=require("url");
var eventproxy=require("eventproxy");
var baseUrl='https://cnodejs.org/';
function output(arr){
  for(var i=0;i<arr.length;i++){
    console.log(arr[i]);
  }
}

/* GET home page. */
// router.get('/', function(req, res, next) {
//   res.render('index', { title: 'Express' });
// });
router.get('/', function (req, res, next) {
  superagent.get(baseUrl).end(function(err,resp){
    if(err){
      return console.error(err);
    }
    var arr=[];
    var $=cheerio.load(resp.text);
    $("#topic_list .topic_title").each(function(idx,element){
      $element=$(element);
      var _url=url.resolve(baseUrl,$element.attr("href"));
      arr.push(_url);
    });
//验证得到的所有文章链接集合
    output(arr);
//接下来遍历arr，解析每一个页面中需要的信息
    var ep=new eventproxy();
    ep.after('destEvent',arr.length,function(topics){
      topics=topics.map(function(topic){
        var _url=topic[0];
        var message=topic[1];
        var $=cheerio.load(message);
        return {
            title:$(".topic_full_title").text().trim(),
            href:_url,
            firstcomment:$("#reply1 .markdown-text").text().trim()
        };
      });
      console.log("result :");
      console.log(topics);
    });
    arr.forEach(function(_url){
      superagent.get(_url).end(function(err,mes){
          if(err){
            console.log("get \""+_url+"\" error !"+err);
            console.log("message info:"+JSON.stringify(mes));
          }
          console.log('fetch '+_url+" succeful !");
          ep.emit('destEvent',[_url,mes.text]);
      });
    });
  });
});

module.exports = router;
