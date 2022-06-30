<template>
  <div id="app">
    hello
  </div>
</template>

<script>
export default {
  name: 'Hello',
  mounted () {
    wx.ready((config) => {
      wx.updateAppMessageShareData({ 
        title: '分享标题', // 分享标题
        desc: '分享描述', // 分享描述
        link: 'http://www.baidu.com', // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
        imgUrl: 'https://dss2.bdstatic.com/6Ot1bjeh1BF3odCf/it/u=2118610455,3088877890&fm=85&app=92&f=JPEG?w=121&h=75&s=6EE198564E5854CC4E0BFEF90300901C', // 分享图标
        success: function () {
          console.log('----分享成功----')
        }
      })
    });
  }
}
</script>

<style lang="scss">
</style>
