$('#btn-test').click(function(event) {
	chrome.runtime.sendMessage({env: 'test'}, function(response) {});
	$('#btn-formal').removeClass("selected");
	$(this).addClass("selected");
	chrome.storage.local.set({'status': 'test'})
});
$('#btn-formal').click(function(event) {
	chrome.runtime.sendMessage({env: 'formal'}, function(response) {});
	$('#btn-test').removeClass("selected");
	$(this).addClass("selected");
	chrome.storage.local.set({'status': 'formal'})
});

chrome.storage.local.get('status', function(result) {
	if(result.status == 'test') {
	  $('#btn-formal').removeClass("selected");
	  $('#btn-test').addClass("selected");
	  chrome.runtime.sendMessage({env: 'test'}, function(response) {});
	}else if(result.status == 'formal'){
	  $('#btn-test').removeClass("selected");
	  $('#btn-formal').addClass("selected");
	  chrome.runtime.sendMessage({env: 'formal'}, function(response) {});
	}else {
	  chrome.runtime.sendMessage({env: 'formal'}, function(response) {});
	  chrome.storage.local.set({'status': 'formal'})
	}
})