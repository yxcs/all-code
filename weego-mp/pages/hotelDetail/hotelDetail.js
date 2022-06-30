// pages/hotelDetail/hotelDetail.js
import { getHotelDetails, getRoomByType } from '../../utils/api';
import moment from '../../utils/moment';
import ImgLoader from '../../components/img-loader/img-loader.js';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    id: 0,
    datas: {},
    roomDatas: [],
    checkInTime: moment().add(10, 'days').format('YYYY-MM-DD'),
    checkOutTime: moment().add(11, 'days').format('YYYY-MM-DD'),
    params: {
      checkInTime: moment().add(10, 'days').format('YYYY-MM-DD'),
      checkOutTime: moment().add(11, 'days').format('YYYY-MM-DD'),
      noDefaultErrorHandler: true,
      progress: true,
      roomCount: 1,
      roomFilters: [{
        adults: 2,
        children: 0
      }]
    },
    timeModal: false,

    maxMonth: 6,
    dateList: [],
    dateStart: moment().add(10, 'days').format('YYYY-MM-DD'),
    dateEnd: moment().add(11, 'days').format('YYYY-MM-DD'),
    dateSelectList: [moment().add(10, 'days').format('YYYY-MM-DD'), moment().add(11, 'days').format('YYYY-MM-DD')],
    dateTab: "IN", // IN OUT

    isLoading: false,

    imgList: [],
    pageLoading: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let params = this.data.params;
    this.imgLoader = new ImgLoader(this);
    this.setData({ pageLoading: true });

    getHotelDetails(options.hId).then(data => {
      if (data.data.status === 200) {
        let datas =  data.data.data;
        wx.setNavigationBarTitle({ title: datas.name });
        let imgList = [];
        if (!datas.gallery.legnth) {
          datas.gallery.push({image_url: datas.cover_image_url});
        } else if (datas.gallery[0].image_url !== datas.cover_image_url) {
          datas.gallery.unshift({image_url: datas.cover_image_url});
        }
        imgList = datas.gallery.map(item => {
          return item.image_url;
        })
        imgList.push(datas.capture_url);
        imgList.push(datas.cover_image_url);
        datas.highlights.map(item => {
          imgList.push(item.image_url);
        })
        datas.hotel_rooms.map(item => {
          imgList.push(item.cover_image_url);
        })
        datas.room_images.map(item => {
          imgList.push(item.image_url);
        })
        imgList = this.imgLoader._imgListChange(imgList);
        this.imgLoader._loadImages(imgList);
        this.setData({ datas, pageLoading: false });
        this.getRooms(datas._id, params);
        this.timeCheck();
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

  getPreBooking: function (e) {
    const item = e.currentTarget.dataset.item;
    let params = this.data.params;

    let preParams = {
      "currentRoomPrice": {
        "hotel_id": item.hotel_id,
        "room_type": item.room_type,
        "nonrefundable": item.nonrefundable,
        "additional_info": "",
        "cancellation_policies": {...item.cancellation_policies},
        "currency": item.currency,
        "meal_type": item.meal_type,
        "price": item.price,
        "total_price": item.total_price,
        "nights": moment(params.checkOutTime).diff(params.checkInTime, 'days'),
        "checkin": params.checkInTime,
        "identity": {
          "provider": item.identity.provider,
          "provider_id": item.identity.provider_id,
          "room_type_code": item.identity.room_type_code
        },
        "supports_cancellation": true,
        "_is_package": item._is_package,
        "_is_agent": item._is_agent,
        "ori_price": item.ori_price,
        "ori_total_price": item.ori_total_price,
        "ori_currency": item.ori_currency,
        "_premium_ratio": item._premium_ratio,
        "_package_premium_ratio": item._package_premium_ratio,
        "_agent_package_premium_ratio": item._agent_package_premium_ratio,
        "_agent_hotel_premium_ratio": item._agent_hotel_premium_ratio,
        "average_price_cny": item.average_price_cny,
        "total_pay_cny": item.total_pay_cny,
        "average_price_usd": item.average_price_usd,
        "total_pay_usd": item.total_pay_usd,
        "cachekey": item.cachekey,
        "keyword": item.keyword,
        "keyword_en": item.keyword_en,
        "version": item.version,
        "code": item.code,
        "hotel_room_id": item.hotel_room_id,
        "published": item.published,
        "room_info": {...item.room_info},
        "price_cny": item.price_cny,
        "currencyRate": {...item.currencyRate},
        "checkout": params.checkOutTime,
      },
      "roomFilters": [
        {
          "adults": params.roomFilters[0].adults,
          "children": params.roomFilters[0].children
        }
      ],
      "source": "web"
    }

    try {
      wx.setStorageSync('preOrder', preParams)
      wx.setStorageSync('currentHotel', item)
    } catch (e) {
    }
    wx.navigateTo({
      url: `/pages/createOrder/createOrder?id=${this.data.datas._id}`
    })
  },
  myCatchTouch: function () {
    return false;
  },
  timeCheck: function() {
    let dateList = [];
    let dateSelectList = this.data.dateSelectList;
    const DATE_YEAR = moment().year();
    const DATE_MONTH = moment().month();
    const DATE_DAY = moment().date();
    for (let i = 0; i < this.data.maxMonth; i++) {
      const date =  moment().add(i, 'month');
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
        let id = year;
        if (month+1 > 9) {
          id += `-${month+1}`;
        } else {
          id += `-0${month+1}`;
        } 
        if (j > 9) {
          id += `-${j}`;
        } else if ( j > 0 && j <= 9 ) {
          id += `-0${j}`;
        } else {
          id = 0
        }
        days.push({id, day:j > 0 ? j : ' ', class: dateSelectList.indexOf(id) > -1 ? 'active' : clazz})
        item.days = days;
        item.weeks = this.chunk(days, 7);
      }

      dateList.push(item);
    }

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
    //获取数组的长度，如果你传入的不是数组，那么获取到的就是undefined
    const length = array.length
    //判断不是数组，或者size没有设置，size小于1，就返回空数组
    if (!length || !size || size < 1) {
      return []
    }
    //核心部分
    let index = 0 //用来表示切割元素的范围start
    let resIndex = 0 //用来递增表示输出数组的下标
  
    //根据length和size算出输出数组的长度，并且创建它。
    let result = new Array(Math.ceil(length / size))
    //进行循环
    while (index < length) {
      //循环过程中设置result[0]和result[1]的值。该值根据array.slice切割得到。
      result[resIndex++] = array.slice(index, (index += size))
    }
    //输出新数组
    return result
  },
  ontapDate: function (e) { 
    let {date, day} = e.currentTarget.dataset;
    let dateStart = this.data.dateStart;
    let dateEnd = this.data.dateEnd;
    let dateSelectList = this.data.dateSelectList;
    let dateTab = this.data.dateTab;

    if (moment(date).startOf('day').unix() < moment().startOf('day').unix()) {
      console.log('---date不支持选择---')
      return ;
    }

    if (dateTab === 'IN') {
      dateTab = 'OUT';
      if (dateSelectList.length > 1) {
        dateStart = date;
        dateSelectList = [date];
        dateEnd = false;
      } else if (moment(date).unix() > moment(dateStart).unix()) {
        dateEnd = date;
        let arrStart = dateStart;
        if (!!dateEnd && arrStart !== dateEnd) {
          dateSelectList.push(dateEnd)
        }
      } else {
        dateEnd = false;
        dateStart = date;
        dateSelectList = [date];
      }
    } else {
      if (moment(date).unix() > moment(dateStart).unix()) {
        dateEnd = date;
        let arrStart = dateStart;
        if (!!dateEnd && arrStart !== dateEnd) {
          dateSelectList.push(dateEnd)
        }
      } else if (moment(date).unix() <= moment(dateStart).unix()) {
        dateStart = date;
        dateEnd = false;
        dateSelectList = [dateStart];
      }
    }

    let dateList = this.data.dateList;

    if (dateSelectList.length === 0) {
      dateSelectList = [date];
    } else if (dateSelectList.length > 1) {
      let isIn = false;
      dateList.map(item => {
        item.days.map(subItem => {
          if (subItem.id === dateSelectList[0] && !isIn) {
            isIn = true;
          } else if (subItem.id === dateEnd && isIn) {
            isIn = false;
          } else if (isIn 
                    && !!subItem.id 
                    && subItem.class !== "unavailable" 
                    && dateSelectList.indexOf(subItem.id) < 0) {
            dateSelectList.push(subItem.id);
          }
          return subItem;
        })
        return item;
      })
    }

    dateList = dateList.map(item => {
      item.days = item.days.map(subItem => {
        if (subItem.class === 'active') {
          subItem.class = 'nostate';
        }
        if (dateSelectList.indexOf(subItem.id) > -1) {
          if (subItem.day > 0 && subItem.class !== 'unavailable') {
            subItem.class = 'active';
          }
        }
        return subItem;
      })
      item.weeks = this.chunk(item.days, 7);
      return item;
    })

    this.setData({
      dateStart,
      dateEnd,
      dateSelectList,
      checkInTime: moment(dateStart).format('YYYY-MM-DD'),
      checkOutTime: dateEnd ? moment(dateEnd).format('YYYY-MM-DD') : dateEnd,
      dateList,
      dateTab,
    })
  },
  onCheckTimeChange: function (e) {  
    let dateTab = e.currentTarget.dataset.tab;
    this.setData({ dateTab })
  },
  onCheckTimeModal: function () {
    this.setData({
      timeModal: true
    })
    this.timeCheck()
  },
  onCloseTimeModal: function (e) {
    let checkInTime = moment(this.data.params.checkInTime).format('YYYY-MM-DD');
    let checkOutTime = moment(this.data.params.checkOutTime).format('YYYY-MM-DD');
    let dateStart = moment(this.data.params.checkInTime).format('YYYY-MM-DD');
    let dateEnd = moment(this.data.params.checkOutTime).format('YYYY-MM-DD');
    let dateSelectList = [dateStart, dateEnd];
    let dateList = this.data.dateList;

    let isIn = false;
    dateList.map(item => {
      item.days.map(subItem => {
        if (subItem.id === dateStart && !isIn) {
          isIn = true;
        } else if (subItem.id === dateEnd && isIn) {
          isIn = false;
        } else if (isIn 
                  && !!subItem.id 
                  && subItem.class !== "unavailable" 
                  && dateSelectList.indexOf(subItem.id) < 0) {
          dateSelectList.push(subItem.id);
        }
        return subItem;
      })
      return item;
    })

    this.setData({
      timeModal: false,
      checkInTime,
      checkOutTime,
      dateTab: 'IN',
      dateStart,
      dateEnd,
      dateSelectList: [...dateSelectList],
    })
  },
  onConfirmTime: function (e) {
    let params = this.data.params;
    params.checkInTime = moment(this.data.checkInTime).format('YYYY-MM-DD');
    params.checkOutTime = moment(this.data.checkOutTime).format('YYYY-MM-DD');
    let checkInTime = moment(params.checkInTime).format('YYYY-MM-DD');
    let checkOutTime = moment(params.checkOutTime).format('YYYY-MM-DD');
    let dateStart = moment(this.data.checkInTime).format('YYYY-MM-DD');
    let dateEnd = moment(this.data.checkOutTime).format('YYYY-MM-DD');
    let dateSelectList = [dateStart, dateEnd];
    let dateList = this.data.dateList;

    let isIn = false;
    dateList.map(item => {
      item.days.map(subItem => {
        if (subItem.id === dateStart && !isIn) {
          isIn = true;
        } else if (subItem.id === dateEnd && isIn) {
          isIn = false;
        } else if (isIn 
                  && !!subItem.id 
                  && subItem.class !== "unavailable" 
                  && dateSelectList.indexOf(subItem.id) < 0) {
          dateSelectList.push(subItem.id);
        }
        return subItem;
      })
      return item;
    })

    this.setData({
      timeModal: false,
      params: {...params},
      dateStart,
      dateEnd,
      dateTab: 'IN',
      dateSelectList: [...dateSelectList],
      checkInTime,
      checkOutTime,
    })
    this.getRooms(this.data.datas_id, params)
  },
  getRooms: function (id, e) {
    let params = e || this.data.params;
    let _id = id || this.data.datas._id;
    this.setData({ isLoading: true })
    getRoomByType(_id, params).then(roomData => {
      if (roomData.data.status === 200) {
        let roomDatas = roomData.data.data;
        roomDatas = roomDatas.map(item => {
          item.isCurrentRoom = false //datas.mealType === item.meal_type && datas.roomId === item.hotel_room_id;
        })
        this.setData({
          roomDatas: roomData.data.data,
          isLoading: false
        })
      }
    })
  },
  roomNumChange: function (e) {
    let { key, type } = e.currentTarget.dataset;
    let params = this.data.params;
    if (type === 'sub') {
      if (key === 'roomCount') {
        if (params['roomCount'] <= 1) return false;
        params['roomCount'] = params['roomCount'] - 1;
      } else if (key === 'adults') {
        if (params.roomFilters[0].adults <= 1) return false;
        params.roomFilters[0].adults = params.roomFilters[0].adults - 1;
      } else {
        if (params.roomFilters[0].children <= 0) return false;
        params.roomFilters[0].children = params.roomFilters[0].children - 1;
      }
    } else {
      if (key === 'roomCount') {
        params['roomCount'] = params['roomCount'] + 1;
      } else if (key === 'adults') {
        params.roomFilters[0].adults = params.roomFilters[0].adults + 1;
      } else {
        params.roomFilters[0].children = params.roomFilters[0].children + 1;
      }
    }
    this.setData({ params })
    this.getRooms(this.data.datas._id, params)
  }
})