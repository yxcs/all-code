<template lang="html">
  <div class="menu-model">
    <el-menu
      default-active="1"
      :unique-opened="true"
      :default-openeds="['1']"
      :default-active="defaultActive"
      :router="true"
    >
      <el-submenu index="1">
        <template slot="title">
          <span>开发指南</span>
        </template>
        <el-menu-item-group>
          <el-menu-item index="/doc/install">安装</el-menu-item>
          <el-menu-item index="/doc/quikeStart">快速上手</el-menu-item>
        </el-menu-item-group>
      </el-submenu>
      <el-submenu index="2">
        <template slot="title">
          <span>通用模块</span>
        </template>
        <el-menu-item-group>
          <el-menu-item index="/doc/button">Button</el-menu-item>
        </el-menu-item-group>
        <el-menu-item-group>
          <el-menu-item index="/doc/checkbox">Checkbox</el-menu-item>
        </el-menu-item-group>
        <el-menu-item-group>
          <el-menu-item index="/doc/cascadeTree">CascadeTree</el-menu-item>
        </el-menu-item-group>
      </el-submenu>
      <el-submenu index="3">
        <template slot="title">
          <span>通用指令</span>
        </template>
        <el-menu-item-group>
          <el-menu-item index="/doc/dir/input">输入类指令</el-menu-item>
        </el-menu-item-group>
      </el-submenu>
      <el-submenu index="4">
        <template slot="title">
          <span>过滤器</span>
        </template>
        <el-menu-item-group>
          <el-menu-item index="/doc/filter/date">日期类</el-menu-item>
        </el-menu-item-group>
      </el-submenu>
    </el-menu>
  </div>
</template>

<script>
export default {
  data () {
    return {
      defaultActive: '/doc/install'
    }
  },
  created () {
    const path = this.$route.fullPath
    this.defaultActive = path == '/' ? '/doc/install' : path
  },
  methods: {
  }
}
</script>

<style lang="css">
</style>
