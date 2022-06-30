import Vue from 'vue'
import App from './App.vue'
import ellipsis from './components/ellipsis'
import multipleSpace from './components/ShoMultipleSpaces'

Vue.config.productionTip = false

Vue.directive('ellipsis', ellipsis)
Vue.directive('multipleSpace', multipleSpace)

new Vue({
  render: h => h(App),
}).$mount('#app')
