import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import '@by/by-ui/lib/theme-test/index.css'
import { ByButton, foucs, date2str, ByCheckbox } from '@by/by-ui'

Vue.config.productionTip = false

Vue.component(ByButton.name, ByButton)
Vue.directive('focus', foucs)
Vue.filter('date2str', date2str)
Vue.component(ByCheckbox.name, ByCheckbox)
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
