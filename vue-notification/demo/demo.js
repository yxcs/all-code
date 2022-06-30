import Notification from '../notification/index.js';
Vue.use(Notification);

this.$notify({
  content: 'Hello World', // 消息内容
  btn: '关闭' // 关闭按钮内容
});
