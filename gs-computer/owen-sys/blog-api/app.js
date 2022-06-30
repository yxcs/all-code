var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var expressJWT = require('express-jwt');

var config = require('./config')

var indexRouter = require('./routes/index');
var adminRouter = require('./routes/admin');
var v1Router = require('./routes/v1');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// 设置允许跨域访问该服务
app.all('*', function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  //Access-Control-Allow-Headers ,可根据浏览器的F12查看,把对应的粘贴在这里就行
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  res.header('Access-Control-Allow-Methods', '*');
  res.header('Content-Type', 'application/json;charset=utf-8');
  next();
});

app.use(expressJWT({
  secret: config.secretKey   
}).unless({
  path: [ //除了这个地址，其他的URL都需要验证
    '/v1/login',
    '/v1/register',
    '/admin/login',
    '/admin/register'
  ]
}));

app.use(function (err, req, res, next) {
  if (err && err.name === 'UnauthorizedError') {
    if (err.code === 'credentials_required') {
      res.status(401).send({
        code: 10401,
        msg: '请先登录',
        data: []
      });
    } else if (err.inner.name === 'TokenExpiredError') {
      res.status(401).send({
        code: 10402,
        msg: '登录已过期，请重新登录',
        data: []
      });
    } else {
      // err.inner.name === 'JsonWebTokenError'
      res.status(401).send({
        code: 10403,
        msg: '登录信息有误，请重新登录',
        data: []
      });
    }
  }
});

app.use('/', indexRouter);
app.use('/admin', adminRouter);
app.use('/v1', v1Router);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
