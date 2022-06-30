// pages/play/play.js
var { getVideoDetail } = require('../../utils/service.js')
var moment = require('../../utils/moment.js')

Page({
  data:{
    options:{},
    videoDetail:{},
    scrollHeight: 50,
    wHeight: 0,
    isAutoPlay: true,
    isHideShare: true
  },
  onLoad:function(options){
    let res = wx.getSystemInfoSync()
    let scale = 750 / res.windowWidth ;
    let wHeight = res.windowHeight * scale ;
    this.setData({ 
      options,
      wHeight,
      scrollHeight: (wHeight - 584)
    })
  },
  onReady:function(){
    // 页面渲染完成
  },
  onShow:function(){
   this.getLists()
  },
   onShareAppMessage: function () {
    return {
      title: this.data.videoDetail.title,
      path: '/pages/play/play?id='+this.data.videoDetail.id,
      success: function(res) {
        wx.showToast({
          title: '分享成功',
          icon: 'success'
        })
      },
      fail: function(res) {
        // 分享失败
      }
    }
  },
  getLists() {
    getVideoDetail(this.data.options.id).then(data => {
     let videoDetail = data.data
     wx.setNavigationBarTitle({
       title: videoDetail.title
     })
     videoDetail.uploadtime = moment(videoDetail.uploadtime).format('YYYY-MM-DD')
     videoDetail.recommendVideo.map( v => {
        let dur = (new Date() - v.uploadtime) / 1000
        let text = '刚刚'
        let duration = moment.duration(dur, 'seconds')
        if(duration.minutes() > 0) {
          text = duration.minutes() + '分钟前';
        }
        if(duration.hours() > 0) {
          text = duration.hours() + '小时前';
        }
        if(duration.days() > 0) {
          text = duration.days() + '天前';
        }
        if(duration.weeks() > 0) {
          text = duration.weeks() + '周前';
        }
        if(duration.months() > 0) {
          text = duration.months() + '月前';
        }
        if(duration.years() > 0) {
          text = duration.years() + '年前';
        }
        v.uploadtime = text;
        return v
     })
     this.setData({ videoDetail })
   })
  },
  onShare() {
    this.setData({
      isHideShare: false
    })
    setTimeout(() => {
      this.setData({
        isHideShare: true
      })
    },3000)
  }
})