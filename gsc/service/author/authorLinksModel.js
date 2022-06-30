var mongoose = require('../db.js'),
    Schema = mongoose.Schema;

var AuthorLinkSchema = new Schema({
    detailLink: { type: String },
    worksLink: { type: String },
    worksNum: { type: Number },
    pager: { type: Number },
    updateAt: { type: Date, default:Date.now }
});

module.exports = mongoose.model('AuthorLink', AuthorLinkSchema);