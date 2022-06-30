module.exports = {
  title: '蜗牛博客',
  description: '抓不住似水流年，逃不过此间少年',
  head: [
    ['link', { rel: 'icon', href: '/logo.png' }],
    ['link', { rel: 'manifest', href: '/manifest.json' }],
    ['meta', { name: 'theme-color', content: '#3eaf7c' }],
    ['meta', { name: 'apple-mobile-web-app-capable', content: 'yes' }],
    ['meta', { name: 'apple-mobile-web-app-status-bar-style', content: 'black' }],
    ['link', { rel: 'apple-touch-icon', href: '/icons/apple-touch-icon-152x152.png' }],
    ['link', { rel: 'mask-icon', href: '/icons/safari-pinned-tab.svg', color: '#3eaf7c' }],
    ['meta', { name: 'msapplication-TileImage', content: '/icons/msapplication-icon-144x144.png' }],
    ['meta', { name: 'msapplication-TileColor', content: '#000000' }],
    ['script', { src: 'https://cdn.jsdelivr.net/npm/react/umd/react.production.min.js' }],
    ['script', { src: 'https://cdn.jsdelivr.net/npm/react-dom/umd/react-dom.production.min.js' }],
    ['script', { src: 'https://cdn.jsdelivr.net/npm/vue/dist/vue.min.js' }],
    ['script', { src: 'https://cdn.jsdelivr.net/npm/@babel/standalone/babel.min.js' }]
  ],
  themeConfig: {
    // logo
    logo: '/logo.png',
    // 最后提交时间
    lastUpdated: 'Last Updated',
    // 页面滚动
    // smoothScroll: true,
    // 添加导航栏
    nav: [
      { text: '首页', link: '/' },
      { 
        text: '前端',
        items: [
          { text: '原理', link: '/frontend/' },
          { text: 'VUE', link: '/vue/' },
          { text: 'REACT', link: '/react/' },
          { text: 'UI', link: '/ui/' }
        ]
      },
      {
        text: '样式',
        items: [
          { text: '原理', link: '/css/' },
          { text: '布局', link: '/layout/' },
          { text: '动效', link: '/animate/' },
        ]
      },
      {
        text: '后端',
        items: [
          { text: 'NODE', link: '/node/' },
          { text: 'JAVA', link: '/java/' },
          { text: '服务器', link: '/server/' },
        ]
      },
      {
        text: '架构',
        items: [
          { text: '组件库', link: '/components/' },
          { text: '框架设计', link: '/framedesign/' }
        ]
      },
      { text: '杂文', link: '/essay/' }
    ],
    // 为以下路由添加侧边栏
    sidebar: {
      '/frontend/': [
        // 'test',
        'js的基础知识',
        'js函数多种写法',
        '常用正则',
        'js实现桌面通知',
        'html中常用单位',
        'git命令',
        '前端解决跨域问题'
      ],
      '/react/': [
        'create-react-app_base-build'
      ],
      '/css/': [
        'BFC-IFC-GFC-FFC',
        'line-height设置百分比数字以及em',
        'calc使用说明'
      ],
      '/vue/': [
        'base_vue_project'
      ],
      '/framedesign/': [
        'js中常用的设计模式'
      ]
    }
  },
  markdown: {
    lineNumbers: true
  },
  plugins: [
    '@vuepress/blog',
    [
      '@vuepress/last-updated',
      {
        transformer: (timestamp, lang) => {
          // 不要忘了安装 moment
          const moment = require('moment')
          moment.locale(lang)
          return moment(timestamp).fromNow()
        }
      }
    ],
    'flowchart',
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
    ],
    ['vuepress-plugin-code-copy', true],
    'demo-block',
    '@vuepress/back-to-top',
    '@vuepress/pwa',
    {
      serviceWorker: true,
      updatePopup: true
    }
  ]
}