import Vue from 'vue'
import VueSocketIO from 'vue-socket.io';
// import socketio from 'socket.io-client';
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import App from './App'
import router from './router/index'
import store from './store/store'

import axios from 'axios'

Vue.config.debug = true
Vue.config.productionTip = false
Vue.prototype.$axios = axios
Vue.use(new VueSocketIO({
  debug: true,
  connection: 'http://localhost:2200/'
}))

Vue.use(ElementUI)

new Vue({
  el: '#app',
  router: router,
  store: store,
  template: '<App/>',
  components: { App }
})
