chrome.runtime.onMessage.addListener(function(message) {
  $.ajax({
    type: 'POST',
    contentType: "application/json; charset=utf-8",
    url: 'http://localhost/add',
    data: JSON.stringify({data: encodeURIComponent(message.data)}),
    success: function(data, textStatus, jqXHR) {
      console.log(data)
    },
    error: function(XMLHttpRequest, textStatus, errorThrown) {
      console.log('--------------------')
    },
    dataType: 'json'
  })
})

// $.ajax({
//   type: 'GET',
//   url: 'http://localhost/find',
//   data: {},
//   success: function(data, textStatus, jqXHR) {
//     chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
//       setTimeout(function() {
//         var list = data.slice(0, 10)
//         console.log(list)
//         chrome.tabs.sendMessage(tabs[0].id, {list: list}, function(response) { });
//       }, 0)
//     });
//   },
//   error: function(XMLHttpRequest, textStatus, errorThrown) {
//     console.log('获取详情网页失败')
//   },
//   dataType: 'json'
// });