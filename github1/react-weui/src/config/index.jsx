
const Main = {
    collectTarget: PRODUCTION ? 'http://192.168.0.88:50002/' : 'http://192.168.0.137:50002/', //目标网站
    imageTarget: PRODUCTION ? 'http://192.168.0.88:50002/' : 'http://192.168.0.115:9001/', //目标网站
    name: 'react-weui',
    platform:'J_bleach',
    prefix: 'antdAdmin',
    logoSrc: '',
    logoText: 'J_bleach',
    needLogin: true,
    localKey: {
        userToken: 'USER_AUTHORIZATION'
    }
};

export default Main;
