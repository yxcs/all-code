import WxRequest from './libs/wxRequest/wx-request/lib/index';
import { hexMD5 } from './md5';
let wxR = new WxRequest({
  // baseURL: 'https://api.weegotr.com/',
  baseURL: 'https://sandbox.api.feifanweige.com/',
  header: {
    'Accept': 'application/json, text/plain, */*',
    'content-type': 'application/json;charset=UTF-8', //'application/x-www-form-urlencoded'
    'accept-version': '6.0.0'
  },
  transformRequest: [
    (data, header) => {
        return data
    },
  ],
  transformResponse: [
    (data, header) => {
      if (typeof data === 'string') {
        try {
          data = JSON.parse(data)
        } catch (e) { /* Ignore */ }
      }
      return data
    },
  ],
})

wxR
  .interceptors.use({
    // 请求数据
    request(request) {
      try {
        const XTOKEN = wx.getStorageSync('x-csrf-token')
        request.header['x-csrf-token'] = XTOKEN;
        request.header['X-VisitType'] = 'wactat';
        let XSID = wx.getStorageSync('x-sid');
        if (!XSID) {
          XSID = hexMD5(`127.0.0.1-${request.header['User-Agent']}-${Date.now()}`);
          wx.setStorageSync('x-sid', XSID);
        }
        request.header['X-SID'] = XSID;

        if (request.url.indexOf('users/oauth/wechat-xcx') > 0) {
          request.header['x-bundleid'] = 'wechat-xcx';
        }
        if (request.url.indexOf('user/wechat') > 0) {
          request.header['X-visit-platform'] = 'wechat-xcx'
        }
        const userLogin = wx.getStorageSync('userLogin');
        if (!!userLogin && !!userLogin._id) {
          request.header['X-UserId'] = userLogin._id;
        }
      } catch (e) {
        console.log(e)
      }
      return request
    },
    // 请求失败
    requestError(requestError) {
      wx.showToast({
        title: '请求出错，请稍后重试',
        icon: 'none',
        duration: 2000
      })
      return Promise.reject(requestError)
    },
    // 响应数据
    response(response) {
      try {
        wx.setStorageSync('x-csrf-token', response.header['x-csrf-token'])
      } catch (e) {
      }
      if (response.data.status !== 200) {
        wx.showToast({
          title: response.data.errmsg || '请求失败，请稍后重试',
          icon: 'none',
          duration: 2000
        })
      }
      return response
    },
    // 响应失败
    responseError(responseError) {
      wx.showToast({
        title: '响应出错，请稍后重试',
        icon: 'none',
        duration: 2000
      })
      return Promise.reject(responseError)
    },
  })

export default wxR;