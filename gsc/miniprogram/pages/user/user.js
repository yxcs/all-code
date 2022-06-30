import initialize from '../../utils/initialize';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    openid: '',
    collection: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let collection = wx.getStorageSync('collection') || [];
    collection = collection.sort((a, b) => {
      return a.key - b.key < 0;
    })
    this.setData({ collection });
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
  goToDetail(e) {
    const { poemId } = e.currentTarget.dataset;
    wx.navigateTo({
      url: `/pages/detail/detail?id=${poemId}`
    })
  }
})