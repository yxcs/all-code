// pages/mallListPackage/mallListPackage.js
import { getCityPackage } from '../../utils/api'
import ImgLoader from '../../components/img-loader/img-loader.js';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    id: 0,
    page: 1,
    datas: [],
    total: 1,
    isNoMore: false,
    imgList: [],
    pageLoading: false,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({ id: options.id });
    wx.setNavigationBarTitle({ title: `${options.name}，${options.label}` });
    this.imgLoader = new ImgLoader(this);
    this.setData({ pageLoading: true });
    getCityPackage(options.id, 1).then(data => {
      if (data.data.status === 200) {
        let datas = data.data.data;
        let imgList = datas.map(item => {
          return item.cover_image_url;
        })
        imgList = this.imgLoader._imgListChange(imgList);
        this.imgLoader._loadImages(imgList);
        datas = datas.map(item => {
          item.precent = 100 - Math.round((+item.price / +item.origin_price) * 100);
          return item;
        })
        this.setData({
          datas: data.data.data,
          total: data.data.meta.total,
          isNoMore: (Math.ceil(data.data.meta.total / 5) <= 1),
          imgList,
          pageLoading: false,
        })
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
    let page = this.data.page;
    let datas = this.data.datas;
    if (page >= Math.ceil(this.data.total / 5)) {
      this.setData({ isNoMore: true })
      return false;
    }
    page ++;
    getCityPackage(this.data.id, page).then(data => {
      if (data.data.status === 200) {
        let currentData = data.data.data;
        currentData = currentData.map(item => {
          item.precent = 100 - Math.round((+item.price / +item.origin_price) * 100);
          return item;
        })
        let imgList = currentData.map(item => {
          return item.cover_image_url;
        })
        imgList = this.imgLoader._imgListChange(imgList);
        this.imgLoader._loadImages(imgList);
        datas = datas.concat(currentData);
        this.setData({
          datas,
          total: data.data.meta.total,
          page,
          isNoMore: (Math.ceil(data.data.meta.total / 5) <= page),
          imgList,
        })
      }
    })
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})