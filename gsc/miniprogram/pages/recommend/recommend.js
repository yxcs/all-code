import tool from '../../utils/tool';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    pager: 1,
    pageSize: 1,
    recommend: {},
    isMore: true
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getRecommend();
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
  // 获取推荐数据
  getRecommend () {
    const { pager, pageSize } = this.data;
    const sikp = pageSize * (pager - 1);
    const db = wx.cloud.database()
    db.collection('recommend')
      .orderBy('updateAt', 'asc')
      .skip(sikp)
      .limit(pageSize)
      .get()
      .then(data => {
        if (!data.data.length) {
          this.setData({ isMore: false });
          wx.showToast({
            title: '没有更多了...',
            icon: 'none',
            duration: 2000
          })
        } else {
          const recommend = data.data[0];
          recommend.timeStr = tool.showCal(recommend.updateAt);
          this.setData({
            recommend
          })
        }
      })
      .catch(console.error)
  },
  goToFirst () {
    const { pager } = this.data;
    if (pager !== 1) {
      this.setData({ pager: 1, isMore: true });
      this.getRecommend();
    }
  },
  goToPrev () {
    const { pager } = this.data;
    if (pager > 1) {
      this.setData({ pager: this.data.pager - 1, isMore: true });
      this.getRecommend();
    }
  },
  goToNext () {
    const { isMore } = this.data;
    if (isMore) {
      this.setData({ pager: this.data.pager + 1 });
      this.getRecommend();
    }
  },
  toToDetail(e) {
    const { poemId } = e.currentTarget.dataset;
    wx.navigateTo({
      url: `/pages/detail/detail?id=${poemId}`
    })
  }
})