// pages/mallListHotel/mallListHotel.js
import { getHotelTags, getCityHotel } from '../../utils/api'
import ImgLoader from '../../components/img-loader/img-loader.js';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    id: 0,
    key: null,
    tagList: [],
    hotelList: [],
    page: 1,
    total: 1,
    isNoMore: false,
    imgList: [],
    pageLoading: false,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({ id: options.id })
    let imgList = [];
    this.imgLoader = new ImgLoader(this);
    wx.setNavigationBarTitle({ title: `${options.name}，${options.label}` });
    this.setData({ pageLoading: true });
    getHotelTags(options.id).then(data => {
      if (data.data.status === 200) {
        const tagList = data.data.data;
        this.setData({
          tagList,
          key: tagList[0]._id
        })

        getCityHotel(options.id, tagList[0]._id, 1).then(hData => {
          if (hData.data.status === 200) {
            imgList = hData.data.data.map(item => {
              return item.cover_image_url;
            })
            imgList = this.imgLoader._imgListChange(imgList);
            this.imgLoader._loadImages(imgList);
            this.setData({
              hotelList: hData.data.data,
              total: hData.data.meta.total,
              isNoMore: (Math.ceil(hData.data.meta.total / 5) <= 1),
              imgList,
              pageLoading: false
            })
          }
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
    let hotelList = this.data.hotelList;
    if (page >= Math.ceil(this.data.total / 5)) {
      this.setData({ isNoMore: true })
      return false;
    }
    page ++;
    getCityHotel(this.data.id, this.data.key, this.data.page).then(data => {
      if (data.data.status === 200) {
        let imgList = data.data.data.map(item => {
          return item.cover_image_url;
        })
        imgList = this.imgLoader._imgListChange(imgList);
        this.imgLoader._loadImages(imgList);
        hotelList = hotelList.concat(data.data.data);
        this.setData({
          hotelList,
          page,
          total: data.data.meta.total,
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
  
  },

  onChangeTagTab: function(e) {
    this.setData({ key: e.currentTarget.dataset.key });
    getCityHotel(this.data.id, e.currentTarget.dataset.key, 1).then(data => {
      if (data.data.status === 200) {
        let imgList = data.data.data.map(item => {
          return item.cover_image_url;
        })
        imgList = this.imgLoader._imgListChange(imgList);
        this.imgLoader._loadImages(imgList);
        this.setData({
          hotelList: data.data.data,
          total: data.data.meta.total,
          isNoMore: (Math.ceil(data.data.meta.total / 5) <= 1),
          page: 1,
          imgList,
        })
      }
    })
  }
})