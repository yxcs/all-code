---
title: line-height设置% 数字以及em
date: 2017-05-26 15:35:17
tags: JS
description: 
---

line-height百分比在面试中可能经常问到。例如你知道line-height:120%和line-height:1.2的区别吗？

现在就说一下行高带单位和不带单位的区别，例如下面的例子：

```css
line-height:26px; 表示行高为26个像素
line-heigth:120%; 表示行高为当前字体大小的120%
line-height:2.6em; 表示行高为当前字体大小的2.6倍
```
带单位的行高都有继承性，其子元素继承的是计算值，如父元素的字体大小为14px，定义行高line-height:2em;则计算值为 28px，不会因其子元素改变字体尺寸而改变行高。(例如：父元素14px，子元素12px,那么行高就是28px，子元素虽然字体是12px，行高还是父元素的行高)

```css
line-height:2.6;表示行高为当前字体大小的2.6倍
```
不带单位的行高是直接继承，而不是计算值，如父元素字体尺寸为14px，行高line-height:2;子元素字体为12px，不需要再定义行高，他默认的行高为24px。（例如：子元素12px，他的行高是24px,不会继承父元素的28px）

只是单纯的文字描述，可能同学看了会很晕！不清楚是怎么回事！下面我再补充一下案例吧！

大家把下面代码copy到html中

```html
<style>
    .parent1{font-size:14px;line-height: 150%; background: #999;padding:10px}
    .parent2{font-size:14px;line-height: 1.5; background: #999;padding:10px}
    .child{font-size:26px;background: #ccc}
</style>
 
 
<div class="parent1">
    <div class="child">line-height: 150%;</div>
</div>
 
 
<br/><br/>
 
 
<div class="parent2">
    <div class="child">line-height: 1.5;</div>
</div>
```
其中，一个是有百分比的，一个是没有百分比的！预览图如下：

![设置值](/vue/line-height_set_value/20161205145801847.png)

如上图，有百分比的haorooms_children 继承了父级元素14*1.5=21px

没有百分比，不带单位的是自己的1.5倍，也就是26*1.5=39px;