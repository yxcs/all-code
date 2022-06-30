<template>
  <el-table :data="tableList" style="width:500px">
    <template v-for="item in propList">
      <slot :content="item">
        <el-table-column :key="item.id" :prop="item.prop" :label="item.label"></el-table-column>
      </slot>
    </template>
  </el-table>
</template>
<script>
export default {
  props: {
    propList: {
      type: Array,
      default: () => []
    },
    tableList: {
      type: Array,
      default: () => []
    }
  }
}
</script>