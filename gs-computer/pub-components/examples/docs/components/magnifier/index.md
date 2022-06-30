## 图片放大镜

### 图片放大镜基础用法

:::demo

```html
<by-magnifier
  :boxSize="200"
  minImgUrl="/static/magnifier/img_200x200.jpg"
  maxImgUrl="/static/magnifier/img_1000x1000.jpg">
</by-magnifier>
```

:::

### Magnifier Attributes
| 参数      | 说明    | 类型      | 可选值       | 默认值   |
|---------- |-------- |---------- |-------------  |-------- |
| box-size | 放大镜主体框 | number | — | 500 |
| min-img-url | 放大镜小图的url | string | — | — |
| max-img-url | 放大镜大图的url | string | — | — |
| auto-reverse | 是否开启右侧距离超过边界时，悬浮框自适应在左侧 | boolean | true/false | true |
| direction | 悬浮框的方向 | string | left/right | right |
