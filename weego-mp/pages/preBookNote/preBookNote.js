// pages/preBookNote/preBookNote.js
import { getPackageMore } from '../../utils/api';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    application_conditions: [],
    payment_info: [],
    order_confirm: [],
    cancel_rule: [],
    refund_process: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    getPackageMore(options.pId).then(data => {
      if (data.data.status = 200) {
        const datas = data.data.data;
        this.setData({ 
          application_conditions: datas.application_conditions.split('\n'),
          payment_info: datas.payment_info.split('\n'),
          order_confirm: datas.order_confirm.split('\n'),
          cancel_rule: datas.cancel_rule.split('\n'),
          refund_process: datas.refund_process.split('\n'),
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