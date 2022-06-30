module.exports = {
  "base": '/vuepress-docs/',
  "title": "小鱼儿的个人博客",
  "description": "小鱼儿的前端技术文档和博客记录",
  "dest": "public",
  "head": [
    [
      "link",
      {
        "rel": "icon",
        "href": "/logo.png"
      }
    ],
    [
      "meta",
      {
        "name": "viewport",
        "content": "width=device-width,initial-scale=1,user-scalable=no"
      }
    ]
  ],
  // "theme": "vuepress-theme-reco",
  "themeConfig": {
    "nav": [
      {
        "text": "首页",
        "link": "/",
        "icon": "reco-home"
      },
      {
        "text": "时间轴",
        "link": "/timeLine/",
        "icon": "reco-date"
      },
      {
        "text": "Contact",
        "icon": "reco-message",
        "items": [
          {
            "text": "NPM",
            "link": "https://www.npmjs.com/yxcs",
            "icon": "reco-npm"
          },
          {
            "text": "GitHub",
            "link": "https://github.com/yxcs",
            "icon": "reco-github"
          },
          {
            "text": "CSDN",
            "link": "https://blog.csdn.net/xianyu410725",
            "icon": "reco-csdn"
          }
        ]
      }
    ],
    "type": "blog",
    "blogConfig": {
      "category": {
        "location": 2,
        "text": "分类"
      },
      "tag": {
        "location": 3,
        "text": "标签"
      }
    },
    "logo": "/head.png",
    "search": true,
    "searchMaxSuggestions": 10,
    "sidebar": "auto",
    "lastUpdated": "Last Updated",
    "author": "yxcs",
    "record": "xxxx",
    "startYear": "2019"
  },
  "markdown": {
    "lineNumbers": true
  }
}