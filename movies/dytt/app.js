const cheerio = require('cheerio'); 
const async = require('async'); 
const fs = require('fs');
const url = require('url');
const axios = require('axios')
var request = require('request');
const qs = require('qs');
const iconv = require('iconv-lite');

const api = {
  async get (url, data) {
    try {
      let res = await axios.get(url, {params: data})
      res = res.data
      return new Promise((resolve) => {
        if (res.code === 0) {
          resolve(res)
        } else {
          resolve(res)
        }
      })
    } catch (err) {
      alert('服务器出错')
      console.log(err)
    }
  },
  async post (url, data) {
    try {
      let res = await axios.post(url, qs.stringify(data))
      res = res.data
      return new Promise((resolve, reject) => {
        if (res.code === 0) {
          resolve(res)
        } else {
          reject(res)
        }
      })
    } catch (err) {
      // return (e.message)
      alert('服务器出错')
      console.log(err)
    }
  },
}

function saveFile (data) {
  fs.appendFile('tt.json', JSON.stringify(data) ,'utf-8', function (err) {
    if(err) throw new Error("appendFile failed...");
    console.log("数据写入success...");
  });
}

const len = 205;
const urls = [];
const jsonData = [];
let idx = 0;
for (var i = 1; i <= len; i ++) {
  urls.push('http://www.ygdy8.net/html/gndy/oumei/list_7_'+i+'.html');
}
async.each(urls, function (url) {
  request({
    method: 'GET',
    uri: url,
    encoding: null
  }, function (error, response, body) {
    if (error) {
      console.log(error)
    }
    idx ++;
    let baseData = iconv.decode(body, 'GBK');
    let $ = cheerio.load(baseData, { decodeEntities: false });
    const items = $('.tbspan .ulink');
    items.each(function (index, item) {
      const jsonItem = {};
      jsonItem.title = $(item).text();
      jsonItem.linkTo = $(item).attr('href');
      jsonData.push(jsonItem);
    })
    console.log('成功'+idx+'个');
    if (idx >= len) {
      saveFile(jsonData);
    }
  })
}, function(err){
  console.log(err)
});