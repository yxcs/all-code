<template lang="html">
  <div class="home">
    <el-header>
      <header-model></header-model>
    </el-header>
    <img src="../assets/home_logo.png" />
  </div>
</template>

<script>
import HeaderModel from '../components/header'
export default {
  components: {
    HeaderModel
  }
}
</script>

<style lang="scss">
.home {
  width: 100%;
  height: 100vh;
  text-align: center;
  img {
    margin-top: 200px;
  }
}
</style>
