<!-- __title: 测试Demo的使用和调试 -->
<!-- __desc: 最近想研究react转小程序代码的，后来感觉跨度有些大，因为平时也会写一些vue的代码，  而且vue和小程序更接近一些，所以还是先做了一个vue转小程序的PoC。可是这些都不是重点啊，重点是在这一过程中学习并使用了babylon的AST。因为也是第一次接触，所以想写点笔记记录一下，也希望能给大家一点参考 -->
<!-- __demo: 这是一个测试的demo -->

<template>
  <div class="hello">
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  props: {
    msg: String
  }
}
</script>

<style scoped lang="scss">
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
