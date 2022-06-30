// pages/chosenDetailList/chosenDetailList.js
import { getRecommends } from '../../utils/api';
import ImgLoader from '../../components/img-loader/img-loader.js';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    id: 0,
    datas: [],
    imgList: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      id: options.id
    })
    this.imgLoader = new ImgLoader(this);
    getRecommends().then(data => {
      if (data.data.status === 200) {
        const list = data.data.data;
        let datas = list.filter(item => {
          return item.id === options.id;
        })
        datas = datas[0];
        let imgList = [];
        datas.items.map(item => {
          imgList.push(item.cover_image_url);
          return item;
        })
        imgList = this.imgLoader._imgListChange(imgList);
        this.imgLoader._loadImages(imgList);
        this.setData({ datas, imgList });
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