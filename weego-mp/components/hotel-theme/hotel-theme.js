// components/hotel-theme/hotel-theme.js
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
    isDescMore: false,
    sort_desc: ''
  },

  /**
   * 组件的方法列表
   */
  methods: {
    tapDescMore: function() {
      this.setData({isDescMore: false})
    }
  },
  ready: function() {
    let sort_desc = '';
    let isDescMore = false;
    let datas = this.data.datas;
    if (datas.introduction && datas.introduction.length > 120) {
      sort_desc = datas.introduction.substr(0, 120);
      sort_desc += '...';
      isDescMore = true;
    }
    this.setData({ isDescMore, sort_desc });
  }
})
