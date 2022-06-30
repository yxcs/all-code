import axios from './config'
import config from '@/config'
import demo from './demo'

let allModules = [
  demo
]

const pathSetting = (allModules) => {
  let requestList = {}
  allModules.forEach(p => {
    requestList[p.category] = {}
    const prefix = p.prefix ? `/${p.prefix}` : ''
    p.pathList.forEach(v => {
      requestList[p.category][v.key] = (param = {}) => {
        let curParam = param
        let url = ''
        // 全局mcok或者部分mock
        if (config.IS_MOCK || v.isMock) {
          if (v.url.indexOf('://') > -1) {
            url = v.url
          } else {
            url = config.MOCK_PATH
            url += prefix
            url = url + (v.mockUrl ? v.mockUrl : v.url)
          }
        } else {
          if (v.url.indexOf('://') > -1) {
            url = v.url
          } else {
            url = config.API_PATH
            url += prefix + v.url
          }
        }
        // 支持 /a/b?c形式接口
        if (url.indexOf('?') > -1) {
          url = url.split('?')
          const key = url[1]
          url = url[0] + curParam[key]
          curParam[key] = null
        }
        return v.type === 'get' ? axios.get(url, {params: curParam}) : axios[v.type](url, curParam)
      }
    })
  })
  return requestList
}

const requestList = pathSetting(allModules)

export default requestList
