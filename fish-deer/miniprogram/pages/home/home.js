// miniprogram/pages/home/home.js
import { request } from '../utils/request'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list: [],
    total: 0,
    hasMore: true
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: async function (options) {
    await this.getList()
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

  async getList() {
    const res = await request({
      url: 'https://api.oyxco.com/wx/blog/list',
      data: {
        pageNum: 1,
        pageSize: 100
      }
    })
    if (!res.code) {
      const list = res.data.list.map(item => {
        item.updateAtTxt = this.formatDate(item.updateAt)
        return item
      })
      this.setData({ list, total: res.data.total })
    }
  },

  formatDate(unix, type) {
    const date = new Date(unix);
    const YY = date.getFullYear() + '-';
    const MM = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
    const DD = (date.getDate() < 10 ? '0' + (date.getDate()) : date.getDate());
    const hh = (date.getHours() < 10 ? '0' + date.getHours() : date.getHours()) + ':';
    const mm = (date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()) + ':';
    const ss = (date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds());
    if (type) {
      return YY + MM + DD +" "+hh + mm + ss;
    }
    return YY + MM + DD
  },

  goToDetail(event) {
    const { currentTarget } = event
    wx.navigateTo({ url: `/pages/article/index?id=${currentTarget.dataset.id}` })
  }
})