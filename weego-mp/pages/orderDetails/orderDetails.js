// pages/orderDetails/orderDetails.js
import { getOrderDetail } from '../../utils/api'
Page({

  /** 
   * 页面的初始数据
   */
  data: {
    id: 0,
    datas: {},
    pageLoading: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({ id: options.oId, pageLoading: true });
    getOrderDetail(options.oId).then(data => {
      if (data.data.status === 200) {
        let datas = data.data.data
        datas.coverImg = datas.product_snapshot 
            ? datas.product_snapshot.cover_image_url 
            : 'https://img3.weegotr.com/agents/uploads/3207be6620f562ad2e3120e3b99ddfa8.png';

        datas.statusText = this.mapOrderStatus(datas.status);
        if (datas.product_type === 'hotels') {
          datas.hotel_room_info.checkInTime = this.getDate(datas.hotel_room_info.checkInTime, 0, 'yyyy年MM月dd日');
          datas.hotel_room_info.checkOutTime = this.getDate(datas.hotel_room_info.checkOutTime, 0, 'yyyy年MM月dd日');
        } else {
          datas.current_date.date = this.getDate(datas.current_date.date, 0, 'yyyy年MM月dd日');
          datas.current_date.dateEnd = this.getDate(datas.current_date.date, datas.current_date.day, 'yyyy年MM月dd日');
        }
        datas.payment.methodText = this.getPayMethod(datas.payment.method);
        datas.orderDetailsDesc = datas.hotel_room_info.currentRoomPrice && datas.hotel_room_info.currentRoomPrice.room_info && Array.isArray(datas.hotel_room_info.currentRoomPrice.room_info.room_desc_order)
          ? datas.hotel_room_info.currentRoomPrice.room_info.room_desc_order.slice(0, 2).join(', ')
          : datas.hotel_room_info.detail.room_type_en;
        datas.mwmjPrice = this.transformWithComma(Math.ceil(datas.hotel_price_info.averagePriceCny * (1 - datas.hotel_price_info.cityTaxRate)));
        datas.shfwPrice = this.transformWithComma(Math.ceil(datas.hotel_price_info.averagePriceCny - Math.ceil(datas.hotel_price_info.averagePriceCny * (1 - datas.hotel_price_info.cityTaxRate))))
        datas.mwzjPrice = this.transformWithComma(Math.ceil(datas.hotel_price_info.averagePriceCny))
        datas.zePrice = this.transformWithComma(datas.hotel_price_info.totalOriginPayCny || datas.hotel_price_info.totalPayCny);
        datas.fyzjPrice = this.transformWithComma(Math.ceil(datas.payment.amount));
        datas.changeToUSD = this.transformWithComma(Math.ceil(datas.payment.amount / datas.currency_rate.USD.toFixed(1)));
        if (datas.refund_info) {
          datas.tkjePrice = this.transformWithComma(datas.refund_info.refund_amount || '');
          datas.tkChangeToUSD = this.transformWithComma(Math.round(datas.refund_info.refund_amount / datas.currency_rate.USD));
        }
        if (datas.product_snapshot.origin_price && datas.product_count) {
          datas.tcyjPrice = this.transformWithComma(datas.product_snapshot.origin_price * datas.product_count);
        }

        if (Array.isArray(datas.customers) && Array.isArray(datas.room_filters)) {
          datas.concatList = datas.room_filters.map((room, index) => {
            let superItem = {_id: index, roomIndex: index+1, customer: []};
            datas.customers.slice(index * room.adults, index * room.adults + room.adults).map((item, i) =>{
              superItem.customer.push({name: `${item.first_name} ${item.last_name} `, gender: (item.gender === 'MR' ? '先生' : '女士')});
            })
            return superItem;
          })
        }

        const policy = datas.product_snapshot.tips ||
          datas.product_snapshot.application_conditions ||
          datas.product_snapshot.remark || '';
        if (policy) {
          datas.policyList = policy.split('\n');
        }
        if (datas.cancel_rule) {
          datas.cancelRuleList = datas.cancel_rule.split('\n');
        }
        
        this.setData({
          datas,
          pageLoading: false
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
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  },

  onPolicyTap: function () {
    wx.showModal({
      title: '改退流程',
      content: '这是一个模态弹窗',
      success: function(res) {
        if (res.confirm) {
          console.log('用户点击确定')
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })
  },
  makePhoneCall: function(e) {
    const phone = e.currentTarget.dataset.phone;
    wx.makePhoneCall({
      phoneNumber: phone
    })
  },
  goToDetail: function() {
    const datas = this.data.datas;
    if (datas.product_type === 'hotels') {
      wx.navigateTo({
        url: `/pages/hotelDetail/hotelDetail?hId=${datas.product_snapshot._id}`
      })
    } else {
      wx.navigateTo({
        url: `/pages/packageDetail/packageDetail?hId=${datas.product_snapshot._id}`
      })
    }
  },
  goToStroke: function() {
    wx.navigateTo({
      url: `/pages/stroke/stroke?hId=${this.data.id}`
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
  getPayMethod: method => {
    if (!method) {
      return '未支付';
    }
    if (method === 'alipay') {
      return '支付宝支付';
    }
    if (method === 'transfer') {
      return '转账支付';
    }
  
    return '微信支付';
  }
})