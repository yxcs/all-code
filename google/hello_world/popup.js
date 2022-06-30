(function() {

var postUrl = 'http://popularize-restapi.hzdongwu.com/popularize/user/saveCurrentNum';

$('#btn-test').click(function() {
  postUrl = 'http://10.8.85.36:8080/popularize/user/saveCurrentNum';
  chrome.tabs.executeScript(null,{code:'window.location.reload()'});
})

$('#btn-formal').click(function() {
  postUrl = 'http://popularize-restapi.hzdongwu.com/popularize/user/saveCurrentNum';
  chrome.tabs.executeScript(null,{code:'window.location.reload()'});
})

chrome.webNavigation.onCompleted.addListener(function( tab ){
　var url = tab.url;
  if(url.indexOf('mp\.weixin\.qq\.com\/cgi-bin\/home?t=home\/index')>0) {
    chrome.alarms.create('postAlarm', {periodInMinutes: 1})
    chrome.alarms.onAlarm.addListener(function(alarms) {
      getWxNum(url)
    })
  }
});

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
      chrome.tabs.executeScript(null,{code:'console.log("111")'});
    })
  })
}

	
})()