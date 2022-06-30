// var koa = require('koa');
// var app = new koa();

// // x-response-time

// app.use(function *(next){
//   var start = new Date;
//   yield next;
//   var ms = new Date - start;
//   this.set('X-Response-Time', ms + 'ms');
// });

// // logger

// app.use(function *(next){
//   var start = new Date;
//   yield next;
//   var ms = new Date - start;
//   console.log('%s %s - %s', this.method, this.url, ms);
// });

// // response

// app.use(function *(){
//   this.body = 'Hello World';
// });

// app.listen(3000);

// app.callback(function () { 
//     console.log('-------end----------')
//  })

// var http = require('http');
// var koa = require('koa');
// var app = koa();
// http.createServer(app.callback()).listen(3000);
// http.createServer(app.callback()).listen(3001);

const Koa = require('koa');

// 创建一个Koa对象表示web app本身:
const app = new Koa();
const bodyParser = require('koa-bodyparser');
app.use(bodyParser());
const controller = require('./controller');


app.use(controller());
// 在端口3000监听:
app.listen(3000);
console.log('app started at port 3000...');