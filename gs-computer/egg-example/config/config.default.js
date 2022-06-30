exports.keys = '27018';
// 添加 view 配置
exports.view = {
  defaultViewEngine: 'nunjucks',
  mapping: {
    '.tpl': 'nunjucks',
  },
};
// services配置
exports.news = {
  pageSize: 5,
  serverUrl: 'https://hacker-news.firebaseio.com/v0',
};
// 中间件配置
exports.middleware = [
  'robot'
];
// 给中间件配置数据
exports.robot = {
  ua: [
    /Baiduspider/i,
  ]
};