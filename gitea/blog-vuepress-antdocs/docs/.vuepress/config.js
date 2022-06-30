var path = require('path')
module.exports = {
  theme: "antdocs",
  title: "鱼鹿博客", // 且汝梦为鸟而厉乎天,梦为鱼而没于渊 || 此身天地一蘧庐，世事消磨绿鬓疏。毕竟几人真得鹿，不知终日梦为鱼。
  description: "毕竟几人真得鹿，不知终日梦为鱼",
  base: "/",
  dest: path.resolve(__dirname, "../../dist"),
  head: [
    ["link",{ rel: "icon",href: "/assets/logo100x100.png" }]
  ],
  markdown: {
    lineNumbers: true
  },
  plugins: [
    'flowchart',
    [
      'mathjax',
      {
        'type': 'chtml'
      }
    ],
    'mermaidjs',
    '@vuepress/back-to-top',
    [
      '@vuepress/medium-zoom',
      {
        selector: '.theme-antdocs-content :not(a) > img',
        options: {
          margin: 16
        }
      },
    ],
    '@vuepress/nprogress',
    [
      '@vssue/vuepress-plugin-vssue',
      {
        platform: 'github-v4', //v3的platform是github，v4的是github-v4
        locale: 'zh', //语言
        // 其他的 Vssue 配置
        owner: 'yxcs', //github账户名
        repo: 'blogDiscuss', //github一个项目的名称
        clientId: '10290aa7e7b7a1290ceb',//注册的Client ID
        clientSecret: '32b452eb54d3c2a2d9279ace646c192193c788c7',//注册的Client Secret
        autoCreateIssue: true // 自动创建评论，默认是false，最好开启，这样首次进入页面的时候就不用去点击创建评论的按钮了。
      }
    ]
  ],
  themeConfig: {
    logo: '/assets/logo100x100.png',
    smoothScroll: true,
    nav: require("./config/nav"),
    sidebar: require("./config/sidebar"),
    lastUpdated: "最近更新",
    repo: "https://github.com/yxcs",
    editLinks: false,
    ads: {
      style: 3, 
      title: '赞助商', 
      btnText: '成为赞助商',
      msgTitle: '成为赞助商',
      msgText: '如果您有品牌推广、活动推广、招聘推广、社区合作等需求，欢迎联系我们，成为赞助商。您的广告将出现在 鱼鹿博客 文档侧边栏等页面。',
      msgOkText: '确定',
    },
  },
};