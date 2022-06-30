// miniprogram/pages/searchList/searchList1.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tagName: '',
    count: 0,
    isMore: true,
    optionsList: [],
    page: 1,
    type: 'type'
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const { tagName, type } = options;
    this.setData({ tagName, type });
    this.fetchListCount();
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
    const { isMore } = this.data;
    if (isMore) {
      this.fetchList();
    }
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  fetchListCount() {
    const { tagName, type } = this.data;
    const db = wx.cloud.database()
    const _ = db.command

    let wheweStr = {};
    if (type == 'type') {
      wheweStr.tags = tagName;
    } else if (type == 'author') {
      wheweStr.author = tagName;
    } else if (type == 'dynasty') {
      wheweStr.dynasty = tagName;
    } else if (type == 'cipai') {
      wheweStr.name = db.RegExp({
        regexp: tagName,
        options: 'i',
      });
    } else if (type == 'search') {
      wheweStr = _.or([{
        name: db.RegExp({
          regexp: tagName,
          options: 'i',
        })
      }, {
        author: db.RegExp({
          regexp: tagName,
          options: 'i',
        }),
      }])
    }
    
    db.collection('poems')
      .where(wheweStr)
      .count()
      .then(res => {
        this.setData({
          count: res.total
        })
        this.fetchList();
      })
  },
  fetchList() {
    wx.showLoading({title: '加载中...'});
    const { tagName, page, count, optionsList, type } = this.data;
    const skip = 15 * (page - 1);

    const db = wx.cloud.database()
    const _ = db.command

    let wheweStr = {};
    if (type == 'type') {
      wheweStr.tags = tagName;
    } else if (type == 'author') {
      wheweStr.author = tagName;
    } else if (type == 'dynasty') {
      wheweStr.dynasty = tagName;
    } else if (type == 'cipai') {
      wheweStr.name = db.RegExp({
        regexp: tagName,
        options: 'i',
      });
    } else if (type == 'search') {
      wheweStr = _.or([{
        name: db.RegExp({
          regexp: tagName,
          options: 'i',
        })
      }, {
        author: db.RegExp({
          regexp: tagName,
          options: 'i',
        }),
      }])
    }

    db.collection('poems')
      .where(wheweStr)
      .limit(15)
      .skip(skip)
      .get()
      .then(res => {
        // console.log(res.data)
        this.setData({
          optionsList: optionsList.concat(res.data),
          page: page + 1,
          isMore: Math.ceil(count / 15) > page
        })
        wx.hideLoading();
      })
      .catch(err => {
        console.error(err);
        wx.hideLoading();
      })
  },
  goToDetail(e) {
    const { poemId } = e.currentTarget.dataset;
    wx.navigateTo({
      url: `/pages/detail/detail?id=${poemId}`
    })
  }
})