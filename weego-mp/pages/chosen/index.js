// pages/chosen/index.js
let observer = require('../../utils/libs/observer.js').observer;
import { getRecommends } from '../../utils/api';
import { transformWithComma } from '../../utils/util';
import ImgLoader from '../../components/img-loader/img-loader.js';
let timer = null;
Page(observer({

  /**
   * 页面的初始数据
   */

  props: {
    todoStore: require('../../stores/store.js').default,
  },

  data: {
    activeKey: 'CHOSEN',
    list: [],
    hotelList: [],
    packageList: [],
    renderList: [],
    page: 1,
    isNoMore: false,
    imgList: [],
    pageLoading: false,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const activeKey = wx.getStorageSync('activeKey') || 'CHOSEN';
    if (activeKey === 'CHOSEN') {
      wx.setNavigationBarTitle({ title: 'Weego 精选推荐' });
    } else if (activeKey === 'HOTEL') {
      wx.setNavigationBarTitle({ title: 'Weego 精选酒店' });
    } else if (activeKey === 'PACKAGE') {
      wx.setNavigationBarTitle({ title: 'Weego 精选套餐' });
    }
    this.imgLoader = new ImgLoader(this);
    this.setData({ activeKey});
    this.getList(activeKey);
  },

  tabChange: function (e) {
    const activeKey = e.detail.activeKey;
    let currentList = [];
    if (activeKey === 'CHOSEN') {
      currentList = this.data.list;
      wx.setNavigationBarTitle({ title: 'Weego 精选推荐' });
    } else if (activeKey === 'HOTEL') {
      currentList = this.data.hotelList;
      wx.setNavigationBarTitle({ title: 'Weego 精选酒店' });
    } else if (activeKey === 'PACKAGE') {
      currentList = this.data.packageList;
      wx.setNavigationBarTitle({ title: 'Weego 精选套餐' });
    }
    const renderList = currentList.slice(0, 4)
    this.setData({ activeKey, page: 1, renderList, isNoMore: false });
    // this.getList(activeKey);
  },
  getList: function(activeKey) {
    this.setData({ pageLoading: true });
    getRecommends(activeKey).then(data => {
      if(data.data.status === 200) {
        let list = data.data.data;
        list = list.map(item => {
          item.items = item.items.map(subItem => {
            subItem.priceText = transformWithComma(subItem.price);
            if (!!subItem.origin_price) {
              subItem.originPriceText = transformWithComma(subItem.origin_price);
            }
            if (!!subItem.discounted_price) {
              subItem.discountedPriceText = transformWithComma(subItem.discounted_price);
            }
            return subItem;
          })
          return item;
        })
        let hotelList = [];
        let packageList = [];
        let renderList = [];
        let imgList = [];
        list.map(item => {
          if (item.category === 'hotels') {
            hotelList.push(...item.items);
          }
          if (item.category === 'packages') {
            packageList.push(...item.items);
          }
          return item;
        })

        list.map(item => {
          item.items.map(subItem => {
            imgList.push(subItem.cover_image_url);
            return subItem;
          })
          return item;
        })
        imgList = this.imgLoader._imgListChange(imgList);
        this.imgLoader._loadImages(imgList);

        if (activeKey === 'CHOSEN') {
          renderList = list.slice(0, 4);
        } else if (activeKey === 'HOTEL') {
          renderList = hotelList.slice(0, 4);
        } else if (activeKey === 'PACKAGE') {
          renderList = packageList.slice(0, 4);
        }

        this.setData({
          list,
          hotelList,
          packageList,
          renderList,
          imgList,
          pageLoading: false,
        })
      }
      wx.stopPullDownRefresh();
    }).catch((err) => {
      wx.stopPullDownRefresh();
    }) 
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    
  },
  onShow: function () {
    // console.log(this.props.todoStore)
  },
  onHide: function () {
    clearTimeout(timer);
    timer = null;
  },
  onUnload: function () {
    clearTimeout(timer);
    timer = null;
  },
  onPullDownRefresh: function () {
    const activeKey = wx.getStorageSync('activeKey') || 'CHOSEN';
    this.setData({ activeKey, page: 1, isNoMore: false });
    this.getList(activeKey);
  },
  onReachBottom: function () {
    if (this.data.isNoMore) {
      return false;
    }
    let currentList = [];
    const activeKey = this.data.activeKey;
    if (activeKey === 'CHOSEN') {
      currentList = this.data.list;
    } else if (activeKey === 'HOTEL') {
      currentList = this.data.hotelList;
    } else if (activeKey === 'PACKAGE') {
      currentList = this.data.packageList;
    }
    let renderList = this.data.renderList;
    let page = this.data.page;
    renderList.push(...currentList.slice(page * 4, (page+1) * 4));
    if (renderList.length >= currentList.length) {
      this.setData({ renderList, page, isNoMore: true });
    } else {
      clearTimeout(timer);
      timer = setTimeout(_ => {
        this.setData({ renderList, page });
      }, 500)
    }
  },
  onShareAppMessage: function () {
  
  }
}))