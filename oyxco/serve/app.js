const Koa = require('koa')
const app = new Koa()
const views = require('koa-views')
const json = require('koa-json')
const onerror = require('koa-onerror')
const bodyparser = require('koa-bodyparser')
const logger = require('koa-logger')

const cors = require('koa2-cors')
// 登录验证
const jwt = require('koa-jwt')
// 文件上传
const koaBody = require('koa-body')

const config = require('./config/index')

const index = require('./routes/index')
const users = require('./routes/users')
const static = require('./routes/static')
const upload = require('./routes/upload')

const env = process.env.NODE_ENV

// error handler
onerror(app)

// middlewares
app.use(bodyparser({
  enableTypes:['json', 'form', 'text']
}))
app.use(json())
app.use(koaBody({
  multipart: true,
  formidable: {
    maxFileSize: 2 * 1024 * 1024  // 设置上传文件大小最大限制，默认2M
  }
}))
app.use(logger())
app.use(require('koa-static')(__dirname + '/public'))

app.use(views(__dirname + '/views', {
  extension: 'ejs'
})) 

// 跨域
app.use(
  cors({
    origin: function(ctx) { // 设置允许来自指定域名请求
      if (ctx.url === '/test') {
        return '*'; // 允许来自所有域名请求
      }
      return 'http://localhost:4000'; //只允许http://localhost:8080这个域名的请求
    },
    maxAge: 5, //指定本次预检请求的有效期，单位为秒。
    credentials: true, //是否允许发送Cookie
    allowMethods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'], //设置所允许的HTTP请求方法'
  })
);
// jwt
app.use(async (ctx, next) => {
  return next().catch((err) => {
    if (err.status === 401) {
      // 自定义返回结果
      ctx.status = 401;
      ctx.body = {
        code: 401,
        msg: err.message
      }
    } else {
      throw err;
    }
  })
});

// app.use(jwt({ secret: config.SECRET }).unless({
//   // 登录接口不需要验证
//   path: [/^\/users\/login/, /^\/static/, /^\/upload/]
// }));


// logger
app.use(async (ctx, next) => {
  const start = new Date()
  await next()
  const ms = new Date() - start
  console.log(`${ctx.method} ${ctx.url} - ${ms}ms`)
})

// routes
app.use(index.routes(), index.allowedMethods())
app.use(users.routes(), users.allowedMethods())
app.use(static.routes(), static.allowedMethods())
app.use(upload.routes(), upload.allowedMethods())

// error-handling
app.on('error', (err, ctx) => {
  console.error('server error', err, ctx)
});

module.exports = app
