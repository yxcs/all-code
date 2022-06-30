// 封装请求参数
import http from './axios.config.js'
 
function request({ method = 'get', url, data = {}, params = {} }) {
  return http({
    method,
    url,
    data,
    params,
  })
}
 
export default request