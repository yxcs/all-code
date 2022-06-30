var timmer = setTimeout(function() {
    window.location.reload();
}, 3 * 60 * 1000)

chrome.extension.onMessage.addListener(function(request, sender, sendResponse) {
	clearTimeout(timmer)
});