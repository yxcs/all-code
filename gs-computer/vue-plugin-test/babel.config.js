module.exports = {
  presets: ["@vue/app"],
  plugins: [
    [
      "component",
      {
        libraryName: "@by/by-ui",
        // 因为有指令和过滤器等无css的文件，故此设为false
        style: false
      }
    ]
  ]
};
