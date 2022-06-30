<template lang="html">
  <div class="by--layout">
    <el-header>
      <header-model></header-model>
    </el-header>
    <div class="by--layout__content">
      <div class="by--layout__mian">
        <div class="by--layout__aside">
          <el-aside width="240px">
            <menu-model></menu-model>
          </el-aside>
        </div>
        <div class="by--layout__demo">
          <el-main>
            <router-view></router-view>
          </el-main>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import HeaderModel from './header'
import MenuModel from './menu'
export default {
  components: {
    HeaderModel,
    MenuModel
  },
  data() {
    return {
    }
  },
  methods: {
  }
}
</script>