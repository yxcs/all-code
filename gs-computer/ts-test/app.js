// Run with:
// cat file.txt | node app.js

// process.stdin.resume()
// process.stdin.setEncoding('utf8')

// process.stdin.on('data', function (text) {
//   process.stdout.write(text.toUpperCase())
// })
// console.log(process.arch)
// console.log(process.platform)
// console.log(process.argv)
// let cprocess = require('child_process')
// // cprocess.exec('curl http://www.weather.com.cn/data/sk/101010100.html', function (err, stdout, stderr) {
// //   console.log(stdout)
// // })
// cprocess.exec('npm -v', function (err, d, se) {
//   console.log(d)
// })

// console.log(process)

// var fs = require('fs')
// fs.readFile('hi.jpg', function (err, img) {
//   var mime = 'image/jpg'
//   var encodeing = 'base64'
//   var data = img.toString(encodeing)
//   var uri = 'data:' + mime + ';' + encodeing + ',' + data
//   console.log(uri)
// })

// console.log(8..toString(2))

var fs = require('events')