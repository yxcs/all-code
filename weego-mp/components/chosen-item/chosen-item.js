// components/hotel-item.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    listData: Object
  },

  /**
   * 组件的初始数据
   */
  data: {
    precent: 0,
    days: '00',
    hours: '00',
    minutes: '00',
    seconds: '00'
  },

  /**
   * 组件的方法列表
   */
  methods: {
    
  },

  ready: function() {
    let listData = this.data.listData;
    if (!!listData.origin_price) {
      let precent = 100 - Math.round((+listData.price / +listData.origin_price) * 100);
      this.setData({ precent });
    } else if (!!listData.origin_price) {
      let precent = 100 - Math.round((+listData.price / +listData.origin_price) * 100);
      this.setData({ precent });
    }
  },
})
