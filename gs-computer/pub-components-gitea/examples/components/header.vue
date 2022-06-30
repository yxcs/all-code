<template lang="html">
  <div class="header-model">
    <div class="header--logo__wrap">
      <router-link to="/"><img src="../assets/logo/logo.png" /></router-link>
    </div>
    <div class="header--menu__wrap">
      <el-menu :default-active="activeIndex" mode="horizontal" @select="handleSelect">
        <el-menu-item index="1">组件文档</el-menu-item>
        <el-menu-item index="2">开发文档</el-menu-item>
      </el-menu>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      activeIndex: ''
    }
  },
  mounted () {
    if (this.$route.fullPath && this.$route.fullPath.indexOf('/code/') > -1) {
      this.activeIndex = '2'
    } else if (this.$route.fullPath && this.$route.fullPath.indexOf('/doc/') > -1) {
      this.activeIndex = '1'
    }
  },
  methods: {
    handleSelect (key) {
      const activeIndex = +key
      if (activeIndex === +this.activeIndex) return
      if (activeIndex === 2) {
        this.$router.push('/code/start')
      } else if (activeIndex === 1) {
        this.$router.push('/doc/install')
      }
      this.activeIndex = `${key}`
    }
  }
}
</script>
