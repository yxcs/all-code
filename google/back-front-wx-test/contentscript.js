setTimeout(function() {
	window.location.reload();
}, 1*60*1000)

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  console.log(request.greeting)
  if(request.run) {
  	var name = $(".nickname").text();
  	var num = $(".total_fans").find('.number').text();
  	sendMsg(name, num)
  }
});

function sendMsg( name, num){
　　chrome.runtime.sendMessage({"name": name, "num": num}, function(response) {});
}