var mongoose = require('../db.js'),
    Schema = mongoose.Schema;

var CipaiSchema = new Schema({
    name: { type: String },
    description: { type: String },
    sourceLinkTo: { type: String },
    pager: { type: Number },
    updateAt: { type: Date, default:Date.now }
});

module.exports = mongoose.model('Cipai', CipaiSchema);