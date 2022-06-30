const cheerio = require('cheerio'); 
const async = require('async'); 
const fs = require('fs');
var request = require('request');
const iconv = require('iconv-lite')

var dbLen = 0;
var MongoClient = require('mongodb').MongoClient;
var dbURL = 'mongodb://localhost:27017';
MongoClient.connect(dbURL,function(err, db) {
  const movies = db.db('movies');
  const col = movies.collection('movies_1080p');
  const inCol= movies.collection('movie_list');
  col.find().toArray(function(err, docs){
    console.log('find');
    dbLen = docs.length;
    subData = docs.slice(0);
    try {
      getDewtails(inCol, subData, db);
    } catch(err) {
      console.error(err);
    }
  });
})

// getDewtails()

function getDewtails(inCol, list, db) {
  console.log('共' + dbLen + '个');
  var count = 1;
  async.eachSeries(list, function (current, callback) {
    request({
      method: 'GET',
      uri: current.linkTo,
      encoding: null
    }, function (error, response, body) {
      if (error) {
        console.log(error)
      }
      let baseData = iconv.decode(body, 'GBK');
      let $ = cheerio.load(baseData, { decodeEntities: false });
      let li = current;
      li.categray = '1080p';
      li.smallImg = $('.border1 img').eq(0).attr('src');
      let con = $('#dede_content');
      let pHtml= [];
      let startIdx = 1;
      if (con.find('p').eq(0).find('br').length) {
        li.bigImg = con.find('p').eq(0).find('img').attr('src');
        pHtml = con.find('p').eq(0).html();
        pHtml = pHtml && pHtml.split ? pHtml.split('<br>') : [];
        if (pHtml.length > 1) {
          pHtml = pHtml.slice(1);
        } 
        startIdx = 0;
      } else {
        pHtml = con.find('p').eq(1).html();
        pHtml = pHtml && pHtml.split ? pHtml.split('<br>') : [];
        startIdx = 1;
      }
      let key = 'alias';
      pHtml.map(function (item, idx) {
        if (!idx) {
          li.allTitle = item;
        } else {
          if (!!item) {
            let mid = item;
            if (item.indexOf('◎') > -1) {
              if (item.indexOf('◎译　　名') > -1) {
                key = 'alias';
              } else if (item.indexOf('◎片　　名') > -1) {
                key = 'title';
              } else if (item.indexOf('◎中文　名') > -1) {
                key = 'chinaName';
              } else if (item.indexOf('◎年　　代') > -1) {
                key = 'onYear';
              } else if (item.indexOf('◎集　　数') > -1) {
                key = 'episodes';
              } else if (item.indexOf('◎国　　家') > -1) {
                key = 'country';
              } else if (item.indexOf('◎产　　地') > -1) {
                key = 'madeIn';
              } else if (item.indexOf('◎类　　别') > -1) {
                key = 'family';
              } else if (item.indexOf('◎语　　言') > -1) {
                key = 'language';
              } else if (item.indexOf('◎字　　幕') > -1) {
                key = 'subtitles';
              } else if (item.indexOf('◎上映日期') > -1) {
                key = 'onDatetime';
              } else if (item.indexOf('◎IMDb评分') > -1) {
                key = 'IMDb';
              } else if (item.indexOf('◎豆瓣评分') > -1) {
                key = 'touban';
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
              }
              if (key === 'staring') {
                li[key] = [mid];
              } else {
                li[key] = mid;
              }
            } else {
              if (li[key] && li[key].push) {
                li[key].push(mid);
              } else {
                li[key] += mid;
              }
            }
          }
        }
      })
      li.abstract = [];
      li.detailImg = [];
      let stop = false;
      con.find('p').each(function (idx, item) {
        const len = $(item).find('img').length;
        const text = $(item).text();
        if (idx > startIdx && !stop) {
          if (len || text.indexOf('【下载地址】') > -1) {
            stop = true;
          } else {
            if (text.indexOf('◎简　　介') > -1) {
              li.abstract.push(text)
            }
            if (text.indexOf('◎简　　介') < 0 && !len) {
              li.abstract.push(text);
            }
          }
        }
        if( idx > startIdx && len) {
          li.detailImg.push($(item).find('img').attr('src'));
        }
      })
  
      let table = $(con).find('table').eq(0);
      li.downloadList = [];
      table.find('td').each(function (idx, item) {
        let dText = $(item).text();
        if (!!li.episodes) {
          li.downloadList.push({linkType: 'episodes', html: $(item).html()})
        } else {
          if (dText.indexOf('在线观看：') > -1) {
            li.downloadList.push({linkType: 'online', linkTo: $(item).find('a').attr('href')})
          } else if (dText.indexOf('磁力：') > -1) {
            li.downloadList.push({linkType: 'xunlei', linkTo: $(item).find('a').attr('href')})
          } else if (dText.indexOf('电驴：') > -1) {
            li.downloadList.push({linkType: 'dianlv', linkTo: $(item).find('a').attr('href')})
          } else if (dText.indexOf('网盘链接：') > -1) {
            let dHtml = $(item).html();
            dHtml = dHtml && dHtml.split ? dHtml.split('<br>') : [];
            if (dHtml.length > 1) {
              dHtml = dHtml[1]
              dHtml = dHtml.split('：')[1];
            }
            li.downloadList.push({linkType: 'pan', linkTo: $(item).find('a').attr('href'), code: dHtml})
          }
        }
      })

      li.content = [];
      con.find('p').each(function (idx, item) {
        li.content.push({html: $(item).html()});
      })

      inCol.insert(li, function(error, result) {
        console.log('第'+count+'个 ==>  '+li.linkTo + '==>   已完成');
        count ++;
        callback();
      })
  
    })
  }, function (err) {
    console.log('---------------------------')
    console.log(err)
  })
}