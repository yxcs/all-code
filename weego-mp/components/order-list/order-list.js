// components/order-list/order-list.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    avatarUrl: String,
    nickName: String,
    winHeight: Number
  },

  /**
   * 组件的初始数据
   */
  data: {
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },

  /**
   * 组件的方法列表
   */
  methods: {

  }
})
