<h1 style='text-align: center'>复习资料总结</h1>


### Http 学习 

1. http
2. https
3. RFC

### Css 内容 

#### Css 基础 

1. Flex
2. Transform
3. Translate
4. Animation
5. Display
6. Position
7. Float
8. 盒子模型
9. BFC-hasLayout 

#### Css Hack
- **条件Hack** 
  ```html
    <!--[if <keywords>? IE <version>?]>
      HTML代码块
    <![endif]-->
  ```
  <**keywords**>
    if条件共包含6种选择方式：是否、大于、大于或等于、小于、小于或等于、非指定版本
    是否：
    指定是否IE或IE某个版本。关键字：空
    大于：
    选择大于指定版本的IE版本。关键字：gt（greater than）
    大于或等于：
    选择大于或等于指定版本的IE版本。关键字：gte（greater than or equal）
    小于：
    选择小于指定版本的IE版本。关键字：lt（less than）
    小于或等于：
    选择小于或等于指定版本的IE版本。关键字：lte（less than or equal）
    非指定版本：
    选择除指定版本外的所有IE版本。关键字：!
  <**version**>
    目前的常用IE版本为6.0及以上，推荐酌情忽略低版本，把精力花在为使用高级浏览器的用户提供更好的体验上
    IE10及以上版本已将条件注释特性移除，使用时需注意。 

- **属性级Hack**
  1. -: IE6专有  -color
  2. !important: 非IE6   ie6下，同一个大括号里对同一个样式属性定义，其中一个加important 则important标记是被忽略的，例：{background:red!important; background:green;} ie6下解释为背景色green，其它浏览器解释为背景色red；如果这同一个样式在不同大括号里定义，其中一个加important 则important发挥正常作用，例：div{background:red!important} div{background:green}，这时所有浏览器统一解释为背景色red。）
  3. \*: IE6 IE7  *color
  4. +><: IE6 IE7  +color
  5. \9: IE6-IE8  color: red\9
  6. \0: IE8+    color: red\0
  7. \9\0: IE9+  color: red\9\0
  8. _: IE6专有  _color
  9. *+: IE7专有 \*+color
   
- **选择符级Hack**  
  1. \*class: IE6专有
  2. \*+class：IE7专有
  3. @media screen\9{...}: IE6 IE7
  4. @media \0screen {body { background: red; }}: IE8
  5. @media \0screen\,screen\9{body { background: blue; }}: IE6 IE7 IE8
  6. @media screen\0 {body { background: green; }}: IE8+
  7. @media screen and (min-width:0\0) {body { background: gray; }}: IE9+
  8. @media screen and (-ms-high-contrast: active), (-ms-high-contrast: none) {body { background: orange; }}: IE10
  9. ![css3 hack table](http://p2amrgvlp.bkt.clouddn.com/css3_hack.jpg) 
  
- **CSS3选择器结合JavaScript的Hack** 
  ```javascript
    var htmlObj = document.documentElement;
    htmlObj.setAttribute('data-useragent',navigator.userAgent);
    htmlObj.setAttribute('data-platform', navigator.platform );
  ```
  ```css
    html[data-useragent*='MSIE 10.0'] #id {
      color: #F00;
    }
  ```

- **CSS HACK 资料链接**
  1. [CSS各个浏览器Hack的写法]('./others/css/css_hack.md' "CSS各个浏览器Hack的写法") 