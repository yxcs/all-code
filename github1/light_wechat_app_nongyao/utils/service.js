const config = {
  url: 'https://video-restapi.mdscj.com/'
};

// 获取所有视频列表
const getAllList = (params) => {
  return wx.request;
};

// 获取推荐视频列表
const getRecomendation = (params) => {
  return wx.request;
};

// 获取菜单列表
const getMenuLists = () => {
  return new Promise((resolve, reject) => {
    wx.request({
      url: `${config.url}/wzry/getTagList`,
      success: (res) => {
        if (res.data.status === 1) {
          resolve(res.data.data || [])
        } else {
          wx.showToast({
            title: '网络异常，请稍后重试'
          })
        }
      },
      fail: (e) => {
        wx.showToast(e)
      }
    })
  });
};

const getVideoList = (pager, tagId) => {
  return new Promise((resolve, reject) => {
    wx.request({
      url: `${config.url}/wzry/getVideoByTag`,
      data: {page: pager.page, size: pager.size, tagId},
      method: 'POST',
      success: function(res){
        if (res.data.status === 1 && 
          res.data.data.data &&
          res.data.data.data.length) {
          res.data.data.data.forEach((item, index, thisArr) => {
            item.updatedAt = 
              new Date(item.updatedAt).toLocaleDateString()
              .replace(/\//g, '-');
          })
          resolve(res.data.data.data || []);          
        } else {
          resolve([])
        }
      },
      fail: function(res) {
        // fail
        resolve([]);
        wx.showToast(res)
      }
    })
  })
};

const getVideoDetail= (id) => {
  id = +id;
  return new Promise((resolve, reject) => {
    wx.request({
      url: `${config.url}/wzry/getVideoDetail/${id}`,
      method: 'GET',
      success: function(res){
        if (res.data.status === 1) {
          resolve(res.data || {});          
        } else {
          resolve([])
        }
      },
      fail: function(res) {
        // fail
        resolve([]);
        wx.showToast(res)
      }
    })
  })
};

module.exports = {
  getRecomendation,
  getAllList,
  getVideoList,
  getMenuLists,
  getVideoDetail
};