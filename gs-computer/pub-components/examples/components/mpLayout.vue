<template lang="html">
  <div class="by--layout__mp">
    <el-header>
      <header-model></header-model>
    </el-header>
    <div class="by--layout__content">
      <div class="by--layout__mian">
        <div class="by--layout__aside">
          <el-aside width="240px">
            <mp-menu></mp-menu>
          </el-aside>
        </div>
        <div class="by--layout__demo">
          <el-main>
            <router-view></router-view>
          </el-main>
        </div>
      </div>
    </div>
    <el-backtop target=".by--layout__content"></el-backtop>
  </div>
</template>
<script>
import HeaderModel from './header'
import MpMenu from './mpMenu'
export default {
  components: {
    HeaderModel,
    MpMenu
  },
  data() {
    return {
    }
  },
  methods: {
  }
}
</script>