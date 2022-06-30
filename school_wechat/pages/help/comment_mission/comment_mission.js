const app = getApp();
const http = require("./../../../utils/http.js");

Page({
  data: {
    logs: [],
    imageArray: [],
    uploadToken: null,
    attachments: [],
    textContent: '',
    objId: '',
    score:1,
  },
  onLoad: function (options) {
    let id = options.id;
    this.setData({
      objId: id
    });

  },
  onShow: function () {
    //设置七牛上传token
    app.getUploadToken(token => {
      this.setData({
        uploadToken: token
      });
    });
  },

  /** 提交 */
  post: function (e) {
    let content = this.data.textContent;
    let attachments = this.data.attachments;
    let id = this.data.objId;
    let score = this.data.score;
    let formId = e.detail.formId;
    app.collectFormId(formId);

    if (content == '') {
      wx.showLoading({
        title: '内容不能为空！',
      });
      setTimeout(function () {
        wx.hideLoading();
      }, 1500)
      return false;
    }

    http.post(`/comment/${id}/job`, {
      content: content,
      attachments: attachments,
      type: 6,
      score:score
    }, res => {
      console.log(res);
      if(res.data.error_code != 500){
        wx.showLoading({
          title: '评论成功！',
        });
        setTimeout(function () {
          wx.hideLoading();
          wx.navigateBack({ comeBack: true });
        }, 1000)
      }else{
        wx.showLoading({
          title: res.data.error_message,
        });
        setTimeout(function () {
          wx.hideLoading();
        }, 1000)
      }
    });

  },

  /**
   * 选择图片并且上传到七牛
   */
  selectImage: function () {
    let _this = this;
    wx.chooseImage({
      count: 9, // 默认9
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success: function (res) {
        let temArray = _this.data.imageArray;
        let temUrlArray = _this.data.attachments;
        var filePaths = res.tempFilePaths;
        let position = res.tempFilePaths.length - 1;
        wx.showLoading({
          title: '加载中',
        })

        filePaths.map((item, index) => {
          temArray.push(item);
          uploader.upload(item, key => {
            console.log(index);
            console.log(position);
            if (position == index) {
              wx.hideLoading();
            }

            let temAttachments = _this.data.attachments;

            if (key != '' || key != null) {
              temAttachments.push(key);
              _this.setData({
                attachments: temAttachments
              });
            }
            console.log(key);
          })
        });

        _this.setData({
          imageArray: temArray
        });
      }
    })

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
   * 移除图片
   */
  removeImage: function (event) {
    let id = event.target.id;
    let arr = this.data.imageArray;
    let newAttachments = this.data.attachments;
    let newArray = arr.filter((item, index) => {
      if (index != id) {
        return item;
      }
    });

    newAttachments = newAttachments.filter((item, index) => {
      if (index != id) {
        return item;
      }
    });

    this.setData({
      imageArray: newArray,
      attachments: newAttachments
    });
  },

  /**
   * 获取输入内容
   */
  getTextContent: function (event) {
    let value = event.detail.value;
    this.setData({
      textContent: value
    });
  },
  /**
   * 评分
   */
  score:function(e){
    let score = e.currentTarget.dataset.score;
    this.setData({
      score:score
    })
  }
})