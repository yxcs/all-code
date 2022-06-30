const router = require('koa-router')()
const path = require('path')
const fs = require('fs')
const send = require('koa-send')
const sendFile = require('koa-sendfile')
const archiver = require('archiver')

// 参考文档：https://zhuanlan.zhihu.com/p/35064819

router.prefix('/upload')

router.post('/pic', async (ctx) => {
  console.log(ctx.request.files)
  const file = ctx.request.files.file // 获取上传文件
  const reader = fs.createReadStream(file.path) // 创建可读流
  const ext = file.name.split('.').pop() // 获取上传文件扩展名
  const filePath = path.resolve(__dirname, `../static/${file.name}`) // ${Math.random().toString()}.${ext}
  const upStream = fs.createWriteStream(filePath) // 创建可写流
  reader.pipe(upStream) // 可读流通过管道写入可写流
  return ctx.body = filePath
})

router.get('/download/:name', async (ctx) => {
  const name = ctx.params.name
  const filePath = path.resolve(__dirname, `../static/${name}`)
  ctx.attachment(filePath)
  await sendFile(ctx, filePath)
})

router.get('/downloadAll', async (ctx) => {
  // 将要打包的文件列表
  const list = [{name: '002.txt'},{name: '001.txt'}];
  const zipName = '1.zip';
  const zipStream = fs.createWriteStream(zipName);
  const zip = archiver('zip');
  zip.pipe(zipStream);
  for (let i = 0; i < list.length; i++) {
      // 添加单个文件到压缩包
      zip.append(fs.createReadStream(path.resolve(__dirname, `../static/${list[i].name}`)), { name: list[i].name })
  }
  await zip.finalize();
  ctx.attachment(zipName);
  await send(ctx, zipName);
})

router.get('/download2/:name', async (ctx) => {
  const name = ctx.params.name;
  const path = `upload/${name}`;
  ctx.attachment(decodeURI(path));
  await sendFile(ctx, path);
})

router.get('/downloadDirectory', async (ctx) => {
  // 将要打包的文件列表
  const zipStream = fs.createWriteStream('1.zip');
  const zip = archiver('zip');
  zip.pipe(zipStream);
  // 添加整个文件夹到压缩包
  zip.directory('upload/');
  zip.finalize();
  ctx.attachment(zipName);
  await send(ctx, zipName);
})


module.exports = router