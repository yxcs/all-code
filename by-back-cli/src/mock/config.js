const API_PATH_ONLINE = 'http://arkapi.biyao.com'
const API_PATH_DEV = 'http://arkapi.biyao.com'
const IS_MOCK = true // true or false, demo default true
// EASYMOCK 地址，http://192.168.99.117:7300，请注册登陆使用
const MOCK_PATH = 'http://192.168.99.117:7300/mock/5e0db209ec68950520b689c1/demo'
const API_PATH = process.env.NODE_ENV === 'development' ? API_PATH_DEV : API_PATH_ONLINE
export default {
  IS_MOCK,
  MOCK_PATH,
  API_PATH
}