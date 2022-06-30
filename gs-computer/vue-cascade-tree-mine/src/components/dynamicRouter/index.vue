<template>
  <div class="layout" v-loading="$store.state.loading">
    <div class="top">
      <ul class="left">
        <li><span class="logo"></span></li>
        <li><span class="title" v-text="title"></span></li>
      </ul>
      <ul class="right">
        <li><span class="userName" v-text="nick_name"></span></li>
        <li><span class="logout" @click="logout">退出</span></li>
      </ul>
      <!-- 标签部分 -->
      <div class="label">
        <ul>
          <li :class="{only:tabLabel.length === 1, active:component === e.name}" v-for="(e, i) in tabLabel" :key="i">
            <router-link :to="e.path">{{ e.title | cutStr(6) }}</router-link>
            <i v-show="tabLabel.length > 1" class="el-icon-close" @click="delView(i, e)"></i>
          </li>
        </ul> v-text=""
      </div>
      <!-- 面包屑 -->
      <div class="crumbs" :class="{collapse: collapse}">
        <template v-for="(crumb, idx) in $store.state.crumbs">
          <span :key="crumb.key">
            <span class="split" v-if="idx">/</span>
            <router-link v-if="crumb.path" :to="crumb.path">{{crumb.name}}</router-link>
            <span v-else>{{crumb.name}}</span>
          </span>
        </template>
      </div>
    </div>
    <div :class="{collapse: collapse}" class="content">
      <div>{{nick_name}}</div>
      <!-- 左侧菜单缩放按钮 -->
      <div class="menu_switch" @click="collapse = !collapse"></div>
      <!-- 左侧菜单 -->
      <div class="left-content">
        <div class="menu">
          <el-menu :default-active="$store.state.crumbs[0].key" background-color="#545c64" text-color="#fff" active-text-color="#ffd04b" :collapse="collapse">
            <el-submenu v-for="(item, i) in $store.state.menuData" :key="i" :index="item.id" >
              <template slot="title">
                <i :class="[item.icon || 'el-icon-location']"></i>
                <span v-text="item.resName"></span>
              </template>
              <el-menu-item v-for="(e, i) in item.subList" :key="i" :index="e.id">
                <router-link :to="e.path" v-text="e.resName"></router-link>
              </el-menu-item>
            </el-submenu>
          </el-menu>
        </div>
      </div>
      <div class="right-content" v-if="contentAuth">
        <!-- 内容区域 -->
        <div class="main-content">
          <keep-alive :include="tabInclude" :max="num" :exclude="excludeList">
            <router-view></router-view>
          </keep-alive>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import '@/assets/styles/main.css'
import { mapState, mapMutations } from 'vuex'

export default {
  name: 'layout',
  data () {
    return {
      title: '方舟系统',
      label: [], // 页签
      include: [], // 缓存
      include_cache: {}, // 缓存字典
      excludeList: [], // 禁止缓存
      crumbs: '', // 面包屑
      component: '', // 当前页签
      collapse: false,
      num: 5, // 页签保留数量
      // menuData: this.$store.state.menuData, // 左侧菜单
      nick_name: localStorage.nick_name, // 用户昵称
      contentAuth: true
    }
  },
  mounted () {
    this.addView({
      path: this.$route.path,
      name: this.$route.name,
      title: this.$route.meta.title
    })
    this.getMenus()
    this.setBtnAuth()
  },
  watch: {
    $route (newVal, oldVal) {
      this.addView({
        path: newVal.path,
        name: newVal.name,
        title: newVal.meta.title
      })
    }
  },
  computed: {
    ...mapState('global', [
      'tabInclude',
      'tabLabel'
    ])
  },
  methods: {
    ...mapMutations('global', [
      'setTabInclude',
      'setTabLabel'
    ]),
    // 设置按钮权限
    setBtnAuth () {
      this.$service.account.resourceList({
        filterUserId: localStorage.user_id,
        resClass: 1,
        resType: 2
      }).then(res => {
        let resCodes = res.map(item => {
          return item.resCode
        })
        let btnAuth = this.$store.state.btnAuthArr
        for (let item in btnAuth) btnAuth[item] = false
        for (let i = 0; i < resCodes.length; i++) {
          for (let j in btnAuth) {
            if (j === resCodes[i]) {
              btnAuth[j] = true
            }
          }
        }
      })
    },
    getMenus () {
      this.$service.account.listCascade({
        filterUserId: localStorage.user_id,
        resClass: 1,
        resType: 1
      }).then(res => {
        let menuData = res || []
        if (!menuData || menuData.length === 0) {
          this.contentAuth = false
          this.$message.warning('请联系管理员添加权限！')
          return
        }
        let item = null
        let e = null
        for (let i = 0; i < menuData.length; i++) {
          item = menuData[i]
          for (let j = 0; j < item.subList.length; j++) {
            e = item.subList[j]
            e.path = this.$store.state.pathArr[e.resCode] || ''
            // e.unauthMenu = e.resCode === this.authList[e.resCode] ? true : false
          }
        }
        this.$store.state.menuData = menuData
        this.deleteRoute(menuData)
      })
    },
    addCrumbs (arr) {
      let c = arr[0] && arr[0].meta.crumbs
      for (let i = 1; i < arr.length; i++) {
        arr[i].meta.crumbs && (c += ' / ' + arr[i].meta.crumbs)
      }
      return c
    },
    addView (e) {
      this.addLabel(e)
      this.addInclude(e)
      this.component = e.name
    },
    // 添加标签
    addLabel (e) {
      const tabLabel = this.tabLabel
      let state = true
      for (let i = 0; i < tabLabel.length; i++) {
        if (tabLabel[i].name === e.name) {
          tabLabel[i].path = e.path
          state = false
          break
        }
      }
      if (state) {
        tabLabel.push(e)
        tabLabel.length > this.num && this.delView(0, tabLabel[0])
      }
      this.setTabLabel(tabLabel)
    },
    // 添加缓存列表
    addInclude (e) {
      const tabInclude = this.tabInclude
      let i = tabInclude.indexOf(e.name)
      if (i < 0) {
        tabInclude.push(e.name)
        this.setTabInclude(tabInclude)
        this.include_cache[e.name] = e.path
      } else {
        if (e.path !== this.include_cache[e.name]) {
          tabInclude.splice(i, 1)
          this.setTabInclude(tabInclude)
          this.include_cache[e.name] = undefined
        }
      }
    },
    // 删除标签
    delView (i, e) {
      this.delLabel(i, e)
      this.delInclude(e)
    },
    // 删除标签
    delLabel (i, e) {
      const tabLabel = this.tabLabel
      tabLabel.splice(i, 1)
      if (e.name === this.component) {
        i = i < 1 ? tabLabel.length - 1 : i - 1
        let _name = tabLabel[i].name
        this.$router.push(tabLabel[i].path)
        this.component = _name
      }
      this.setTabLabel(tabLabel)
    },
    // 删除缓存列表
    delInclude (e) {
      const tabInclude = this.tabInclude
      let i = tabInclude.indexOf(e.name)
      tabInclude.splice(i, 1)
      this.setTabInclude(tabInclude)
      this.include_cache[e.name] = undefined
    },
    logout () {
      this.$service.account.loginOut({SSOToken: localStorage.token}).then(res => {
        this.$store.state.user_name = undefined
        // localStorage.user_name = undefined
        window.location = 'http://ark.biyao.com/#/login'
      })
      /* localStorage.removeItem('username')
      window.location.reload() */
    },
    deleteRoute (menu) {
      let routers = this.$allRouters
      let newRouters = []
      let menuList = []
      menu.forEach(item => {
        if (item.subList.length) {
          menuList.push(...item.subList)
        }
      })
      menuList = menuList.map(item => item.path)
      let keys = []
      routers.forEach(superRouter => {
        superRouter.children.forEach(subRouter => {
          if (menuList.indexOf(subRouter.path) > -1) {
            keys.push(subRouter.meta.key)
          }
        })
      })
      newRouters = routers.map(superRouter => {
        const item = {...superRouter}
        item.children = []
        superRouter.children.forEach(subRouter => {
          if (keys.indexOf(subRouter.meta.key) > -1) {
            item.children.push(subRouter)
          }
        })
        return item
      })
      this.$router.addRoutes(newRouters)
      this.$nextTick(() => {
        this.$router.replace(menuList[0])
      })
    }
  }
}
</script>

<style scoped>
.layout {
  width: 100%;
  height: 100%;
}
.left-content {
  position: absolute;
  top: 77px;
  bottom: 0;
  left: 0;
  width: 160px;
  background-color: #E8ECF1;
  user-select: none;
  overflow: hidden;
}
.left-content:hover {
  overflow: auto;
}
.content.collapse .left-content {
  width: 45px;
}

/* 页首部分 */
.top {
  box-sizing: border-box;
  position: fixed;
  top: 0;
  width: 100%;
  height: 77px;
  line-height: 45px;
  color: #567086;
  background-color: #E0E2E4;
  border-bottom: 2px solid #567086;
  z-index: 2000;
}
.top li {
  float: left;
}
.top .logo {
  display: inline-block;
  width: 153px;
  height: 33px;
  background: url('../../assets/image/logo1.png') no-repeat center;
  margin-top: 10px;
  margin-left: 15px;
}
.top .title {
  display: inline-block;
  margin-left: 8px;
  padding-left: 8px;
  height: 18px;
  font-size: 16px;
  line-height: 18px;
  border-left: 1px solid #567086;
}
.top .logout {
  margin-right: 30px;
  font-size: 14px;
  line-height: 24px;
  border: none;
  cursor: pointer;
}
.top .userName {
  margin-right: 30px;
  font-size: 14px;
  line-height: 45px;
}
.top img {
  margin-top: 10px;
  margin-right: 10px;
  width: 25px;
  height: 25px;
  border-radius: 50%;
}

/* 标签部分 */
.top .label {
  position: fixed;
  top: 45px;
  left: 10px;
  height: 30px;
  overflow: hidden;
  z-index: 20000;
}
.top .label li {
  display: inline-block;
  height: 30px;
  width: 100px;
  line-height: 30px;
  margin-right: 1px;
  background-color: #fff;
  cursor: pointer;
}
.top .label li:first-child {
  border-radius: 3px 0 0 0;
}
.top .label li:last-child {
  border-radius: 0 3px 0 0;
}
.top .label li.only {
  border-radius: 3px 3px 0 0;
}
.top .label ul li.active {
  background-color: #647C90;
}
.top .label li a {
  display: inline-block;
  height: 30px;
  width: 85px;
  line-height: 30px;
  text-align: center;
  color: #262626;
}
.top .label li.active a {
  color: white;
}
.top .label li i {
  position: absolute;
  line-height: 30px;
  color: #262626;
}
.top .label li.active i {
  color: white;
}

/* 面包屑 */
.top .crumbs {
  position: absolute;
  height: 30px;
  bottom: -35px;
  left: 170px;
  right: 20px;
  padding-left: 20px;
  line-height: 30px;
  background-color: #fff;
  border-bottom: 1px solid #647C90;
  z-index: 100;
}
.top .crumbs.collapse {
  left: 55px;
}
.top .crumbs a {
  font-weight: bold;
}
.top .crumbs span.split {
  padding-left: 3px;
}

/* 菜单部分 */
.content .collapse {
  width: 45px;
  height: 45px;
  position: absolute;
  top: 0px;
  left: 0;
  z-index: 99999;
  cursor: pointer;
}
.content .collapse i {
  padding: 9px;
  font-size: 25px;
  color: #f2f2f2;
}
.content .menu_switch {
  border: 8px solid rgba(0, 0, 0, 0);
  border-top: 8px solid #647C90;
  border-left: 8px solid #647C90;
  position: absolute;
  top: 80px;
  left: 163px;
  z-index: 2000;
  cursor: pointer;
}
.content.collapse .menu_switch {
  left: 48px;
}

.right-content {
  padding: 45px 0 10px 210px;
}
.content.collapse .right-content {
  padding: 45px 0 10px 55px;
}

/* 内容主体部分 */
.right-content .main-content {
  position: absolute;
  top: 110px;
  bottom: 0;
  left: 160px;
  right: 0;
  overflow: auto;
}
.content.collapse .right-content .main-content {
  left: 55px;
}
.right-content .main-content> div {
  min-width: 1200px;
  margin-bottom: 15px;
}
</style>
