## 富文本编辑器

### 基础用法

:::demo

```html
<div class="by-editor-wrap">
  <by-editor
    v-model="content"
    ref="myQuillEditor"
    style="height: 300px;">
  </by-editor>
</div>

<script>
export default {
  data() {
    return {
      content: ''
    }
  }
}
</script>
```
:::

### 变化监听

:::demo

```html
<div class="by-editor-wrap">
  <by-editor
    v-model="content"
    ref="myQuillEditor2"
    style="height: 300px;"
    @blur="onBlur"
    @change="onChange">
  </by-editor>
</div>

<script>
export default {
  data() {
    return {
      content: ''
    }
  },
  methods: {
    onBlur (e) {
      console.log(e)
    },
    onChange (html, text, obj) {
      console.log(html)
      console.log(text)
      console.log(obj)
    }
  }
}
</script>
```

:::

### Editor Attributes
| 参数      | 说明    | 类型      | 可选值       | 默认值   |
|---------- |-------- |---------- |-------------  |-------- |
| value / v-model | 绑定值 | string | — | — |
| disabled | 是否不可编辑 | Boolean | true/false | false |
| font | 文字操作属性 | Array | bold 粗体，italic 斜体 ，underline 下划线，strike 删除线 | ['bold', 'italic', 'underline', 'strike'] |
| block | 操作块 | Boolean | blockquote 引用，code-block 代码块 | ['blockquote', 'code-block'] |
| header | 设置标题等 | Array | 1,2,3,4,5,6,normal 在headerType=select时起作用 | [1, 2] |
| headerType | 标题显示样式 | Array | 1,2,3,4,5,6,normal | [1, 2, 3, 4, 5, 6, false] |
| list | 列表 | Array | ordered 有序列表，bullet 无序列表 | ['ordered', 'bullet'] |
| script | 标记 | Array | sub 下标，super 上标 | ['sub', 'super'] |
| indent | 缩进 | Array | '-1' 向左缩进，'+1' 向右缩进 | ['-1', '+1'] |
| direction | 书写模式 | String | rtl 右侧书写 | rtl |
| font-size | 字体大小 | Array | small 小，normal 正常，large 大，huge 特大 | ['small', 'normal', 'large', 'huge'] |
| color | 文字颜色 | Array | 16进制颜色 | 36个默认颜色 |
| background | 文字背景色 | Array | 16进制颜色 | 36个默认颜色 |
| font-family | 文字字体 | Array | normal，serif，monospace | [ 'normal', 'serif', 'monospace' ] |
| align | 对齐方式 | Array | normal 左，center 中，right 右，justify 两端对齐 | [ 'normal', 'center', 'right', 'justify' ] |
| media | 多媒体 | Array | link 链接，image 图片，video 视频，formula 公式 | ['link', 'image', 'video', 'formula'] |

:::tip
以上属性为Array类型时，传空数组[]，则显示默认的属性，悉知
:::

### Editor Events
| 事件名称      | 说明    | 回调参数      |
|---------- |-------- |---------- |
| ready  | 富文本准备就绪时触发 | 富文本对象 |
| blur  | 富文本失去焦点时触发 | 富文本对象 |
| focus  | 富文本获取焦点时触发 | 富文本对象 |
| input  | 富文本内容更改时触发 | 输入的对应的html内容 |
| change  | 富文本内容更改时触发 | fn(html, text, quill) html：输入的对应的html内容，text：文本，quill：富文本对象 |
