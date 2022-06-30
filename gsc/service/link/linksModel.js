var mongoose = require('../db.js'),
    Schema = mongoose.Schema;

var LinkSchema = new Schema({
    linkTo: { type: String },                                // 链接
    type: { type: String },                                  // 类型
    updateAt: { type: Date, default:Date.now }               // 更新时间
});

module.exports = mongoose.model('Link', LinkSchema);