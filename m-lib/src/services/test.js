// 封装页面请求
import request from './config/require'


// 登录验证接口
export const addLogin = (data) => request({ url: '/login', method: "post", data, })