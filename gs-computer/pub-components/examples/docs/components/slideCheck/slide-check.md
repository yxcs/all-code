## 图片滑动验证

### 图片滑动基础使用

:::demo

```html
<by-slide-check
  :src="sUrl"
  @success="onCheckSuccess"
  @fail="onCheckFail">
</by-slide-check>
<script>
  export default {
    name: 'slide-demo-1',
    data () {
      return {
        sUrl: '/static/slide/check3.jpg'
      }
    },
    methods: {
      onCheckSuccess (e) {
        this.$message.success('验证成功')
      },
      onCheckFail () {
        this.$message.error('验证失败')
      }
    }
  }
</script>
```

:::

### 多图切换验证

:::demo `src` 属性，可以传单个或者多个图片地址，传多个时，验证失败自动切换下一张

```html
<by-slide-check
  :radius="8"
  :src="mUrl"
  @success="onCheckSuccess"
  @fail="onCheckFail">
</by-slide-check>
<script>
  export default {
    name: 'slide-demo-2',
    data () {
      return {
        mUrl: [
          '/static/slide/check1.jpg',
          '/static/slide/check2.jpg',
          '/static/slide/check3.jpg'
        ]
      }
    },
    methods: {
      onCheckSuccess (e) {
        this.$message.success('验证成功')
      },
      onCheckFail (e) {
        this.$message.error('验证失败')
      }
    }
  }
</script>
```

:::

### SlideCheck Attributes

| 参数      | 说明    | 类型      | 可选值       | 默认值   |
|---------- |-------- |---------- |-------------  |-------- |
| radius | 拼图块大小 | number | — | 10 |
| src | 图片地址 | string / array | — | - |
| width | 验证区域的宽度 | number | — | 300 |
| height | 验证区域的高度 | number | — | 300 |
| theme | 滑动区主题 | 颜色值(rgb) | — | #409EFF |

### SlideCheck Events

| 事件名称      | 说明    | 回调参数      |
|---------- |-------- |---------- |
| success  | 当验证成功是触发 | 拼图相差的值 |
| fail  | 当验证失败是触发 | 无 |
