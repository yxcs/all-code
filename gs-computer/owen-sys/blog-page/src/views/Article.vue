<template>
  <div class="article">
    <div class="content">
      <div class="cover-img"><img src="../assets/cover_5_s.jpg"></div>
      <div class="icon-wrap"><div class="icon"><i class="el-icon-picture-outline"></i></div></div>
      <div class="desc">旅游那点事儿</div>
      <div class="title">最刺激的历险记</div>
      <div class="time">
        <span><i class="el-icon-user-solid"></i>赵丽颖</span>
        <span><i class="el-icon-date"></i>2016.12.08</span>
      </div>
      <div class="article-content">
        <p>今年国庆假期终于可以憋在家里了不用出门了，不用出去看后脑了，真的是一种享受。这么好的光阴怎么浪费，睡觉、吃饭、打豆豆这怎么可能（耍多了也烦），完全不符合我们程序员的作风，赶紧起来把文章写完。</p>
        <p>这篇文章比较基础，在国庆期间的业余时间写的，这几天又完善了下，力求把更多的前端所涉及到的关于文件上传的各种场景和应用都涵盖了,若有疏漏和问题还请留言斧正和补充。</p>
        <p>原理很简单，就是根据 http 协议的规范和定义，完成请求消息体的封装和消息体的解析，然后将文件进行保存。我们都知道如果要上传一个文件，需要把 form 标签的enctype设置为multipart/form-data,同时method必须为post方法。</p>
        <p>客户端发送请求到服务器后，服务器会收到请求的消息体，然后对消息体进行解析，解析出哪是普通表单哪些是附件</p>
        <p>可能大家马上能想到通过正则或者字符串处理分割出内容，不过这样是行不通的，二进制buffer转化为string,对字符串进行截取后，其索引和字符串是不一致的，所以结果就不会正确，除非上传的就是字符串。</p>
        <p>不过一般情况下不需要自行解析，目前已经有很成熟的三方库可以使用。</p>
        <p>至于如何解析，这个也会占用很大篇幅，后面的文章在详细说。</p>
      </div>
      <div class="tags">
        <i class="el-icon-paperclip"></i>
        <span>
          <el-link type="info">旅游</el-link>，
          <el-link type="info">历险</el-link>，
          <el-link type="info">界面</el-link>，
          <el-link type="info">刺激</el-link>，
          <el-link type="info">奇怪的</el-link>
        </span>
      </div>
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
      <div class="comments">
        <el-input type="textarea" resize="vertical" :rows="4" placeholder="说点什么吧..." v-model="comments"></el-input>
        <div class="btn-group">
          <div class="icon"><img src="../assets/icon/smile2.png" />表情</div>
          <div><el-button icon="el-icon-edit" type="info" plain>&nbsp;评论&nbsp;</el-button></div>
        </div>
      </div>
      <div class="comment-list">
        <div class="comment-item" v-for="k in 13" :key="k">
          <div class="avatar"><img src="../assets/avatar/avatar.png" /></div>
          <div class="comment-content">
            <p class="title">作者的名称</p>
            <p>可能大家马上能想到通过正则或者字符串处理分割出内容，不过这样是行不通的，二进制buffer转化为string,对字符串进行截取后，其索引和字符串是不一致的，所以结果就不会正确，除非上传的就是字符串</p>
            <p class="comment-detail"><span>2016-02-16 16:40</span><span><i class="el-icon-thumb"></i>560</span></p>
          </div>
        </div>
      </div>
      <div class="pages">
        <div class="pre"><i class="el-icon-back"></i>前一篇</div>
        <div class="next">后一篇<i class="el-icon-right"></i></div>
      </div>
      <div class="hot-post">
        <div class="title">精彩热门文章推荐</div>
        <div class="post">
          <div v-for="k in 3" :key="k">
            <div class="post-content">
              <img src="../assets/cover_8.jpg" />
              <div class="over-div">
                最近在看js事件循环，事件循环是js运行的核心，js 是单线程的， js 的异步事件就是依赖于事件循环机制
              </div>
            </div>
            <div class="post-title">最刺激的历险记</div>
          </div>
        </div>
      </div>
    </div>
    <MySider></MySider>
  </div>
</template>

<script>
import MySider from '../components/MySider'
export default {
  name: 'Article',
  components: {
    MySider
  },
  data () {
    return {
      comments: ''
    }
  }
}
</script>

<style lang="scss" scoped>
.article {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  width: 1200px;
  margin: 50px auto;
  // border: 1px solid #f00;
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
  .tags {
    text-align: center;
    .el-icon-paperclip {
      color: #212429;
      margin-right: 20px;
    }
    span {
      color: #909309;
      font-size: 14px;
    }
  }
  .detail {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 30px 0 40px;
    padding: 30px 60px;
    border-top: 1px solid #eee;
    .nums {
      font-size: 14px;
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
  .btn-group {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 20px;
    .icon {
      display: flex;
      justify-content: flex-start;
      align-items: center;
      font-size: 18px;
      img {
        width: 18px;
        margin-right: 6px;
      }
    }
    .el-button--info.is-plain {
      color: #fff;
      background: #212429;
      border-color: #212429;
    }
    .el-button--info.is-plain:hover{
      opacity: 0.8;
    }
  }
  .comment-list {
    width: 100%;
    max-height: 500px;
    overflow-x: hidden;
    overflow-y: auto;
    margin-top: 40px;
    margin-bottom: 80px;
    .comment-item {
      display: flex;
      justify-content: flex-start;
      align-items: center;
      margin-top: 20px;
      padding-bottom: 20px;
      border-bottom: 1px dashed #ccc;
      .avatar {
        width: 80px;
        height: 80px;
        border-radius: 40px;
        overflow: hidden;
        img {
          width: 100%;
          height: 100%;
        }
      }
      .comment-content {
        width: 780px;
        margin-left: 40px;
        p {
          font-size: 14px;
          color: #777;
          line-height: 22px;
          margin: 10px 0;
          &.title {
            text-align: left;
            font-size: 16px;
            font-weight: bold;
            color: #212429;
          }
          &.comment-detail {
            display: flex;
            justify-content: space-between;
            align-items: center;
            span {
              padding-right: 10px;
              font-size: 12px;
              color: #aaa;
              i {
                padding-right: 5px;
              }
            }
          }
        }
      }
    }
  }
  .pages {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 80px;
    &>div {
      width: 430px;
      height: 140px;
      background-color: #3A3C49;
      text-align: center;
      line-height: 140px;
      color: #fff;
      font-size: 16px;
    }
    .pre {
      i {
        margin-right: 10px;
      }
    }
    .next {
      i {
        margin-left: 10px;
      }
    }
  }
  .hot-post {
    margin-bottom: 60px;
    .title {
      text-align: left;
      font-size: 18px;
      font-weight: bold;
      color: #212429;
    }
    .post {
      display: flex;
      justify-content: space-between;
      align-items: center;
      &>div {
        width: 280px;
        height: 240px;
        .post-content {
          position: relative;
          width: 100%;
          height: 200px;
          img {
            width: 100%;
            height: 100%;
          }
          .over-div {
            position: absolute;
            top: 0;
            bottom: 0;
            left: 0;
            right: 0;
            background: rgba(80,85,105,0.6);
            padding: 30px 20px;
            font-size: 14px;
            color: #fff;
            line-height: 32px;
            letter-spacing: 2px;
          }
        }
        .post-title {
          font-size: 16px;
          color: #212429;
          text-align: center;
          line-height: 40px;
          font-weight: bold;
          letter-spacing: 1px;
        }
      }
    }
  }
}
</style>
