import regeneratorRuntime from './regenerator-runtime';
const App = getApp();

// 初始化神策埋点阈值
let isCheck = false;

const login = () => {
  return new Promise((resolve, reject) => {
    wx.cloud.callFunction({
      name: 'login',
      data: {},
      success: res => {
        resolve(res.result.openid)
      },
      fail: err => {
        console.log(err)
        resolve()
      }
    })
  })
}

const initialize = (fn) => {
  // 返回新的函数
  return async function() {
    let staticOpenid = App.globalData.openid || '';
    try {
      if (!isCheck) {
        isCheck = true;
        const openid = await login();
        staticOpenid = openid;
        console.log(staticOpenid)
        App.globalData.openid = openid;
      }
    } catch (error) {
      console.log('初始化失败');
    }

    // 触发原函数并绑定 this
    fn.call(this, arguments, staticOpenid);
  };
}

export default initialize;
