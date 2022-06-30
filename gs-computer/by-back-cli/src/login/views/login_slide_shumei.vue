<template>
  <div class="login__wrap">
    <el-card class="login__modal">
      <div class="login__modal--title">欢迎使用必要XX系统</div>
      <el-form class="form" :model="user" label-width="60px">
        <el-form-item label="账号：">
          <el-input v-model="user.userName" :maxlength="40" size="medium" placeholder="请输入登录账号" />
        </el-form-item>
        <el-form-item label="密码：">
          <el-input v-model="user.passwrod" :maxlength="22" size="medium" show-password placeholder="请输入登录密码" />
        </el-form-item>
        <div class="error-tips">{{errorMsg}}</div>
        <div class="agree">
          <el-checkbox v-model="user.agree">同意</el-checkbox>
          <span class="agree-item" @click="showAgreement">必要XX系统使用条款</span>
        </div>
        <div class="footer-btn">
          <el-button style="width: 100%" :disabled="!user.agree" type="primary" size="medium" @click="login">登录</el-button>
        </div>
      </el-form>
    </el-card>
    <!-- 滑动验证码相关 勿动 -->
    <div v-if="isShowMask" class="qrcode-wrap"></div>
    <div id="qrcodeDivBox">
      <div class="qrcode-background"></div>
      <div class="qrcode-content">
        <div class="qrcode-top">
          <div class="qrcodeDiv" id="qrcodeDiv"></div>
        </div>
        <div class="qrcode-btm"><span id="qrcodeHide"></span></div>
      </div>
    </div>
    <!-- 条款 -->
    <el-dialog
      width="440px"
      center
      :visible="isShowTerm"
      @close="isShowTerm = false">
      <p slot="title" class="dialog-title">查看使用条款</p>
      <p class="term-title">必要XX系统使用条款</p>
      <template v-for="(item, idx) in terms">
        <p :key="idx" class="term-item">{{idx + 1}}. {{item}}</p>
      </template>
      <div slot="footer"><el-button size="small" @click="isShowTerm = false">关&nbsp;&nbsp;闭</el-button></div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: 'loginIndex',
  data () {
    return {
      user: {
        userName: '',
        passwrod: '',
        agree: true
      },
      isShowMask: false,
      redirectUrl: '',
      isLoginOk: false,
      errorMsg: '',
      isShowTerm: false,
      terms: [
        '使用者应妥善保管账号、个人信息及相关密码，定期修改密码，不得转让、转借他人；',
        '使用者对在系统中的所有操作活动负完全责任；',
        '对于因未经授权的人员使用XX账号而使其可能遭受的任何损失，均由其自行承担',
        '合作终止、人员离职，相应管理人员应及时禁用账号；',
        '使用者应该妥善保存从系统中获取的数据（包括系统界面截图、文本、图像等），不能上传到公共网络；',
        '不在公共上网环境使用本系统'
      ]
    }
  },
  mounted () {
    const query = this.$route.query
    this.redirectUrl = query && query.redirectUrl ? query.redirectUrl : '/'
    window._smConf = {
      organization: 'thP0Unz5GHRLEHSmf4Ja',
      staticHost: 'static.fengkongcloud.com'
    }
    let url = (function () {
      var originHost = 'static2.fengkongcloud.com'
      var isHttps = document.location.protocol === 'https:'
      var protocol = isHttps ? 'https://' : 'http://'
      var fpJsPath = '/fpv2.js'
      var url = protocol + window._smConf.staticHost + fpJsPath
      var ua = navigator.userAgent.toLowerCase()
      var isWinXP = /windows\s(?:nt\s5.1)|(?:xp)/.test(ua)
      var isLowIE = /msie\s[678]\.0/.test(ua)
      if (isHttps && isWinXP && isLowIE) {
        url = protocol + originHost + fpJsPath
      }
      return url
    })()
    var sm = document.createElement('script')
    var s = document.getElementsByTagName('script')[0]
    sm.src = url
    s.parentNode.insertBefore(sm, s)
  },
  methods: {
    login () {
      let self = this
      self.isLoginOk = false
      if (!self.user.userName || !self.user.passwrod) {
        self.errorMsg = '账号或密码不能为空'
        return false
      } else {
        self.errorMsg = ''
      }
      self.isShowMask = true
      document.getElementById('qrcodeDivBox').style.display = 'block'
      window.initSMCaptcha({
        organization: 'thP0Unz5GHRLEHSmf4Ja',
        appId: 'qrcode',
        appendTo: 'qrcodeDiv',
        customData: {
          deviceId: window.SMSdk.getDeviceId()
        }
      }, function (SMCaptcha) {
        SMCaptcha.onSuccess(function (data) {
          if (data.pass) {
            self.isShowMask = false
            document.getElementById('qrcodeDivBox').style.display = 'none'
            const params = {
              // 图片验证相关信息，本期后端不作处理
              // deviceId: window.SMSdk.getDeviceId() || 0,
              // rid: data.rid,
              userName: self.user.userName,
              password: self.user.passwrod
            }
            // 登录请求
            // self.$http.demo.login(params)
            console.log('请求参数: ', params)
            console.log('登陆请求')
            // 登陆成功后，添加路由跳转
          }
        })
      })
    },
    showAgreement () {
      this.isShowTerm = true
    }
  }
}
</script>

<style lang="less" scoped>
.login__wrap {
  height: 100%;
  background-color: #efefef;
}
.login__modal {
  position: fixed;
  top: 20%;
  left: 50%;
  width: 440px;
  margin-left: -220px;
  .login__modal--title {
    padding: 50px 0 30px 0;
    text-align: center;
    font-weight: bold;
    font-size: 24px;
    color: #008000;
  }
  .form {
    width: 320px;
    margin: 0 auto;
    .error-tips {
      height: 20px;
      padding-left: 60px;
      margin-top: -10px;
      margin-bottom: 10px;
      font-size: 12px;
      color: #f00;
    }
    .agree {
      text-align: center;
      .agree-item {
        font-size: 12px;
        color: #2d8cf0;
        cursor: pointer;
        padding-left: 10px;
      }
    }
    .footer-btn {
      padding: 30px 0 40px 0;
    }
  }
}
.qrcode-wrap {
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  z-index: 9;
  background: rgba(0,0,0,0.3);
}
#qrcodeDivBox {
  width: 350px;
  position: absolute;
  top: 20%;
  left: 50%;
  z-index: 9999;
  margin-left: -175px;
  margin-top: 130px;
  display: none;
}
.modal-txt {
  padding: 20px 0;
  text-align: center;
  font-size: 16px;
}
.footer-btn {
  text-align: center;
}
.center {
  text-align: center;
  font-size: 16px;
}
.term-title {
  font-size: 14px;
  text-align: center;
  font-weight: bold;
  margin-bottom: 30px;
  text-decoration: underline;
}
.term-item {
  font-size: 14px;
  color: #333;
  line-height: 1.5;
}
.dialog-title {
  font-size: 16px;
  text-align: center;
  padding-top: 0px;
  padding-bottom: 10px;
  margin-top: 0px;
  border-bottom: 1px solid #ddd;
}
</style>