// components/hotel-concat.js
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
    policy: [],
  },

  /**
   * 组件的方法列表
   */
  methods: {
    makePhoneCall: function(e) {
      const phoneNumber = e.currentTarget.dataset.phone || '010-57273085';
      wx.makePhoneCall({ phoneNumber });
    }
  },
  ready: function() {
    let datas = this.data.datas;
    let policy = datas.policy || [];

    policy = policy.map(item => {
      item.cons = item.content.split('\n');
      return item;
    })
    this.setData({ policy });
  }
})
