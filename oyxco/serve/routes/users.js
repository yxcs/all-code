const router = require('koa-router')()
const path = require('path')

const jsonwebtoken = require('jsonwebtoken')
const config = require('../config/index')
const utils = require('../utils/index')

const USER = {
  username: 'admin',
  password: '123456',
  id: 100
}

router.prefix('/users')

router.post('/login', async (ctx, next) => {
  const { body } = ctx.request
  let checkUser = body.username == USER.username && body.password == USER.password;
  if (checkUser) {
    const token = jsonwebtoken.sign(
      { name: USER.username, id: USER.id },
      config.SECRET,
      { expiresIn: '1h' }
    )
    ctx.body = {
      username: USER.username,
      id: USER.id,
      token: token
    }
  } else {
    ctx.body = 'error'
  }
})

router.get('/verify', async (ctx, next) => {
  const { body } = ctx.request
  console.log(ctx.header)
  const payload = await utils.jwtPayload(ctx.header)
  ctx.body = payload
})

module.exports = router
