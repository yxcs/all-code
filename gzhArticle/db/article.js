var mongoose = require('./connect.js');
var Schema = mongoose.Schema;

var ArticleSchema = new Schema({          
  title: {type: String },
  digest: {type: String},
  content: {type: String},
  content_url: {type: String},
  source_url: {type: String},
  cover: {type: String}
});

module.exports = mongoose.model('Article', ArticleSchema);