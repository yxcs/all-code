// components/package-theme.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    datas: Object
  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {
    makePhoneCall: function(e) {
      const phoneNumber = e.currentTarget.dataset.phone || '010-57273085';
      wx.makePhoneCall({ phoneNumber });
    }
  }
})
