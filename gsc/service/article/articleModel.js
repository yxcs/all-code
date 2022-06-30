var mongoose = require('./db.js'),
    Schema = mongoose.Schema;

var ArticleSchema = new Schema({
    onlyId: { type: String },                                // 唯一id
    name: { type: String },                                  // 名称
    dynasty : { type: String },                              // 诗歌朝代
    author: { type: String },                                // 作者
    content: { type: Array },                                // 诗歌内容
    translate: { type: Array },                              // 古文翻译
    translate_res: { type: Array },                          // 翻译、注释参考
    tags: { type: Array },                                   // 诗歌标签
    notes: { type: Array },                                  // 古文注释
    reference: { type: Array },                              // 参照
    appreciation: { type: Array },                          // 赏析
    appreciation_res: { type: Array },                      // 赏析参考
    sourceLink: { type: String },                            // 来源链接
    type: { type: String },                                  // 类型
    form: { type: String  },                                 // 来自
    updateAt: { type: Date, default:Date.now }               // 更新时间
});

module.exports = mongoose.model('Article', ArticleSchema);