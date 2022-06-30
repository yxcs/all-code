const router = require('koa-router')()
const inspect = require('util').inspect 
const path = require('path')
const fs = require('fs')
const Busboy = require('busboy')

router.get('/', async (ctx, next) => {
  await ctx.render('index', {
    title: 'Hello Koa 2!'
  })
})

router.get('/string', async (ctx, next) => {
  ctx.body = 'koa2 string'
})

router.get('/json', async (ctx, next) => {
  ctx.body = {
    title: 'koa2 json'
  }
})

router.post('/upload', async (ctx, next) => {
  
})

module.exports = router
