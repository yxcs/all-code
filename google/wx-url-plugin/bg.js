var formalUrl = 'http://popularize-restapi.hzdongwu.com/popularize/user/saveCurrentNum';
var testUrl = 'http://10.8.85.36:8080/popularize/user/saveCurrentNum';

var postUrl = formalUrl;
var myUrl = '';

chrome.tabs.onUpdated.addListener(function(tabId , info) {
    if (info.status == "complete") {
        chrome.tabs.query({'active': true, 'lastFocusedWindow': true}, function (tabs) {
            var url = tabs[0].url;
            myUrl = url
            if(url.indexOf('mp\.weixin\.qq\.com\/cgi-bin\/home?t=home\/index')>0){
                chrome.pageAction.show(tabs[0].id)
				setTimeout(function () {
  				  chrome.tabs.executeScript(tabs[0].id, {code:'window.location.reload()'});
				}, 2 * 60 * 1000)
            }
        });
    }
});

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  if(request.env == 'test') {
  	postUrl = testUrl;
  }else {
  	postUrl = formalUrl;
  }

  chrome.alarms.clearAll(function (wasCleared) {
  	if(wasCleared) {
  	  chrome.alarms.create('GetFocus', {periodInMinutes: 1})
  	}
  })

});

chrome.alarms.onAlarm.addListener(function(alarms) {
  getWxNum(myUrl)
})

function getWxNum(url) {
	$.ajax({
		url: url,
		type: 'GET'
	}).done(function(data) {
		var numI = data.indexOf('<strong class="title">总用户数</strong>');
		if(numI < 10) return
		var startNum = data.lastIndexOf('<em class="number">', numI)
		var endNum = data.lastIndexOf('</em>', numI)
		var num = data.substr(startNum+19, endNum-startNum-19);

		var startName = data.indexOf('wx.cgiData.nick_name = ');
		var endName = data.indexOf('";', startName)
		var name = data.substr(startName+24, endName-startName-24);
		
		var datetime = Date.now();

		var params = {
			gzhName: name,
			num: num,
			currentTime: datetime
		}

		$.ajax({
			url: postUrl,
			type: 'POST',
			dataType:'json',
       		headers:{  
         		Accept:"application/json; charset=utf-8",  "Content-Type":"application/json"  
       		},  
			data: JSON.stringify(params)
		})
		.done(function() {
			console.log("POST success");
		})
		.fail(function() {
			console.log("POST error");
		})
		.always(function() {
			console.log("POST complete");
		});

	}).fail(function() {
		console.log("GET error");
	}).always(function() {
		console.log("GET complete");
	});
}