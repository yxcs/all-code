<template>
  <div class="login">
    <el-form ref="form" :model="userLogin" label-width="80px">
      <el-form-item label="用户名称">
        <el-input style="width: 275px;" size="small" v-model="userLogin.username"></el-input>
      </el-form-item>
      <el-form-item label="选择头像">
        <template v-for="(item, index) in  avatarList">
          <el-image
            :key="index"
            style="width: 40px; height: 40px;"
            :src="item"
            fit="fill"
            :class="['img-wrap', avatarIdx === index ? 'select' : '']"
            @click="avatarIdx = index">
          </el-image>
        </template>
      </el-form-item>
      <div style="text-align: center;">
        <el-button size="small" type="primary" @click="onSubmit">登录</el-button>
      </div>
    </el-form>
  </div>
</template>

<script>
export default {
  name: 'Login',
  data () {
    return {
      userLogin: {
        username: '',
        avatarUrl: ''
      },
      avatarList: [
        '/avatar1.png',
        '/avatar2.jpeg',
        '/avatar3.jpg',
        '/avatar4.jpeg',
        '/avatar5.jpg',
        '/avatar6.jpg',
        '/avatar7.jpg'
      ],
      avatarIdx: -1
    }
  },
  methods: {
    onSubmit () {
      const param = {
        username: this.userLogin.username
      }
      if (!param.username) return this.$message.warning('请输入用户名称')
      if (this.avatarIdx < 0) return this.$message.warning('请选择用户头像')
      param.avatarUrl = this.avatarList[this.avatarIdx]
      this.$socket.emit('login', param)
    }
  }
}
</script>

<style lang="scss" scoped>
.login {
  position: fixed;
  left: 50%;
  top: 50%;
  width: 400px;
  height: 260px;
  margin-left: -200px;
  margin-top: -230px;
  background: #fff;
  box-sizing: border-box;
  padding: 10px 0;
}
.img-wrap {
  border: 1px solid #333;
  margin-right: 4px;
  cursor: pointer;
}
.img-wrap.select {
  border: 1px solid #409EFF;
}
</style>
