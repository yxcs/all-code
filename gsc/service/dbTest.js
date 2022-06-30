var Link = require("./link/links");
const query = Link.find({});
query.count().exec(function (err, c) {
  console.log(c);
});

db.links.aggregate([
  {
      $group: { _id: {linkTo: '$linkTo'},count: {$sum: 1},dups: {$addToSet: '$_id'}}
  },
  {
      $match: {count: {$gt: 1}}
  }
]).forEach(function(doc){
  doc.dups.shift();
  db.links.remove({_id: {$in: doc.dups}});
})