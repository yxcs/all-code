<template lang="html">
  <div class="menu-model">
    <el-menu
      :default-active="defaultActive"
      :router="true"
    >
      <el-menu-item index="/code/start">开发教程</el-menu-item>
      <el-menu-item index="/code/rules/convention">代码规范</el-menu-item>
      <el-menu-item index="/code/update">更新规范</el-menu-item>
    </el-menu>
  </div>
</template>

<script>
export default {
  data () {
    return {
      defaultActive: '/code/start'
    }
  },
  created () {
    this.defaultActive = this.$route.fullPath
  }
}
</script>

<style lang="css">
</style>
