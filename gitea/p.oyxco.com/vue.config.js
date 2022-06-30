module.exports = {
  configureWebpack: config => {
    config.module.rules.push({
      test: /\.md$/,
      loader: 'text-loader'
      // loader: 'vue-markdown-loader'
    });
  }
};