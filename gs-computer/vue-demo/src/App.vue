<template>
  <div id="app">
    <ImageEditer></ImageEditer>
  </div>
</template>

<script>
import ImageEditer from './components/ImageEditer'
export default {
  name: 'App',
  components: {
    ImageEditer
  }
}
</script>
<style lang="scss">
body, html { padding: 0; margin: 0; }
</style>
