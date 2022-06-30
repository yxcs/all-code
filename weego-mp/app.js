//app.js
import { login, getUnionid, getCityList } from './utils/api';
App({
  onLaunch: function () {

    wx.setStorage({
      key: 'activeKey',
      data: 'CHOSEN'
    })
    getCityList().then(data => {
      try {
        const openid = wx.getStorageSync('openid');
        const unionid = wx.getStorageSync('unionid');
        const userLogin = wx.getStorageSync('userLogin');
        if (!openid || !unionid || !userLogin) {
          this.wxLogin();
        }
      } catch(e) {
        this.wxLogin();
      }
    })
  },
  globalData: {
    userInfo: null,
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
              this.getUserInfo(currentData.openid, currentData.unionid);
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
  getUserInfo: function (openid, unionid) {
    if (!openid) return false;
    let userInfo = wx.getStorageSync('userInfo');
    let params = {
      openid: openid,
      unionid: unionid,
    }
    if (!!userInfo) {
      params.nickname = userInfo.nickName;
      params.headimgurl = userInfo.avatarUrl;
    }
    login(params).then(data => {
      if (data.data.status === 200) {
        wx.setStorage({
          key: "userLogin",
          data: data.data.data
        })
      }
    })
  },
})