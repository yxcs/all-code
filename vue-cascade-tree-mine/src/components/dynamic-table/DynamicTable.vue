<template>
  <sub-table :propList="propList" :tableList="tableList">
    <template slot-scope="{content}" v-if="content.render">
      <el-table-column :label="content.label">
        <template slot-scope="{$index,row}">
          <div v-html="content.render(row)"></div>
        </template>
      </el-table-column>
    </template>
  </sub-table>
</template>

<script>
import SubTable from './SubTable'
export default {
  components: {
    SubTable
  },
  data() {
    return {
      propList: [
        { label: "姓名", prop: "name", id: 1 },
        {
          label: "图片",
          prop: "pic",
          id: 2,
          render: ({ pic }) => {
            return `<img style="width:30px;height:30px" src='${pic}' />`;
          }
        },
        {
          label: "操作",
          prop: "operate",
          id: 3,
          render: ({ text }) => {
            return `<div style="color:#999">${text}</div>`;
          }
        }
      ],
      tableList: [
        {
          name: "章三",
          pic:
            "https://zh-static-files.oss-cn-hangzhou.aliyuncs.com//karazhan/content/poster/2019/11/16e30c192f6.png",
          text: "新增"
        },
        {
          name: "里斯",
          pic:
            "https://zh-static-files.oss-cn-hangzhou.aliyuncs.com//karazhan/content/poster/2019/11/16e30c2797e.png",
          text: "删除"
        },
        {
          name: "网舞",
          pic:
            "https://zh-static-files.oss-cn-hangzhou.aliyuncs.com//karazhan/content/poster/2019/11/16e30c33144.png",
          text: "跳转"
        }
      ]
    };
  }
};
</script>