---
title: vscode前端常用插件推荐
categories: 工具
tags:
  - vscode
  - plugin
abbrlink: 59377
date: 2018-09-08 18:43:16
---

vscode是微软开发的的一款代码编辑器，就如官网上说的一样，vscode重新定义（redefined）了代码编辑器。当前市面上常用的轻型代码编辑器主要是：sublime，notepad++，editplus，atom这几种。比起notepad++、editplus，vscode集成了许多IDE才具有的功能，比起它们更像一个代码编辑器；比起sublime，vscode颜值更高，安装配置插件更为方便；比起atom，vscode启动速度更快，打开各种大文件不卡。可以说，vscode既拥有高自由度、又拥有高性能和高颜值，最关键的是，vscode还是一款免费并且有团队持续快速更新的代码编辑器。可以说，vscode是代码编辑器的首选。个人推荐编写前端代码时，代码编辑器选择vscode，IDE选择WebStorm。

1. Auto Close Tag　　　
自动闭合HTML/XML标签
2. Auto Rename Tag  
自动完成另一侧标签的同步修改
3. Beautify 
格式化代码，值得注意的是，beautify插件支持自定义格式化代码规则，例如：
``` json
{
  "indent_size": 4,
  "indent_char": " ",
  "css": {
    "indent_size": 2
  }
}
```
4. Bracket Pair Colorizer  
给括号加上不同的颜色，便于区分不同的区块，使用者可以定义不同括号类型和不同颜色
5. Debugger for Chrome  
映射vscode上的断点到chrome上，方便调试
6. HTML CSS Support  
智能提示CSS类名以及id
7. HTML Snippets  
智能提示HTML标签，以及标签含义
8. JavaScript(ES6) code snippets  
ES6语法智能提示，以及快速输入，不仅仅支持.js，还支持.ts，.jsx，.tsx，.html，.vue，省去了配置其支持各种包含js代码文件的时间
9. jQuery Code Snippets  
jQuery代码智能提示
10. Markdown Preview Enhanced  
实时预览markdown，markdown使用者必备
11. markdownlint 
markdown语法纠错
12. open in browser
13. Path Intellisense  
自动提示文件路径，支持各种快速引入文件
14. React/Redux/react-router Snippets 
　React/Redux/react-router语法智能提示
15. Vetur  
Vue多功能集成插件，包括：语法高亮，智能提示，emmet，错误提示，格式化，自动补全，debugger。vscode官方钦定Vue插件，Vue开发者必备