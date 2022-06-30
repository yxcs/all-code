## 脚手架使用文档

本脚手架包括vue组件开发、指令开发、过滤器开发以及vue组件文档编写展示功能等，使用方式和普通的vue项目没有太大的区别。

但是要注意的是，在打包时分为两种，一种是插件的打包，打包好后的文件放在lib文件夹中。另一种是打包组件文档，打包好之后是包含所有组件和组件说明文档的单页面应用，放到静态资源服务器下运行即可。  

### 使用方式

1. 代码下载

    ```shell
    git clone http://192.168.99.68/support/pub-components.git
    ```

    没有权限的请联系于晓超

2. 依赖安装

    ```shell
    cd pub-component
    npm install # 或者 yarn
    ```

    依赖比较多，安装需要一段时间，请耐心等待，如果安装失败，请删除package-lock.json和node_modules后，再次安装

3. 本地运行

    ```shell
    npm run dev
    ```

    运行之后，在浏览器中打开http://localhsot:8080，即可看到文档首页

4. 组件开发

    进入到根目录下的src文件夹下，会看到components、directives、filters、mixins等4个文件夹以及index.js文件，其中index.js用以注册组件，所有的组件都需在此注册。4个文件夹分别对应我们可以开发的组件、指令、过滤器以及混入等。  
    其中components文件夹下每一个组件，都有自己的index.js文件，具体组件实现文件和单独的css文件，这样是为了可以实现单独加载某一个组件。  
    组件要以by-开头  
    在 `components.json` 中添加对应的组件路径，以便于打包

5. 在组件文档中使用自定义组件

    在examples文件夹下的 `main.js` 中引入我们在src文件夹下的组件，然后就可以直接在markdown中直接使用了：

    ```javascript
    // 引入自定义组件
    import By from '../src'
    Vue.use(By)
    ```

    这样我们就可以在写组件文档以及对组件进行测试了

6. 组件对应文档开发

    进入到根目录下的examples文件夹，这里边是一个常见的vue项目，有router，有静态资源，有页面等等。我们把所有的组件文档写在这里。  
    不同的是，有个存放了很多markdown文件的docs文件。常见的vue项目，都是读取vue文件，然后渲染页面。这里我们对其进行了扩展，即可以同时加载vue文件和markdown文件渲染出页面来。  
    我们把要展示的demo代码放到demo注释中，就可以在渲染出来的页面中运行这段代码，并展示这段代码的源码了。
    例如：  
    :::demo  这里是`demo`注释演示

    ```html
    <by-button size="small" type="primary">主要按钮</by-button>
    ```

    :::

    编写好文档之后，在 `route.js` 中添加对应的markdown的路由，同时在 `menu.vue` 中添加对应路由，便可以在浏览器中看到相应路由，点击调转到对应页面了。

### 打包方式

1. 组件库打包

    ```shell
    npm run build
    ```

    这里要注意 `package.json` 中的main字段要指向lib文件夹下的index.js：`"main": "lib/index.js"`

2. 组件文档打包

    ```shell
    npm run build_example
    ```

    在dist文件夹下查看相应文件

### 组件库发布方式

我们要把组件库发布到内网的npm服务器上，内网地址: http://192.168.99.117:7001/

```shell
npm login --registry = http://192.168.99.117:7001/
```

输入用户名密码，之后提示 *Logged in as dev on http://192.168.99.117:7001/*，即登录成功

接下来把组件发布到npm上

```shell
npm publish --registry=http://192.168.99.117:7001/
```

下载使用

```shell
npm install @by/by-ui --registry=http://192.168.99.117:7001/
```

[发布npm到内网详细教程](http://wiki.biyao.com/pages/viewpage.action?pageId=19071285 '发布npm到内网详细教程')

### 在项目中使用

```shell
npm install @by/by-ui --registry=http://192.168.99.117:7001/
```

```javascript
import ByUI from '@by/by-ui'
Vue.use(ByUI)
```
