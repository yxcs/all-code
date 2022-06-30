var mongoose = require('../db.js'),
    Schema = mongoose.Schema;

var DynastySchema = new Schema({
    parentName: { type: String },                            // 隶属朝代
    name : { type: String },                                 // 朝代名称
    pinyin: { type: String },                                // 朝代拼音
    years: { type: String },                                 // 朝代年限
    onlyId: { type: Number },                                // 唯一id
    stateFound: { type: String },                            // 朝代建立者
    capital: { type: String },                               // 朝代都会
    nowLocation: { type: String },                           // 朝代都会今址
    nation: { type: String },                                // 朝代民族
    updateAt: { type: Date, default:Date.now }               // 更新时间
});

module.exports = mongoose.model('Dynasty', DynastySchema);