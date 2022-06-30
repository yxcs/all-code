<template>
  <div class="error">
    <router-link to="/"><img src="../assets/404.jpg" /></router-link>
  </div>
</template>

<script>
export default {
  name: 'errorPage'
}
</script>

<style lang="scss" scoped>
.error {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  text-align: center;
  img {
    margin-top: 200px;
  }
}
</style>
