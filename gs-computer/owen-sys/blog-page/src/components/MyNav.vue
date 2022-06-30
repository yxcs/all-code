<template>
  <div class="nav-wrap">
    <div>LOGO</div>
    <div>博客首页</div>
    <div>技术博文</div>
    <div>图片分享</div>
    <div>视频音乐</div>
    <div>收藏书签</div>
    <div>用户中心</div>
  </div>
</template>

<script>
export default {
  name: 'MyNav'
}
</script>

<style lang="scss" scoped>
.nav-wrap {
  width: 1200px;
  height: 50px;
  margin: 0 auto;
  display: flex;
  justify-content: space-around;
  align-items: center;
  &>div {
    width: 150px;
    height: 32px;
    line-height: 32px;
    box-shadow: 2px 2px 12px 0 rgba(0,0,0,.1);
    text-align: center;
    font-size: 14px;
    font-weight: 600;
    color: #212429;
  }
  &>div:hover {
    box-shadow: 2px 2px 12px 0 rgba(0,0,0,.2);
    cursor: pointer;
  }
}
</style>
