import wxR from './request';
import { hexMD5 } from './md5';

const config = {
  APPID: 'wx14f9e0fdf55d8eaa',
  APPSECRET: '2d8ea36610af2dee7cfd28fba0c33371',
  GRENT_TYPE: 'authorization_code'
}

/**
 * 获取城市列表
 * /api/cities/flatlist
 */
export function getCityList() {
  return wxR.getRequest('/api/cities/flatlist');
}

/**
 * 获取精选页面列表
 */
export function getRecommends(category) {
  var url = '/api/recommends/mall?progress=false';
  if (category === 'HOTEL') {
    url+='&category=hotels';
  } else if (category === 'PACKAGE') {
    url+='&category=packages';
  } else if (category === 'PRODUCT') {
    url+='&category=products';
  }
  return wxR.getRequest(url);
}

/**
 * 获取酒店详情
 */
export function getHotelDetails(hId) {
  return wxR.getRequest(`/api/poi/hotels/${hId}?progress=false`);
}

/**
 * 拉取房型
 */
export function getRoomByType(hid, params) {
  return wxR.postRequest(`/api/hotel/${hid}/rooms`, {
    dataType: 'JSON',
    data: params
  });
}

/**
 * 获取套餐详情
 */
export function getPackageDetails(pId) {
  return wxR.getRequest(`/api/packages/${pId}?progress=false`);
}

/**
 * 获取城市套餐列表
 */
export function getCityPackage(cityId, page) {
  return wxR.getRequest(`/api/packages?cityId=${cityId}&page=${page}&progress=false`);
}

/**
 * 获取酒店标签列表
 */
export function getHotelTags(hId) {
  return wxR.getRequest(`/api/hotels/${hId}/categories`);
}

/**
 * 获取城市酒店列表
 */
export function getCityHotel(cityId, categoryId, page) {
  return wxR.getRequest(`/api/poi/hotels?cityId=${cityId}&categoryId=${categoryId}&page=${page}&progress=false`);
}

/**
 * 获取搜索推荐列表
 */
export function getSearchRecommend() {
  return wxR.getRequest(`/api/mall/search/recommend`);
}

/**
 * 搜索
 */

export function getSearch(word) {
  return wxR.getRequest(`/api/mall/search?word=${word}`);
}

/**
 * 获取套餐详情信息
 */
export function getPackageMore(pId) {
  return wxR.getRequest(`/api/packages/${pId}?progress=false`);
}

/**
 * 获取酒店详情信息
 */
export function getHotelMore(hId) {
  return wxR.getRequest(`api/poi/hotels/${hId}?progress=false`);
}

/**
 * 获取用户详情
 */
export function getUserDetail(uid) {
  return wxR.getRequest(`api/user/${uid}`);
}

/**
 * 获取订单列表
 */
export function getOrderList(page) {
  return wxR.getRequest(`/api/orders?page=${page}`);
}

/**
 * 获取订单详情
 */
export function getOrderDetail(oId) {
  return wxR.getRequest(`api/orders/${oId}`);
}

/** 
 * 预定酒店接口
 */
export function getPreBooking(hid, params) {
  return wxR.postRequest(`api/hotel/${hid}/preparebooking`, {
    dataType: 'JSON',
    data: params
  });
}

/** 
 * 预定套餐接口
 */
export function getPrePackage(pid, params) {
  const _t = Date.now();
  return wxR.postRequest(`/api/packages/preparebooking/${pid}?_t=${_t}`, {
    dataType: 'JSON',
    data: params
  });
}

/** 
 * 小程序登录
 */
export function login(params) {
  let url = '/api/user/wechat?';
  if (!!params.openid) {
    url += `openid=${params.openid}&`
  }
  if (!!params.headimgurl) {
    url += `headimgurl=${params.headimgurl}&`
  }
  if (!!params.nickname) {
    url += `nickname=${params.nickname}&`
  }
  if (!!params.unionid) {
    url += `unionid=${params.unionid}`
  }
  return wxR.postRequest(url, {
    dataType: 'JSON',
    data: {}
  });
}

/**
* 获取id
 */
export function getUnionid(code) {
  return wxR.postRequest(`/api/users/oauth/wechat-xcx`, {
    dataType: 'JSON',
    data: {
      code
    },
  });
}

/**
 * 获取优惠券
 */
export function getCoupon(apply_on, code) {
  return wxR.getRequest(`api/coupon?apply_on=${apply_on}&code=${code}`);
}

/**
 * 获取验证码
 */
export function getVerifycode(phone) {
  return wxR.getRequest(`api/users/verifycode/mobile?behavior=signIn&mobile=${phone}`);
}

/**
* 获取id
 */
export function pushOrders(cityId, params) {
  const XTOKEN = wx.getStorageSync('x-csrf-token')
  let XSID = wx.getStorageSync('x-sid');
  const userLogin = wx.getStorageSync('userLogin');
  return wxR.postRequest(`/api/orders`, {
    dataType: 'JSON',
    data: { ...params },
    header: {
      'Accept': 'application/json, text/plain, */*',
      'content-type': 'application/json;charset=UTF-8',
      'accept-version': '6.0.0',
      'X-SID': XSID || '',
      'x-csrf-token': XTOKEN || '',
      'X-VisitType': 'wactat',
      'X-UserId': userLogin._id || ''
    }
  });
}

/**
* 微信绑定手机解密
 */
export function getWxPhoneDecode(params) {
  return wxR.postRequest(`/api/users/wechat-xcx/decode`, {
    dataType: 'JSON',
    data: { ...params },
  });
}

/**
 * 活动列表获取
 */
export function getActiveList() {
  return wxR.getRequest(`api/activity?isMP=true&progress=false`);
}