// miniprogram/pages/introduce/introduce.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    id: 0,
    type: 'author',
    author: {}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const { id, type } = options;
    this.setData({
      id,
      type
    })
    this.initPage();
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
  initPage() {
    this.fetchAuthor();
  },
  fetchAuthor() {
    const { id } = this.data;
    const db = wx.cloud.database();
    db.collection('authors')
      .doc(id)
      .get()
      .then(res => {
        console.log(res)
        if (res.errMsg === 'document.get:ok') {
          this.setData({
            author: res.data
          })
        }
      })
  },
  fetchList() {

  }
})