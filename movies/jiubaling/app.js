const cheerio = require('cheerio');
const async = require('async');
const fs = require('fs');
var request = require('request');
const iconv = require('iconv-lite');

var base = 'https://www.95kp.com';
var baseUrl = 'https://www.95kp.com/?m=vod-type-id-1-pg-';
var pager = [];
var len = 179;
var linkTo = [];

for (var i = 1; i <= len; i ++) {
	if (i === 1) {
		pager.push('https://www.95kp.com/?m=vod-type-id-1.html');
	} else {
		pager.push(baseUrl + i + '.html');
	}
}

function fetchData (uri, cb) {
	linkTo = [];
	request({
		method: 'GET',
		uri: uri,
		encoding: null
	}, function (error, response, body) {
		if (error) {
			console.log(error)
			console.log('-----------------------请求出错-----------------------')
		}
		let baseData = iconv.decode(body, 'GBK');
		let $ = cheerio.load(baseData, { decodeEntities: false });
		$('.stui-vodlist__thumb').each(function (idc, item) {
			var url = $(item.attribs('href'));
			if (!!url) {
				linkTo.push(base + url);
			}
		})

		cb();
	}, function (err) {
		console.log('-----------出错了！-----------')
		console.log(err)
	})
}

function fetchDetail(uri, cb) {
	request({
		method: 'GET',
		uri: uri,
		encoding: null
	}, function (error, response, body) {
		if (error) {
			console.log(error)
			console.log('-----------------------详情请求出错-----------------------')
		}
		let baseData = iconv.decode(body, 'GBK');
		let $ = cheerio.load(baseData, { decodeEntities: false });
		var li = {};
		li.coverImage = $('.stui-vodlist__thumb.v-thumb.lazyload');
		li.coverImage = $(li.coverImage).css('background-image');
		li.coverImage = li.coverImage.split('\"');
		li.coverImage = li.coverImage[1];
		li.title = $('.stui-content__detail .title').text();
		//  cb();
	}, function (err) {
		console.log('-----------详情出错了！-----------')
		console.log(err)
	})
}


async.eachSeries(pager, function (url, callback) {
	fetchData(url, function () {
		async.eachSeries(linkTo, function (dUrl, dCallback) {

		}, function (data) {
			console.log('当前页抓取完毕')
		})
	});
}, function(data) {
	console.log('抓取结束');
})