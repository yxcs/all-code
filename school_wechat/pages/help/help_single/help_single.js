const app = getApp();
const util = require("./../../../utils/util.js");
const http = require("./../../../utils/http.js");

Page({
  data: {
    pageSize: 10,
    pageNumber: 1,
    initPageNumber: 1,
    jobs: [],
    id:'',
    baseImageUrl: app.globalData.imageUrl,
    showGeMoreLoadin: false,
    newMessageNumber: 0,
    currentTime: '',
    profile: null,
    filter: '',
    pageSize: 10,
    pageNumber: 1,
    initPageNumber: 1
  },

  onLoad: function (option) {
    wx.showLoading({
      title: '加载中...',
    });
    if (option.id){
      this.setData({
        id: option.id
      });
      this.partTimeJob();
    }else{
      this.helps();
    }

    this.getProfile();
  },

  onShow: function () {
    this.getProfile();
  },

  /**
  * 上拉加载更多
  */
  onReachBottom: function () {
    let _this = this;
    this.setData({
      showGeMoreLoadin: true
    });
    this.helps();
  },


  /**
   * 获取帖子
   */
  helps: function () {
    let order_by = 'updated_at';
    let sort_by = 'desc';
    let objType = 6;
    let filter = '';

    if (objType == 0 || objType == 1) {
      order_by = 'created_at';
    } else {
      order_by = 'updated_at';
    }

    let _this = this;
    http.get(`/helps?page_size=${_this.data.pageSize} & page_number=${_this.data.pageNumber} & order_by=${order_by} & sort_by=${sort_by} & type=${objType} & filter=${filter}`, {}, res => {
        wx.hideLoading();
        let jobs = _this.data.jobs;
        let data = res.data.data.page_data;
        data.map(item => {
          jobs.push(item);
        })
        _this.setData({
          jobs: jobs,
          pageNumber: _this.data.pageNumber + 1,
          showGeMoreLoadin: false
        })
      });
  },

  /**
 * 获取兼职详情
 */
  partTimeJob: function () {
    let _this = this;
    http.get('/job_detail/' + _this.data.id, {}, res => {
      wx.hideLoading();
      console.log(res.data);
      if (res.data.error_code != 500) {
        let jobs = _this.data.jobs;
        jobs.push(res.data.data);
        _this.setData({
          jobs: jobs
        })
      }
    });
  },

  /**
  * 下拉刷新，获取最新的贴子
  */
  onPullDownRefresh: function () {
    this.newHelps();
  },

  /**
  * 跳转到私信
  */
  letter: function (e) {
    let formId = e.detail.formId;
    app.collectFormId(formId);

    let id = e.currentTarget.dataset.obj;
    wx.navigateTo({
      url: '/pages/personal/letter/letter?friend_id=' + id + '&can_chat=0'
    })
  },

  /**
   * 详情
   */
  detail: function (e) {
    let id = e.currentTarget.dataset.obj;
    let entry = e.currentTarget.dataset.entry;
    let role = e.currentTarget.dataset.role;

    let formId = e.detail.formId;
    app.collectFormId(formId);
    if (entry) {
      wx.navigateTo({
        url: '/pages/help_detail/help_detail?id=' + id + '&role=' + role
      })
    }
  },

  hadStop: function (e) {
    let formId = e.detail.formId;
    app.collectFormId(formId);
  },

  /**
   * 获取个人资料
   */
  getProfile: function () {
    let _this = this;
    http.get('/profile', {}, res => {
      wx.hideLoading();
      console.log(res.data);
      if (res.data.error_code != 500) {
        let profile = res.data.data;
        this.setData({ profile: profile })
      }
    });
  },

  /**
   * 获取帖子
   */
  helps: function () {
    let order_by = 'created_at';
    let sort_by = 'desc';
    let objType = this.data.select;
    let filter = this.data.filter;

    if (objType == 0 || objType == 1) {
      order_by = 'created_at';
    } else {
      order_by = 'updated_at';
    }

    let _this = this;
    http.get(`/helps?page_size=${_this.data.pageSize} & page_number=${_this.data.pageNumber} & order_by=${order_by} & sort_by=${sort_by} & type=${objType} & filter=${filter}`, {}, res => {
        wx.hideLoading();
        let jobs = _this.data.jobs;
        let data = res.data.data.page_data;
        data.map(item => {
          jobs.push(item);
        })

        _this.setData({
          jobs: jobs,
          pageNumber: _this.data.pageNumber + 1,
          showGeMoreLoadin: false
        })
      });
  },

  /**
   * 接单
   */
  order: function (e) {
    if (this.data.profile == null) {
      if (profile == null) {
        wx.showLoading({
          title: '请先完善资料！',
        });
        setTimeout(function () {
          wx.hideLoading();
          wx.navigateTo({
            url: '/pages/set_profile/set_profile'
          })
        }, 1500);
      }

      return false;
    }

    let id = e.currentTarget.dataset.obj;
    let formId = e.detail.formId;
    app.collectFormId(formId);

    http.post('/receipt_order', {
      id: id
    }, res => {
      console.log(res);
      if (res.data.error_code != 500) {
        wx.showLoading({
          title: '接单成功！',
        });
        setTimeout(function () {
          wx.hideLoading();
          app.globalData.postHelp = true;
          wx.navigateTo({
            url: '/pages/help_detail/help_detail?id=' + id
          })
        }, 1500);
      } else {
        wx.showLoading({
          title: res.data.error_message,
        });
        setTimeout(function () {
          wx.hideLoading();
        }, 1500);
      }
    });

  },

  /**
  * 终止悬赏
  */
  stop: function (e) {
    let id = e.currentTarget.dataset.obj;
    let formId = e.detail.formId;
    let _this = this;
    app.collectFormId(formId);

    http.put(`/stop/${id}/job`, {
      form_id: formId
    }, res => {
      console.log(res);
      if (res.data.error_code != 500) {
        wx.showLoading({
          title: '操作成功！',
        });
        setTimeout(function () {
          wx.hideLoading();
          _this.setData({
            select: 6,
            pageNumber: _this.data.initPageNumber,
            jobs: []
          });
          app.globalData.postHelp = false;
          _this.helps();
        }, 1500);
      } else {
        wx.showLoading({
          title: res.data.error_message,
        });
        setTimeout(function () {
          wx.hideLoading();
        }, 1500);
      }
    });

  },

  /**
  * 预览图片
  */
  previewImage: function (event) {
    let url = event.target.id;
    wx.previewImage({
      current: '',
      urls: [url]
    })
  },

  /**
  * 预览图片
  */
  previewMoreImage: function (event) {
    let _this = this;
    let images = event.currentTarget.dataset.obj.map(item => {
      return _this.data.baseImageUrl + item;
    });
    let url = event.target.id;
    wx.previewImage({
      current: url,
      urls: images
    })
  }
});