// import http from '..
const bufferDownload = (url = '', params = {}, responseType = 'arraybuffer', file) => {
  http({
    method: 'POST',
    url,
    data: params,
    responseType
  }).then(res => {
    let blob = new Blob([res], {type: 'application/octet-stream'}) // stream 转成blob
    let filename = file || (+ new Daet()) + '.xlsx'
    if (typeof window.navigator.msSaveBlob !== 'undefined') { // IE10+下载方式
       window.navigator.msSaveBlob(blob, filename)
    } else { // 谷歌火狐下载
      var blobURL = window.URL.createObjectURL(blob) // 将blob对象转为一个URL
      var tempLink = document.createElement('a') // 创建一个a标签
      tempLink.style.display = 'none'
      tempLink.href = blobURL
      tempLink.setAttribute('download', filename) // 给a标签添加下载属性
      if (typeof tempLink.download === 'undefined') {
        tempLink.setAttribute('target', '_blank')
      }
      document.body.appendChild(tempLink) // 将a标签添加到body当中
      tempLink.click() // 启动下载
      document.body.removeChild(tempLink) // 下载完毕删除a标签
      window.URL.revokeObjectURL(blobURL)
    }
  })
}

export default bufferDownload