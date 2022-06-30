## 多空格显示

### 多空格文案显示

:::demo 把传给 `v-multiple-space` 进行处理
```html
<template>
  <div>
    处理之前只显示一个空格:
    <p>{{spaceData}}</p>
  </div>
  <div>
    处理之后，原样展示：
    <p v-multiple-space="spaceData"></p>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        spaceData: '大牌质量        工厂价格'
      };
    }
  }
</script>
```

:::
