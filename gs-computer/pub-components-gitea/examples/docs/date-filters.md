## 日期相关的过滤器

### 时间戳转字符串

:::demo

```html
<template>
  <p>{{date}}：{{date | date2str}}</p>
</template>
<script>
export default {
  data () {
    return {
      date: 1574318903466
    }
  }
}
</script>
```

:::
