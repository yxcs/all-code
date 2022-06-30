## 图片标签

### 图片添加标签

右键弹出菜单，点击菜单按钮进行操作

:::demo **保存标签** 按钮，点击之后会将标签信息保存到localstorage中

```html
<by-img-label
  src="/static/imgLabel/label-img.jpg">
</by-img-label>
```

:::

### imgLabel Attributes

| 参数      | 说明    | 类型      | 可选值       | 默认值   |
|---------- |-------- |---------- |-------------  |-------- |
| is-show-save-btn | 是否显示保存按钮 | boolean | true/false | true |
| src | 需要添加标签图片的url | string | — | — |
| width | 图片的宽度 | number/string | — | 500 |
| theme | 主题色 | 颜色值(rgb) | — | #409EFF |
