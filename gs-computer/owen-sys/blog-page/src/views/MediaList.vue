<template>
  <div class="medias">
    <div class="content">
      <div v-for="k in 10" :key="k">
        <template v-if="k % 2">
          <div class="cover-img"><img src="../assets/cover_5_s.jpg" /></div>
          <div class="icon-wrap"><div class="icon"><i class="el-icon-picture-outline"></i></div></div>
          <div class="desc">旅游那点事儿</div>
          <div class="title">最刺激的历险记</div>
          <div class="time">
            <span><i class="el-icon-timer"></i>10min</span>
            <span><i class="el-icon-date"></i>2016.12.08</span>
          </div>
          <div class="article-content">
            <p>今年国庆假期终于可以憋在家里了不用出门了，不用出去看后脑了，真的是一种享受。这么好的光阴怎么浪费，睡觉、吃饭、打豆豆这怎么可能（耍多了也烦），完全不符合我们程序员的作风，赶紧起来把文章写完。</p>
            <p>这篇文章比较基础，在国庆期间的业余时间写的，这几天又完善了下，力求把更多的前端所涉及到的关于文件上传的各种场景和应用都涵盖了,若有疏漏和问题还请留言斧正和补充。</p>
          </div>
          <div class="more">点击播放</div>
          <div class="detail">
            <div class="nums">
              <span><i class="el-icon-star-off"></i>收藏</span>
              <span><i class="el-icon-chat-dot-square"></i>123</span>
              <span><i class="el-icon-share"></i>360</span>
              <span><i class="el-icon-thumb"></i>560</span>
            </div>
            <div class="shares">
              <span class="email"><img src="../assets/icon/email.png" /></span>
              <span class="sina"><img src="../assets/icon/sina.png" /></span>
              <span class="weixin"><img src="../assets/icon/weixin.png" /></span>
              <span class="zone"><img src="../assets/icon/qq-zone.png" /></span>
            </div>
          </div>
        </template>
        <template v-else>
          <div class="icon-wrap"><div class="icon"><i class="el-icon-picture-outline"></i></div></div>
          <div class="desc">旅游那点事儿</div>
          <div class="title">最刺激的历险记</div>
          <div class="time">
            <span><i class="el-icon-user-solid"></i>张丽英</span>
            <span><i class="el-icon-date"></i>2016.12.08</span>
          </div>
          <div class="music-content">
            <div class="music-cover"><img src="../assets/cover_5_s.jpg" /></div>
            <p>今年国庆假期终于可以憋在家里了不用出门了，不用出去看后脑了，真的是一种享受。这么好的光阴怎么浪费，睡觉、吃饭、打豆豆这怎么可能（耍多了也烦），完全不符合我们程序员的作风，赶紧起来把文章写完。</p>
          </div>
          <div class="more">点击播放</div>
          <div class="detail">
            <div class="nums">
              <span><i class="el-icon-star-off"></i>收藏</span>
              <span><i class="el-icon-chat-dot-square"></i>123</span>
              <span><i class="el-icon-share"></i>360</span>
              <span><i class="el-icon-thumb"></i>560</span>
            </div>
            <div class="shares">
              <span class="email"><img src="../assets/icon/email.png" /></span>
              <span class="sina"><img src="../assets/icon/sina.png" /></span>
              <span class="weixin"><img src="../assets/icon/weixin.png" /></span>
              <span class="zone"><img src="../assets/icon/qq-zone.png" /></span>
            </div>
          </div>
        </template>
      </div>
      <div class="pagination">
        <el-pagination
          background
          layout="prev, pager, next"
          :total="103"
          :page-size="10">
        </el-pagination>
      </div>
    </div>
    <MySider></MySider>
  </div>
</template>

<script>
import MySider from '../components/MySider'
export default {
  name: 'MediaList',
  components: {
    MySider
  }
}
</script>

<style lang="scss" scoped>
.medias {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  width: 1200px;
  margin: 50px auto;
}
.content {
  width: 900px;
  .cover-img {
    width: 100%;
    img {
      width: 100%;
    }
  }
  .icon-wrap {
    position: relative;
    height: 40px;
    margin-bottom: 20px;
    .icon {
      position: absolute;
      top: -26px;
      left: 50%;
      margin-left: -20px;
      width: 40px;
      height: 40px;
      background: #212429;
      font-size: 28px;
      color: #fff;
      text-align: center;
      line-height: 40px;
    }
  }
  .desc {
    text-align: center;
    font-size: 12px;
    color: #aaa;
    margin-bottom: 20px;
    letter-spacing: 2px;
  }
  .title {
    text-align: center;
    font-size: 18px;
    font-weight: bold;
    letter-spacing: 2px;
    margin-bottom: 20px;
  }
  .time {
    font-size: 12px;
    color: #aaa;
    text-align: center;
    .el-icon-user-solid {
      margin-right: 5px;
      color: #212429;
    }
    .el-icon-date {
      margin-left: 40px;
      margin-right: 5px;
      color: #212429;
    }
  }
  .article-content {
    width: 820px;
    margin: 40px auto 40px;
    font-size: 14px;
    line-height: 24px;
    text-indent: 20px;
    color: #212429;
  }
  .music-content {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 820px;
    margin: 40px auto 40px;
    font-size: 14px;
    color: #212429;
    .music-cover {
      width: 160px;
      height: 160px;
      border-radius: 80px;
      overflow: hidden;
      img {
        width: 100%;
        height: 100%;
      }
    }
    p {
      width: 600px;
      line-height: 24px;
      text-indent: 20px;
    }
  }
  .more {
    width: 80px;
    margin: 20px auto;
    font-size: 12px;
    font-weight: bold;
    text-align: center;
    letter-spacing: 1px;
    border-left: 1px solid #ccc;
    border-right: 1px solid #ccc;
  }
  .detail {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 30px 0 40px;
    padding: 30px 60px;
    border-top: 1px solid #eee;
    .nums {
      font-size: 12px;
      color: #aaa;
      span {
        i {
          margin-right: 5px;
        }
        margin-right: 30px;
      }
    }
    .shares {
      text-align: right;
      span {
        cursor: pointer;
      }
      .email {
        img {
          width: 20px;
        }
      }
      .sina {
        margin: 0 15px;
        img {
          width: 22px;
        }
      }
      .weixin {
        margin: 0 15px 0 0;
        img {
          width: 22px;
        }
      }
      .zone {
        img {
          width: 20px;
        }
      }
    }
  }
}
</style>
