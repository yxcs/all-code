// components/top-tab/top-tab.js
let todo = require('../../stores/store.js').default;
Component({
  /**
   * 组件的属性列表
   */
  properties: {

  },

  /**
   * 组件的初始数据
   */
  data: {
    activeKey: 'CHOSEN'
  },

  /**
   * 组件的方法列表
   */
  methods: {
    onTopTabChange: function(e) {
      let activeKey = e.currentTarget.dataset.key;
      this.setData({ activeKey });
      wx.setStorage({
        key: 'activeKey',
        data: activeKey
      });
      this.triggerEvent('tabChange', { activeKey }, {});
    },
    onTestMobx: function () {
      // todo.addTodo()
    }
  }
})
