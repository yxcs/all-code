---
title: js的基础知识
categories: 技术
author: keqi
date: 2017-06-15 16:03:09
tags: JS
keywords: js基础 基础知识
description: 整理一下js的基础知识，增加记忆
photos:
comments: true
---
## 1.数据类型
### 1.基本类型
字符串、数字、布尔、Null、Undefined
### 2.引用类型
对象

## 2.数组
### 1.属性
- constructor  
- length  
- prototype  

### 2.方法
- concat()	            连接两个或更多的数组，并返回结果
- join()	            把数组的所有元素放入一个字符串。元素通过指定的分隔符进行分隔
- pop()	                删除并返回数组的最后一个元素
- push()	            向数组的末尾添加一个或更多元素，并返回新的长度
- reverse()	            颠倒数组中元素的顺序
- shift()	            删除并返回数组的第一个元素
- slice(start,end)	    从某个已有的数组返回选定的元素
- sort()	            对数组的元素进行排序
- splice(start,len,..)  删除元素，并向数组添加新元素
- toSource()	        返回该对象的源代码。
- toString()	        把数组转换为字符串，并返回结果
- toLocaleString()	    把数组转换为本地数组，并返回结果
- unshift()	            向数组的开头添加一个或更多元素，并返回新的长度
- valueOf()	            返回数组对象的原始值

- Array.isArray()
- indexOf()
- lastIndexOf()
- every()
- filter()
- some() 
- forEach() 
- map()
- reduce()
- reduceRight()

## 3.日期
### 1.属性
- constructor	返回对创建此对象的 Date 函数的引用
- prototype	    使您有能力向对象添加属性和方法  

### 2.方法
- Date()	                返回当日的日期和时间
- getDate()	                从 Date 对象返回一个月中的某一天 (1 ~ 31)
- getDay()	                从 Date 对象返回一周中的某一天 (0 ~ 6)
- getMonth()	            从 Date 对象返回月份 (0 ~ 11)
- getFullYear()	            从 Date 对象以四位数字返回年份
- getYear()	                请使用 getFullYear() 方法代替
- getHours()	            返回 Date 对象的小时 (0 ~ 23)
- getMinutes()	            返回 Date 对象的分钟 (0 ~ 59)
- getSeconds()	            返回 Date 对象的秒数 (0 ~ 59)
- getMilliseconds()	        返回 Date 对象的毫秒(0 ~ 999)
- getTime()	                返回 1970 年 1 月 1 日至今的毫秒数
- getTimezoneOffset()	    返回本地时间与格林威治标准时间 (GMT) 的分钟差
- getUTCDate()	            根据世界时从 Date 对象返回月中的一天 (1 ~ 31)
- getUTCDay()	            根据世界时从 Date 对象返回周中的一天 (0 ~ 6)
- getUTCMonth()	            根据世界时从 Date 对象返回月份 (0 ~ 11)
- getUTCFullYear()	        根据世界时从 Date 对象返回四位数的年份
- getUTCHours()	            根据世界时返回 Date 对象的小时 (0 ~ 23)
- getUTCMinutes()	        根据世界时返回 Date 对象的分钟 (0 ~ 59)
- getUTCSeconds()	        根据世界时返回 Date 对象的秒钟 (0 ~ 59)
- getUTCMilliseconds()	    根据世界时返回 Date 对象的毫秒(0 ~ 999)。
- parse()	                返回1970年1月1日午夜到指定日期（字符串）的毫秒数
- setDate()	                设置 Date 对象中月的某一天 (1 ~ 31)
- setMonth()	            设置 Date 对象中月份 (0 ~ 11)
- setFullYear()	            设置 Date 对象中的年份（四位数字）
- setYear()	                请使用 setFullYear() 方法代替
- setHours()	            设置 Date 对象中的小时 (0 ~ 23)
- setMinutes()	            设置 Date 对象中的分钟 (0 ~ 59)
- setSeconds()	            设置 Date 对象中的秒钟 (0 ~ 59)
- setMilliseconds()	        设置 Date 对象中的毫秒 (0 ~ 999)
- setTime()	                以毫秒设置 Date 对象
- setUTCDate()	            根据世界时设置 Date 对象中月份的一天 (1 ~ 31)
- setUTCMonth()	            根据世界时设置 Date 对象中的月份 (0 ~ 11)
- setUTCFullYear()	        根据世界时设置 Date 对象中的年份（四位数字）
- setUTCHours()	            根据世界时设置 Date 对象中的小时 (0 ~ 23)
- setUTCMinutes()	        根据世界时设置 Date 对象中的分钟 (0 ~ 59)
- setUTCSeconds()	        根据世界时设置 Date 对象中的秒钟 (0 ~ 59)
- setUTCMilliseconds()	    根据世界时设置 Date 对象中的毫秒 (0 ~ 999)
- toSource()	            返回该对象的源代码
- toString()	            把 Date 对象转换为字符串
- toTimeString()	        把 Date 对象的时间部分转换为字符串
- toDateString()	        把 Date 对象的日期部分转换为字符串
- toGMTString()	            请使用 toUTCString() 方法代替
- toUTCString()	            根据世界时，把 Date 对象转换为字符串
- toLocaleString()	        根据本地时间格式，把 Date 对象转换为字符串
- toLocaleTimeString()	    根据本地时间格式，把 Date 对象的时间部分转换为字符串
- toLocaleDateString()	    根据本地时间格式，把 Date 对象的日期部分转换为字符串
- UTC()	                    根据世界时返回 1970 年 1 月 1 日 到指定日期的毫秒数
- valueOf()	                返回 Date 对象的原始值

- Date.now()
- toDateString()
- toTimeString()
- toLocaleDateString()
- toLocaleTimeString()
- toUTCString()

## 4.Math对象
### 1.属性
- E	        返回算术常量 e，即自然对数的底数（约等于2.718）
- LN2	    返回 2 的自然对数（约等于0.693）
- LN10	    返回 10 的自然对数（约等于2.302）
- LOG2E	    返回以 2 为底的 e 的对数（约等于 1.414）
- LOG10E	返回以 10 为底的 e 的对数（约等于0.434）
- PI	    返回圆周率（约等于3.14159）
- SQRT1_2	返回返回 2 的平方根的倒数（约等于 0.707）
- SQRT2	    返回 2 的平方根（约等于 1.414）   

### 2.方法
- abs(x)	    返回数的绝对值
- acos(x)	    返回数的反余弦值
- asin(x)	    返回数的反正弦值
- atan(x)	    以介于 -PI/2 与 PI/2 弧度之间的数值来返回 x 的反正切值
- atan2(y,x)	返回从 x 轴到点 (x,y) 的角度（介于 -PI/2 与 PI/2 弧度之间）
- ceil(x)	    对数进行上舍入
- cos(x)	    返回数的余弦
- exp(x)	    返回 e 的指数
- floor(x)	    对数进行下舍入
- log(x)	    返回数的自然对数（底为e）
- max(x,y)	    返回 x 和 y 中的最高值
- min(x,y)	    返回 x 和 y 中的最低值
- pow(x,y)	    返回 x 的 y 次幂
- random()	    返回 0 ~ 1 之间的随机数
- round(x)	    把数四舍五入为最接近的整数
- sin(x)	    返回数的正弦
- sqrt(x)	    返回数的平方根
- tan(x)	    返回角的正切
- toSource()	返回该对象的源代码
- valueOf() 	返回 Math 对象的原始值

## 5.Number 对象
### 1.属性
- constructor	    返回对创建此对象的 Number 函数的引用
- MAX_VALUE	        可表示的最大的数
- MIN_VALUE	        可表示的最小的数
- NaN	            非数字值
- NEGATIVE_INFINITY	负无穷大，溢出时返回该值
- POSITIVE_INFINITY	正无穷大，溢出时返回该值
- prototype	        使您有能力向对象添加属性和方法  

### 2.方法
- toString	        把数字转换为字符串，使用指定的基数
- toLocaleString	把数字转换为字符串，使用本地数字格式顺序
- toFixed	        把数字转换为字符串，结果的小数点后有指定位数的数字
- toExponential	    把对象的值转换为指数计数法
- toPrecision	    把数字格式化为指定的长度
- valueOf	        返回一个 Number 对象的基本数字值

## 6.String 对象
### 1.属性
- constructor	对创建该对象的函数的引用
- length	    字符串的长度
- prototype	    允许您向对象添加属性和方法

### 2.方法
- anchor()      	    创建 HTML 锚
- big()	                用大号字体显示字符串
- blink()	            显示闪动字符串
- bold()	            使用粗体显示字符串
- charAt()	            返回在指定位置的字符
- charCodeAt()	        返回在指定的位置的字符的 Unicode 编码
- concat()	            连接字符串
- fixed()	            以打字机文本显示字符串
- fontcolor()	        使用指定的颜色来显示字符串
- fontsize()	        使用指定的尺寸来显示字符串
- fromCharCode()	    从字符编码创建一个字符串
- indexOf()	            检索字符串
- italics()	            使用斜体显示字符串
- lastIndexOf()	        从后向前搜索字符串
- link()	            将字符串显示为链接
- localeCompare()	    用本地特定的顺序来比较两个字符串
- match()	            找到一个或多个正则表达式的匹配
- replace()	            替换与正则表达式匹配的子串
- search()	            检索与正则表达式相匹配的值
- slice()	            提取字符串的片断，并在新的字符串中返回被提取的部分
- small()	            使用小字号来显示字符串
- split()	            把字符串分割为字符串数组
- strike()	            使用删除线来显示字符串
- sub()	                把字符串显示为下标
- substr()	            从起始索引号提取字符串中指定数目的字符
- substring()	        提取字符串中两个指定的索引号之间的字符
- sup()	                把字符串显示为上标
- toLocaleLowerCase()	把字符串转换为小写
- toLocaleUpperCase()	把字符串转换为大写
- toLowerCase()	        把字符串转换为小写
- toUpperCase()	        把字符串转换为大写
- toSource()	        代表对象的源代码
- toString()	        返回字符串
- valueOf()	            返回某个字符串对象的原始值

- trim()
- fromCharCode()

## 7.正则表达式
### 1.修饰符
- i	    执行对大小写不敏感的匹配
- g	    执行全局匹配（查找所有匹配而非在找到第一个匹配后停止）
- m	    执行多行匹配  

### 2.方括号
- [abc]	    查找方括号之间的任何字符
- [^abc]	查找任何不在方括号之间的字符
- [0-9]	    查找任何从 0 至 9 的数字
- [a-z]	    查找任何从小写 a 到小写 z 的字符
- [A-Z]	    查找任何从大写 A 到大写 Z 的字符
- [A-z]	    查找任何从大写 A 到小写 z 的字符
- [adgk]	查找给定集合内的任何字符
- [^adgk]	查找给定集合外的任何字符
- (red|blue|green)	查找任何指定的选项  

### 3.元字符
- .	查找单个字符，除了换行和行结束符
- \w	    查找单词字符
- \W	    查找非单词字符
- \d	    查找数字
- \D	    查找非数字字符
- \s	    查找空白字符
- \S	    查找非空白字符
- \b	    匹配单词边界
- \B	    匹配非单词边界
- \0	    查找 NUL 字符
- \n	    查找换行符
- \f	    查找换页符
- \r	    查找回车符
- \t	    查找制表符
- \v	    查找垂直制表符
- \xxx	    查找以八进制数 xxx 规定的字符
- \xdd	    查找以十六进制数 dd 规定的字符
- \uxxxx	查找以十六进制数 xxxx 规定的 Unicode 字符

### 4.量词
- n+	    匹配任何包含至少一个 n 的字符串
- n*	    匹配任何包含零个或多个 n 的字符串
- n?	    匹配任何包含零个或一个 n 的字符串
- n{X}	    匹配包含 X 个 n 的序列的字符串
- n{X,Y}	匹配包含 X 至 Y 个 n 的序列的字符串
- n{X,}	    匹配包含至少 X 个 n 的序列的字符串
- n$	    匹配任何结尾为 n 的字符串
- ^n	    匹配任何开头为 n 的字符串
- ?=n	    匹配任何其后紧接指定字符串 n 的字符串
- ?!n	    匹配任何其后没有紧接指定字符串 n 的字符串 

### 5.属性
- global	    RegExp 对象是否具有标志 
- ignoreCase	RegExp 对象是否具有标志 i
- lastIndex	    一个整数，标示开始下一次匹配的字符位置
- multiline	    RegExp 对象是否具有标志 m
- source	    正则表达式的源文本

### 6.方法
- compile	编译正则表达式
- exec	    检索字符串中指定的值。返回找到的值，并确定其位置
- test	    检索字符串中指定的值。返回 true 或 false

### 7.支持正则表达式的 String 对象的方法
- search	检索与正则表达式相匹配的值
- match	    找到一个或多个正则表达式的匹配
- replace	替换与正则表达式匹配的子串
- split	    把字符串分割为字符串数组

## 8.全局对象
### 1.全局函数
- decodeURI()	        解码某个编码的 URI
- decodeURIComponent()	解码一个编码的 URI 组件
- encodeURI()	        把字符串编码为 URI
- encodeURIComponent()	把字符串编码为 URI 组件
- escape()	            对字符串进行编码
- eval()	            计算 JavaScript 字符串，并把它作为脚本代码来执行
- getClass()	        返回一个 JavaObject 的 JavaClass
- isFinite()	        检查某个值是否为有穷大的数
- isNaN()	            检查某个值是否是数字
- Number()	            把对象的值转换为数字
- parseFloat()      	解析一个字符串并返回一个浮点数
- parseInt()	        解析一个字符串并返回一个整数
- String()	            把对象的值转换为字符串
- unescape()	        对由 escape() 编码的字符串进行解码 

### 2.全局属性
- Infinity	代表正的无穷大的数值
- java	    代表 java.* 包层级的一个 JavaPackage
- NaN	    指示某个值是不是数字值
- Packages	根 JavaPackage 对象
- undefined	指示未定义的值

## 9.JavaScript 事件参考
- onabort	    图像加载被中断
- onblur	    元素失去焦点
- onchange	    用户改变域的内容
- onclick	    鼠标点击某个对象
- ondblclick	鼠标双击某个对象
- onerror	    当加载文档或图像时发生某个错误
- onfocus	    元素获得焦点
- onkeydown	    某个键盘的键被按下
- onkeypress	某个键盘的键被按下或按住
- onkeyup	    某个键盘的键被松开
- onload	    某个页面或图像被完成加载
- onmousedown	某个鼠标按键被按下
- onmousemove	鼠标被移动
- onmouseout	鼠标从某元素移开
- onmouseover	鼠标被移到某元素之上
- onmouseup	    某个鼠标按键被松开
- onreset	    重置按钮被点击
- onresize	    窗口或框架被调整尺寸
- onselect	    文本被选定
- onsubmit	    提交按钮被点击
- onunload	    用户退出页面

## 10.BOM对象
### 1.Window
#### 1.1Window 对象集合
- frames[]	返回窗口中所有命名的框架。该集合是 Window 对象的数组，每个 Window 对象在窗口中含有一个框架或 < iframe\>。属性 frames.length 存放数组 frames[] 中含有的元素个数。注意，frames[] 数组中引用的框架可能还包括框架，它们自己也具有 frames[] 数组 

####  1.2Window 对象属性
- closed	    返回窗口是否已被关闭
- defaultStatus	设置或返回窗口状态栏中的默认文本
- document	    对 Document 对象的只读引用。请参阅 Document 对象
- history	    对 History 对象的只读引用。请参数 History 对象
- innerheight	返回窗口的文档显示区的高度
- innerwidth	返回窗口的文档显示区的宽度
- length	    设置或返回窗口中的框架数量
- location	    用于窗口或框架的 Location 对象。请参阅 Location 对象
- name	        设置或返回窗口的名称
- Navigator	    对 Navigator 对象的只读引用。请参数 Navigator 对象
- opener	    返回对创建此窗口的窗口的引用
- outerheight	返回窗口的外部高度
- outerwidth	返回窗口的外部宽度
- pageXOffset	设置或返回当前页面相对于窗口显示区左上角的 X 位置
- pageYOffset	设置或返回当前页面相对于窗口显示区左上角的 Y 位置
- parent	    返回父窗口
- Screen	    对 Screen 对象的只读引用。请参数 Screen 对象
- self	        返回对当前窗口的引用。等价于 Window 属性
- status	    设置窗口状态栏的文本
- top	        返回最顶层的先辈窗口
- window	    window 属性等价于 self 属性，它包含了对窗口自身的引用
- screenLeft
- screenTop
- screenX
- screenY       只读整数。声明了窗口的左上角在屏幕上的的 x 坐标和 y 坐标。IE、Safari 和 Opera 支持 screenLeft 和 screenTop，而 Firefox 和 Safari 支持 screenX 和 screenY 

#### 1.3Window 对象方法
- alert()	        显示带有一段消息和一个确认按钮的警告框
- blur()	        把键盘焦点从顶层窗口移开
- clearInterval()	取消由 setInterval() 设置的 timeout
- clearTimeout()	取消由 setTimeout() 方法设置的 timeout
- close()	        关闭浏览器窗口
- confirm()	        显示带有一段消息以及确认按钮和取消按钮的对话框
- createPopup()	    创建一个 pop-up 窗口
- focus()	        把键盘焦点给予一个窗口
- moveBy()	        可相对窗口的当前坐标把它移动指定的像素
- moveTo()	        把窗口的左上角移动到一个指定的坐标
- open()	        打开一个新的浏览器窗口或查找一个已命名的窗口
- print()	        打印当前窗口的内容
- prompt()	        显示可提示用户输入的对话框
- resizeBy()	    按照指定的像素调整窗口的大小
- resizeTo()	    把窗口的大小调整到指定的宽度和高度
- scrollBy()	    按照指定的像素值来滚动内容
- scrollTo()	    把内容滚动到指定的坐标
- setInterval()	    按照指定的周期（以毫秒计）来调用函数或计算表达式
- setTimeout()	    在指定的毫秒数后调用函数或计算表达式

### 2.Navigator 对象
#### 2.1Navigator 对象集合
- plugins[]	    返回对文档中所有嵌入式对象的引用。该集合是一个 Plugin 对象的数组，其中的元素代表浏览器已经安装的插件。Plug-in 对象提供的是有关插件的信息，其中包括它所支持的 MIME 类型的列表。虽然 plugins[] 数组是由 IE 4 定义的，但是在 IE 4 中它却总是空的，因为 IE 4 不支持插件和 Plugin 对象

#### 2.2Navigator 对象属性
- appCodeName	    返回浏览器的代码名
- appMinorVersion	返回浏览器的次级版本
- appName	        返回浏览器的名称
- appVersion	    返回浏览器的平台和版本信息
- browserLanguage	返回当前浏览器的语言
- cookieEnabled	    返回指明浏览器中是否启用 cookie 的布尔值
- cpuClass	        返回浏览器系统的 CPU 等级
- onLine	        返回指明系统是否处于脱机模式的布尔值
- platform	        返回运行浏览器的操作系统平台
- systemLanguage	返回 OS 使用的默认语言
- userAgent	        返回由客户机发送服务器的 user-agent 头部的值
- userLanguage	    返回 OS 的自然语言设置  

#### 2.3Navigator 对象方法
- javaEnabled()	    规定浏览器是否启用 Java
- taintEnabled()	规定浏览器是否启用数据污点 (data tainting)

### 3.Screen 对象
- availHeight	        返回显示屏幕的高度 (除 Windows 任务栏之外)
- availWidth	        返回显示屏幕的宽度 (除 Windows 任务栏之外)
- bufferDepth	        设置或返回调色板的比特深度
- colorDepth	        返回目标设备或缓冲器上的调色板的比特深度
- deviceXDPI	        返回显示屏幕的每英寸水平点数
- deviceYDPI	        返回显示屏幕的每英寸垂直点数
- fontSmoothingEnabled	返回用户是否在显示控制面板中启用了字体平滑
- height	            返回显示屏幕的高度
- logicalXDPI	        返回显示屏幕每英寸的水平方向的常规点数
- logicalYDPI	        返回显示屏幕每英寸的垂直方向的常规点数
- pixelDepth	        返回显示屏幕的颜色分辨率（比特每像素）
- updateInterval	    设置或返回屏幕的刷新率
- width	                返回显示器屏幕的宽度

### 4.History 对象
#### 4.1.History 对象属性
- length	返回浏览器历史列表中的 URL 数量 

#### 4.2History 对象方法
- back()	加载 history 列表中的前一个 URL
- forward()	加载 history 列表中的下一个 URL
- go()	    加载 history 列表中的某个具体页面

### 5.Location 对象
#### 5.1.Location 对象属性
- hash	    设置或返回从井号 (#) 开始的 URL（锚）
- host	    设置或返回主机名和当前 URL 的端口号
- hostname	设置或返回当前 URL 的主机名
- href	    设置或返回完整的 URL
- pathname	设置或返回当前 URL 的路径部分
- port	    设置或返回当前 URL 的端口号
- protocol	设置或返回当前 URL 的协议
- search	设置或返回从问号 (?) 开始的 URL（查询部分）

#### 5.2.Location 对象方法
- assign()	加载新的文档。
- reload()	重新加载当前文档。
- replace()	用新的文档替换当前文档。

## 11.DOM 对象
### 1.HTML DOM Document 对象
#### 1.1Document 对象集合
- all[]	    提供对文档中所有 HTML 元素的访问
- anchors[]	返回对文档中所有 Anchor 对象的引用
- applets	返回对文档中所有 Applet 对象的引用
- forms[]	返回对文档中所有 Form 对象引用
- images[]	返回对文档中所有 Image 对象引用
- links[]	返回对文档中所有 Area 和 Link 对象引用

#### 1.2Document 对象属性
- body	        提供对 < body> 元素的直接访问。对于定义了框架集的文档，该属性引用最外层的 < frameset>
- cookie	    设置或返回与当前文档有关的所有 cookie
- domain	    返回当前文档的域名
- lastModified	返回文档被最后修改的日期和时间
- referrer	    返回载入当前文档的文档的 URL
- title	        返回当前文档的标题
- URL	        返回当前文档的 URL

#### 1.3Document 对象方法
- close()	                关闭用 <code>document.open()</code> 方法打开的输出流，并显示选定的数据
- getElementById()	        返回对拥有指定 id 的第一个对象的引用
- getElementsByName()	    返回带有指定名称的对象集合
- getElementsByTagName()	返回带有指定标签名的对象集合
- open()	                打开一个流，以收集来自任何 <code>document.write()</code> 或 <code>document.writeln()</code> 方法的输出
- write()	                向文档写 HTML 表达式 或 JavaScript 代码
- writeln()	                等同于 write() 方法，不同的是在每个表达式之后写一个换行符

### 2.HTML DOM Element 对象
- element.accessKey	            设置或返回元素的快捷键
- element.appendChild()	        向元素添加新的子节点，作为最后一个子节点
- element.attributes	        返回元素属性的 NamedNodeMap
- element.childNodes	        返回元素子节点的 NodeList
- element.className	            设置或返回元素的 class 属性
- element.clientHeight  	    返回元素的可见高度
- element.clientWidth	        返回元素的可见宽度
- element.cloneNode()	        克隆元素
- element.compareDocumentPosition()	比较两个元素的文档位置
- element.contentEditable	    设置或返回元素的文本方向
- element.dir	                设置或返回元素的内容是否可编辑
- element.firstChild	        返回元素的首个子
- element.getAttribute()	    返回元素节点的指定属性值
- element.getAttributeNode()	返回指定的属性节点
- element.getElementsByTagName()返回拥有指定标签名的所有子元素的集合
- element.getFeature()	        返回实现了指定特性的 API 的某个对象
- element.getUserData()	        返回关联元素上键的对象
- element.hasAttribute()	    如果元素拥有指定属性，则返回true，否则返回 false
- element.hasAttributes()	    如果元素拥有属性，则返回 true，否则返回 false
- element.hasChildNodes()	    如果元素拥有子节点，则返回 true，否则 false
- element.id	                设置或返回元素的 id
- element.innerHTML	            设置或返回元素的内容
- element.insertBefore()	    在指定的已有的子节点之前插入新节点
- element.isContentEditable	    设置或返回元素的内容
- element.isDefaultNamespace()	如果指定的 namespaceURI 是默认的，则返回 true，否则返回 false
- element.isEqualNode()	        检查两个元素是否相等
- element.isSameNode()	        检查两个元素是否是相同的节点
- element.isSupported()	        如果元素支持指定特性，则返回 true
- element.lang	                设置或返回元素的语言代码
- element.lastChild	            返回元素的最后一个子元素
- element.namespaceURI	        返回元素的 namespace URI
- element.nextSibling	        返回位于相同节点树层级的下一个节点
- element.nodeName	            返回元素的名称
- element.nodeType	            返回元素的节点类型
- element.nodeValue	            设置或返回元素值
- element.normalize()	        合并元素中相邻的文本节点，并移除空的文本节点
- element.offsetHeight	        返回元素的高度
- element.offsetWidth	        返回元素的宽度
- element.offsetLeft	        返回元素的水平偏移位置
- element.offsetParent	        返回元素的偏移容器
- element.offsetTop	            返回元素的垂直偏移位置
- element.ownerDocument	        返回元素的根元素（文档对象）
- element.parentNode	        返回元素的父节点
- element.previousSibling	    返回位于相同节点树层级的前一个元素
- element.removeAttribute()	    从元素中移除指定属性
- element.removeAttributeNode()	移除指定的属性节点，并返回被移除的节点
- element.removeChild()	        从元素中移除子节点
- element.replaceChild()	    替换元素中的子节点
- element.scrollHeight	        返回元素的整体高度
- element.scrollLeft	        返回元素左边缘与视图之间的距离
- element.scrollTop	            返回元素上边缘与视图之间的距离
- element.scrollWidth	        返回元素的整体宽度
- element.setAttribute()	    把指定属性设置或更改为指定值
- element.setAttributeNode()	设置或更改指定属性节点
- element.setIdAttribute()	
- element.setIdAttributeNode()	
- element.setUserData()	        把对象关联到元素上的键
- element.style	                设置或返回元素的 style 属性
- element.tabIndex	            设置或返回元素的 tab 键控制次序
- element.tagName	            返回元素的标签名
- element.textContent	        设置或返回节点及其后代的文本内容
- element.title	                设置或返回元素的 title 属性
- element.toString()	        把元素转换为字符串
- nodelist.item()	            返回 NodeList 中位于指定下标的节点
- nodelist.length	            返回 NodeList 中的节点数

### 3.HTML DOM Attribute 对象
#### 3.1.属性和方法
- attr.isId	                如果属性是 id 类型，则返回 true，否则返回 false
- attr.name	                返回属性的名称
- attr.value	            设置或返回属性的值
- attr.specified	        如果已指定属性，则返回 true，否则返回 false
- nodemap.getNamedItem()	从 NamedNodeMap 返回指定的属性节点
- nodemap.item()	        返回 NamedNodeMap 中位于指定下标的节点
- nodemap.length	        返回 NamedNodeMap 中的节点数
- nodemap.removeNamedItem()	移除指定的属性节点
- nodemap.setNamedItem()	设置指定的属性节点（通过名称） 

#### 3.2.DOM 4
- attr.appendChild()	属性没有子节点
- attr.attributes	    属性没有属性
- attr.baseURI	        使用 document.baseURI 代替
- attr.childNodes	    属性没有子节点
- attr.cloneNode()	    使用 attr.value 代替
- attr.firstChild	    属性没有子节点
- attr.hasAttributes()	属性没有属性
- attr.hasChildNodes	属性没有子节点
- attr.insertBefore()	属性没有子节点
- attr.isEqualNode()	没有意义
- attr.isSameNode()	    没有意义
- attr.isSupported()	始终为 true
- attr.lastChild	    属性没有子节点
- attr.nextSibling	    属性没有同级节点
- attr.nodeName	        使用 attr.name 代替
- attr.nodeType	        始终为 2 (ATTRIBUTE_NODE)
- attr.nodeValue	    使用 attr.value 代替
- attr.normalize()	    属性无法被正常化
- attr.ownerDocument	始终是您的 HTML 文档
- attr.ownerElement	    这是您用来访问该属性的 HTML 元素
- attr.parentNode	    这是您用来访问该属性的 HTML 元素
- attr.previousSibling	属性没有同级节点
- attr.removeChild	    属性没有子节点
- attr.replaceChild	    属性没有子节点
- attr.textContent	    使用 attr.value 代替

### 4.HTML DOM Event 对象
#### 4.1.事件句柄　(Event Handlers)
- onabort	    图像的加载被中断
- onblur	    元素失去焦点
- onchange	    域的内容被改变
- onclick	    当用户点击某个对象时调用的事件句柄
- ondblclick	当用户双击某个对象时调用的事件句柄
- onerror	    在加载文档或图像时发生错误
- onfocus	    元素获得焦点
- onkeydown	    某个键盘按键被按下
- onkeypress	某个键盘按键被按下并松开
- onkeyup	    某个键盘按键被松开
- onload	    一张页面或一幅图像完成加载
- onmousedown	鼠标按钮被按下
- onmousemove	鼠标被移动
- onmouseout	鼠标从某元素移开
- onmouseover	鼠标移到某元素之上
- onmouseup	    鼠标按键被松开
- onreset	    重置按钮被点击
- onresize	    窗口或框架被重新调整大小
- onselect	    文本被选中
- onsubmit	    确认按钮被点击
- onunload	    用户退出页面 

#### 4.2.鼠标 / 键盘属性
- altKey	返回当事件被触发时，"ALT" 是否被按下
- button	返回当事件被触发时，哪个鼠标按钮被点击
- clientX	返回当事件被触发时，鼠标指针的水平坐标
- clientY	返回当事件被触发时，鼠标指针的垂直坐标
- ctrlKey	返回当事件被触发时，"CTRL" 键是否被按下
- metaKey	返回当事件被触发时，"meta" 键是否被按下
- relatedTarget	返回与事件的目标节点相关的节点
- screenX	返回当某个事件被触发时，鼠标指针的水平坐标
- screenY	返回当某个事件被触发时，鼠标指针的垂直坐标
- shiftKey	返回当事件被触发时，"SHIFT" 键是否被按下

#### 4.3.IE 属性
- cancelBubble	如果事件句柄想阻止事件传播到包容对象，必须把该属性设为 true
- fromElement	对于 mouseover 和 mouseout 事件，fromElement 引用移出鼠标的元素
- keyCode	对于 keypress 事件，该属性声明了被敲击的键生成的 Unicode 字符码。对于 keydown 和 keyup 事件，它指定了被敲击的键的虚拟键盘码。虚拟键盘码可能和使用的键盘的布局相关
- offsetX,offsetY	发生事件的地点在事件源元素的坐标系统中的 x 坐标和 y 坐标
- returnValue	如果设置了该属性，它的值比事件句柄的返回值优先级高。把这个属性设置为 fasle，可以取消发生事件的源元素的默认动作
- srcElement	对于生成事件的 Window 对象、Document 对象或 Element 对象的引用
- toElement	对于 mouseover 和 mouseout 事件，该属性引用移入鼠标的元素
- x,y	事件发生的位置的 x 坐标和 y 坐标，它们相对于用CSS动态定位的最内层包容元素

#### 4.4.标准 Event 属性
- bubbles	返回布尔值，指示事件是否是起泡事件类型
- cancelable	返回布尔值，指示事件是否可拥可取消的默认动作
- currentTarget	返回其事件监听器触发该事件的元素
- eventPhase	返回事件传播的当前阶段
- target	返回触发此事件的元素（事件的目标节点）
- timeStamp	返回事件生成的日期和时间
- type	返回当前 Event 对象表示的事件的名称

#### 4.5.标准 Event 方法
- initEvent()	初始化新创建的 Event 对象的属性
- preventDefault()	通知浏览器不要执行与事件关联的默认动作
- stopPropagation()	不再派发事件

* * *
# 详细
* * *
## 12.DOM模型
元素节点  文本节点  属性节点  
## 13.IE和标准事件
| IE            | 标准           | 说明           |
| ------------- |:-------------:| --------------:|
| altKey        | altKey        | 按下alt键为true |
| button        | button        | 按下鼠标的哪个键 |
| cancelBubble  | cancelBubble  | IE为true时取消冒泡 标准DOM为只读 |
| --            | stopPropagation() | 阻止冒泡    |
| clientX,Y     | clientX,Y     | 客户端坐标      |
| ctrlKey       | ctrlKey       |                |
| fromElement   | relatedTarget | 鼠标指针离开的元素 |
| toElement     | relatedTarget | 鼠标指针进入的元素 |
| --            | charCode      | 按下键的Unicode值 |
| keyCode       | keyCode       | 按下键盘的键值  |
| --            | detail        | 鼠标按键次数    |
| returnValue   | --            | 为false时取消默认事件 |
| --            | preventDefault() | 调用阻止默认事件 |
| screenX,Y     | screenX,Y     | 鼠标点击的屏幕坐标 |
| shiftKey      | shiftKey      |                |
| srcElement    | target        | 引起事件的元素  |
| type          | type          | 事件名称        |

## 14.弱点&难点
1. Function的 arguments callee caller call apply
2. RegExp
3. Object对象的 constructor prototype 各种模式 
4. worker
5. websocket
6. geoloaction
7. manifest
8. storage
9. webGL
10. canves
11. Ajax
12. Comet
13. 新型api
14. 移动相关的API

## 15.代码解说
### 1.迭代函数
```javascript
function a(num) {
  if(num <= 1 ) {
	eturn 1
  }else {
	return num * arguments.callee(num-1)
  }
}

console.log(a(5))
>>120
```
### 2.工厂模式
```javascript
function createPerson(name, age, job) {
  var o = new Object();
  o.name = name;
  o.age = age;
  o.job = job;
  o.sayName = function() {
    alert(this.name)
  }
  return o;
}

var p = createPerson('lili', 23, 'web')
```
### 3.构造函数模式
```javascript
function Person(name, age, job) {
  this.name = name;
  this.age = age;
  this.job = job;
  this.sayName = function() {
    alert(this.name)
  }
}

var p = new Person('lee', 23, 'Software Engineer')
```

## 16.新API
### 1.document
- compatMode 
  1. BackCompat 混杂模式
  2. CSS1Compat 标准模式
- implementation
- **createEvent**  事件模拟
- **dispactEvent** 触发事件   

### 2.DOM
- querySelector()
- querySelectorAll()
- matchsSelector()
- childElementCount
- firstElementChild
- lastElementChild
- previousElemenstSibling 
- nextElementSiblings
- activeElement
- hasFocus()
- innerHTMl
- innerText
- outerHTML
- outerText
- insertAdhacentHTML() 
  1. beforeBegin
  2. afterBegin
  3. beforeEnd
  4. afterEnd
- scrollIntoView()
- contains() 

### 3.style
- cssText
- getPropertyValue()
- getPropertyCSSValue()
- removeProperty()
- textInput
- contextmenu
- beforeunload
- readystate
- redaystatechange
- DOMContentLoaded
- pageShow
- pageHide
- hashChange

### 4.设备事件
- orientationchange
- MozOrienttation
- deviceorientation
- devicemotion
- touchstart
- touchmove
- touchend
- touchcancel

### 5.计算样式
document.defaultView.getComputedStyle(ele, null)
ele.currentStyle()
ele.getBoundingClientRect()

## 17.兼容代码
### 1.获取窗口相对于屏幕的位置
```javascript
window.screenLeft = window.screenLeft ? window.screenLeft : window.screenX
window.screenTop = window.screenTop ? window.screenTop : window.screenY
```
### 2.窗口大小
```javascript
var pageW = window.innerWidth
var pageH = window.innerHeight
if(typeof pageW != 'number') {
    if(document.compatMode == 'CSS1Compat') {
        pageW = document.documentElement.clientWidth
        pageH = document.docuemntElement.clientHeight
    }else if(document.compatMode == 'BackCompat') {
        pageW = document.body.clientWidth
        pageH = document.body.clientHeight
    }
}
```
### 3.插件检测
```javascript
!IE
function hasPlugin(name) {
    name = name.toLowerCase();
    for(var i = 0; i < navigator.plugins.length; i++) {
        if(navigator.plugins[i].name.tolowerCase().indexOf(name) > -1) {
            return true
        }
    }
    return false;
}
IE
function hasIEPlugin(name) {
    try {
        new ActiveXObject(name);
        return true;
    }catch(ex) {
        return false;
    }
}
```
### 4.跨浏览器事件
```js
var e = {
    addHandler: function(ele, type, handler) {
        if(ele.addEventListener) {
            ele.addEventListener(type, handler, false);
        }else if(ele.attachEvent) {
            ele.attachEvent('on'+type, handler)
        }else {
            ele['on'+type] = handler;
        }
    },
    removeHandler: function(ele, type, handler) {
        if(ele.aremoveEventListener) {
            ele.aremoveEventListener(type, handler, false);
        }else if(ele.detachEvent) {
            ele.detachEvent('on'+type, handler)
        }else {
            ele['on'+type] = null;
        }
    },
    getEvent: function(event) {
        return event ? event : window.event;
    },
    getTarget: function(event) {
        return event.target || event.srcElement;
    },
    preventDefault: function(event) {
        if(event.preventDefault){
            event.preventDefault();
        } else {
            event.returnValue = false;
        }
    },
    stopPropagation: function(event) {
        if(event.stopPropagetion) {
            event.stopPropagation
        }else {
            event.cancelBubble = true;
        }
    },
    getRelaatedTarget: function(event) {
        if(event.relatedTarget) {
            return event.relatedTarget;
        }else if(event.toElement) {
            return event.toElement;
        }else if(event.fromElement) {
            return even.fromElement;
        }else {
            return null;
        }
    },
    getButton: function(event) {
        if(document.implementation.hasFeature("MouseEvents", '2.0')) {
            return event.button;
        }else {
            swtich(event.button) {
                case 0:
                case 1:
                case 3:
                case 5:
                case 7:
                    return 0;
                case 2:
                    return 2;
                case 4 : 
                    return 1;
            }
        }
    },
    getCharCode: function(event) {
        if(typeof event.charCode == 'number') {
            return event.charCode;
        }else {
            return event.keyCode;
        }
    }
}
```