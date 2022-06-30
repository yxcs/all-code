const Pageres = require('pageres');
const options = {
  scale: 2,
  headers: {
    'Cookie': 'PHPSESSID=f07724c43b1d039b1616cb2f849a779f; UM_distinctid=167538f273e21f-0604bb693a2904-6655742e-144000-167538f273f1f2; CNZZDATA1257158697=153749170-1543295128-null%7C1543654045',
    'Proxy-Connection': 'keep-alive'
  }
}
const pageres = new Pageres({delay: 2})
    // .src('yeoman.io', ['480x320', '1024x768', 'iphone 5s'], {crop: true})
    .src('http://www.happi123.com/jianpu/qyiBa1mPa.html', ['375x667'], options)
    .dest(__dirname)
    .run()
    .then(() => console.log('done'));