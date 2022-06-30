import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'layout',
    component: () => import('../components/layout/index.vue'),
    children: [
      {
        path: '/',
        name: 'home',
        meta: {title: '网站首页', crumbs: [{path: '/', name: '网站首页'}]},
        component: () => import('../views/Home.vue')
      }, {
        path: '/about',
        name: 'about',
        meta: {title: '关于页面', crumbs: [{path: '/about', name: '关于页面'}]},
        component: () => import('../views/About.vue')
      }, {
        path: '/demo/dialog',
        name: 'demoDialog',
        meta: {title: '弹窗示例', crumbs: [{path: '/demo/dialog', name: '弹窗示例'}]},
        component: () => import('../views/demo/dialog.vue')
      }, {
        path: '/demo/dialog/:id',
        name: 'demoDialogDetail',
        meta: {title: '弹窗示例1', crumbs: [{path: '/demo/dialog', name: '弹窗示例'}, {path: '/demo/dialog/:id', name: '弹窗示例1'}]},
        component: () => import('../views/demo/dialog.vue')
      }, {
        path: '/demo/tab',
        name: 'demoTab',
        meta: {title: '标签页', crumbs: [{path: '/demo/tab', name: '标签页'}]},
        component: () => import('../views/demo/tab.vue')
      }, {
        path: '/demo/table',
        name: 'demoTable',
        meta: {title: '表格示例', crumbs: [{path: '/demo/table', name: '表格示例'}]},
        component: () => import('../views/demo/table.vue')
      }
    ]
  }, {
    path: '/login',
    name: 'loginIndex',
    component: () => import('../views/login.vue')
  }, {
    path: '*',
    redirect: '/',
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
