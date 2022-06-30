<template>
  <div class="chatroom">
    <p>{{user.nickname}}</p>
    <div v-for="item in  concatList" :key="item.userid" @click="selectUser(item)">{{item.nickname}}</div>
    <div class="send-box">
      <p>发消息给：{{msg.to.nickname}}</p>
      <textarea v-model="msg.content"></textarea>
      <p><button @click="sendMsg">发送</button></p>
    </div>
    <div class="msg" v-for="(item, index) in msgList" :key="index">
      <p v-if="item.from.socketId === user.socketId" class="msg-p from">
        <span>{{item.content}} : 我</span>
      </p>
      <p v-else class="to">
        <span>{{item.from.nickname}} : {{item.content}}</span>
      </p>
    </div>
    <p><button @click="sendAllMsg">群发</button></p>
  </div>
</template>

<script>
export default {
  name: 'RoomIndex',
  data () {
    return {
      user: {},
      concatList: [],
      msg: {
        to: {
          socketId: '',
          nickname: ''
        },
        from: {
          socketId: '',
          nickname: ''
        },
        content: ''
      },
      msgList: []
    }
  },
  mounted () {
    this.$socket.emit('connect', 1)
  },
  methods: {
    selectUser (item) {
      this.msg = {
        to: {
          socketId: item.socketId,
          nickname: item.nickname
        },
        from: {
          socketId: this.user.socketId,
          nickname: this.user.nickname
        },
        content: ''
      }
    },
    sendMsg () {
      const msg = this.msg
      if (!msg.to.socketId) return alert('请选择用户')
      if (!msg.content) return alert('不能发送空消息')
      msg.time = +new Date()
      this.$socket.emit('sendMsg', msg)
      this.msg = {
        to: {
          socketId: '',
          nickname: ''
        },
        from: {
          socketId: '',
          nickname: ''
        },
        content: ''
      }
    },
    sendAllMsg () {
      this.$socket.emit('msgs', '这是群发消息')
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
    },
    userList (data) {
      this.concatList = [...data]
    },
    getMsgList (data) {
      this.msgList = [...data]
    },
    msgss (data) {
      console.log(data)
    }
  }
}
</script>

<style lang="scss" scoped>
.msg {
  width: 800px;
}
.msg .to {
  text-align: left;
}
.msg .to span {
  background: #ccc;
}
.msg .from {
  padding: 5px 10px;
  text-align: right;
}
.msg .from span {
  background: green;
}
.msg span {
  display: inline-block;
  padding: 5px 10px;
  border-radius: 10px;
  color: #fff;
}
</style>
