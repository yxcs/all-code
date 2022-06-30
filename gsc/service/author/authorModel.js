var mongoose = require('../db.js'),
    Schema = mongoose.Schema;

var AuthorSchema = new Schema({
  onlyId: { type: String },
  author : { type: String },
  dynasty: { type: String },
  quantity: { type: Number },
  lifetime: { type: String },
  avatar: { type: String, default: 'defaul;' },
  describe: { type: Array },   // Schema.Types.Mixed
  updateAt: { type: Date, default:Date.now }
});

module.exports = mongoose.model('Author', AuthorSchema);