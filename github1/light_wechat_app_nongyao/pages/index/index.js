//index.js
//获取应用实例
var app = getApp()
var services = require('../../utils/service.js')
var utils = require('../../utils/util.js')
Page({
  data: {
    menuList: [],
    isLoading: true,
    videoList: [],
    pageId: null,
    pager: {
      page: 0,
      hasMore: true,
      size: 20
    },
    userInfo: {}
  },
  // 滚动监听，加载下一页
  handleNextPage () {
    let that = this
    if (!that.data.isLoading) {
      that.setData({
        isLoading: true
      })
      wx.showLoading({
        title: '加载中...'
      })
      // 调用接口，获取下一页数据
      if (that.data.pager.hasMore) {
        services.getVideoList({
          page: that.data.pager.page + 1,
          size: that.data.pager.size,
        }, that.data.pageId).then(videoList => {
          if (videoList.length < that.data.pager.size) {
            that.setData({
              pager: Object.assign(that.data.pager, {
                hasMore: false
              })
            })
          } else if (!videoList.length) {
            throw new Error('没有更多啦')
          }
          that.setData({
            isLoading: false,
            videoList: that.data.videoList.concat(videoList),
            pager: Object(that.data.pager, {
              size: that.data.pager.size,
              page: that.data.pager.page + 1
            })
          })
          wx.hideLoading()
        }).catch(e => {
          wx.showToast({
            title: e.message
          })
          wx.hideLoading()
          this.setData({
            isLoading: false
          })
        })
      } else {
        wx.showToast({
          title: '没有更多啦~',
          icon: 'success'
        })
      }
    } else {
      wx.showToast({
        title: '没有更多啦~',
        icon: 'success'
      })
    }
  },
  navigate (e) {
    let {pageId} = e.target.dataset;
    this.setData({
      menuList: [],
      videoList: [],
      isLoading: true,
      pageId,
      pager: {
        page: 0,
        hasMore: true,
        size: 20
      },
      userInfo: {}
    })
    this.loadData()
  },
  loadData () {
    let that = this;
    if (that.data.isLoading) {
      wx.showLoading({
        title: '加载中...'
      })
    }
    // 获取菜单
    services.getMenuLists()
    .then(menuList => {
      console.log(menuList)
      if (menuList.length > 0) {
        that.setData({
          menuList,
          pageId: that.data.pageId ? 
            that.data.pageId : 
            menuList[0].id
        });
      } else {
        throw new Error('暂未添加目录索引')
      }
    }).then(_ => {
      services.getVideoList(that.data.pager, that.data.pageId) 
      .then(videoList => {
        console.log(videoList)
        if (videoList.length < that.data.pager.size) {
          that.setData({
            pager: Object.assign(that.data.pager, {
              hasMore: false
            })
          })
        } else if (!videoList.length) {
          throw new Error('暂无视频数据')
        }
        that.setData({
          videoList
        })
      }).then(_ => {
        wx.hideLoading()
        that.setData({
          isLoading: false
        })
      })
    }).catch(e => {
      wx.showToast({
        title: e.message,
        icon: 'loading'
      })
    })
  },
  //事件处理函数
  onLoad: function (options) {
    var that = this
    var {pageId} = options;
    that.loadData();
    //调用应用实例的方法获取全局数据
    app.getUserInfo(function(userInfo){
      //更新数据
      that.setData({
        userInfo:userInfo
      })
    })
  },
  onShareAppMessage: function () {
    return {
      title: '王者荣耀视频精选',
      path: `page/index/index?pageId=${that.data.pageId}`,
      success: (res) => {
        wx.showToast({
          title: '分享成功!',
          icon: 'success'
        })
      }
    }
  },
  onShow: function() {
     wx.setNavigationBarTitle({
       title: "王者荣耀视频精选"
     })
  }
})
