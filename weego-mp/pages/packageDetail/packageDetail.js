// pages/packageDetail.js
import moment from '../../utils/moment';
import { getPackageDetails } from '../../utils/api';
import ImgLoader from '../../components/img-loader/img-loader.js';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    datas: {},
    maxMonth: 3,
    dateSelect: '',
    dateList: [],
    timeModal: false,
    selectItem: {},
    daily_prices: [],
    imgList: [],
    pageLoading: false,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let datas = this.data.datas;
    this.imgLoader = new ImgLoader(this);
    this.setData({ pageLoading: true });
    getPackageDetails(options.pId).then(data => {
      if (data.data.status = 200) {
        datas = data.data.data;
        wx.setNavigationBarTitle({ title: datas.name });
        if (!datas.gallery.legnth) {
          datas.gallery.push({image_url: datas.cover_image_url});
        } else if (datas.gallery[0].image_url !== datas.cover_image_url) {
          datas.gallery.unshift({image_url: datas.cover_image_url});
        }
        imgList = datas.gallery.map(item => {
          return item.image_url;
        })
        let imgList = datas.gallery.map(item => {
          return item.image_url;
        })
        datas.highlights.map(item => {
          imgList.push(item.image_url);
        })
        datas.relevance_hotels.map(item => {
          imgList.push(item.cover_image_url);
        })
        datas.service_images.map(item => {
          imgList.push(item.image_url);
        })
        datas.travel_plan.map(item => {
          item.img_content.map(subItem => {
            imgList.push(subItem.image_url);
          })
        })
        imgList = this.imgLoader._imgListChange(imgList);
        this.imgLoader._loadImages(imgList);

        datas.precent = 100 - Math.round((+datas.price / +datas.origin_price) * 100);
        datas.booking_info = datas.booking_info.split('\n');
        datas.recommend_reason = datas.recommend_reason.map(item => {
          item.desc = item.desc.split('\n');
          return item;
        })
        this.setData({ datas, daily_prices: datas.daily_prices, pageLoading: false });
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
  
  },
  myCatchTouch: function () {
    return false;
  },
  bookPackage: function() {
    this.setData({
      dateSelect: '',
      timeModal: true
    })
    this.timeCheck();
  },
  timeCheck: function() {
    let dateList = [];
    let daily_prices = this.data.daily_prices;

    let monthArr = [daily_prices[0].date, daily_prices[daily_prices.length-1].date]
    monthArr[0] = moment(monthArr[0]).startOf('month').format('YYYY-MM-DD');
    monthArr[1] = moment(monthArr[1]).startOf('month').format('YYYY-MM-DD');
    const maxMonth = moment(monthArr[1]).diff(moment(monthArr[0]), 'months') + 1;
    const DATE_YEAR = moment(monthArr[0]).year();
    const DATE_MONTH = moment(monthArr[0]).month();
    const DATE_DAY = moment(monthArr[0]).date();
    for (let i = 0; i < maxMonth; i++) {
      const date =  moment(monthArr[0]).add(i, 'month');
      const year = date.year();
      const month = date.month();
      const day = 1;
      const currentDay = date.date();
      const maxDays = this.getTotalDayByMonth(year, month);
      const startWeekday = this.getWeek(year, month, day)
      let item = {};
      item.maxDays = maxDays;
      item.startWeekday = startWeekday;
      item.title = date.format('YYYY年MM月');
      item.isCurrentDay = false;
      item.currentDay = 0;
      if (i === 0) {
        item.currentDay = currentDay;
        item.isCurrentDay = true;
      }

      let days = [];

      for(var j = -startWeekday+1;j<=maxDays;j++){
        var clazz = '';
        if(j<DATE_DAY && year == DATE_YEAR && month == DATE_MONTH){
          clazz = 'unavailable';
        } else {
          clazz = 'nostate'
        }
        let currentMonth = month + 1;
        if (currentMonth < 10) {
          currentMonth = '0'+currentMonth;
        } 
        let currentJ = j;
        if (currentJ<10) {
          currentJ = '0'+currentJ;
        }
        const id = `${year}-${currentMonth}-${currentJ}`;
        let preDay = {id, day:j > 0 ? j : ' ', class: clazz};

        daily_prices.map(dailyItem => {
          if (dailyItem.date === preDay.id) {
            preDay.price = dailyItem.price;
          }
        })
        days.push(preDay);
        item.days = days;
        item.weeks = this.chunk(days, 7);
      }

      dateList.push(item);
    }

    console.log(dateList)
    
    this.setData({
      dateList:dateList
    });
  },
  /*
	 * 获取月的总天数
	 */
  getTotalDayByMonth:function(year,month){
    month=parseInt(month,10);
    var d=new Date(year,month,0);
    return d.getDate();
  },
    /*
    * 获取月的第一天是星期几
    */
  getWeek:function(year,month,day){
    var d=new Date(year,month,day);
    return d.getDay();
  },
  /** 数组拆分 */
  chunk: function(array, size) {
    const length = array.length
    if (!length || !size || size < 1) {
      return []
    }
    let index = 0
    let resIndex = 0
    let result = new Array(Math.ceil(length / size))
    while (index < length) {
      result[resIndex++] = array.slice(index, (index += size))
    }
    return result
  },
  onTimeSelect: function (e) {
    let id = e.currentTarget.dataset.id;
    let daily_prices = this.data.daily_prices;
    let item = daily_prices.filter(dateItem => {
      return dateItem.date === id;
    })
    if (!item.length) {
      return false;
    }
    this.setData({ 
      dateSelect: id,
      selectItem: item[0]
    })
  },
  onCloseTimeModal: function (e) {
    this.setData({
      dateSelect: '',
      timeModal: false
    })
  },
  onConfirmTime: function () {
    let selectItem = this.data.selectItem;
    const day = moment(selectItem.date).date();
    const isToday = moment(selectItem.date).startOf('day') === moment().startOf('day');
    let params = {
        "day":{
          day,
          "date": selectItem.date,
          "canChoose": true,
          isToday,
          "price": selectItem.price,
          "id": selectItem._id,
          "subPackage": null
        }
    };
    try {
      wx.setStorageSync('preOrder', params)
    } catch (e) {
    }
    wx.navigateTo({
      url: `/pages/packageOrder/packageOrder?id=${this.data.datas._id}`
    })
  }
})