var mongoose = require('../db.js'),
    Schema = mongoose.Schema;

var GzxArticleSchema = new Schema({
    title: { type: String },
    digest: { type: String },
    content: { type: String },
    fileid: { type: Number },
    content_url: { type: String },
    source_url: { type: String },
    cover: { type: String },
    subtype: { type: Number },
    is_multi: { type: Number },
    multi_app_msg_item_list: { type: Array, default: [] },
    author: { type: String },
    copyright_stat: { type: Number },
    duration: { type: Number },
    del_flag: { type: Number },
    item_show_type: { type: Number },
    audio_fileid: { type: Number },
    play_url: { type: String },
    malicious_title_reason_id: { type: Number },
    malicious_content_type: { type: Number },
    id: { type: String },
    type: { type: String },
    datetime: { type: String },
    fakeid: { type: String },
    status: { type: String },
    articleSource: { type: String },
    updateAt: { type: Date, default:Date.now },
});

module.exports = mongoose.model('GzxArticle', GzxArticleSchema);