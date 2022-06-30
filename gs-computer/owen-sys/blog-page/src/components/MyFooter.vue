<template>
  <div class="footer">
    <div class="footer-inner">
      <div class="about">
        <div class="title">关于本博客</div>
        <div class="desc">博客由yxcs建立，主要是前端技术相关分享以及生活中点滴的记录。</div>
        <div class="img"><img src="../assets/cover_4.jpg" /></div>
      </div>
      <div class="news">
        <div class="title">最新博客</div>
        <div class="item">
          <p><i class="el-icon-dessert"></i>最刺激的旅行</p>
          <p>用于描述认证场景的业务用途，支持中文/英文/数字/中划线(-)，最多20个字符。</p>
        </div>
        <div class="item">
          <p><i class="el-icon-ice-cream"></i>最刺激的旅行</p>
          <p>用户注册认证。场景标识：对应开发人员调用服务端API接口时的biz字段，支持英文/数字/中划线(-)，最多20个字符</p>
        </div>
      </div>
      <div class="share-img">
        <div class="title">图片分享</div>
        <div class="img-wrap">
          <div class="img" v-for="k in 6" :key="k"><img src="../assets/cover_2.jpg" /></div>
        </div>
      </div>
     <div class="comment">
        <div class="title">最近评论</div>
        <div class="item br">
          <p>张小浩：</p>
          <p>用于描述认证场景的业务用途，支持中文/英文/数字/中划线(-)，最多20个字符。</p>
        </div>
        <div class="item">
          <p>鹿晗：</p>
          <p>用户注册认证。场景标识：对应开发人员调用服务端API接口时的biz字段，</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'MyFooter'
}
</script>

<style lang="scss" scoped>
.footer {
  width: 100%;
  height: 280px;
  background-color: #212429;
  color: #fff;
}
.footer-inner {
  display: flex;
  justify-content: space-around;
  align-items: flex-start;
  min-width: 1200px;
  height: 100%;
  margin: 0 auto;
  &>div {
    width: 280px;
  }
  .title {
    font-size: 16px;
    font-weight: bold;
    color: #fff;
    padding: 20px 0 30px 0;
  }
  .about {
    .desc {
      font-size: 14px;
    }
    img {
      width: 100%;
      height: 100px;
      margin-top: 20px;
    }
  }
  .news {
    .item {
      font-size: 12px;
      margin-bottom: 20px;
      p {
        margin: 10px;
      }    
      i {
        margin-right: 4px;
      }
    }
  }
  .share-img {
    .img-wrap {
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      flex-wrap: wrap;
    }
    img {
      width: 91px;
    }
  }
  .comment {
    .item {
      font-size: 12px;
      margin-bottom: 20px;
      p {
        margin: 10px;
      }
    }
    .br {
      border-bottom: 1px solid #ddd;
    }
  }
}
</style>
