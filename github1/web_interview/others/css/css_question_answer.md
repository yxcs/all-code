# CSS 面试常见问题
如何在IE6及更早浏览器中定义小高度的容器？
方法：
``` css
#test{overflow:hidden;height:1px;font-size:0;line-height:0;}
```
IE6及更早浏览器之所以无法直接定义较小高度的容器是因为默认会有行高
如何解决IE6及更早浏览器浮动时产生双倍边距的BUG？
方法：
``` css
#test{display:inline;}
```
当在IE6及更早浏览器中出现浮动后margin值解析为双倍的情况，设置该元素的display属性为inline即可。
如何在IE6及更早浏览器下模拟min-height效果？
方法：
``` css
#test{min-height:100px;_height:100px;}
```
注意此时#test不能再设置overflow的值为hidden，否则模拟min-height效果将失效
如何解决按钮在IE7及更早浏览器下随着value增多两边留白也随着增加的问题？
方法：
``` css
input,button{overflow:visible;}
```
如何解决IE7及更早浏览器下当li中出现2个或以上的浮动时，li之间产生的空白间隙的BUG？
方法：
``` css
li{vertical-align:top;}
```
除了top值，还可以设置为text-top | middle | bottom | text-bottom，甚至特定的<**length**>和<**percentage**>值都可以
如何解决IE6及更早浏览器下的3像素BUG？
方法：
``` css
.a{color:#f00;}
.main{width:950px;background:#eee;}
.content{float:left;width:750px;height:100px;background:#ccc;_margin-right:-3px;}
.aside{height:100px;background:#aaa;}

```
``` html
<div class="main">
    <div class="content">content</div>
    <div class="aside">aside</div>
</div>
```
在IE6及更早浏览器下为.content设置margin-right:-3px；也可以设置.aside为浮动
如何解决IE6下的文本溢出BUG（江湖匪号：“谍影重重”或“一只猪的故事”）？
BUG重现：
``` css
.test{zoom:1;overflow:hidden;width:500px;}
.box1{float:left;width:100px;}
.box2{float:right;width:400px;}
```
``` html
<div class="test">
    <div class="box1"></div>
    <!-- 注释 -->
    <div class="box2">↓这就是多出来的那只猪</div>
</div>
```
运行如上代码，你会发现文字发生了溢出，在IE6下会多出一只“猪”。造成此BUG的原因可能是多重混合的，如浮动，注释，宽高定义等等。并且注释条数越多，溢出的文本也会随之增多。
列举几个解决方法： 
　删除box1和box2之间所有的注释； 
　不设置浮动； 
　调整box1或box2的宽度，比如将box的宽度调整为90px
如何解决IE6使用滤镜PNG图片透明后，容器内链接失效的问题？
方法：
``` css
div{width:300px;height:100px;_filter:progid:DXImageTransform.Microsoft.AlphaImageLoader(src='*.png');}
a{_position:relative;}
```
解决方法是为容器内的链接定义相对定位属性position的值为relative
如何解决IE6无法识别伪对象:first-letter/:first-line的问题？
方法1：
``` css
p:first-letter {float:left;font-size:40px;font-weight:bold;}
p:first-line {color:#090;}
```
增加空格：在伪对象选择符:first-letter/:first-line与包含规则的花括号"{"间增加空格。
方法2：
``` css
p:first-letter
{float:left;font-size:40px;font-weight:bold;}
p:first-line
{color:#090;}
```
换行：将整个花括号"{"规则区域换行。细节参见E:first-letter和E:first-line选择符
如何解决IE8会忽略伪对象:first-letter/:first-line里的!important规则的问题？
BUG重现：
``` css
p:first-letter {float:left;font-size:40px;font-weight:bold;color:#f00!important;color:#090;}
```
如上代码，在IE8下color定义都会失效，原因就是因为有color使用了!important规则。鉴于此，请尽量不要在:first-letter/:first-line里使用!important规则。
如何解决IE6会忽略同一条样式体内的!important规则的问题？
BUG重现：
``` css
div{color:#f00!important;color:#000;}
```
如上代码，IE6及以下浏览器div的文本颜色为#000，!important并没有覆盖后面的规则，也就是说!important被忽略了。解决方案是将该样式拆分为2条，细节参见!important规则
如何解决IE6及更早浏览器下当li内部元素是定义了display:block的内联元素时底部产生空白的问题？
BUG重现：
``` css
a,span{display:block;background:#ddd;}
```
``` html
<ul>
    <li><a href="http://css.doyoe.com/">CSS参考手册</a></li>
    <li><a href="http://blog.doyoe.com/">CSS探索之旅</a></li>
    <li><a href="http://demo.doyoe.com/">web前端实验室</a></li>
    <li><span>测试li内部元素为设置了display:block的内联元素时底部产生空白</span></li>
</ul>
```
如上代码，IE6及更早浏览器每个li内部的内联元素底部都会产生空白。解决方案是给li内部的内联元素再加上zoom:1
如何解决IE6及更早浏览器下未定义宽度的浮动或绝对定位元素会被内部设置了zoom:1的块元素撑开的问题？
BUG重现：
``` css
#test{zoom:1;overflow:hidden;border:1px solid #ddd;background:#eee;}
#test h1{float:left;}
#test .nav{float:right;background:#aaa;}
#test .nav ul{zoom:1;overflow:hidden;margin:0;padding:0;list-style:none;}
#test .nav li{float:left;margin:0 5px;}
```
``` html
<div id="test">
    <h1>Doyoe</h1>
    <div class="nav">
        <ul>
            <li><a href="http://css.doyoe.com/">CSS参考手册</a></li>
            <li><a href="http://blog.doyoe.com/">CSS探索之旅</a></li>
            <li><a href="http://demo.doyoe.com/">web前端实验室</a></li>
        </ul>
    </div>
</div>
```
如上代码，IE6及更早浏览器div.nav会被设置了zoom:1的ul给撑开。
列举几个解决方法： 
　设置ul为浮动元素； 
　设置ul为inline元素； 
　设置ul的width
如何解决IE7及更早浏览器下子元素相对定位时父元素overflow属性的auto|hidden失效的问题？
BUG重现：
``` css
div{overflow:auto;width:260px;height:80px;border:1px solid #ddd;}
p{position:relative;margin:0;}
```
``` html
<div>
    <p>如果我是相对定位，我的父元素overflow属性设置为auto|hidden将失效。如果你使用的是IE及更早浏览器，你将可以看到这个BUG</p>
    <p>如果我是相对定位，我的父元素overflow属性设置为auto|hidden将失效。如果你使用的是IE及更早浏览器，你将可以看到这个BUG</p>
</div>
```
如上代码，在IE7及更早浏览器下你会看到div的滚动条将无法工作。解决方案是给div也设置相对定位position:relative
如何解决Chrome在应用transition时页面闪动的问题？
方法：
-webkit-transform-style:preserve-3d;或-webkit-backface-visibility:hidden;
在Chrome下，使用过渡效果transition时有时会出现页面闪动

------------------
如何清除图片下方出现几像素的空白间隙？
方法1：
```css
img{display:block;}
```
方法2：
```css
img{vertical-align:top;}
```
除了top值，还可以设置为text-top | middle | bottom | text-bottom，甚至特定的<**length**>和<**percentage**>值都可以
方法3：
```css
#test{font-size:0;line-height:0;}
```
#test为img的父元素
如何让文本垂直对齐文本输入框？
方法：
```css
input{vertical-align:middle;}
```
如何让单行文本在容器内垂直居中？
方法：
```css
#test{height:25px;line-height:25px;}
```
只需设置文本的行高等于容器的高度即可
如何让超链接访问后和访问前的颜色不同且访问后仍保留hover和active效果？
方法：
```css
a:link{color:#03c;}
a:visited{color:#666;}
a:hover{color:#f30;}
a:active{color:#c30;}
```
按L-V-H-A的顺序设置超链接样式即可，可速记为LoVe（喜欢）HAte（讨厌）
为什么Standard mode下IE无法设置滚动条的颜色？
方法：
```css
html{
    scrollbar-3dlight-color:#999;
    scrollbar-darkshadow-color:#999;
    scrollbar-highlight-color:#fff;
    scrollbar-shadow-color:#eee;
    scrollbar-arrow-color:#000;
    scrollbar-face-color:#ddd;
    scrollbar-track-color:#eee;
    scrollbar-base-color:#ddd;
}
```
将原来设置在body上的滚动条颜色样式定义到html标签选择符上即可
如何使文本溢出边界不换行强制在一行内显示？
方法：
```css
#test{width:150px;white-space:nowrap;}
```
设置容器的宽度和white-space为nowrap即可，其效果类似<nobr>标签
如何使文本溢出边界显示为省略号？
方法（此方法Firefox5.0尚不支持）：
```css
#test{width:150px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;}
```
首先需设置将文本强制在一行内显示，然后将溢出的文本通过overflow:hidden截断，并以text-overflow:ellipsis方式将截断的文本显示为省略号。
如何使连续的长字符串自动换行？
方法：
```css
#test{width:150px;word-wrap:break-word;}
```
word-wrap的break-word值允许单词内换行
如何清除浮动？
方法1：
```css
#test{clear:both;}
```
#test为浮动元素的下一个兄弟元素
方法2：
```css
#test{display:block;zoom:1;overflow:hidden;}
```
#test为浮动元素的父元素。zoom:1也可以替换为固定的width或height
方法3：
```css
#test{zoom:1;}
#test:after{display:block;clear:both;visibility:hidden;height:0;content:'';}
```
#test为浮动元素的父元素
如何定义鼠标指针的光标形状为手型并兼容所有浏览器？
方法：
```css
#test{cursor:pointer;}
```
若将cursor设置为hand，将只有IE和Opera支持，且hand为非标准属性值
如何让已知高度的容器在页面中水平垂直居中？
方法：
```css
#test{position:absolute;top:50%;left:50%;width:200px;height:200px;margin:-100px 0 0 -100px;}
```
Know More：已知高度的容器如何在页面中水平垂直居中
如何让未知尺寸的图片在已知宽高的容器内水平垂直居中？
方法：
```css
#test{display:table-cell;*display:block;*position:relative;width:200px;height:200px;text-align:center;vertical-align:middle;}
#test p{*position:absolute;*top:50%;*left:50%;margin:0;}
#test p img{*position:relative;*top:-50%;*left:-50%;vertical-align:middle;}
```
#test是img的祖父节点，p是img的父节点。Know More：未知尺寸的图片如何水平垂直居中
如何设置span的宽度和高度（即如何设置内联元素的宽高）？
方法：
```css
span{display:block;width:200px;height:100px;}
```
要使内联元素可以设置宽高，只需将其定义为块级或者内联块级元素即可。所以方法非常多样，既可以设置display属性，也可以设置float属性，或者position属性等等。
如何给一个元素定义多个不同的css规则？
方法：
```css
.a{color:#f00;}
.b{background:#eee;}
.c{background:#ccc;}
```
```html
<div class="a b">测试1</div>
<div class="a c">测试2</div>
```
多个规则之间使用空格分开，并且只有class能同时使用多个规则，id不可以
如何让某个元素充满整个页面？
方法：
```css
html,body{height:100%;margin:0;}
#test{height:100%;}
```
如何让某个元素距离窗口上右下左4边各10像素？
方法：
```css
html,body{height:100%;margin:0;}
html{_padding:10px;}
#test{position:absolute;top:10px;right:10px;bottom:10px;left:10px;_position:static;_height:100%;}
```
如何去掉超链接的虚线框？
方法：
```css
a{outline:none;}
```
IE7及更早浏览器由于不支持outline属性，需要通过js的blur()方法来实现，如<a onfocus="this.blur();"...
如何容器透明，内容不透明？
方法1：
``` css
.outer{width:200px;height:200px;background:#000;filter:alpha(opacity=20);opacity:.2;}
.inner{width:200px;height:200px;margin-top:-200px;}
```
``` html
<div class="outer"><!--我是透明的容器--></div>
<div class="inner">我是不透明的内容</div>
```
原理是容器层与内容层并级，容器层设置透明度，内容层通过负margin或者position绝对定位等方式覆盖到容器层上
方法2：
```css
.outer{width:200px;height:200px;background:rgba(0,0,0,.2);background:#000\9;filter:alpha(opacity=20)\9;}
.outer .inner{position:relative\9;}
```
```html
<div class="outer">
    <div class="inner">我是不透明的内容</div>
</div>
```
高级浏览器直接使用rgba颜色值实现；IE浏览器在定义容器透明的同时，让子节点相对定位，也可达到效果
如何让整个页面水平居中？
方法：
```css
body{text-align:center;}
#test2{width:960px;margin:0 auto;text-align:left;}
```
定义body的text-align值为center将使得IE5.5也能实现居中
为什么容器的背景色没显示出来？为什么容器无法自适应内容高度？
方法：
清除浮动，方法请参考本页第9条
通常出现这样的情况都是由于没有清除浮动而引起的，所以Debug时应第一时间想到是否有未清除浮动的地方
如何做1像素细边框的table？
方法1：
```css
#test{border-collapse:collapse;border:1px solid #ddd;}
#test th,#test td{border:1px solid #ddd;}
```
```html
<table id="test">
    <tr><th>姓名</th><td>Joy Du</td></tr>
    <tr><th>年龄</th><td>26</td></tr>
</table>
```
方法2：
```css
#test{border-spacing:1px;background:#ddd;}
#test tr{background:#fff;}
```
```html
<table id="test" cellspacing="1">
    <tr><th>姓名</th><td>Joy Du</td></tr>
    <tr><th>年龄</th><td>26</td></tr>
</table>
```
IE7及更早浏览器不支持border-spacing属性，但是可以通过table的标签属性cellspacing来替代。
如何使页面文本行距始终保持为n倍字体大小的基调？
方法：
```css
body{line-height:n;}
```
注意，不要给n加单位。Know More：如何使页面文本行距始终保持为n倍字体大小的基调
标准模式Standard mode和怪异模式Quirks mode下的盒模型区别？
方法：
标准模式下：Element width = width + padding + border
怪异模式下：Element width = width
相关资料请参阅CSS3属性box-sizing
以图换字的几种方法及优劣分析
思路1：使用text-indent的负值，将内容移出容器
```css
.test1{width:200px;height:50px;text-indent:-9999px;background:#eee url(*.png) no-repeat;}
```
``` html
<div class="test">以图换字之内容负缩进法</div>
```
该方法优点在于结构简洁，不理想的地方：1.由于使用场景不同，负缩进的值可能会不一样，不易抽象成公用样式；2.当该元素为链接时，在非IE下虚线框将变得不完整；3.如果该元素被定义为内联级或者内联块级，不同浏览器下会有较多的差异

思路2：使用display:none或visibility:hidden将内容隐藏；
```css
.test{width:200px;height:50px;background:#eee url(*.png) no-repeat;}
.test span{visibility:hidden;/* 或者display:none */}
```
``` html
<div class="test"><span>以图换字之内容隐藏法</span></div>
```
该方法优点在于兼容性强并且容易抽象成公用样式，缺点在于结构较复杂
思路3：使用padding或者line-height将内容挤出容器之外；
```css
.test{overflow:hidden;width:200px;height:0;padding-top:50px;background:#eee url(*.png) no-repeat;}
.test{overflow:hidden;width:200px;height:50px;line-height:50;background:#eee url(*.jpg) no-repeat;}
```
``` html
<div class="test">以图换字之内容排挤法</div>
```
该方法优点在于结构简洁，缺点在于：1.由于使用场景不同，padding或line-height的值可能会不一样，不易抽象成公用样式；2.要兼容IE5.5及更早浏览器还得hack
思路4：使用超小字体和文本全透明法；
```css
.test{overflow:hidden;width:200px;height:50px;font-size:0;line-height:0;color:rgba(0,0,0,0);background:#eee url(*.png) no-repeat;}
```
```html
<div class="test">以图换字之超小字体+文本全透明法</div>
```
该方法结构简单易用，推荐使用
为什么2个相邻div的margin只有1个生效？
方法：
```css
.box1{margin:10px 0;}
.box2{margin:20px 0;}
```
``` html
<div class="box1">box1</div>
<div class="box2">box2</div>
```
本例中box1的底部margin为10px，box2的顶部margin为20px，但表现在页面上2者之间的间隔为20px，而不是预想中的10+20px=30px，结果是选择2者之间最大的那个margin，我们把这种机制称之为“外边距合并”；外边距合并不仅仅出现在相邻的元素间，父子间同样会出现。
简单列举几点注意事项: 
　外边距合并只出现在块级元素上； 
　浮动元素不会和相邻的元素产生外边距合并； 
　绝对定位元素不会和相邻的元素产生外边距合并； 
　内联块级元素间不会产生外边距合并； 
　根元素间不会不会产生外边距合并（如html与body间）； 
　设置了属性overflow且值不为visible的块级元素不会与它的子元素发生外边距合并；
如何在文本框中禁用中文输入法？
方法：
```css
input,textarea{ime-mode:disabled;}
```
ime-mode为非标准属性，写该文档时只有IE和Firefox支持
如何解决列表中list-style-image不能精准定位的问题？
方法：
不使用list-style-image来定义列表项目标记符号，而用background-image来代替，并通过background-position来进行定位
如何解决伪对象:before和:after在input标签上的怪异表现的问题？
现象：
在编写本条目时，除了Opera，在所有浏览器下input标签使用伪对象:before和:after都没有效果，即使Opera的表现也同样令人诧异。大家可以试玩一下。浏览器版本：IE6-IE10, Firefox6.0, Chrome13.0, Safari5.1, Opera11.51
如何解决伪对象:before和:after无法在Chrome,Safari,Opera上定义过渡和动画的问题？
现象：
在编写本条目时，除了Firefox，在所有浏览器下伪对象:before和:after无法定义过渡和动画效果。浏览器版本：IE6-IE10, Firefox6.0, Chrome13.0, Safari5.1, Opera11.51。如果这个过渡或动画效果是必须，可以考虑使用真实对象。
- 会触发BFC的条件有：
    float：left|right
    position：absolute|fixed
    display: table-cell|table-caption|inline-block
    overflow: hidden|scroll|auto
    根元素。 
- HasLayout触发：
    width: 除auto之外的值
    height: 除auto之外的值
    float: left|right
    position: absolute
    display: inline-block
    writing-mode: tb-rl(IE)
    zoom: 除normal之外的值
    min-height: 任意值
    max-height: 除 “none” 之外的任意值
    min-width: 任意值
    max-width: 除 “none” 之外的任意值
    overflow: hidden|scroll|auto
    overflow-x: hidden|scroll|auto
    overflow-y: hidden|scroll|auto
    position: fixed
- 行内元素的margin-top margin-bottom padding-top padding-bottom 不起作用，但对行内替换元素起作用，例如：img input
- CSS 和 HTML都不区分大小写
- getComputedStyle(), 或 currentStyle   BackCompat 和 CSS1Compat
- css居中的方式
实现div的水平居中和垂直居中
1.适用: 确定宽高; 使用position,相对父元素做绝对定位(设置百分比[由父元素宽高调节子元素大小]/设置margin和相对位置(确定宽高))
设置position: absolute(父元素记得设置: relative), 然后top和left设置50%, 50%, 再设置margin-left=宽/2, margin-top:宽/2
2.只适用: 固定宽高; 如果宽高随意,想靠内部撑开的话, 会占满整个父div 
依然是利用position：子div的上下左右都设置成0，然后margin设置auto。关键是要设置position：子absolute，父relative。
3.适用: 不论是否固定宽高都可用. 问题在于兼容性. ie9及以下不支持
设置父级flex属性: display:flex; justify-content:center; align-items: center; 
这种方法在子级div有多个时也可以实现居中----具体看flex属性设置
4.适用: 要设宽度, 否则会使得宽度为父级div的宽度
父级元素设置display:table-cell ，然后vertical-align：middle。这种方法可以设置垂直居中. 这时候只要在子元素里设置margin:auto即可实现水平居中
但是这种方法好像会使父元素的居中无效。
5.适用: 可不指定宽高
使用transform居中. 设置父级position:relative; 子级position:absolute. 然后top: 50%; left:50%; transform:translate(-50%,-50%)
6.适用: 指定宽高百分比
保证left和right的百分数一样就可以实现水平居中，保证top和bottom的百分数一样就可以实现垂直居中。但是这种方法不能由内部元素自动调节div的宽高，而是通过父元素大小控制的
7.使用display:inline-block加伪元素
box 容器通过 after或者before 生成一个高度 100% 的「备胎」，他的高度和容器的高度是一致的，相对于「备胎」垂直居中，在视觉上表现出来也就是相对于容器垂直居中了
多元素水平居中
1) 把子级div设置成display:inline-block; 然后父级div设置text-align:center;
2) 更方便灵活的做法还是使用flex-box, 设置水平居中 justify-content: center

- 什么是无样式内容闪烁?如何避免?
what?
如果使用import方法对CSS进行导入,会导致某些页面在Windows 下的Internet Explorer出现一些奇怪的现象:以无样式显示页面内容的瞬间闪烁,这种现象称之为文档样式短暂失效(Flash of Unstyled Content),简称为FOUC。
why?
使用import导入样式表
将样式表放在页面底部
有几个样式表,放在页面不同位置
原因即:当样式表晚于结构性html加载，当加载到此样式表时，页面将停止之前的渲染。此样式表被下载和解析后，将重新渲染页面，也就出现了短暂的花屏现象。
how?
使用LINK标签将样式表放在文档HEAD中。

- 你做的页面在哪些流览器测试过？这些浏览器的内核分别是什么?
 IE: trident内核
 Firefox：gecko内核
 Safari:webkit内核
 Opera:以前是presto内核，Opera现已改用Google Chrome的Blink内核
 Chrome:Blink(基于webkit，Google与Opera Software共同开发)

- Doctype
- 渐进增强和优雅降级
    渐进增强 progressive enhancement：针对低版本浏览器进行构建页面，保证最基本的功能，然后再针对高级浏览器进行效果、交互等改进和追加功能达到更好的用户体验。
    优雅降级 graceful degradation：一开始就构建完整的功能，然后再针对低版本浏览器进行兼容。
    区别：优雅降级是从复杂的现状开始，并试图减少用户体验的供给，而渐进增强则是从一个非常基础的，能够起作用的版本开始，并不断扩充，以适应未来环境的需要。降级（功能衰减）意味着往回看；而渐进增强则意味着朝前看，同时保证其根基处于安全地带。
    “优雅降级”观点
    “优雅降级”观点认为应该针对那些最高级、最完善的浏览器来设计网站。而将那些被认为“过时”或有功能缺失的浏览器下的测试工作安排在开发周期的最后阶段，并把测试对象限定为主流浏览器（如 IE、Mozilla 等）的前一个版本。
    在这种设计范例下，旧版的浏览器被认为仅能提供“简陋却无妨 (poor, but passable)” 的浏览体验。你可以做一些小的调整来适应某个特定的浏览器。但由于它们并非我们所关注的焦点，因此除了修复较大的错误之外，其它的差异将被直接忽略。
    “渐进增强”观点
    “渐进增强”观点则认为应关注于内容本身。
    内容是我们建立网站的诱因。有的网站展示它，有的则收集它，有的寻求，有的操作，还有的网站甚至会包含以上的种种，但相同点是它们全都涉及到内容。这使得“渐进增强”成为一种更为合理的设计范例。这也是它立即被 Yahoo! 所采纳并用以构建其“分级式浏览器支持 (Graded Browser Support)”策略的原因所在。
    那么问题了。现在产品经理看到IE6,7,8网页效果相对高版本现代浏览器少了很多圆角，阴影（CSS3），要求兼容（使用图片背景，放弃CSS3），你会如何说服他？

- cookies，sessionStorage和localStorage
- 简述一下src与href的区别
    src用于替换当前元素，href用于在当前文档和引用资源之间确立联系。

- 网页制作会用到的图片格式 
    png-8，png-24，jpeg，gif，svg, Webp, Apng

- 图片懒加载
- CSS3图片轮播
- CSS选择器优先级
- css中可以让文字在垂直和水平方向上重叠的两个属性是什么？
    答案：
    垂直方向：line-height
    水平方向：letter-spacing

- 

