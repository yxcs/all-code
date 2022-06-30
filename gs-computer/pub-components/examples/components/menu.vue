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
          <el-menu-item index="/guide/install">安装</el-menu-item>
          <el-menu-item index="/guide/start">快速上手</el-menu-item>
          <el-menu-item index="/guide/coderule">编码规范</el-menu-item>
        </el-menu-item-group>
      </el-submenu>
      <el-submenu index="2">
        <template slot="title">
          <span>图表</span>
        </template>
        <el-menu-item-group>
          <el-menu-item index="/charts/introduce">图表简介</el-menu-item>
        </el-menu-item-group>
        <el-menu-item-group>
          <el-menu-item index="/charts/line">折线图</el-menu-item>
        </el-menu-item-group>
        <el-menu-item-group>
          <el-menu-item index="/charts/histogram">柱状图</el-menu-item>
        </el-menu-item-group>
        <el-menu-item-group>
          <el-menu-item index="/charts/bar">条形图</el-menu-item>
        </el-menu-item-group>
        <el-menu-item-group>
          <el-menu-item index="/charts/pie">饼图</el-menu-item>
        </el-menu-item-group>
        <el-menu-item-group>
          <el-menu-item index="/charts/ring">环图</el-menu-item>
        </el-menu-item-group>
        <el-menu-item-group>
          <el-menu-item index="/charts/waterfall">瀑布图</el-menu-item>
        </el-menu-item-group>
        <el-menu-item-group>
          <el-menu-item index="/charts/funnel">漏斗图</el-menu-item>
        </el-menu-item-group>
        <el-menu-item-group>
          <el-menu-item index="/charts/radar">雷达图</el-menu-item>
        </el-menu-item-group>
        <el-menu-item-group>
          <el-menu-item index="/charts/map">地图</el-menu-item>
        </el-menu-item-group>
        <el-menu-item-group>
          <el-menu-item index="/charts/sankey">桑基图</el-menu-item>
        </el-menu-item-group>
        <el-menu-item-group>
          <el-menu-item index="/charts/heatmap">热力图</el-menu-item>
        </el-menu-item-group>
        <el-menu-item-group>
          <el-menu-item index="/charts/scatter">散点图</el-menu-item>
        </el-menu-item-group>
        <el-menu-item-group>
          <el-menu-item index="/charts/candle">K线图</el-menu-item>
        </el-menu-item-group>
        <el-menu-item-group>
          <el-menu-item index="/charts/gauge">仪表盘</el-menu-item>
        </el-menu-item-group>
        <el-menu-item-group>
          <el-menu-item index="/charts/tree">树图</el-menu-item>
        </el-menu-item-group>
        <el-menu-item-group>
          <el-menu-item index="/charts/liquidfill">水球图</el-menu-item>
        </el-menu-item-group>
        <el-menu-item-group>
          <el-menu-item index="/charts/wordcloud">词云</el-menu-item>
        </el-menu-item-group>
        <el-menu-item-group>
          <el-menu-item index="/charts/events">事件</el-menu-item>
        </el-menu-item-group>
        <el-menu-item-group>
          <el-menu-item index="/charts/thirdMap">百度/高德地图</el-menu-item>
        </el-menu-item-group>
      </el-submenu>
      <el-submenu index="3">
        <template slot="title">
          <span>通用模块</span>
        </template>
        <el-menu-item-group>
          <el-menu-item index="/components/button">Button</el-menu-item>
        </el-menu-item-group>
        <el-menu-item-group>
          <el-menu-item index="/components/checkbox">Checkbox</el-menu-item>
        </el-menu-item-group>
        <el-menu-item-group>
          <el-menu-item index="/components/tree/cascadeTree">CascadeTree</el-menu-item>
        </el-menu-item-group>
        <el-menu-item-group>
          <el-menu-item index="/components/editor/index">Editor</el-menu-item>
        </el-menu-item-group>
        <el-menu-item-group>
          <el-menu-item index="/components/table/ark-table">ArkTable</el-menu-item>
        </el-menu-item-group>
        <el-menu-item-group>
          <el-menu-item index="/components/magnifier/index">Magnifier</el-menu-item>
        </el-menu-item-group>
        <el-menu-item-group>
          <el-menu-item index="/components/slidecheck/index">SlideCheck</el-menu-item>
        </el-menu-item-group>
        <el-menu-item-group>
          <el-menu-item index="/components/imagelabel/index">ImgLabel</el-menu-item>
        </el-menu-item-group>
      </el-submenu>
      <el-submenu index="4">
        <template slot="title">
          <span>通用指令</span>
        </template>
        <el-menu-item-group>
          <el-menu-item index="/directives/input/auto-foucs">输入类指令</el-menu-item>
        </el-menu-item-group>
        <el-menu-item-group>
          <el-menu-item index="/directives/input/only-num">数字输入框</el-menu-item>
        </el-menu-item-group>
        <el-menu-item-group>
          <el-menu-item index="/directives/input/multiple-space">多空格处理</el-menu-item>
        </el-menu-item-group>
      </el-submenu>
      <el-submenu index="5">
        <template slot="title">
          <span>过滤器</span>
        </template>
        <el-menu-item-group>
          <el-menu-item index="/filters/date/date-filters">日期类</el-menu-item>
        </el-menu-item-group>
        <el-menu-item-group>
          <el-menu-item index="/filters/string/str-filters">字符串</el-menu-item>
        </el-menu-item-group>
      </el-submenu>
    </el-menu>
  </div>
</template>

<script>
export default {
  data () {
    return {
      defaultActive: '/guide/install'
    }
  },
  created () {
    this.defaultActive = this.$route.fullPath
  }
}
</script>

<style lang="css">
</style>
