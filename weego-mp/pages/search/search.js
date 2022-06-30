// pages/search/search.js
import { getSearchRecommend, getSearch } from '../../utils/api'
import { throttle } from '../../utils/util';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isFocus: false,
    value: '',
    recommendList: [],
    searchList: [],
    isSearch: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({ isSearch: true })
    getSearchRecommend().then(data => {
      if (data.data.status === 200) {
        this.setData({ 
          isSearch: false,
          recommendList: data.data.data 
        })
      }
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  },

  /* 自定义事件 */
  onSearchFocus: function(e) {
    this.setData({isFocus: true})
  },
  onSearchBlur: function(e) {
    if (this.data.value.length === 0) {
      this.setData({isFocus: false})
    }
  },
  onClearTap: function() {
    this.setData({value: '', searchList: []})
  },
  onItemTap: function(e) {
    const data = e.currentTarget.dataset.item;
    if (data.type === 'city') {
      if (data.listType === 'packages') {
        wx.navigateTo({
          url: `/pages/mallListPackage/mallListPackage?id=${data._id}&name=${data.name}&label=${data.label}`
        });
      } else {
        wx.navigateTo({
          url: `/pages/mallListHotel/mallListHotel?id=${data._id}&name=${data.name}&label=${data.label}`
        });
      }
    } else if (data.type === 'hotels') {
      wx.navigateTo({
        url: '/pages/hotelDetail/hotelDetail?hId=' + data._id
      });
    } else {
      wx.navigateTo({
        url: '/pages/packageDetail/packageDetail?pId=' + data._id
      });
    }
  },
  onSearch: throttle(function(e) {
    let value = this.data.value;
    if (e.type === 'input') {
      this.setData({value: e.detail.value})
      value = e.detail.value;
    } else if (e.type === 'confirm') {
      value = e.detail.value;
    }
    if (!!value) {
      this.setData({ isSearch: true })
      getSearch(value).then(data => {
        if (data.data.status === 200) {
          let searchList = data.data.data;
          searchList = searchList.map(item => this.mapSearchResult(item, value))
          this.setData({ isSearch: false, searchList })
        }
      })
    } else {
      this.setData({ searchList: [] })
    }
  }, 800, { leading: false, trailing: true }),

  mapSearchResult(item, searchText) {
    item.name_render = `${item.name}${item.label ? item.label : ''}`;
    item.name_en_render = item.name_en || '';

    // 高亮的时候要注意，不能修改原字符串里面的大小写
    const highlight = (str, word) => {
      const startIndex = str.toLowerCase().indexOf(word);
      if (startIndex === -1) {
        return str;
      }

      return str.replace(new RegExp(word, 'gi'), m => `^${m}$`);
    };

    searchText
      .toLowerCase()
      .trim()
      .split(/\s+/)
      .forEach(word => {
        if (word) {
          item.name_render = highlight(item.name_render, word);
          item.name_en_render = highlight(item.name_en_render, word);
        }
      });
    
    let nameArr = [];
    let name_render = item.name_render.split(/\^/);
    name_render.map(item => {
      item = item.split(/\$/);
      if (item.length === 1) {
        nameArr.push({type: 'text', text: item[0]})
      } else if (item.length === 2) {
        nameArr.push({type: 'key', text: item[0]})
        nameArr.push({type: 'text', text: item[1]})
      }
      return item;
    })

    let nameEnArr = [];
    let name_en_render = item.name_en_render.split(/\^/);
    name_en_render.map(item => {
      item = item.split(/\$/);
      if (item.length === 1) {
        nameEnArr.push({type: 'text', text: item[0]})
      } else if (item.length === 2) {
        nameEnArr.push({type: 'key', text: item[0]})
        nameEnArr.push({type: 'text', text: item[1]})
      }
      return item;
    })

    item.name_render = item.name_render.replace(/\^/g, '<text>');
    item.name_render = item.name_render.replace(/\$/g, '</text>');
    item.name_en_render = item.name_en_render.replace(/\^/g, '<text>');
    item.name_en_render = item.name_en_render.replace(/\$/g, '</text>');

    item.nameArr = nameArr;
    item.nameEnArr = nameEnArr;

    return item;
  }
})