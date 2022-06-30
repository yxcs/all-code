var mongoose = require('../db.js'),
  Schema = mongoose.Schema;

var CategorySchema = new Schema({
  onlyId: { type: String },                                // 唯一id
  name: { type: String },                                  // 类型名称
  type: { type: String },                                  // 类型
  mainName: { type: String },                              // 主类型名称
  category: { type: String },                              // 主类型
  linkTo: { type: String },                                // 对应链接
  updateAt: { type: Date, default:Date.now }               // 更新时间
});

module.exports = mongoose.model('Category', CategorySchema);