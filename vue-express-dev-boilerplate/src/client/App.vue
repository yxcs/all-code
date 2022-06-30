<template>
  <div class="app">
    <div v-if="unauth" class="login_box">
      <el-form class="loign_form" ref="form" :model="form" label-width="0">
        <el-form-item label="">
          <el-input prefix-icon="el-icon-user" size="small" v-model="form.name" placeholder="请输入用户名"></el-input>
        </el-form-item>
        <el-form-item label="">
          <el-input prefix-icon="el-icon-view" size="small" v-model="form.pwd" type="password" placeholder="请输入密码"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button class="login_btn" size="small" type="primary" @click="onLogin">登录</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div v-else class="chatroom_box">
      <div class="chatroom_inner">
        <div class="panel">
          <div class="header">
            <div class="avatar">
              <img class="img" src="https://taohuaer.top/uploads/author.jpg" />
            </div>
            <div class="info">
              <h3 class="nickname">
                <span ng-bind-html="account.NickName" class="display_name ng-binding">小草鱼</span>
              </h3>
            </div>
          </div>
          <div class="chat_list">
            <div class="chat_item">
              <div class="ext">
                <p class="attr">18:20</p>
                <p class="attr ng-scope">
                  <i class="el-icon-close-notification"></i>
                </p>
              </div>
              <div class="avatar">
                <img class="img" src="https://taohuaer.top/uploads/author.jpg" />
              </div>
              <div class="info">
                <h3 class="nickname">
                  <span class="nickname_text">小于</span>
                </h3>
                <p class="msg ng-scope">
                  <span>你好</span>
                </p>
            </div>
            </div>
          </div>
        </div>
        <div class="msg_box">
          <div class="box_hd">
            <div class="title_wrap">文件助手</div>
          </div>
          <div class="box_bd chat_bd scrollbar-dynamic scroll-content">
            <div class="msg_lsit">
              <div class="msg_you">
                <img class="avatar" src="https://taohuaer.top/uploads/author.jpg" />
                <div class="msg">
                  <span>免安装绿色版下载</span>
                </div>
              </div>
              <div class="msg_me">
                <div class="msg">
                  <span>免安装绿色版下载</span>
                </div>
                <img class="avatar" src="https://taohuaer.top/uploads/author.jpg" />
              </div>
            </div>
          </div>
          <div class="box_ft">
            <div class="toolbar" id="tool_bar">
              <span class="emoji"></span>
              <span class="cut"></span>
              <span class="upload"></span>
            </div>
            <div class="content">
              <el-input class="ipt" type="textarea" :rows="4" resize="none" placeholder="请输入内容"></el-input>
            </div>
            <div class="action">
                <span class="desc">按下Ctrl+Enter换行</span>
                <el-button size="mini">  发  送  </el-button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
const io = null
export default {
  data () {
    return {
      unauth: true,
      form: {
        name: '',
        pwd: ''
      },
      user: {}
    }
  },
  mounted () {
    let user = localStorage.getItem('user') || {}
    if (user) {
      user = typeof user === 'string' ? JSON.parse(user) : {}
    }
    if (user.uuid) {
      this.user = user
      this.unauth = false
    } else {
      this.unauth = true
    }
    this.$socket.emit('connect', 1)
    this.$socket.emit('sendMsg', {test: 'client data'})
  },
  methods: {
    onLogin (v) {
      const form = this.form
      if (!form.name || !form.pwd) {
        this.$message.warning('请输入正确信息')
        return false
      }
      this.$axios.post('/api/v1/user/login', form).then(res => {
        if (res.status === 200 && !res.data.code) {
          const user = res.data.data
          this.user = user
          this.unauth = false
          localStorage.setItem('user', JSON.stringify(user))
        } else if (res.status === 200 && res.data.code === 5001) {
          this.$message.warning('该用户不存在，将自动创建')
          this.addUser(form)
        } else {
          this.$message.eroor(res.data.msg)
        }
      })
    },
    addUser (param) {
      this.$axios.post('/api/v1/user/add', param).then(res => {
        if (res.status === 200 && !res.data.code) {
          const user = res.data.data
          this.user = user
          this.unauth = false
          localStorage.setItem('user', JSON.stringify(user))
        } else {
          this.$message.eroor(res.data.msg)
        }
      })
    }
  },
  sockets: {
    connect () {
      console.log('<--socket connected-->');
    },
    receiveMsg (data) {
      console.log(data)
    },
    //服务端向客户端发送login事件
    login (value) {
      //监听login(后端向前端emit  login的回调)
      console.log(value)
    }
  }
}
</script>

<style>
::-webkit-scrollbar {
  height: 0;
  width: 0;
}
::-webkit-scrollbar {
  width: 6px;
  height: 6px;
}
::-webkit-scrollbar-thumb {
  border-radius: 3px;
  -moz-border-radius: 3px;
  -webkit-border-radius: 3px;
  background-color: #c3c3c3;
}
::-webkit-scrollbar-track {
  background-color: transparent;
}
html, body {
  padding: 0;
  margin: 0;
  height: 100%;
}
.app {
  width: 100%;
  height: 100%;
  overflow: hidden;
  background: url('/2zrdI1g.jpg') no-repeat #efefef 50%;
  background-size: cover;
}
.login_box {
  position: absolute;
  top: 50%;
  left: 50%;
  margin-left: -190px;
  margin-top: -270px;
  border-radius: 4px;
  -moz-border-radius: 4px;
  -webkit-border-radius: 4px;
  background-color: #fff;
  width: 380px;
  height: 540px;
  box-shadow: 0 2px 10px #999;
  -moz-box-shadow: #999 0 2px 10px;
  -webkit-box-shadow: #999 0 2px 10px;
}
.loign_form {
  padding: 40px 20px;
}
.login_btn {
  width: 100%;
}
.chatroom_box {
  height: 80%;
  min-height: 600px;
  padding-top: 100px;
  -webkit-transition: padding .3s linear;
  -webkit-backface-visibility: hidden;
  backface-visibility: hidden;
}
.chatroom_inner {
  max-width: 1000px;
  min-width: 800px;
  height: 100%;
  margin: 0 auto;
  border-radius: 3px;
  -moz-border-radius: 3px;
  -webkit-border-radius: 3px;
  overflow: hidden;
  background: #999;
}
.panel {
  position: relative;
  width: 280px;
  height: 100%;
  float: left;
  background: #2e3238;
}
.panel .header {
  padding: 0 18px;
  position: relative;
  border-bottom: 1px solid #292c33;
}
.header .avatar {
  display: table-cell;
  vertical-align: middle;
  word-wrap: break-word;
  word-break: break-all;
  white-space: nowrap;
  padding-right: 10.625px;
}
.header .avatar .img {
  width: 40px;
  height: 40px;
  border-radius: 2px;
  -moz-border-radius: 2px;
  -webkit-border-radius: 2px;
  display: block;
  cursor: pointer;
}
.header .info .nickname .display_name {
  display: inline-block;
  font-weight: 400;
  width: 156px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  word-wrap: normal;
  color: #fff;
  font-size: 18px;
  vertical-align: top;
  line-height: 31px;
  text-decoration: none;
}
.header .info {
  color: #eee;
  display: table-cell;
  vertical-align: middle;
  word-wrap: break-word;
  word-break: break-all;
  width: 2000px;
}
.msg_box {
  position: relative;
  background-color: #eee;
  height: 100%;
  overflow: hidden;
}
.box_hd {
  text-align: center;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  line-height: 30px;
}
.box_hd .title_wrap {
  position: relative;
  padding: 10px 0;
  margin: 0 19px;
  border-bottom: 1px solid #d6d6d6;
  background-color: #eee;
  z-index: 1024;
}
/** 用户列表 */
.chat_list {
  height: calc( 100% - 68px );
  overflow-x: hidden;
  overflow-y: auto;
}
.chat_item {
  box-sizing: border-box;
  height: 64px;
  overflow: hidden;
  padding: 12px 18px 11px;
  border-bottom: 1px solid #292c33;
  cursor: pointer;
  position: relative;
}
.chat_item p,
.chat_item h3 {
  padding: 0;
  margin: 0;
}
.chat_item .ext {
  float: right;
  color: #6b6f7c;
  font-size: 13px;
  text-align: right;
}
.ext .attr {
  height: 19px;
  line-height: 1.5;
}
.chat_item .avatar {
  float: left;
  margin-right: 10px;
  position: relative;
}
.chat_item .avatar .img {
  display: block;
  width: 40px;
  height: 40px;
  border-radius: 2px;
  -moz-border-radius: 2px;
  -webkit-border-radius: 2px;
}
.chat_item .info {
  overflow: hidden;
}
.chat_item .info .nickname {
  font-weight: 400;
  font-size: 13px;
  color: #fff;
  line-height: 20px;
}
.chat_item .info .nickname_count,
.chat_item .info .nickname_text {
  display: inline-block;
  *display: inline;
  *zoom: 1;
  vertical-align: top;
}
.chat_item .info .msg {
  color: #989898;
  font-size: 13px;
  width: 100%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  word-wrap: normal;
  height: 1.5em;
}
/** 聊天信息框 */
.box_bd {
  position: absolute;
  top: 51px;
  bottom: 180px;
  width: 100%;
  box-sizing: border-box;
  padding: 0 19px;
  overflow-y: auto;
  overflow-x: hidden;
}
.box_ft {
  position: absolute;
  right: 0;
  bottom: 0;
  left: 0;
  height: 180px;
  margin-right: 19px;
  border-top: 1px solid #d6d6d6;
}
.box_ft .toolbar {
  height: 30px;
  padding: 5px 17px;
}
.box_ft .toolbar > span {
  display: inline-block;
  cursor: pointer;
}
.box_ft .toolbar > span.emoji {
  width: 30px;
  height: 30px;
  background: url('/face.png') no-repeat 50%;
}
.box_ft .toolbar > span.cut {
  width: 30px;
  height: 30px;
  background: url('/cut.png') no-repeat 50%;
}
.box_ft .toolbar > span.upload {
  width: 30px;
  height: 30px;
  background: url('/file.png') no-repeat 50%;
}
.ipt .el-textarea__inner {
  border: none;
  outline: none;
  background: transparent;
  font-size: 14px;
}
.box_ft .action {
  text-align: right;
  margin-top: 10px;
}
.box_ft .desc {
  color: #888;
  font-size: 12px;
  margin-left: 10px;
  margin-right: 7px;
}
.btn_send {
  background-color: #fff;
  color: #222;
  padding-left: 30px;
  padding-right: 30px;
}
/** msg list */
.scroll-content {

}
.msg_lsit {
  width: 100%;
  height: 100%;
}
.msg_you {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  width: 100%;
  height: 40px;
  margin: 8px 0;
}
.msg_you .avatar {
  width: 40px;
  height: 40px;
}
.msg_you .msg {
  display: inline-block;
  height: 40px;
  line-height: 40px;
  font-size: 12px;
  padding: 0 10px;
  margin-left: 10px;
  background: #fff;
  word-wrap: break-word;
  word-break: break-all;
  min-height: 25px;
  border-radius: 2px;
}
.msg_you .msg::before {
  content: " ";
  position: relative;
  left: -18px;
  top: -4px;
  width: 0;
  height: 0;
  overflow: hidden;
  font-size: 0;
  border-top: 5px solid transparent;
  border-bottom: 5px solid transparent;
  border-left: 4px solid transparent;
  border-right: 4px solid #fff;
}
.msg_me {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  width: 100%;
  height: 40px;
  margin: 8px 0;
}
.msg_me .avatar {
  width: 40px;
  height: 40px;
}
.msg_me .msg {
  display: inline-block;
  height: 40px;
  line-height: 40px;
  font-size: 12px;
  padding: 0 10px;
  margin-right: 10px;
  background: #b2e281;
  word-wrap: break-word;
  word-break: break-all;
  min-height: 25px;
  border-radius: 2px;
}
.msg_me .msg::after {
  content: " ";
  position: relative;
  right: -18px;
  top: -4px;
  width: 0;
  height: 0;
  overflow: hidden;
  font-size: 0;
  border-top: 5px solid transparent;
  border-bottom: 5px solid transparent;
  border-left: 4px solid #b2e281;
  border-right: 4px solid transparent;
}
</style>
