module.exports = {
  pages: {
    index: {
      entry: 'src/main.js', // page 的入口
      template: 'src/public/index.html', // 模板来源
      filename: 'index.html', // 在 dist/index.html 的输出
      // 在这个页面中包含的块，默认情况下会包含,提取出来的通用 chunk 和 vendor chunk。
      chunks: ['chunk-vendors', 'chunk-common', 'index']
    },
    test: {
      entry: 'src/test/index.js',
      template: 'src/public/index.html',
      filename: 'test.html',
      chunks: ['chunk-vendors', 'chunk-common', 'test']
    }
  }
}