<template>
  <el-dialog
    :visible.sync="dialogVisible"
    width="600px"
    class="media"
    :before-close="handleClose">
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
    <div class="img-wrap">
      <img src="http://172.17.3.180:8080/images/cover_5.jpg" />
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
    <div class="pad"></div>
  </el-dialog>
</template>

<script>
export default {
  name: 'MediaViewr',
  props: {
    mediaId: {
      type: Number,
      default: 0
    },
    show: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      comments: '',
      dialogVisible: false
    }
  },
  watch: {
    show () {
      this.dialogVisible = this.show
    }
  },
  mounted () {
    // this.dialogVisible = this.show
  },
  methods: {
    handleClose () {
      this.$emit('change-show')
    }
  }
}
</script>

<style lang="scss" scoped>
.detail {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #fff;
  padding: 0 20px;
  .nums {
    font-size: 12px;
    color: #aaa;
    span {
      i {
        margin-right: 5px;
      }
      margin-right: 10px;
    }
  }
  .shares {
    text-align: right;
    span {
      cursor: pointer;
    }
    .email {
      img {
        width: 16px;
      }
    }
    .sina {
      margin: 0 15px;
      img {
        width: 18px;
      }
    }
    .weixin {
      margin: 0 15px 0 0;
      img {
        width: 18px;
      }
    }
    .zone {
      img {
        width: 16px;
      }
    }
  }
}
.img-wrap {
  padding: 30px 20px;
  background-color: #fff;
  img {
    width: 100%;
    height: auto;
  }
}
.comments {
  padding: 20px 20px;
  margin-top: 40px;
  background-color: #fff;
  .btn-group {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 20px;
    .icon {
      display: flex;
      justify-content: flex-start;
      align-items: center;
      font-size: 16px;
      color: #212429;
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
}
.comment-list {
  max-height: 500px;
  overflow-x: hidden;
  overflow-y: auto;
  background-color: #fff;
  padding: 40px 20px;
  .comment-item {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    margin-top: 20px;
    padding-bottom: 20px;
    border-bottom: 1px solid #eee;
    .avatar {
      width: 50px;
      height: 50px;
      border-radius: 25px;
      overflow: hidden;
      img {
        width: 100%;
        height: 100%;
      }
    }
    .comment-content {
      width: 490px;
      margin-left: 20px;
      p {
        font-size: 12px;
        color: #777;
        line-height: 18px;
        margin: 10px 0;
        &.title {
          text-align: left;
          font-size: 14px;
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
.pad {
  width: 100%;
  height: 20px;
  background-color: #fff;
}
</style>
