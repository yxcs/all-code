// pages/createOrder/createOrder.js
import { getPackageDetails, getPrePackage, getCoupon, getVerifycode, getRoomByType, pushOrders } from '../../utils/api';
import moment from '../../utils/moment';
import { transformWithComma } from '../../utils/util';
let timmer = null;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    genders: [{id: 'MR', name: '先生'}, {id: 'MS', name: '女生'}],
    index: 0,
    params: {},
    datas: {},
    hotelDatas: {},
    currentHotel: {},
    pId: 0,
    isDiscount: false,
    discount: '',
    couponValue: 0,
    isLogin: false,
    phoneNumber: '',    // 联系人电话
    verifycode: '',     // 联系人电话验证码
    email: '',          // 联系人邮箱
    customers: [],
    customerIndex: 0,
    specialText: '',
    showLeaveConfirm: false,
    userLogin: {},
    contacts: [],
    contactsSelectList: [],
    showContactPicker: false,
    currentPackage: {},
    orderName: '',
    product_count: 1,
    pageLoading: false,
    scrollToTop: 0,
    isVCodeSending: false,
    leaveTime: 60,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    options.id = '5a0d4e3122d9fb242310b80f';
    let preOrder = {};
    try {
      preOrder = wx.getStorageSync('preOrder');
      let isLogin = !!wx.getStorageSync('unionid');
      let userLogin = wx.getStorageSync('userLogin');
      let contacts = userLogin.contacts || [];
      let customers = [];
      for (let i = 0; i < this.data.product_count; i++) {
        customers[i] = { children: 0, adultsList: [], adults: 2 };
        for (let j = 0; j < 2; j++) {
          customers[i].adultsList.push({
            first_name: '',
            last_name: '',
            gender: 'MR',
            is_show: true,
          });
        }
      }

      console.log(customers)

      this.setData({
        params: preOrder,
        preOrder,
        pId: options.id,
        isLogin, 
        userLogin,
        phoneNumber: userLogin.phone || '', 
        contacts,
        customers,
        pageLoading: true,
      })
    } catch (e) {
      wx.navigateTo({
        url: `/pages/packageDetail/packageDetail?id=${options.id}`
      })
    }
    getPackageDetails(options.id).then(packageData => {
      if (packageData.data.status === 200) {
        let currentPackage = packageData.data.data;
        currentPackage.hotels = currentPackage.hotels.map(item => {
          item.desc = item.desc.split('\n');
          return item;
        })
      }
      getPrePackage(options.id, preOrder).then(data => {
        if (data.data.status === 200) {
          let datas = data.data.data;
          datas.currentDetails = datas.daily_inventory.filter(item => {
              return item._id === preOrder.day.id;
          })
          datas.currentDetails = datas.currentDetails[0];
          datas.totalPrice = transformWithComma(datas.currentDetails.price);
          datas.totalPriceUSD = transformWithComma(Math.ceil(datas.currentDetails.price / datas.currency_rate.USD.toFixed(1)));          
          this.setData({ datas, currentPackage: packageData.data.data, pageLoading: false});
        }
      })
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
    clearInterval(timmer);
    this.setData({ leaveTime: 60 });
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    clearInterval(timmer);
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
  onInputCoupon: function (e) {
    const couponValue = e.detail.value;
    this.setData({ couponValue });
  },
  onCheckCoupon: function () {
    let couponValue = this.data.couponValue;
    const apply_on = !!this.data.hotelDatas.name ? 'hotels' : 'packages';
    let isDiscount = false;
    let datas = this.data.datas;
    let discount = {};
    let preOrder = this.data.preOrder;
    if (this.data.isDiscount) {
      this.setData({ discount: '', isDiscount: false });
      return false;
    }
    if (!couponValue) {
      this.showToast('需填写优惠码');
      return false;
    }
    getCoupon(apply_on, couponValue).then(data => {
      if (data.data.status === 200) {
        const couponDetail = data.data.data;
        if (couponDetail.coupon_type === 'deduction') {
          discount = {
            type: 'deduction',
            price: couponDetail.discount_amount,
            couponDescription: couponDetail.title,
            usdPrice: transformWithComma(Math.ceil(couponDetail.discount_amount / datas.currency_rate.USD.toFixed(1)))
          };
          isDiscount = true;
        } else if (couponDetail.coupon_type === 'discount') {
          discount = {
            type: 'discount',
            rate: couponDetail.discount_rate / 10,
            couponDescription: couponDetail.title,
            price: 0,
            usdPrice: 0
          };
          isDiscount = true;
        } else if (couponDetail.coupon_type === 'full_subtract') {
          if (datas.priceInfo.payment_amount < couponDetail.order_payment_threshold) {
            isDiscount = false;
            discount = {};
            wx.showToast({
              title: '该优惠券不满足此次订单',
              icon: 'none',
              duration: 2000
            })
          } else {
            discount = {
              type: 'deduction',
              price: couponDetail.discount_amount,
              couponDescription: couponDetail.title,
              usdPrice: transformWithComma(Math.ceil(couponDetail.discount_amount / datas.currency_rate.USD.toFixed(1)))
            };
            isDiscount = true;
          }
        }
        datas.currentDetails = datas.daily_inventory.filter(item => {
          return item._id === preOrder.day.id;
        })
        datas.currentDetails = datas.currentDetails[0];
        datas.currentDetails.price = datas.currentDetails.price * this.data.product_count; 
        datas.currentDetails.priceUsd = datas.currentDetails.price * this.data.product_count / datas.currency_rate.USD.toFixed(1);
        datas.totalPrice = transformWithComma(datas.currentDetails.price);
        datas.totalPriceUSD = transformWithComma(Math.ceil(datas.currentDetails.priceUsd));
  
        if (isDiscount) {
          if (discount.type === 'deduction' || discount.type === 'full_subtract') {
            datas.totalPrice = transformWithComma(datas.currentDetails.price - discount.price);
            datas.totalPriceUSD = transformWithComma(datas.currentDetails.priceUsd - discount.usdPrice);
          } else {
            datas.totalPrice = transformWithComma((datas.currentDetails.price * discount.rate).toFixed(1));
            datas.totalPriceUSD = transformWithComma((datas.currentDetails.priceUsd * discount.rate).toFixed(1));
          }
        }
        wx.showModal({
          title: `${discount.couponDescription}使用提示`,
          content: '房间价格变动，请重新核对',
          showCancel: false,
          confirmText: '确定',
          success: (res) => {
            this.setData({scrollToTop: 0})
          }
        })
        this.setData({ discount, isDiscount, datas });
      } else {
        this.setData({ discount: '', isDiscount: false });
        wx.showToast({
          title: '优惠码无效',
          icon: 'none',
          duration: 2000
        })
      }
    }).catch(e => {
      this.setData({ discount: '', isDiscount: false });
    })
  },
  onRoomSub: function () {
    let product_count = this.data.product_count;
    let customers = this.data.customers;
    if (product_count <=1) {
      return ;
    }
    customers.pop();
    product_count--;
    this.getPreBookMsg(product_count);
    this.setData({ product_count, customers });
  },
  onRoomAdd: function () {
    let product_count = this.data.product_count;
    let customers = this.data.customers;
    product_count++;
    let adultsList = [];
    for (let i = 0; i < customers[0].adults; i ++) {
      adultsList.push({
        first_name: '',
        last_name: '',
        gender: 'MR',
      })
    }
    customers.push({
      children: customers[0].children,
      adultsList,
      adults: customers[0].adults
    })
    this.getPreBookMsg(product_count);
    this.setData({ product_count, customers });
  },
  onChildrenSub: function (e) {
    const index = e.currentTarget.dataset.index;
    let customers = this.data.customers;
    if (customers[index].children <=0) {
      return ;
    }
    customers[index].children --;
    this.setData({ customers });
  },
  onChildrenAdd: function (e) {
    const index = e.currentTarget.dataset.index;
    let customers = this.data.customers;
    if (customers[index].children >=2) {
      this.showToast('每个房间最多两个儿童');
      return ;
    }
    customers[index].children ++;
    this.setData({ customers });
  },
  sendVerifycode: function () {
    let phoneNumber = this.data.phoneNumber;
    if (!phoneNumber) {
      this.showToast('需填写手机号');
      return false;
    }
    getVerifycode(phoneNumber).then(data => {
      if (data.data.status === 200) {
        console.log(data)
        timmer = setInterval(_ => {
          let leaveTime = this.data.leaveTime;
          if (leaveTime <= 0) {
            clearInterval(timmer);
            this.setData({ isVCodeSending: false, leaveTime: 60 });
          } else {
            leaveTime --;
            this.setData({ leaveTime }); 
          }
        }, 1000)
        this.setData({ isVCodeSending: true })
        this.showToast('验证码已发送，60s后可重试');
      }
    })
  },
  onNameInput:  function (e) {
    let orderName = e.detail.value;
    this.setData({ orderName });
  },
  onEmailInput: function (e) {
    let email = e.detail.value;
    this.setData({ email });
  },
  onPhoneInput: function (e) {
    let phoneNumber = e.detail.value;
    this.setData({ phoneNumber });
  },
  onVerifycodeInput: function (e) {
    let verifycode = e.detail.value;
    this.setData({ verifycode });
  },
  onShowConcatTip: function () {
    wx.showModal({
      title: '入住人填写声明',
      content: '预定国际酒店，必须填写入住人的英文名。英文姓名填写格式（last／first middle):姓在前，姓和名之间用／隔开，如有中间名则空一格紧随名之后，例：Zhang/Sanfeng(张三丰)\nGreen/Jim Stephanie',
      showCancel: false,
      confirmText: '确定',
      success: function(res) {
      }
    })
  },
  onShowSpecialTip: function () {
    wx.showModal({
      title: '特殊需求填写说明',
      content: '请以英文或住宿所使用的语言填写。特殊要求视具体情况而定，住宿方将尽力为您安排',
      showCancel: false,
      confirmText: '确定',
      success: function(res) {
      }
    })
  },
  onMakePhoneCall: function () {
    wx.makePhoneCall({
      phoneNumber: '010-57273085'
    })
  },
  getPreBookMsg: function (product_count) {
    let preOrder = this.data.preOrder;
    let discount = this.data.discount;
    let params = { ...preOrder };
    params.count = product_count;
    wx.showLoading({
      title: '价格刷新中...',
      mask: true,
    })
    getPrePackage(this.data.pId, params).then(data => {
      let datas = data.data.data;
      datas.currentDetails = datas.daily_inventory.filter(item => {
        return item._id === preOrder.day.id;
      })
      datas.currentDetails = datas.currentDetails[0];
      datas.currentDetails.price = datas.currentDetails.price * product_count; 
      datas.currentDetails.priceUsd = datas.currentDetails.price / datas.currency_rate.USD.toFixed(1);
      datas.totalPrice = transformWithComma(datas.currentDetails.price);
      datas.totalPriceUSD = transformWithComma(Math.ceil(datas.currentDetails.priceUsd));

      if (isDiscount) {
        if (discount.type === 'deduction' || discount.type === 'full_subtract') {
          datas.totalPrice = transformWithComma(datas.currentDetails.price - discount.price);
          datas.totalPriceUSD = transformWithComma(datas.currentDetails.priceUsd - discount.usdPrice);
        } else {
          datas.totalPrice = transformWithComma((datas.currentDetails.price * discount.rate).toFixed(1));
          datas.totalPriceUSD = transformWithComma((datas.currentDetails.priceUsd * discount.rate).toFixed(1));
        }
      }
      wx.hideLoading();
      this.setData({ datas, scrollToTop: 0 });
      if (data.data.status === 200) {}
    })
  },
  bindPickerChange: function(e) {
    let value = e.detail.value;
    let index = e.currentTarget.dataset.index;
    let subIndex = e.currentTarget.dataset.subIndex;
    let customers = this.data.customers;
    customers[index].adultsList[subIndex].gender = value === '1' ? 'MS' : 'MR';
    this.setData({ customers });
  },
  onLastNameChange: function(e) {
    let value = e.detail.value;
    let index = e.currentTarget.dataset.index;
    let subIndex = e.currentTarget.dataset.subIndex;
    let customers = this.data.customers;
    customers[index].adultsList[subIndex].last_name = value;
    this.setData({ customers });
  },
  onFirstNameChange: function(e) {
    let value = e.detail.value;
    let index = e.currentTarget.dataset.index;
    let subIndex = e.currentTarget.dataset.subIndex;
    let customers = this.data.customers;
    customers[index].adultsList[subIndex].first_name = value;
    this.setData({ customers });
  },
  onSpecialChange: function (e) {
    let specialText = e.detail.value;
    this.setData({ specialText });
  },
  generateNonceStr: function (length) {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charCount = chars.length;
    let nonceStr = '';
    for (let i = 0; i < (length || 32); i++) {
      nonceStr += chars.charAt(Math.floor(Math.random() * charCount));
    }
  
    return nonceStr;
  },
  onSubmitOrder: function () {
    let params = {};
    let customers = [];
    let customer_count = 0;
    let datas = this.data.datas;
    let discount = this.data.discount;
    this.data.customers.map(item => {
      customer_count += item.adults;
      // customer_count += item.children; // 不算小孩子
      item.adultsList.map(subItem => {
        subItem.is_show = true;
        customers.push(subItem);
        return subItem;
      })
      return item;
    });
    params.timestamp = Date.now();
    params.nonce_str = this.generateNonceStr();
    params.product_id = datas._id;
    params.product_type = 'packages';
    params.product_count = this.data.product_count;
    datas.currentDetails = datas.daily_inventory.filter(item => {
      return item._id === this.data.preOrder.day.id;
    })
    datas.currentDetails = datas.currentDetails[0];
    datas.currentDetails.price = datas.currentDetails.price * this.data.product_count; 
    datas.currentDetails.priceUsd = datas.currentDetails.price / datas.currency_rate.USD.toFixed(1);
    if (this.data.isDiscount) {
      if (discount.type === 'deduction' || discount.type === 'full_subtract') {
        params.payment_amount = datas.currentDetails.price - discount.price;
        params.payment_amount_usd = datas.currentDetails.priceUsd - discount.usdPrice;
      } else {
        params.payment_amount = (datas.currentDetails.price * discount.rate).toFixed(1);
        params.payment_amount_usd = (datas.currentDetails.priceUsd * discount.rate).toFixed(1);
      }
    } else {
      params.payment_amount = datas.currentDetails.price;
      params.payment_amount_usd = datas.currentDetails.priceUsd;
    }
    params.payment_method = null;
    params.contact_name = this.data.orderName;
    params.contact_mobile = this.data.phoneNumber;
    params.contact_email = this.data.email;
    params.customers = customers;
    params.room_count = this.data.product_count;
    params.source = 'xcx';
    params.customer_count = customer_count;
    // params.checkin_date = this.data.preOrder.currentRoomPrice.checkin;
    // params.checkout_date = this.data.preOrder.currentRoomPrice.checkout;
    params.contact_verify_code = this.data.verifycode || '';

    params.extra = {
      // special_demand: this.data.specialText,
      package_day_id: datas.currentDetails._id, //套餐订单需要
      current_date: datas.currentDetails.date, //套餐订单需要
    };

    if (!!this.data.specialText) {
      params.extra.special_demand = this.data.specialText;
    }
    params.room_filters = this.data.customers.map(item => {
      return {children: item.children, adults: item.adults};
    })

    if (!params.contact_name) {
      this.showToast('请输入预订人姓名');
      return false;
    }
    if (!params.contact_email || !(/^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$/.test(params.contact_email))) {
      this.showToast('请输入正确的邮箱');
      return false;
    }
    if (!params.contact_mobile || !(/^1[3|4|5|8][0-9]\d{4,8}$/.test(params.contact_mobile))) {
      this.showToast('请输入正确的手机号');
      return false;
    }
    if (!this.data.userLogin.phone 
        || (!!this.data.userLogin.phone 
        && (this.data.userLogin.phone !== params.contact_mobile))) {
      if (!params.contact_verify_code || params.contact_verify_code.length !== 4) {
        this.showToast('请输入正确的验证码');
        return false;
      }
    }
    let isValidate = true;
    params.customers.map(item => {
      if (!item.last_name || !item.first_name) {
        isValidate = false;
      }
      return '';
    })
    if (!isValidate) {
      this.showToast('入住人信息必须完整');
      return false
    }
    
    pushOrders(this.data.pId, params).then(data => {
      console.log(data)
    })
  },
  showToast: function (title) {
    wx.showToast({
      title,
      icon: 'none',
      duration: 2000
    })
  },
  onSelectContacts: function (e) {
    let contacts = this.data.contacts;
    let contactsSelectList = [...contacts];
    let customers = this.data.customers;
    let index = e.currentTarget.dataset.index;
    contactsSelectList.map(item => {
      item.isChecked = false;
      customers[index].adultsList.map(subItem => {
        if (subItem.last_name === item.last_name && subItem.first_name === item.first_name) {
          item.isChecked = true;
        }
        return subItem;
      })
      return item;
    })

    let newContacts = customers[index].adultsList.filter(item => {
      let isNew = true;
      if (!item.last_name || !item.first_name) {
        return false;
      }
      contactsSelectList.map(subItem => {
        if (subItem.last_name === item.last_name && subItem.first_name === item.first_name) {
          isNew = false;
        }
        return false;
      })
      return isNew;
    })
    newContacts = newContacts.map(item => {
      item.isChecked = true;
      return item;
    })
    contactsSelectList = contactsSelectList.concat(...newContacts);
    this.setData({ showContactPicker: true, contactsSelectList, customerIndex: index })
  },
  myCatchTouch: function () {
    return false;
  },
  checkboxChange: function (e) {
    let checkArr = e.detail.value;
    let contactsSelectList = this.data.contactsSelectList;
    let customers = this.data.customers;
    if (customers[0].adultsList.length < checkArr.length) {
      this.showToast(`最多只能选择${customers[0].adultsList.length}个联系人`);
    } else {
      contactsSelectList = contactsSelectList.map(item => {
        item.isChecked = false;
        return item;
      })
      checkArr.map(item => {
        contactsSelectList[item].isChecked = true;
        return item;
      })
    }
    this.setData({ contactsSelectList });
  },
  onContactCancel: function () {
    this.setData({
      showContactPicker: false, 
      contactsSelectList: [], 
      customerIndex: 0,
    })
  },
  onContactConfirm: function (e) {
    let contactsSelectList = this.data.contactsSelectList;
    let customers = this.data.customers;
    let customerIndex = this.data.customerIndex;
    let len = 0;
    contactsSelectList.map(item => {
      if (item.isChecked) {
        len ++;
      }
      return item;
    })
    let adultsList = [];  // [...customers[customerIndex].adultsList];
    contactsSelectList.map(item => {
      if (item.isChecked) {
        let tm = {
          last_name: item.last_name,
          first_name: item.first_name,
          gender: item.gender,
          is_show: true
        }
        adultsList.push(tm);
      }
    })
    while(customers[customerIndex].adultsList.length > adultsList.length) {
      adultsList.push({
        last_name: '',
        first_name: '',
        gender: 'MR',
        is_show: true
      })
    }
    customers[customerIndex].adultsList = [...adultsList];
    this.setData({ 
      showContactPicker: false, 
      contactsSelectList: [], 
      customerIndex: 0,
      customers,
    })
  },
})