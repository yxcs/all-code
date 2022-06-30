import Vue from 'vue'
import axios from 'axios'

axios.defaults.timeout = 5000 // 暂时设置成5s，之后根据后端情况改为2s

// 请求拦截器，可以自定义 预处理内容
axios.interceptors.request.use(request => {
  // 登陆token携带，token默认名称为 auth
  const auth = localStorage.getItem('auth')
  if (auth) {
    request.headers.common['auth'] = auth
  }
  return request
}, error => {
  Vue.prototype.$message.error('ERROR: ' + error.toString())
  return Promise.reject(error)
})

// 影响拦截器，可以自定义 预处理内容
axios.interceptors.response.use(response => {
  // 将token保存到本地
  let auth = response && response.headers && response.headers.auth
  if (auth) {
    localStorage.setItem('auth', auth)
  }
  if (response.status === 404) {
    return Promise.reject({data: null, errorCode: null, message: '接口不存在，请确认后重试'})
  } else {
    return response.data
  }
}, err => {
  // 网络问题，通过2种方式提示，业务不处理
  Vue.prototype.$message.error('ERROR: ' + err.toString())
  return Promise.reject(err)
})

export default axios