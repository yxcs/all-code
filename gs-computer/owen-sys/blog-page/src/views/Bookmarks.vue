<template>
  <div class="content">
    <div class="tree">
      <el-tree
        :data="data"
        :props="defaultProps"
        accordion
        @node-click="handleNodeClick">
      </el-tree>
    </div>
    <div class="list"></div>
  </div>
</template>

<script>
export default {
  name: 'Bookmarks',
  data () {
    return {
      data: [{
        label: '一级 1',
        children: [{
          label: '二级 1-1',
          children: [{
            label: '三级 1-1-1'
          }]
        }]
      }, {
        label: '一级 2',
        children: [{
          label: '二级 2-1',
        }, {
          label: '二级 2-2',
        }]
      }, {
        label: '一级 3',
        children: [{
          label: '二级 3-1'
        }, {
          label: '二级 3-2'
        }]
      }],
      defaultProps: {
        children: 'children',
        label: 'label'
      }
    }
  },
  methods: {
    handleNodeClick(data) {
      console.log(data);
    }
  }
}
</script>

<style lang="scss" scoped>
.content {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  .tree {
    width: 200px;
    height: 100%;
    .el-tree {
      background: #ECEFF1;
    }
  }
  .list {
    width: 680px;
  }
}
</style>
