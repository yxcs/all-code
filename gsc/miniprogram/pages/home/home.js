import initialize from '../../utils/initialize';

Page({

  /**
   * 页面的初始数据
   */
  data: {
    openid: '',
    recommend: {}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const db = wx.cloud.database()
    db.collection('recommend')
      .orderBy('updateAt', 'asc')
      .limit(1)
      .get()
      .then(data => {
        this.setData({
          recommend: data.data[0]
        })
      })
      .catch(console.error)
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  goToSearch: function () {
    wx.navigateTo({
      url: '/pages/search/search'
    })
  },
  toToDetail: function (e) {
    const { poemId } = e.currentTarget.dataset;
    wx.navigateTo({
      url: `/pages/detail/detail?id=${poemId}`
    })
  },
  goToDay: function () {
    wx.navigateTo({
      url: '/pages/recommend/recommend'
    })
  },
})