## 数字输入框

### 输入框可输入数字

:::demo `v-only-num` 指令

```html
<template>
  <el-input placeholder="输入数字" class="w220" size="small" v-model="data" v-only-num.string="data" :max-len="8" />
</template>

<script>
  export default {
    data () {
      return {
        data: null
      };
    }
  }
</script>
```

:::

### 输入框只可正整数

:::demo `v-only-num` 指令 添加 `integer` 修饰符

```html
<template>
  <el-input placeholder="输入浮点数" class="w220" size="small" v-model="data" v-only-num.integer="data" :max-len="8" />
</template>

<script>
  export default {
    data () {
      return {
        data: null
      };
    }
  }
</script>
```

:::

### 输入框只可输入浮点数

:::demo `v-only-num` 指令 添加 `decimal` 修饰符

```html
<template>
  <el-input placeholder="输入浮点数" class="w220" size="small" v-model="data" v-only-num.decimal="data" :max-len="8" />
</template>

<script>
  export default {
    data () {
      return {
        data: null
      };
    }
  }
</script>
```

:::

### v-only-num Attributes
| 参数      | 说明    | 类型      | 可选值       | 默认值   |
|---------- |-------- |---------- |-------------  |-------- |
| value / v-model | 绑定值 | string / number / boolean | — | — |
| max-len | 最大输入长度 | Number | — | — |

### v-only-num 修饰符
| 参数      | 说明    |
|---------- |-------- |
| — | 不添加, 同 `integer` |
| string | 只可输入数字 |
| integer | 只可输入整数 |
| decimal | 可以输入浮点数 |
