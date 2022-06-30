---
title: 简单Vue小项目
date: 2017-05-26 15:35:17
tags: JS
description: 
---

# vue vuex vue-router vue-resource 简单的搭建一个 vue 小项目

在开始之前，默认你已经对vue的基础知识有了一定的了解了

这里的开发使用的是es6写的，如果你还未掌握es6的相关知识，那么你----需要抓紧学了，可以戳这里来学。es2015，es2016……

先贴一波文档：

       vue中文网：[http://cn.vuejs.org/](http://cn.vuejs.org/)

       vuex中文网：[http://vuex.vuejs.org/zh-cn/](http://vuex.vuejs.org/zh-cn/)

       vue-resource：[https://github.com/pagekit/vue-resource/blob/master/docs/http.md](https://github.com/pagekit/vue-resource/blob/master/docs/http.md)

       vue-router2：[http://router.vuejs.org/zh-cn/](http://router.vuejs.org/zh-cn/)

        如果看别的东西嫌烦，直接看文档，vue的中文文档相当滴好了

使用vue-cli直接生成项目的基础结构，这里使用webpack来进行模板化，自动化：
如果看别的东西嫌烦，直接看文档，vue的中文文档相当滴好了
使用vue-cli直接生成项目的基础结构，这里使用webpack来进行模板化，自动化：
```shell
npm install -g webpack     //全局安装webpack
npm isntall -g vue-cli    // 全局安装vue-cli
vue init webpack  vue-project   //生成一个以webpack构建的项目 vue-preject
cd vue-project  
npm install  
npm run dev     //运行项目
```
生成的目录如下：

![目录结构](/vue/base_vue_project/20161208175927076.png)

这里首先安装 webpack 以及vue-cli，然后生成一个名为vue-project的项目，进入到项目中，安装依赖，最后运行，在浏览器中打开http://localhost:8080 即可。
因为要使用  vuex  vue-router  vue-resource  这三个东西，所以先安装一下：

```shell
npm install --save  vuex vue-router vue-resource
```
在src文件下建一个routes.js文件 用于设置路径，使用方式如下：

```js
import Vue from 'vue'
import VueRouter from 'vue-router'
 
import Header from './components/header.vue'
import Home from './components/home.vue'
import Footer from './components/footer.vue'
import Content from './components/content.vue'
import Charts from './components/charts.vue'
import Details from './components/details.vue'
 
Vue.use(VueRouter)
 
const routes = [
  {path: '/home', component: Content, name:'content',
   children: [
        {
          path: 'footer',
          component: Footer
        }
      ]
  },
  {path: '/details/:id', component: Details, name: 'details'},
  {path: '/charts', component: Charts, name:'charts'},
  {path: '*', component: Content, name:'home'}
]
 
const router = new VueRouter({
  mode: 'history',
  routes
})
 
export default router
```

在src下的components文件中建立charts.vue、content.vue、details.vue、footer.vue、header.vue、home.vue等vue文件

在src下建立store文件夹，并在该文件夹下建立actions.js、index.js、mutations.js等文件，用于放置vuex内容，index.js用于整合state、actions、nutations、getters等内容。

```js
//index.js
import Vue from 'vue'
import Vuex from 'vuex'
import actions from './actions.js'
import mutations from './mutations.js'
import lists from './modules/lists.js'
 
Vue.use(Vuex)
 
const store = new Vuex.Store({
  state: {
  	count: 0
  },
  mutations,
  actions,
  getters: {
 
  },
  modules: {
  	lists
  }
})
 
export default { store }
```
```js
//mutations.js
const mutations = {
  increment (state) {
    state.count++
  }
}
 
export default mutations
```

在加一些css样式，最后的运行结果如下：

![添加样式](/vue/base_vue_project/20161209093509203.png)

整个目录的结构如下：

![整个目录结构](/vue/base_vue_project/20161209093553979.png)


本地开发的时候获取数据时会出现跨域的问题，这里可以配置config文件夹下的proxyTable 属性，详情可以查看这里

例子下载地址  [https://github.com/yxcs/vue-test](https://github.com/yxcs/vue-test)
