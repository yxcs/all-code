<template lang="html">
  <div class="menu-model">
    <el-menu
      :default-active="defaultActive"
      :router="true"
    >
      <el-menu-item index="/mp/start">开始使用</el-menu-item>
    </el-menu>
  </div>
</template>

<script>
export default {
  data () {
    return {
      defaultActive: '/mp/start'
    }
  },
  created () {
    this.defaultActive = this.$route.fullPath
  }
}
</script>

<style lang="css">
</style>
