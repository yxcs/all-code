var readline = require('linebyline');
var rl = readline('./前端教程.txt');
var textStr = '';
var obj = [];
rl.on('line', function(line, lineCount, byteCount) {
  textStr += line;
})
.on('error', function(e) {
  // something went wrong
}).on('end', function (data) {
  textStr = textStr.replace(/\\\"/gim, '\"');
  var start = 0;
  var end = 0;
  var str;
  start = textStr.indexOf('\{\"ret\"\:0');
  end = textStr.indexOf('\"real_type\"\:0\}', start);
  console.log(start)
  console.log(end)
  console.log(textStr)
  while(start > -1 && end > -1) {
    end = textStr.indexOf('real_type', start);
    str = textStr.substring(start, end);
    start = textStr.indexOf('\{\"ret\"\:0', end);
  }
});