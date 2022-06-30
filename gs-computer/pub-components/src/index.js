import components from './components'
import directives from './directives'
import filters from './filters'
import emitter from './mixins/emitter'
import GlobalErrorCatch from './plugins/globalErrorCatch'

if (typeof window !== 'undefined' && window.Vue) {
  window.Vue.use(install)
}

function install (Vue, opts = {}) {
  // opts 处理待添加..., 组件注册时写入的参数

  // 添加组件
  for (let key in components) {
    Vue.component(components[key].name, components[key])
  }

  // 绑定指令
  for (let key in directives) {
    Vue.directive(key, directives[key])
  }

  // 绑定过滤器
  for (let key in filters) {
    Vue.filter(key, filters[key])
  }

  // 全局插件
  Vue.use(GlobalErrorCatch)

  // mixins
  Vue.mixin(emitter)
}

export default {
  install,
  ...components,
  ...directives,
  ...filters,
  GlobalErrorCatch,
  emitter
}
