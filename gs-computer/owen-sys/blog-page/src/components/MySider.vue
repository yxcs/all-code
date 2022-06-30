<template>
  <div class="sider">
      <div class="search">
        <el-input placeholder="输入关键字" v-model="searchWord">
          <el-button class="btn-color" slot="append" icon="el-icon-search"></el-button>
        </el-input>
      </div>
      <div class="ad_type_1">
        <img src="../assets/ads/4731.jpg_wh1200.jpg" />
      </div>
      <div class="category">
        <div class="category-title">博客分类</div>
        <div class="category-item" v-for="k in 7" :key="k">
          <div>旅游趣事</div>
          <div>36</div>
        </div>
      </div>
      <div class="ad_type_1">
        <img src="../assets/ads/ad_small.jpg" />
      </div>
      <div class="new-post">
        <div class="post-title">最新动态</div>
        <div class="post">
          <div class="post-item" v-for="k in 4" :key="k">
            <div class="cover-img"><img src="../assets/cover_5_s.jpg" /> </div>
            <div class="post-content">
              <div class="article-title">可能大家马上能想到通过正则或者字符串处理</div>
              <div class="post-detail">
                <span>2016.12.11 16:40</span>
                <span><i class="el-icon-thumb"></i>560</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
</template>

<script>
export default {
  name: 'MySider',
  data () {
    return {
      comments: '',
      searchWord: ''
    }
  }
}
</script>

<style lang="scss" scoped>
.sider {
  width: 260px;
  .search {
    margin-bottom: 30px;
    .btn-color {
      background-color: #212429;
      color: #fff;
      border-radius: 0;
    }
  }
  .ad_type_1 {
    width: 100%;
    margin-bottom: 30px;
    img {
      width: 100%;
    }
  }
  .category {
    margin-bottom: 40px;
    .category-title {
      font-size: 18px;
      color: #212429;
      text-align: center;
      font-weight: bold;
      line-height: 60px;
      border-bottom: 1px solid #ccc;
    }
    .category-item {
      display: flex;
      justify-content: space-between;
      align-items: center;
      font-size: 14px;
      color: #212429;
      line-height: 50px;
      border-bottom: 1px solid #ccc;
    }
  }
  .new-post {
    .post-title {
      font-size: 18px;
      color: #212429;
      text-align: center;
      font-weight: bold;
      line-height: 60px;
      border-bottom: 1px solid #ccc;
    }
    .post-item {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 20px 0;
      border-bottom: 1px solid #ccc;
      .cover-img {
        width: 60px;
        height: 50px;
        img {
          width: 100%;
          height: 100%;
        }
      }
      .post-content {
        width: 190px;
        .article-title {
          font-size: 12px;
          line-height: 20px;
          color: #212429;
        }
        .post-detail {
          display: flex;
          justify-content: space-between;
          align-items: center;
          font-size: 12px;
          color: #aaa;
          i {
            margin-right: 5px;
          }
        }
      }
    }
  }
}
</style>
