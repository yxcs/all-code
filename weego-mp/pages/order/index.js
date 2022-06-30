// pages/order/index.js
import { getUserDetail, getOrderList, login, getUnionid, getWxPhoneDecode } from '../../utils/api';
import ImgLoader from '../../components/img-loader/img-loader.js';
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    avatarUrl: 'http://img3.weegotr.com/cms/uploads/QfLtHxcp80qWxkpa.png',
    nickName: '',
    winHeight: 0,
    page: 1,
    datas: [],
    total: 1,
    isNoMore: false,
    isLoading: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    isLogin: false,
    showLoginModal: false,
    userInfo: {
      avatarUrl: 'http://img3.weegotr.com/cms/uploads/QfLtHxcp80qWxkpa.png',
      nickName: '',
    },
    hasUserMsg: false,
    userPhone: null,
    isUserInfoAuth: false,
    imgList: [],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.imgLoader = new ImgLoader(this);
    try {
      const winHeight = wx.getSystemInfoSync().windowHeight;
        this.setData({
        winHeight
      })
    } catch (e) {
    }
    this.setData({ isLoading: true });
    getOrderList(1).then(data => {
      let datas = data.data.data;
      let meta = data.data.meta;
      datas = datas.map(item => {
        item.statusText = this.mapOrderStatus(item.status);
        if (item.product_type === 'hotels') {
          item.hotel_room_info.checkInTime = this.getDate(item.hotel_room_info.checkInTime, 0, 'yyyy年MM月dd日');
          item.hotel_room_info.checkOutTime = this.getDate(item.hotel_room_info.checkOutTime, 0, 'yyyy年MM月dd日');
        } else {
          item.current_date.date = this.getDate(item.current_date.date, 0, 'yyyy年MM月dd日');
          item.current_date.dateEnd = this.getDate(item.current_date.date, item.current_date.day, 'yyyy年MM月dd日');
        }
        item.payment.changeToUSD = Math.ceil(item.payment.amount / item.currency_rate.USD.toFixed(1));
        item.payment.amount = this.transformWithComma(item.payment.amount);
        return item;
      })

      let imgList = datas.map(item => {
        return item.product_info.cover_image_url;
      })
      imgList = this.imgLoader._imgListChange(imgList);
      this.imgLoader._loadImages(imgList);

      this.setData({
        datas,
        total: meta.total,
        isNoMore: (Math.ceil(meta.total / 5) <= 1),
        isLoading: false,
        imgList
      })
    })
    const isLogin = !!wx.getStorageSync('unionid');
    this.setData({ isLogin });
    const userLogin = wx.getStorageSync('userLogin');
    if (!!userLogin) {
      this.setData({ userPhone: userLogin.phone || null });
    }
    wx.getSetting({
      success: (res) => {
        if (res.authSetting['scope.userInfo']) {
          wx.getUserInfo({
            success: (data) => {
              this.setData({ 
                userInfo: data.userInfo, 
                hasUserMsg: true,
                isUserInfoAuth: true,
              })
            }
          })
        } else {
          this.setData({ isUserInfoAuth: false });
        }
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
    this.setData({ isLoading: true });
    getOrderList(page).then(data => {
      if (data.data.status === 200) {
        let currentData = data.data.data;
        currentData = currentData.map(item => {
          item.status = this.mapOrderStatus(item.status);
          if (item.product_type === 'hotels') {
            item.hotel_room_info.checkInTime = this.getDate(item.hotel_room_info.checkInTime, 0, 'yyyy年MM月dd日');
            item.hotel_room_info.checkOutTime = this.getDate(item.hotel_room_info.checkOutTime, 0, 'yyyy年MM月dd日');
          } else {
            item.current_date.date = this.getDate(item.current_date.date, 0, 'yyyy年MM月dd日');
            item.current_date.dateEnd = this.getDate(item.current_date.date, item.current_date.day, 'yyyy年MM月dd日');
          }
          item.payment.changeToUSD = Math.ceil(item.payment.amount / item.currency_rate.USD.toFixed(1));
          item.payment.amount = this.transformWithComma(item.payment.amount);
          return item;
        })
        let imgList = currentData.map(item => {
          return item.product_info.cover_image_url;
        })
        imgList = this.imgLoader._imgListChange(imgList);
        this.imgLoader._loadImages(imgList);
        datas = datas.concat(currentData);
        this.setData({
          datas,
          total: data.data.meta.total,
          page,
          isNoMore: (Math.ceil(data.data.meta.total / 5) <= page),
          isLoading: false
        })
      }
    })
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  },

  switchToChosen: function() {
    wx.switchTab({
      url: '/pages/chosen/index'
    })
  },
  goToDetail: function(e) {
    const oId = e.currentTarget.dataset.key;
    wx.navigateTo({
      url: `/pages/orderDetails/orderDetails?oId=${oId}`
    })
  },
  mapOrderStatus: status => {
    let text = '';
    switch (status) {
      case 'cancelled':
        text = '已取消';
        break;
      case 'unpaid':
        text = '未支付';
        break;
      case 'paying':
        text = '支付中';
        break;
      case 'paid':
        text = '已支付,待确认';
        break;
      case 'confirmed':
        text = '已确认';
        break;
      case 'consumed':
        text = '已消费';
        break;
      case 'expired':
        text = '已过期';
        break;
      case 'refund_pending':
        text = '退款中';
        break;
      case 'refund_confirmed':
        text = '已退款';
        break;
      default:
        break;
    }
  
    return text;
  },
  getDate: (dateStr, count = 0, fmt = 'yyyy-MM-dd') => {
    const date = dateStr ? new Date(dateStr) : new Date();
    date.setDate(date.getDate() + count);
    const o = {
      'M+': date.getMonth() + 1, // 月份
      'd+': date.getDate(), // 日
      'h+': date.getHours(), // 小时
      'm+': date.getMinutes(), // 分
      's+': date.getSeconds(), // 秒
      'q+': Math.floor((date.getMonth() + 3) / 3), // 季度
      S: date.getMilliseconds(), // 毫秒
    };
  
    let str = fmt;
    if (/(y+)/.test(str)) {
      str = str.replace(RegExp.$1, `${date.getFullYear()}`.substr(4 - RegExp.$1.length));
    }
    Object.keys(o).forEach(k => {
      if (new RegExp(`(${k})`).test(str)) {
        str = str.replace(RegExp.$1, RegExp.$1.length === 1 ? o[k] : `00${o[k]}`.substr(`${o[k]}`.length));
      }
    });
    return str;
  },
  transformWithComma: number => {
    if (typeof number !== 'number') {
      return number;
    }
    if (number < 999) {
      return number;
    }
  
    const reverseNumArray = number.toString().split('').reverse();
    const result = [];
  
    reverseNumArray.forEach((x, i) => {
      result.push(x);
      if ((i + 1) % 3 === 0 && reverseNumArray[i + 1]) {
        result.push(',');
      }
    });
  
    return result.reverse().join('');
  },
  myCatchTouch: function () {
    return false;
  },
  onTapLogin: function () {
    const unionid = wx.getStorageSync('unionid');
    this.setData({
      showLoginModal: true
    })
  },
  onCancelPhone: function() {
    this.setData({
      showLoginModal: false
    })
  },
  getPhoneNumber: function(e) { 
    const userLogin = wx.getStorageSync('userLogin');
    wx.login({
      success: res => {
        let params = {
          'encryptedData': encodeURIComponent(e.detail.encryptedData),
          'iv': e.detail.iv,
          'userId': userLogin._id
        }
        getWxPhoneDecode(params, res.code).then(data => {
          console.log(data)
        })
        
      }
    })
  },
  wxLogin: function() {
    wx.login({
      success: res => {
        if (res.code) {
          getUnionid(res.code).then(data => {
            let currentData = data.data.data;
            currentData.unionid = !!currentData.unionid ? currentData.unionid : currentData.openid;
            if (data.data.status === 200) {
              wx.setStorage({
                key: "openid",
                data: currentData.openid
              })
              wx.setStorage({
                key: "unionid",
                data: currentData.unionid
              })
              this.userLogin(currentData.openid, currentData.unionid);
            }
          }).then(data => {

          })
        } else {
          console.log('登录失败！' + res.errMsg)
        }
      },
      fail: function(err) {

      }
    })
  },
  userLogin: function (openid, unionid) {
    if (!openid) return false;
    let params = {
      openid: openid,
      unionid: unionid,
      nickname:  this.data.userInfo.nickName,
      headimgurl: this.data.userInfo.avatarUrl,
    }
    login(params).then(data => {
      if (data.data.status === 200) {
        wx.setStorage({
          key: "userLogin",
          data: data.data.data
        })
        this.setData({
          isLogin: true,
          userData: data.data.data
        })
      }
    })
  },
  getUserInfo: function (e) {
    let { userInfo } = e.detail;
    wx.setStorage({
      key: "userInfo",
      data: userInfo
    })
    this.setData({ userInfo, isUserInfoAuth: true })
  },
})