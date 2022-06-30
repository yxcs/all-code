import Vue from 'vue'
// 引入图表绘制
import VCharts from 'v-charts'
import App from './App.vue'
import VueRouter from 'vue-router'
import hljs from 'highlight.js';
// 引入自定义组件
import By from '../src'
Vue.use(By)

Vue.use(VCharts)

// 引入element-ui，开发的组件可以是基于element-ui
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI)

// 引入demo-block，全局引用，render时可直接使用
import DemoBlock from './components/demoBlock'
Vue.component('demo-block', DemoBlock)

// 引入小程序预览
import MpPreview from './components/mpPreview'
Vue.component(MpPreview.name, MpPreview)

// 引入项目样式入口
import './assets/sass/index.scss'

// 引入路由
import routes from './route'
Vue.use(VueRouter)
const router = new VueRouter({
  routes
})

router.afterEach(route => {
  // https://github.com/highlightjs/highlight.js/issues/909#issuecomment-131686186
  Vue.nextTick(() => {
    const blocks = document.querySelectorAll('pre code:not(.hljs)');
    Array.prototype.forEach.call(blocks, hljs.highlightBlock);
    var nodeList = document.querySelectorAll('pre.hljs')
    for (let i = 0; i < nodeList.length; i++) {
      nodeList[i].className = ''
    }
  });
});

/* eslint-disable no-new */
new Vue({
  render(createElement) {
    return createElement(App)
  },
  router
}).$mount('#app')
