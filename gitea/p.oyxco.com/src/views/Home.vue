<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">
    <HelloWorld msg="Welcome to Your Vue.js App"/>
    <markdown-it-vue class="md-body" :content="content"/>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'
import MarkdownItVue from 'markdown-it-vue'
import 'markdown-it-vue/dist/markdown-it-vue.css'
import m from './a.md'
export default {
  name: 'Home',
  components: {
    HelloWorld,
    MarkdownItVue
  },
  data () {
    return {
      content: m
    }
  }
}
</script>
