import initialize from '../../utils/initialize';

Page({

  /**
   * 页面的初始数据
   */
  data: {
    activityKey : 'yw',
    id: 0,
    detail: {},
    author: {},
    collection: [],
    isHeard: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const { id } = options;
    const collection = wx.getStorageSync('collection') || [];
    let isHeard = false;
    collection.forEach(item => {
      if (item.id == id) {
        isHeard = true;
      }
    })
    this.setData({ id, collection, isHeard });
    this.getPoemDetail();
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
  onChangeTab: function (e) {
    const { key } = e.target.dataset;
    this.setData({ activityKey: key });
  },
  getPoemDetail() {
    const { id } = this.data;
    const db = wx.cloud.database();
    db.collection('poems')
      .doc(id)
      .get()
      .then(res => {
        this.setData({
          detail: res.data
        })
        this.getAuthorDetail()
      })
  },
  getAuthorDetail() {
    const { detail } = this.data;
    const db = wx.cloud.database();
    db.collection('authors')
      .where({
        name: detail.author,
        dynasty: detail.dynasty
      })
      .get()
      .then(res => {
        if (res.errMsg === 'collection.get:ok') {
          this.setData({
            author: res.data[0]
          })
        }
      })
  },
  goToAuthor(e) {
    const { authorId } = e.currentTarget.dataset;
    wx.navigateTo({
      url: `/pages/introduce/introduce?id=${authorId}&type=author`
    })
  },
  onCollect() {
    let { detail, collection } = this.data;
    const len = collection.length;
    if (len < 50) {
      const params = {
        id: detail._id,
        name: detail.name,
        author: detail.author,
        dynasty: detail.dynasty,
        tag: detail.tags[0] || '诗词',
        key: len
      }
      collection.push(params);
    } else {
      collection.splice(0, 1);
      collection = collection.map(item => {
        item.key = item.key - 1;
        return item;
      })
    }
    wx.setStorage({
      key: 'collection',
      data: collection
    })
    this.setData({ isHeard: true });
  }
})