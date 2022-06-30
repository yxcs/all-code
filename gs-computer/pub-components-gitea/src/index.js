import ByButton from './components/by-button'
import ByCheckbox from './components/by-checkbox'
import ByCascadeTree from './components/by-cascade-tree'
import focus from './directives/foucs'
import dateFilters from './filters/date-filters'
import emitter from './mixins/emitter'

if (typeof window !== 'undefined' && window.Vue) {
  window.Vue.use(install)
}

function install (Vue, opts = {}) {
  // opts 处理待添加...,组件注册时写入的参数

  // 添加组件
  Vue.component(ByButton.name, ByButton)
  Vue.component(ByCheckbox.name, ByCheckbox)
  Vue.component(ByCascadeTree.name, ByCascadeTree)

  // 绑定指令
  Vue.directive('focus', focus)

  // 绑定过滤器
  for (let key in dateFilters) {
    Vue.filter(key, dateFilters[key])
  }

  // mixins
  Vue.mixin(emitter)
}

export default {
  install,
  ByButton,
  ByCheckbox,
  ByCascadeTree
}
