---
title: calc使用说明
date: 2017-05-26 15:35:17
tags: JS
description: calc 是 css3提供的一个在css文件中计算值的函数： 用于动态计算长度值。
---

在讲calc之前先说一下 vh  vw：
    vw  相对于视口的宽度。视口被均分为100单位的vw
   vh  相对于视口的高度。视口被均分为100单位的vh
   vmax 相对于视口的宽度或高度中较大的那个。其中最大的那个被均分为100单位的vmax
   vmin 相对于视口的宽度或高度中较小的那个。其中最小的那个被均分为100单位的vmin
可以看一看这个教程，对于vh vw的解释的很好 [传送门](http://www.zhangxinxu.com/wordpress/2012/09/new-viewport-relative-units-vw-vh-vm-vmin/)


calc 是 css3提供的一个在css文件中计算值的函数： 用于动态计算长度值。

1. 需要注意的是，运算符前后都需要保留一个空格，例如：width: calc(100% - 10px)；
2. 任何长度值都可以使用calc()函数进行计算；
3. calc()函数支持 "+", "-", "*", "/" 运算；
4. calc()函数使用标准的数学运算优先级规则；

calc(100vh - 10px)  表示整个浏览器窗口高度减去10px的大小 calc(100vw - 10px)   表示整个浏览器窗口宽度减去10px的大小 一般用来设置流式布局宽高，当然，你可以使用calc()给元素的border、margin、pading、font-size和width等属性设置动态值 calc()的兼容性如下，使用时需注意：

​​​​![浏览器兼容](/css/calc_base_use/20161205142448327.png)