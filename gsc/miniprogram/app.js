//app.js
App({
  globalData: {
    openid: ''
  },
  onLaunch: function (options) {
    if (options.path.indexOf('home/index') > -1) {
      wx.switchTab({
        url: '/pages/home/home'
      })
    }
    if (!wx.cloud) {
      console.error('请使用 2.2.3 或以上的基础库以使用云能力')
    } else {
      wx.cloud.init({
        traceUser: true,
      })
    }
  },
  onPageNotFound(res) {
    wx.switchTab({
      url: '/pages/home/home'
    })
  }
})
