## 日期相关的过滤器

### 日期转字符串

:::demo

```html
<template>
  <p>{{date}}：{{date | date2str}}</p>
</template>
<script>
export default {
  data () {
    return {
      date: '2018/08/09 12:20:34'
    }
  }
}
</script>
```

:::

### 时间转字符串

:::demo

```html
<template>
  <p>{{date}}：{{date | time2str}}</p>
</template>
<script>
export default {
  data () {
    return {
      date: '2018/08/09 12:20:34'
    }
  }
}
</script>
```

:::
