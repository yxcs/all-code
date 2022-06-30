// components/hotel-item.js
let timer = null;
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
      let precent = 100 - Math.ceil((+listData.price / +listData.origin_price) * 100);
      this.setData({ precent });
    }
    if (!!listData.offline_time) {
      timer = setInterval(() => {
        const nowTime = new Date().getTime();
        const endTime = new Date(listData.offline_time).getTime();
        console.log(nowTime, endTime)
        if (nowTime > endTime) {
          this.setState({
            days: '00',
            hours: '00',
            minutes: '00',
            seconds: '00',
          });
          clearInterval(timer);
          timer = null;
          return;
        }
        const timeDifference = endTime - nowTime;
        const days = Math.floor(timeDifference / 1000 / 60 / 60 / 24);
        const hours = Math.floor((timeDifference / 1000 / 60 / 60) % 24);
        const minutes = Math.floor((timeDifference / 1000 / 60) % 60);
        const seconds = Math.floor((timeDifference / 1000) % 60);
        this.setData({
          days: days > 9 ? days : `0${days}`,
          hours: hours > 9 ? hours : `0${hours}`,
          minutes: minutes > 9 ? minutes : `0${minutes}`,
          seconds: seconds > 9 ? seconds : `0${seconds}`,
        });
      }, 1000);
    }
  },
  detached: function () {
    clearInterval(timer);
    timer = null;
  }
})
