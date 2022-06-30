var mongoose = require('mongoose');
// 设置mongodb 连接地址
const mongoURL ="mongodb://127.0.0.1:27017/vchat";
// 连接mongodb 设置
mongoose.connect(mongoURL, {
});

// 获取连接信息 并输出
var db = mongoose.connection;
// console.log(db)

// 测试是否连接上
db.on('error', console.error.bind(console, 'mongodb connection error:'));

db.once('open', function() {
    console.log("mongodb connection success！")
});

export default mongoose;