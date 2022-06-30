export const request = (params) => {
  return new Promise((resolve, reject) => {
    wx.request({
      url: params.url,
      method: params.method || 'GET',
      responseType: 'text',
      header: {
        'content-type': 'application/json' // 默认值
      },
      data: params.data,
      success (res) {
        resolve(res.data)
      },
      fail(err) {
        reject(err)
      },
      complete() {
      }
    })
  })
}