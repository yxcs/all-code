<template lang="html">
  <div class="by--layout">
    <el-header>
      <header-model></header-model>
    </el-header>
    <div class="by--layout__content">
      <div class="by--layout__mian">
        <div class="by--layout__aside">
          <el-aside width="240px">
            <code-menu-model></code-menu-model>
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
import CodeMenuModel from './codeMenu'
export default {
  components: {
    HeaderModel,
    CodeMenuModel
  },
  data() {
    return {
    }
  },
  methods: {
  }
}
</script>