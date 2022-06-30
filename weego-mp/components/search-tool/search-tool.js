Component({
  properties: {
    // 这里定义了innerText属性，属性值可以在组件使用时指定
    innerText: {
      type: String,
      value: 'default value',
    }
  },
  data: {
    isFocus: false,
    value: ''
  },
  methods: {
    onSearchFocus: function(e) {
      this.setData({isFocus: true})
    },
    onSearchBlur: function(e) {
      if (this.data.value.length === 0) {
        this.setData({isFocus: false})
      }
    },
    onSearchInput: function(e) {
      this.setData({value: e.detail.value})
    }
  }
})