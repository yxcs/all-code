const cheerio = require('cheerio'); 
const async = require('async'); 
const fs = require('fs');
var request = require('request');
const iconv = require('iconv-lite');
const list_china = require('./dytt_list_oumei.json');

function saveFile (data) {
  fs.appendFile('dytt_oumei_details3.json', JSON.stringify(data) ,'utf-8', function (err) {
    if(err) throw new Error("appendFile failed...");
  });
}
let base = 'http://www.ygdy8.net';
let list = [];
let start = 10206;
let end = list_china.length
for (var i = start; i < end; i ++) {
  if (list_china[i].linkTo.indexOf('index') < 0) {
    list.push(base + list_china[i].linkTo);
  }
}

console.log('共'+end+'个');

let count = start;
async.eachSeries(list, function (url, callback) {
  request({
    method: 'GET',
    uri: url,
    encoding: null
  }, function (error, response, body) { 
    if (error) {
      console.log(error)
    }
    count ++;
    console.log('已经成功'+count+'个');
    let baseData = iconv.decode(body, 'GBK');
    let $ = cheerio.load(baseData, { decodeEntities: false });
    const li = {};
    li.title = $('.title_all font').text();
    let p0 = $('#Zoom p').eq(0);
    let table = $('#Zoom table').eq(0);
    let downloadList = [];
    $(table).each(function (idx, item) {
      downloadList.push($(item).find('a').attr('href'));
    })
    li.downloadList = downloadList;
    li.coverImg = p0.find('img').eq(0).attr('src');
    li.detailImg = p0.find('img').eq(1).attr('src');
    p0.find('img').remove();
    pTxt = p0.html();
    pTxt = !!pTxt && !!pTxt.split ? pTxt.split('<br>') : [];
    let key = 'allTitle';
    pTxt.map(function (item, idx) {
      if (!idx) {
        li.allTitle = item;
      } else {
        if (!!item) {
          let mid = item.split('　');
          mid = mid[mid.length-1];
          if (item.indexOf('◎') > -1) {
            if (item.indexOf('◎译　　名') > -1) {
              key = 'translateName';
            } else if (item.indexOf('◎片　　名') > -1) {
              key = 'name';
            } else if (item.indexOf('◎年　　代') > -1) {
              key = 'onYear';
            } else if (item.indexOf('◎国　　家') > -1) {
              key = 'country';
            } else if (item.indexOf('◎类　　别') > -1) {
              key = 'categroy';
            } else if (item.indexOf('◎语　　言') > -1) {
              key = 'language';
            } else if (item.indexOf('◎字　　幕') > -1) {
              key = 'subtitles';
            } else if (item.indexOf('◎上映日期') > -1) {
              key = 'onDatetime';
            } else if (item.indexOf('◎IMDb评分') > -1) {
              key = 'IMDb';
            } else if (item.indexOf('◎文件格式') > -1) {
              key = 'fileType';
            } else if (item.indexOf('◎视频尺寸') > -1) {
              key = 'fileWH';
            } else if (item.indexOf('◎文件大小') > -1) {
              key = 'fileSize';
            } else if (item.indexOf('◎片　　长') > -1) {
              key = 'fileTimeLong';
            } else if (item.indexOf('◎导　　演') > -1) {
              key = 'director';
            } else if (item.indexOf('◎主　　演') > -1) {
              key = 'staring';
            } else if (item.indexOf('◎简　　介') > -1) {
              key = 'abstract';
            } else if (item.indexOf('◎获奖情况') > -1) {
              key = 'prize';
            }
            if (key === 'abstract' || key === 'prize') {
              li[key] = [];
            } else if (key === 'staring') {
              li[key] = [mid];
            } else {
              li[key] = mid;
            }
          } else {
            if (li[key].push) {
              li[key].push(mid);
            } else {
              li[key] += mid;
            }
          }
        }
      }
    })
    saveFile(li);
    if (count >= end) {
      console.log('爬取成功')
    }
    callback();
  })
}, function (err) {
  console.log('--')
})