const fs = require('fs')
const path = require('path')
const fileStream = fs.createReadStream('http://static4.biyao.com/pc/www/img/new_master/banner.jpg?v=biyao_0e01908')

console.log(fileStream)