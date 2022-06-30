var postUrl = 'http://popularize-restapi.hzdongwu.com';
console.log('默认为正式环境')

chrome.browserAction.onClicked.addListener(function (tabs) {
  if(postUrl.indexOf('restapi')>0) {
  	postUrl = 'http://10.8.185.32:8080';
  	console.log('测试环境')
	chrome.browserAction.setIcon({path: './dw2.png'})
  }else {
  	postUrl = 'http://popularize-restapi.hzdongwu.com';
  	console.log('正式环境')
	  chrome.browserAction.setIcon({path: './dw1.png'})
  }
})

var myUrl = [];
var tabId = '';
chrome.webNavigation.onCompleted.addListener(function(tab){
　var url = tab.url; 

  if(url.indexOf('mp\.weixin\.qq\.com\/cgi-bin\/home?t=home\/index')>0) {

		myUrl = url;
		tabId = tab.tabId;
		
		chrome.alarms.clearAll(function (wasCleared) {
  	  if(wasCleared) {
  	    chrome.alarms.create('GetFocus', {periodInMinutes: 1})
  	  }
    })

  }
});

chrome.alarms.onAlarm.addListener(function(alarms) {
  getWxNum(myUrl)
})

function getWxNum(url) {
	$.ajax({
		url: url,
		type: 'GET'
	}).done(function(data) {
		var numI = data.indexOf('总用户数');
		if(numI < 10) {
			chrome.tabs.sendMessage(tabId, {close: 'OK'})
			chrome.storage.local.get('gzhName', function(v) {

			  $.ajax({
				  url: postUrl + '/warning/gzhNum',
				  type: 'POST',
				  dataType:'json',
       		headers:{  
         		Accept:"application/json; charset=utf-8",  "Content-Type":"application/json"  
       		},  
				  data: JSON.stringify({key: 123456, gzhName: v.gzhName})
			  }).done(function(data) {
				  console.log("POST success");
				  chrome.alarms.clearAll(function (wasCleared) {
  	  			  	if(wasCleared) {
  	    				console.log('Close')
  	  			  	}
  	  			  })
			  })
			  .fail(function(err) {
				  console.log(err);
			  })

			});

			return 0;
		}
		
		var startNum = data.indexOf('<a href="', numI)
		startNum = data.indexOf('>', startNum)
		var endNum = data.indexOf('</a>', startNum)
		var num = data.substr(startNum+1, endNum-startNum-1);

		var startName = data.indexOf('wx.cgiData.nick_name = ');
		var endName = data.indexOf('";', startName)
		var name = data.substr(startName+24, endName-startName-24);
		
		var datetime = Date.now();

		var params = {
			gzhName: name,
			num: num,
			currentTime: datetime
		}

		chrome.storage.local.set({'gzhName': name});

		$.ajax({
			url: postUrl+'/popularize/user/saveCurrentNum',
			type: 'POST',
			dataType:'json',
      headers:{  
      	Accept:"application/json; charset=utf-8",  "Content-Type":"application/json"  
      },  
			data: JSON.stringify(params)
		}).done(function(data) {
			console.log("POST success");
		})
		.fail(function() {
			console.log("POST error");
		})

	}).fail(function() {
		console.log("GET error");
	})
}