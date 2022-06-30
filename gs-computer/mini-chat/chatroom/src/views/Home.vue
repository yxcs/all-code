<template>
  <div class="home">
    <template v-if="!isLogin">
      <Login />
    </template>
    <template v-else>
      <div class="room">
        <div class="content">
          <div class="left">
            <div class="userinfo">
              <div class="avatar"><img :src="user.avatarUrl" /></div>
              <div class="nickname">{{user.username}}</div>
            </div>
            <div class="create-group">
              <el-button @click="dialogVisible = true" size="mini" type="primary" icon="el-icon-circle-plus-outline" circle></el-button>
            </div>
            <div class="user-list">
              <div v-for="item in concatList" :key="item.socketId" :class="['item', selectId === item.socketId ? 'select' : '']" @click="selectUser(item)">
                <div class="item-avatar"><img :src="item.avatarUrl" /></div>
                <div class="item-desc">
                  <div class="nickname">{{item.username}}</div>
                  <div class="time">{{item.connectTime | date2str}}</div>
                </div>
              </div>
            </div>
            <div class="user-list">
              <div v-for="item in roomList" :key="item.roomId" :class="['item', selectRoomId === item.roomId ? 'select' : '']" @click="selectGroup(item)">
                <div class="item-avatar"><img :src="item.avatarUrl" /></div>
                <div class="item-desc">
                  <div class="nickname">{{item.groupName}}</div>
                  <div class="time">{{item.createTime | date2str}}</div>
                </div>
              </div>
            </div>
          </div>
          <div class="right">
            <div class="title">{{chatDetail.to.username || '聊天用户名称'}}</div>
            <div class="msg-box">
              <template v-for="item in msgList">
                <div v-if="item.from.socketId === user.socketId" :key="item.msgId" class="msg-item current">
                  <div class="msg-content"><span>{{item.msg}}</span></div>
                  <div class="msg-avatar"><img :src="item.to.avatarUrl" /></div>
                </div>
                <div v-else :key="item.msgId" class="msg-item other">
                  <div class="msg-avatar"><img :src="item.from.avatarUrl" /></div>
                  <div class="msg-content"><span>{{item.msg}}</span></div>
                </div>
              </template>
            </div>
            <div class="msg-input">
              <el-input
                :rows="3"
                type="textarea"
                placeholder="请输入内容"
                v-model="chatDetail.msg"
                resize="none">
              </el-input>
              <div class="btn">
                <el-button size="mini" @click="sendMsg"> 发  送 </el-button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </template>
    <el-dialog
      title="创建群聊"
      :visible.sync="dialogVisible"
      width="30%"
      @closed="handleClosed">
      <el-input v-model="groupName" placeholder="请输入群名称"></el-input>
      <div class="cbx">
        <el-checkbox-group v-model="groupMember">
          <el-checkbox v-for="item in concatList" :key="item.socketId" :label="item.socketId">{{item.username}}</el-checkbox>
        </el-checkbox-group>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button size="small" @click="dialogVisible = false">取 消</el-button>
        <el-button size="small" type="primary" @click="createGroup">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import Login from './login'
export default {
  name: 'home',
  components: {
    Login
  },
  data () {
    return {
      isLogin: false,
      msg: '',
      user: {},
      concatList: [],
      selectId: '',
      chatDetail: {
        type: 'single',
        msgId: '',
        msg: '',
        createTime: '',
        toSocketId: '',
        fromSocketId: '',
        to: {
          socketId: '',
          username: '',
          avatarUrl: ''
        },
        from: {
          socketId: '',
          username: '',
          avatarUrl: ''
        }
      },
      msgList: [],
      dialogVisible: false,
      groupName: '',
      groupMember: [],
      roomList: [],
      selectRoomId: ''
    }
  },
  methods: {
    selectUser (user) {
      this.chatDetail.type = 'single'
      this.chatDetail.to = {
        socketId: user.socketId,
        username: user.username,
        avatarUrl: user.avatarUrl
      }
      this.chatDetail.toSocketId = user.socketId
      this.selectId = user.socketId
      this.selectRoomId = ''
      this.$socket.emit('initMsg', { toSocketId: user.socketId, fromSocketId: this.user.socketId })
      this.msgList = []
    },
    selectGroup (group) {
      this.chatDetail.type = 'group'
      this.chatDetail.to = {
        socketId: group.roomId,
        username: group.username,
        avatarUrl: group.avatarUrl
      }
      this.chatDetail.toSocketId = group.roomId
      this.selectId = ''
      this.selectRoomId = group.roomId
      this.$socket.emit('initGroupMsg', { roomId: group.roomId })
      this.msgList = []
    },
    sendMsg () {
      const unix = +new Date()
      this.chatDetail.createTime = unix
      this.chatDetail.msgId = `${this.user.socketId}${this.chatDetail.to.socketId}${unix}`
      if (this.chatDetail.type === 'single') {
        this.$socket.emit('msg', this.chatDetail)
      } else {
        this.$socket.emit('gMsg', this.chatDetail)
      }
      this.chatDetail.msg = ''
    },
    createGroup () {
      if (!this.groupName) return this.$message.warning('请输入群名称')
      const groupMember = this.groupMember.filter(item => this.user.socketId !== item)
      groupMember.push(this.user.socketId)
      if (groupMember.length < 3) return this.$message.warning('至少三个人方可建群')
      this.$socket.emit('addGroup', {
        groupName: this.groupName,
        socketId: this.user.socketId,
        groupMember: this.groupMember,
        roomId: 'room_' + this.user.socketId + (Date.now()),
        createTime: +new Date(),
        avatarUrl: '/group-avatar_1.jpg'
      })
      this.dialogVisible = false
    },
    handleClosed () {
      this.groupName = ''
      this.groupMember = []
    }
  },
  sockets: {
    connect (data) {
      console.log('一个用户进入链接')
    },
    reconnect (data) {
      console.log('从新链接')
      this.$socket.emit('connect', 1)
    },
    disconnect (data) {
      console.log('socket 链接断开')
      console.log('是否重新连接', this.$socket.connected)
      this.$socket.emit('reconnect', { 'reconnect': true })
    },
    userInfo (data) {
      this.user = data
      this.chatDetail.fromSocketId = data.socketId
      this.chatDetail.from = {
        socketId: data.socketId,
        username: data.username,
        avatarUrl: data.avatarUrl
      }
    },
    loginStatus (data) {
      this.isLogin = data
    },
    userList (data) {
      this.concatList = [...data]
    },
    getMsgList (data) {
      console.log(data)
      if ((this.selectId || this.selectRoomId) && data.length) {
        this.msgList = [...data]
      }
    },
    chatGroupList (data) {
      this.roomList.push(data)
    }
  },
  filters: {
    date2str (val) {
      if (!val) return null
      val = new Date(val)
      let Y = val.getFullYear()
      let M = val.getMonth() + 1
      let D = val.getDate()
      let h = val.getHours()
      let m = val.getMinutes()
      let s = val.getSeconds()
      return [[Y, M > 9 ? M : '0' + M, D > 9 ? D : '0' + D].join('-'), [h > 9 ? h : '0' + h, m > 9 ? m : '0' + m, s > 9 ? s : '0' + s].join(':')].join(' ')
    }
  }
}
</script>

<style lang="scss" scoped>
.home {
  background-color: #efefef;
  background-image: url('../assets/2zrdI1g.jpg');
  background-repeat: no-repeat;
  background-size: cover;
  height: 100%;
}
.room {
  position: fixed;
  left: 50%;
  top: 50%;
  width: 1000px;
  height: 750px;
  margin-left: -500px;
  margin-top: -400px;
  background: #fff;
}
.content {
  display: flex;
  justify-content: space-between;
  width: 100%;
  height: 100%;
}
.left {
  width: 250px;
  height: 100%;
  background: #333;
  overflow-x: hidden;
  overflow-y: auto;
}
.right {
  width: 750px;
  height: 100%;
  background: #fff;
}
.userinfo {
  width: 270px;
  height: 60px;
  box-sizing: border-box;
  padding: 10px 20px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  border-bottom: 1px solid #000;
  .avatar {
    width: 40px;
    height: 40px;
    img {
      width: 100%;
      height: 100%;
    }
    margin-right: 10px;
  }
  .nickname {
    color: #fff;
    font-size: 14px;
  }
}
.user-list {
  padding: 20px 0;
  .item {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    padding: 10px;
    border-bottom: 1px solid #666;
    &.select {
      background: rgba(255, 255, 255, 0.2);
    }
    cursor: pointer;
    .item-avatar {
      width: 40px;
      height: 40px;
      margin-right: 10px;
      img {
        width: 100%;
        height: 100%;
      }
    }
    .item-desc {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      align-items: flex-start;
      color: #fff;
      .nickname {
        font-size: 14px;
      }
      .time {
        font-size: 12px;
      }
    }
  }
}
.title {
  width: 100%;
  height: 50px;
  text-align: center;
  color: #333;
  line-height: 50px;
  font-size: 14px;
  border-bottom: 1px solid #999;
}
.msg-box {
  width: 100%;
  height: 550px;
  box-sizing: border-box;
  padding: 20px;
  background: #efefef;
  overflow-x: hidden;
  overflow-y: auto;
}
.msg-input {
  width: 100%;
  height: 150px;
  box-sizing: border-box;
  padding: 20px;
  border-top: 1px solid #999;
}
.btn {
  text-align: right;
  margin-top: 10px;
}
.msg-item.other {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  font-size: 14px;
  .msg-avatar {
    width: 40px;
    height: 40px;
    img {
      width: 100%;
      height: 100%;
    }
    margin-right: 10px;
  }
  span {
    display: inline-block;
    max-width: 380px;
    padding: 8px 14px;
    border-radius: 6px;
    background: #fff;
  }
}
.msg-item.current {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  font-size: 14px;
  .msg-avatar {
    width: 40px;
    height: 40px;
    img {
      width: 100%;
      height: 100%;
    }
    margin-left: 10px;
  }
  span {
    display: inline-block;
    max-width: 380px;
    padding: 8px 14px;
    border-radius: 3px;
    background: #b2e281;
  }
}
.create-group {
  text-align: center;
  margin-top: 20px;
}
.cbx {
  margin: 20px 0;
  p {
    line-height: 24px;
  }
}
</style>
