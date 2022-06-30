var Article = require("./article.js");
// var data = require('../data/qukuailiaodabenying.json');

/**
 * 插入
 */
function insert(item, idx) {

  var article = new Article(item);

  article.save(function (err, res) {
    if (err) {
      console.log('插入第'+idx+'条失败');
    }
    else {
      console.log('插入第'+idx+'条成功');
    }
  });
}

// var len = data.length;
// var idx = 0;
// console.log('一共'+len+'条');

// var timer = setInterval(function() {
//   if (idx >= len) {
//     clearInterval(timer);
//     timer = null;
//     console.log('-- =END= --');
//   } else {
//     insert(data[idx], idx);
//     idx++;
//   }
// }, 1000);