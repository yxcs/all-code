import Vue from 'vue'
import Router from 'vue-router'
import MyLayout from './components/MyLayout'
import Home from './views/Home.vue'
import Article from './views/Article.vue'
import ArticleList from './views/ArticleList.vue'
import Bookmarks from './views/Bookmarks.vue'
import MediaList from './views/MediaList.vue'
import PhotoWall from './views/PhotoWall.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      redirect: '/home',
      name: 'layout',
      component: MyLayout,
      children: [
        {
          path: '/home',
          name: 'home',
          meta: { title: '博客首页', crumbs: [{name: '博客首页', key: 'home', path: '/home'}] },
          component: Home
        }, {
          path: '/article/:id',
          name: 'Article',
          meta: { title: '文章详情', crumbs: [{name: '文章详情', key: 'article', path: '/article/:id'}] },
          component: Article
        }, {
          path: '/articles',
          name: 'ArticleList',
          meta: { title: '技术博客', crumbs: [{name: '技术博客', key: 'articles', path: '/articles'}] },
          component: ArticleList
        }, {
          path: '/medias',
          name: 'MediaList',
          meta: { title: '视频音乐', crumbs: [{name: '视频音乐', key: 'article', path: '/medias'}] },
          component: MediaList
        }, {
          path: '/photos',
          name: 'PhotoWall',
          meta: { title: '图片分享', crumbs: [{name: '图片分享', key: 'photos', path: '/photos'}] },
          component: PhotoWall
        }
      ]
    }, {
      path: '/bookmarks',
      name: 'Bookmarks',
      meta: { title: '收藏书签', crumbs: [{name: '收藏书签', key: 'article', path: '/bookmarks'}] },
      component: Bookmarks
    },
    {
      path: '/about',
      name: 'about',
      component: () => import(/* webpackChunkName: "about" */ './views/About.vue')
    },
    {
      path: '/error',
      name: 'error',
      component: () => import('./views/ErrorPage.vue')
    }
  ]
})
