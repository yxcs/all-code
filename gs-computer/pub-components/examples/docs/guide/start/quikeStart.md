## 快速上手

本节将介绍如何在项目中使用 `@by/by-ui` 组件库

### 基础项目搭建

下载安装现有的项目脚手架

```shell
git clone http://192.168.99.68/support/support.git # 没有权限的请联系杜龙龙
cd support # 可以自己更改文件名称
npm install
```

:::tip
注意：要删除原有的.git，如果要前后端代码分别放置的话，请自己初始化关git项目 `git init`
:::

### 引入 @by/by-ui

你可以引入整个 @by/by-ui，或是根据需要仅引入部分组件。我们先介绍如何引入完整的 @by/by-ui。

#### 完整引入

在 main.js 中写入以下内容：

```javascript
import Vue from 'vue';
import ByUI from '@by/by-ui';
import '@by/by-ui/lib/theme/index.css';
import App from './App.vue';

Vue.use(ByUI);

new Vue({
  el: '#app',
  render: h => h(App)
});
```

以上代码便完成了 @by/by-ui 的引入。需要注意的是，样式文件需要单独引入。

#### 按需引入

借助 [babel-plugin-component](https://github.com/QingWei-Li/babel-plugin-component)，我们可以只引入需要的组件，以达到减小项目体积的目的。

首先，安装 babel-plugin-component：

```bash
npm install babel-plugin-component -D
```

然后，将 .babelrc 修改为：

```javascript
module.exports = {
  presets: ["@vue/app"],
  plugins: [
    [
      "component",
      {
        libraryName: "@by/by-ui",
        // 因为有指令和过滤器等无css的文件，故此设为false
        style: false
      }
    ]
  ]
};
```

接下来，如果你只希望引入部分组件，比如 Button 和 Checkbox，那么需要在 main.js 中写入以下内容：

```javascript
import Vue from 'vue';
import '@by/by-ui/lib/theme-test/index.css';
import { ByButton, foucs, date2str, ByCheckbox } from '@by/by-ui';
import App from './App.vue';

Vue.component(ByButton.name, ByButton)
Vue.component(ByCheckbox.name, ByCheckbox)
/* 或写为
 * Vue.use(ByButton)
 * Vue.use(ByCheckbox)
 */

Vue.directive('focus', foucs)
Vue.filter('date2str', date2str)

new Vue({
  el: '#app',
  render: h => h(App)
});
```

:::warning
一定要全局引入样式，因为这个组件库好包含常用的指令和过滤器，这些事无样式的，按需引入样式会有问题
:::

完整组件列表和引入方式如下：

```javascript
import Vue from 'vue';
import {
  // 组件
  ByButton,
  ByCheckbox,
  ByCascadeTree,
  // 指令
  foucs,
  multipleSpace,
  onlyNum,
  // 过滤器
  date2str,
  time2str,
  currency,
  cutStr,
  numFormat,
  percentage,
  placeholder,
  subStr
} from '@by/by-ui';
```

### 开始使用

至此，一个基于 Vue 和 @by/by-ui 的开发环境已经搭建完毕，现在就可以编写代码了。各个组件的使用方法请参阅它们各自的文档。
