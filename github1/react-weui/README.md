## react-weui <img src='https://img.shields.io/badge/node-v7.8.0-green.svg'>

## 技术栈 (technology)

```
react + react-redux + es6 + webpack
```

## 文件结构 (File structure)


```
├── .happypack                  happypack缓存目录
├── build                       项目生产目录
├── index.html                  项目入口文件
├── index.js                    webpack入口
├── set.js                      快速生成组件脚本
├── webpack.config.js           webpack
├── webpack.config.dev.js       webpack开发环境配置
├── webpack.config.dist.js      webpack生产环境配置
├── .eslintrc.js                eslint配置文件
├── package.json                项目配置文件
├── src                         生产目录
    |—— assets                  静态资源
    |——|—— css                  全局样式    
    |——|—— fonts                字体
    |—— containers              页面组件
    |—— components              公共组件
    |—— config                  配置http访问ip
    |—— services                公用服务
    |—— router                  路由配置
    |—— redux                   react-redux 相关文件
    |——|—— action              
    |——|—— reducer              
    |——|—— store             
```



## 项目运行(Probject running)

1.克隆项目到本地 : git clone https://github.com/jiwenjiang/react-weui.git

2.安装依赖环境 : yarn install

3.启动项目 : yarn dev      

4.打包项目 : yarn dist


## yarn项目管理

注意本项目通过yarn管理，相关依赖包请通过yarn下载。

yarn安装地址：https://yarn.bootcss.com/docs/install.html

