## 字符串处理相关的过滤器

### 货币符号

:::demo 可传入自定义钱币符号

```html
<template>
  <p>{{money}}：{{money | currency('$')}}</p>
</template>
<script>
export default {
  data () {
    return {
      money: 1230
    }
  }
}
</script>
```

:::

### 超出截断

:::demo 需传入截断字数

```html
<template>
  <p>{{str}}：{{str | cutStr(6)}}</p>
</template>
<script>
export default {
  data () {
    return {
      str: '大牌品质，工厂质量'
    }
  }
}
</script>
```

:::

### 金额千分位格式化

:::demo

```html
<template>
  <p>{{money}}：{{money | numFormat}}</p>
</template>
<script>
export default {
  data () {
    return {
      money: 320904567
    }
  }
}
</script>
```

:::

### 百分比

:::demo

```html
<template>
  <p>{{num}}：{{num | percentage}}</p>
</template>
<script>
export default {
  data () {
    return {
      num: 90
    }
  }
}
</script>
```

:::

### 空内容占位符

:::demo 可传入特定占位符，默认为'--'

```html
<template>
  <p>{{str}}：{{str | placeholder}}</p>
</template>
<script>
export default {
  data () {
    return {
      str: ''
    }
  }
}
</script>
```

:::

### 溢出显示省略号

:::demo 可输入超出多少字展示省略号

```html
<template>
  <p>{{str}}：{{str | subStr(7)}}</p>
</template>
<script>
export default {
  data () {
    return {
      str: '大牌品质，工厂质量'
    }
  }
}
</script>
```

:::
