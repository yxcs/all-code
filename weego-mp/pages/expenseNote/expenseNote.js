// pages/serviceNote/serviceNote.js
import { getPackageMore } from '../../utils/api';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    cost_implications: {},
    cost_includes: [],
    cost_not_includes: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    getPackageMore(options.pId).then(data => {
      if (data.data.status = 200) {
        const cost_implications = data.data.data.cost_implications;
        this.setData({ 
          cost_implications,
          cost_includes: cost_implications.cost_includes.split('\n'),
          cost_not_includes: cost_implications.cost_not_includes.split('\n'),
        });
      }
    })
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
  
  }
})