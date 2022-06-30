const mysql = require('mysql');
const jsonfile = require('jsonfile')
const path = require('path')

const file = path.join(__dirname, '/data/tt.json')
let data = jsonfile.readFileSync(file)

data = data.map(item => {
  return [
    item.url,
    item.date,
    item.cover,
    item.title,
    item.mTitle,
    item.type,
    item.digest,
    item.source
  ]
})

const connection = mysql.createConnection({
  host: 'localhost', // 填写你的mysql host
  user: 'root', // 填写你的mysql用户名
  password: '', // 填写你的mysql密码
  database: 'store'
})

connection.connect(err => {
  if(err) throw err;
  console.log('mysql connncted success!');
  const sql = `INSERT INTO bookmark(url, date, cover, title, mTitle, type, digest, source) VALUES ?`;
  const values = [...data]
  connection.query(sql, [values], (err, result) => {
    if (err) throw err;
    console.log(`insert ${result.affectedRows} data to fe_frame success!`  )
  })
})
