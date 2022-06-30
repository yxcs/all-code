var fs = require('fs')
var path = require('path')
var rimraf = require('rimraf')

var delUrl = []
function delete_modules(uri) {
  var files = fs.readdirSync(uri)
  for (var i = 0; i < files.length; i++) {
    if (files[i] !== '$RECYCLE.BIN' && files[i] !== 'System Volume Information') {
      var curUrl = path.join(uri, files[i])
      if (curUrl.indexOf('node_modules') > -1 &&  curUrl.indexOf('node_modules') === curUrl.lastIndexOf('node_modules')) {
        delUrl.push(curUrl)
      } else {
        if (fs.statSync(curUrl).isDirectory()) {
          delete_modules(curUrl)
        }
      }
    }
  }
}
delete_modules('F:/tools/')


delUrl.forEach(item => {
  rimraf(item, function () {
    console.log('删除 -> ', item)
  })
})