// components/room-select/room-select.js
import { getRoomByType } from '../../utils/api';
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
    roomCount: 1,
    roomFilters: [{
      adults: 2,
      children: 0
    }]
  },

  /**
   * 组件的方法列表
   */
  methods: {

  },
  attached: function() {
    const params = {
      checkInTime: "2018-07-09",
      checkOutTime: "2018-07-11",
      noDefaultErrorHandler: true,
      progress: true,
      roomCount: 1,
      roomFilters: [{
        adults: 2,
        children: 0
      }]
    }
    getRoomByType('59292a0c78647808cee95275', params).then(data => {
      console.log(data)
    })
  }
})
