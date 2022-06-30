// miniprogram/pages/search/search.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    key: 'type',
    word: null,
    optionsList: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getOptions();
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
  getSubOptions(e) {
    const { key } = e.currentTarget.dataset;
    this.setData({ key });
    this.getOptions();
  },
  getOptions() {
    const { key } = this.data;
    const db = wx.cloud.database()
    db.collection('options')
      .where({
        type: key
      })
      .get()
      .then(res => {
        const data = res.data[0];
        this.setData({
          optionsList: data.tags
        })
      })
      .catch(console.error)
  },
  goToList(e) {
    const { key } = this.data;
    const { tagName } = e.currentTarget.dataset;
    wx.navigateTo({
      url: `/pages/searchList/searchList?tagName=${tagName}&type=${key}`
    })
  },
  onInputWord(e) {
    const { value } = e.detail;
    const reg = /(^[\u4e00-\u9fa5, \s*]+$)/gi;
    wx.hideToast();
    if (reg.test(value)) {
      this.setData({ word: value });
    } else {
      wx.showToast({
        title: '只支持中文!',
        icon: 'none',
        duration: 1000
      })
    }
  },
  goToListSearch() {
    const { word } = this.data;
    wx.navigateTo({
      url: `/pages/searchList/searchList?tagName=${word}&type=search`
    })
  }
})