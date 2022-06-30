## 方舟系统表格

### 基础使用方式

:::demo 基于 `element-ui` 实现的，表头吸顶和表尾吸底的表格

```html

<template>
  <by-ark-table
  :data="tableData"
  style="width: 100%"
  :fixed-top="60"
  :fixed-header="true"
  :fixed-footer="true"
  scroll-wrap=".by--layout__content"
  border>
  <el-table-column
    prop="date"
    label="日期"
    width="180"
    fixed>
  </el-table-column>
  <el-table-column
    prop="name"
    label="姓名1"
    width="180">
  </el-table-column>
  <el-table-column
    prop="name"
    label="姓名2"
    width="180">
  </el-table-column>
  <el-table-column
    prop="name"
    label="姓名3"
    width="180">
  </el-table-column>
  <el-table-column
    prop="name"
    label="姓名4"
    width="180">
  </el-table-column>
  <el-table-column
    prop="name"
    label="姓名5"
    width="180">
  </el-table-column>
  <el-table-column
    prop="name"
    label="姓名6"
    width="180">
  </el-table-column>
  <el-table-column
    prop="address"
    label="地址1">
  </el-table-column>
  <el-table-column
    prop="address"
    label="地址2">
  </el-table-column>
  <el-table-column
    prop="address"
    label="地址3">
  </el-table-column>
  <el-table-column
    prop="address"
    label="地址4"
    fixed="right">
  </el-table-column>
</by-ark-table>


</template>

<script>
  export default {
    data() {
      return {
        tableData: [{
          date: '2016-05-02',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-04',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1517 弄'
        }, {
          date: '2016-05-01',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1519 弄'
        }, {
          date: '2016-05-03',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1516 弄'
        }]
      }
    }
  }
</script>

```

:::

### ArkTable Attributes
| 参数      | 说明    | 类型      | 可选值       | 默认值   |
|---------- |-------- |---------- |-------------  |-------- |
| fixed-top | 表格头部距离顶部设定距离时，头部吸顶 | Number | 正数 | 100 |
| fixed-header | 是否要头部吸顶 | Boolean | true/false | true |
| fixed-footer | 是否要滚动条吸底 | Boolean | true/false | true |
| scroll-wrap | 监听滚动的元素，这个元素滚动才会触发吸顶和吸底 | String | css样式名称 | '.main-wrap' |
