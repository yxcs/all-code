var postUrl = 'http://popularize-restapi.hzdongwu.com/popularize/user/saveCurrentNum';

chrome.browserAction.onClicked.addListener(function (tabs) {
  if(postUrl.indexOf('restapi')>0) {
  	postUrl = 'http://10.8.85.36:8080/popularize/user/saveCurrentNum';
  	console.log('测试环境')
  }else {
  	postUrl = 'http://popularize-restapi.hzdongwu.com/popularize/user/saveCurrentNum';
  	console.log('正式环境')
  }
})

chrome.webNavigation.onCompleted.addListener(function( tab ){
  var url = tab.url;
  if(url.indexOf('mp\.weixin\.qq\.com\/cgi-bin\/home?t=home\/index')>0) {
  	sendMsg(tab.tabId);
  }
});

function sendMsg(tabid){
　console.log(tabid + "--sendMsg()----eventPage.js");
　chrome.tabs.sendMessage(tabid, {greeting: "start working", run: true}, function(response) {});
}

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  getWxNum(request.name,request.num)
});

function getWxNum(name, num) {
	var params = {
	  gzhName: name,
	  num: num,
	  currentTime: Date.now()
	}

	$.ajax({
	  url: postUrl,
	  type: 'POST',
	  dataType:'json',
      headers:{  
        Accept:"application/json; charset=utf-8",  "Content-Type":"application/json"  
      },  
	  data: JSON.stringify(params)
	}).done(function() {
	  console.log("POST success");
	}).fail(function() {
	  console.log("POST error");
	}).always(function() {
	  console.log("POST complete");
	});

}