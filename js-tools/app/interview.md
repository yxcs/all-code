##### 主要内容
react vue 相关
webpack gulp 相关
算法
amd cmd                           X
CSS 相关                           X
原型链                             X
bind call apply 相关              X
继承 https://www.cnblogs.com/humin/p/4556820.html  --

组件设计
性能和测试


Redux 特点
web components
SSR
Flex 算法
line-height百分比和数字值的区别

pureRender  immutable

float和position absolution一起用是什么效果

line-height: 1 100% 100px
margin: 1 100% 100px

HTTP1.0 HTTP1.1 HTTP2.0  https://www.cnblogs.com/heluan/p/8620312.html  X  

HTML&CSS：  对Web标准的理解、浏览器内核差异、兼容性、hack、CSS基本功：布局、盒子模型、选择器优先级及使用、HTML5、CSS3、移动端适应。
 
JavaScript：   数据类型、面向对象、继承、闭包、插件、作用域、跨域、原型链、模块化、自定义事件、内存泄漏、事件机制、异步装载回调、模板引擎、Nodejs、JSON、ajax等。
其他：  HTTP、安全、正则、优化、重构、响应式、移动端、团队协作、可维护、SEO、UED、架构、职业生涯 

macrotask与microtask  nextTick  Event Loop

HTML&CSS：  对Web标准的理解、浏览器内核差异、兼容性、hack、CSS基本功：布局、盒子模型、选择器优先级及使用、HTML5、CSS3、移动端适应。

JavaScript：   数据类型、面向对象、继承、闭包、插件、作用域、跨域、原型链、模块化、自定义事件、内存泄漏、事件机制、异步装载回调、模板引擎、Nodejs、JSON、ajax等。

其他：  HTTP、安全、正则、优化、重构、响应式、移动端、团队协作、可维护、SEO、UED、架构、职业生涯 




# 头条面试准备
TCP
二叉树
bind call 柯里化
Ajax

什么是函数节流，为什么要使用函数节流，如何实现
描述一下JS 的new操作符具体做了什么
简述document和window两个对象区别

CSS问了经典的垂直居中，BFC，BFC条件。

模板相关 [https://www.jianshu.com/p/b56beca61bbf]

正则表达式

类型转换相关
 value	toNumber 	toString 	toBoolean 
 NaN	 NaN	 "NaN"	 false
 Infinity	 Infinity	 "Infinity"	 true
 []	 0	 '""	 true
 [1]	 1	 "1"	 true
null	0	"null"	false
undefined	NaN	"undefined"	false
{}	NaN	"[object Object]"	true
function()	NaN	"function"	true

if([]==false){console.log(1)};
if({}==false){console.log(2)};
if([]){console.log(3)}
if([1]==[1]){console.log(4)}

// 只输出1,3


算法 稳定性

就可以触发BFC：
根元素，即HTML元素
float不为none
overflow不为visible
display为inline-block、table-cell、table-caption
position的值为absolute或者fixed


getComputedStyle   currentStyle

compatMode


ToPrimitive()

------------------------------------------


类型判断
Object.prototype.toString.call([])
var a=[].slice.call(argments)
Array.prototype.slice.call(document.getElementsByTagName('div'));

你如何获取浏览器URL中查询字符串中的参数？
function showWindowHref(){
    var sHref = window.location.href;
    var args = sHref.split('?');
    if(args[0] == sHref){
        return "";
    }
    var arr = args[1].split('&');
    var obj = {};
    for(var i = 0;i< arr.length;i++){
        var arg = arr[i].split('=');
        obj[arg[0]] = arg[1];
    }
    return obj;
}

apply()/call() this

如何理解闭包  https://www.cnblogs.com/wdlhao/p/8290436.html

闭包实现 bind apply call等  arguments，add(a)(b)(c)和add(a,b,c)
Function.prototype.bind = function(ctx) {
    var fn = this;
    return function() {
        fn.apply(ctx, arguments);
    };
};


跨域
2、跨域请求资源的方法：
(1)、porxy代理

定义和用法：proxy代理用于将请求发送给后台服务器，通过服务器来发送请求，然后将请求的结果传递给前端。

实现方法：通过nginx代理；

注意点：1、如果你代理的是https协议的请求，那么你的proxy首先需要信任该证书（尤其是自定义证书）或者忽略证书检查，否则你的请求无法成功。

(2)、CORS 【Cross-Origin Resource Sharing】

定义和用法：是现代浏览器支持跨域资源请求的一种最常用的方式。

使用方法：一般需要后端人员在处理请求数据的时候，添加允许跨域的相关操作。如下：

res.writeHead(200, {
    "Content-Type": "text/html; charset=UTF-8",
    "Access-Control-Allow-Origin":'http://localhost',
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
    'Access-Control-Allow-Headers': 'X-Requested-With, Content-Type'
});
(3)、jsonp

定义和用法：通过动态插入一个script标签。浏览器对script的资源引用没有同源限制，同时资源加载到页面后会立即执行（没有阻塞的情况下）。

特点：通过情况下，通过动态创建script来读取他域的动态资源，获取的数据一般为json格式。

实例如下：

<script>
    function testjsonp(data) {
       console.log(data.name); // 获取返回的结果
    }
</script>
<script>
    var _script = document.createElement('script');
    _script.type = "text/javascript";
    _script.src = "http://localhost:8888/jsonp?callback=testjsonp";
    document.head.appendChild(_script);
</script>
缺点：

　　1、这种方式无法发送post请求（这里）

　　2、另外要确定jsonp的请求是否失败并不容易，大多数框架的实现都是结合超时时间来判定。


javascript面向对象中继承实现？
面向对象的基本特征有：封闭、继承、多态。

在JavaScript中实现继承的方法：

1. 原型链（prototype chaining）

2. call()/apply()

3. 混合方式(prototype和call()/apply()结合)

4. 对象冒充

继承的方法如下：

1、prototype原型链方式：
function teacher(name){
    this.name = name;
}
teacher.prototype.sayName = function(){
    console.log("name is "+this.name);
}
var teacher1 = new teacher("xiaoming");
teacher1.sayName();

function student(name){
    this.name = name;
}
student.prototype = new teacher()
var student1 = new student("xiaolan");
student1.sayName();
//  name is xiaoming
//  name is xiaolan
2、call()/apply()方法

function teacher(name,age){
    this.name = name;
    this.age = age;
    this.sayhi  = function(){
      alert('name:'+name+",  age:"+age);
   }
}
function student(){
  var args = arguments;
  teacher.call(this,args[0],args[1]);
  // teacher.apply(this,arguments);
}
var teacher1 = new teacher('xiaoming',23);
teacher1.sayhi();

var student1 = new student('xiaolan',12);
student1.sayhi();

// alert: name:xiaoming,  age:23
// alert: name:xiaolan,  age:12
3、混合方法【prototype,call/apply】

function teacher(name,age){
   this.name = name;
   this.age = age;
}
teacher.prototype.sayName = function(){
   console.log('name:'+this.name);
}
teacher.prototype.sayAge = function(){
   console.log('age:'+this.age);
}

function student(){
  var args = arguments;
  teacher.call(this,args[0],args[1]);
}
student.prototype = new teacher();

var student1 = new student('xiaolin',23);
student1.sayName();
student1.sayAge();
// name:xiaolin
// age:23
4、对象冒充

function Person(name,age){
   this.name = name;
   this.age = age;
   this.show = function(){
         console.log(this.name+",  "+this.age);
   }
}

function Student(name,age){ 
   this.student = Person;       //将Person类的构造函数赋值给this.student
   this.student(name,age);   //js中实际上是通过对象冒充来实现继承的
   delete this.student;           //移除对Person的引用
}

var s = new Student("小明",17);
s.show();

var p = new Person("小花",18);
p.show();
// 小明,  17
// 小花,  18

1、判断一个字符串中出现次数最多的字符，统计这个次数
var str = 'asdfssaaasasasasaa';
var json = {};
for (var i = 0; i < str.length; i++) {
    if(!json[str.charAt(i)]){
       json[str.charAt(i)] = 1;
    }else{
       json[str.charAt(i)]++;
    }
};
var iMax = 0;
var iIndex = '';
for(var i in json){
    if(json[i]>iMax){
         iMax = json[i];
         iIndex = i;
    }
}        
console.log('出现次数最多的是:'+iIndex+'出现'+iMax+'次');


2、编写一个方法 去掉一个数组的重复元素
方法一：

var arr = [0,2,3,4,4,0,2];
var obj = {};
var tmp = [];
for(var i = 0 ;i< arr.length;i++){
   if( !obj[arr[i]] ){
      obj[arr[i]] = 1;
      tmp.push(arr[i]);
   }
}
console.log(tmp);
结果如下： [0, 2, 3, 4]

 方法二：

var arr = [2,3,4,4,5,2,3,6],
   arr2 = [];
for(var i = 0;i< arr.length;i++){
    if(arr2.indexOf(arr[i]) < 0){
        arr2.push(arr[i]);
    }
}
console.log(arr2);
结果为：[2, 3, 4, 5, 6]

 方法三：

var arr = [2,3,4,4,5,2,3,6];
var arr2 = arr.filter(function(element,index,self){
return self.indexOf(element) === index;
});
console.log(arr2);




//   排序算法    sort()  大于1 换  小于1 不换
 
冒泡排序：即实现数组由小到大进行排序；思路为：每次比较相邻的两个数，如果后一个比前一个小，换位置。如果要实现由大到小排序，使用reverse()即可；

var arr = [3, 1, 4, 6, 5, 7, 2];

function bubbleSort(arr) {
    var len = arr.length;
    for (var i = len; i >= 2; --i) {
        for (var j = 0; j < i - 1; j++) {
            if (arr[j + 1] < arr[j]) {
                var temp;
                temp = arr[j];
                arr[j] = arr[j + 1];
                arr[j + 1] = temp;
            }
        }
    }
    return arr;
}

var arr2 = bubbleSort(arr); 
console.log(arr2);  // [1, 2, 3, 4, 5, 6, 7]
var arr3 = arr2.reverse();
console.log(arr3);  //  [7, 6, 5, 4, 3, 2, 1]
快速排序：

思路：采用二分法，取出中间数，数组每次和中间数比较，小的放到左边，大的放到右边。

var arr = [3, 1, 4, 6, 5, 7, 2];
function quickSort(arr) {
    if(arr.length == 0) {
        return [];  // 返回空数组
    }
    var cIndex = Math.floor(arr.length / 2);
    var c = arr.splice(cIndex, 1);
    var l = [];
    var r = [];

    for (var i = 0; i < arr.length; i++) {
        if(arr[i] < c) {
            l.push(arr[i]);
        } else {
            r.push(arr[i]);
        }
    }
    return quickSort(l).concat(c, quickSort(r));
}
console.log(quickSort(arr));
//[1, 2, 3, 4, 5, 6, 7]





jQuery的事件委托方法bind 、live、delegate、on之间有什么区别？
(1)、bind 【jQuery 1.3之前】
定义和用法：主要用于给选择到的元素上绑定特定事件类型的监听函数；

语法：bind(type,[data],function(eventObject))；

特点：

　　(1)、适用于页面元素静态绑定。只能给调用它的时候已经存在的元素绑定事件，不能给未来新增的元素绑定事件。

　　(2)、当页面加载完的时候，你才可以进行bind()，所以可能产生效率问题。

实例如下：$( "#members li a" ).bind( "click", function( e ) {} );

(2)、live 【jQuery 1.3之后】
定义和用法：主要用于给选择到的元素上绑定特定事件类型的监听函数；

语法：live(type, [data], fn);

特点：

　　(1)、live方法并没有将监听器绑定到自己(this)身上，而是绑定到了this.context上了。

　　(2)、live正是利用了事件委托机制来完成事件的监听处理，把节点的处理委托给了document，新添加的元素不必再绑定一次监听器。

　　(3)、使用live（）方法但却只能放在直接选择的元素后面，不能在层级比较深，连缀的DOM遍历方法后面使用，即$(“ul”").live...可以，但$("body").find("ul").live...不行； 

实例如下：$( document ).on( "click", "#members li a", function( e ) {} );

(3)、delegate 【jQuery 1.4.2中引入】
定义和用法：将监听事件绑定在就近的父级元素上

语法：delegate(selector,type,[data],fn)

特点：

　　(1)、选择就近的父级元素，因为事件可以更快的冒泡上去，能够在第一时间进行处理。

　　(2)、更精确的小范围使用事件代理，性能优于.live()。可以用在动态添加的元素上。

实例如下：

$("#info_table").delegate("td","click",function(){/*显示更多信息*/});

$("table").find("#info").delegate("td","click",function(){/*显示更多信息*/});

(4)、on 【1.7版本整合了之前的三种方式的新事件绑定机制】
定义和用法：将监听事件绑定到指定元素上。

语法：on(type,[selector],[data],fn)

实例如下：$("#info_table").on("click","td",function(){/*显示更多信息*/});参数的位置写法与delegate不一样。

说明：on方法是当前JQuery推荐使用的事件绑定方法，附加只运行一次就删除函数的方法是one()。

 总结：.bind(), .live(), .delegate(),.on()分别对应的相反事件为：.unbind(),.die(), .undelegate(),.off()


 7、浏览器的内核分别是什么?
IE: trident内核
Firefox：gecko内核
Safari：webkit内核
Opera：以前是presto内核，Opera现已改用Google Chrome的Blink内核
Chrome：Blink(基于webkit，Google与Opera Software共同开发)



AJAX


function serialize(data){//对发送数据的序列化
    if(!data) return '';
    var pairs=[];
    for(var name in data){
if(!data.hasOwnProperty(name)) continue;//排除嵌套对象
    if(typeof data[name]==='function') continue;//排除操作数是函数
    var value=data[name].toString();
    //encodeURIComponent对同一资源表示符（URI）编码,
    name=encodeURIComponent(name);
    valeu=encodeURIComponent(value);
    pairs.push(name+'='+value);
    }
    return pairs.join('&');
}
//get方法封装
function get(url,options,callback){
    if(window.XMLHttpRequest){
        var xhr=new XMLHttpRequest();
    }else if(window.ActiveXobject){//兼容IE7及以前版本
        var xhr=new ActiveXobject('Microft.XMLHttp');
    }
    xhr.onreadystatechange=function(callback){
     if(xhr.readyState==4){//请求结束时，readyState状态为4                            
     if((xhr.status>=200&&xhr.status<300)||xhr.status==304){
                callback(xhr.responseText);
            }else{
                console.log('连接失败:'+xhr.status);
            }
        }
    }
    // http://localhost:8000/information?name=zhou&age=18
    url=url+'?'+serialize(options);
    xhr.open('get',url,true);//开启请求，readyState状态为1
    xhr.send(null);//正式像服务器发送请求，readyState状态为2
}
//post方法封装
function post(url,options,callback){
    if(window.XMLHttpRequest){
        var xhr=new XMLHttpRequest();
    }else if(window.ActiveXobject){//兼容IE7及以前版本
        var xhr=new ActiveXobject('Microft.XMLHttp');
    }
    xhr.onreadystatechange=function(callback){
     if(xhr.readyState==4){//请求结束时，readyState状态为4
     if((xhr.status>=200&&xhr.status<300)||xhr.status==304){
                callback(xhr.responseText);
            }else{
                console.log('POST请求连接失败:'+xhr.status);
            }
        }
    }
    xhr.open('post',url,true);//开启请求，readyState状态为1
    xhr.send(serialize(options));//正式像服务器发送请求，readyState状态为2
}
post('/information',{name:'zhou',age:18},function(data){
    console.log(data);
});
get('/information',{name:'zhou',age:18},function(data){
    console.log(data);
})


写一个左中右布局占满屏幕，其中左右两块是固定宽度200 ，中间自适应宽，要求先加载中间块


BFC  清除浮动  边距重叠


25. react和vue有哪些不同，说说你对这两个框架的看法
相同点

· 都支持服务器端渲染

· 都有Virtual DOM,组件化开发,通过props参数进行父子组件数据的传递,都实现webComponent规范

· 数据驱动视图

· 都有支持native的方案,React的React native,Vue的weex

不同点

· React严格上只针对MVC的view层,Vue则是MVVM模式

· virtual DOM不一样,vue会跟踪每一个组件的依赖关系,不需要重新渲染整个组件树.而对于React而言,每当应用的状态被改变时,全部组件都会重新渲染,所以react中会需要shouldComponentUpdate这个生命周期函数方法来进行控制

· 组件写法不一样, React推荐的做法是 JSX + inline style, 也就是把HTML和CSS全都写进JavaScript了,即'all in js'; Vue推荐的做法是webpack+vue-loader的单文件组件格式,即html,css,jd写在同一个文件;

· 数据绑定: vue实现了数据的双向绑定,react数据流动是单向的

· state对象在react应用中不可变的,需要使用setState方法更新状态;在vue中,state对象不是必须的,数据由data属性在vue对象中管理




谈谈垃圾回收机制方式及内存管理

浏览器向服务器发起tcp连接，与浏览器建立tcp三次握手

js中使用new操作符做了什么事情

该步一共做了三件事：即 
   var obj  = {}; obj.__proto__ = Base.prototype; Base.call(obj);  

第一行，我们创建了一个空对象obj
第二行，我们将这个空对象的__proto__成员指向了Base函数对象prototype成员对象
第三行，我们将Base函数对象的this指针替换成obj。

(1) 创建一个新对象；
(2) 将构造函数的作用域赋给新对象（因此 this 就指向了这个新对象） ；
(3) 执行构造函数中的代码（为这个新对象添加属性） ；
(4) 返回新对象。

flex的属性

8.清除浮动的方法1）给父容器设置高度2）浮动元素结尾增加一个空的div：clear：both；3）通过伪元素设置：after{content:"",display:block;clear:both;}4）父容器overflow：hidden；5）父容器：overflow：auto；

promise方法的理解和使用   实现及原理 以及  async G 函数等
 
简述一下javascript原型链继承原理


web 安全

web  socket


webpack gulp


AMD CMD less sass


设计模式有哪些？列举你在前端开发工作中自己应用到或者了解到其他框架所用到的设计模式？
单例、工厂、观察者、适配器、代理模式


设计一个系统，实现统计网站中每个URL访问到的次数(pv)，以及访问的独立用户数(uv)，其中每个独立网页以URL为key，每个独立用户以ip为key？


列举IE与其他浏览器不一样的特性？
1、事件不同之处：

触发事件的元素被认为是目标（target）。而在 IE 中，目标包含在 event 对象的 srcElement 属性；

获取字符代码、如果按键代表一个字符（shift、ctrl、alt除外），IE 的 keyCode 会返回字符代码（Unicode），DOM 中按键的代码和字符是分离的，要获取字符代码，需要使用 charCode 属性；

阻止某个事件的默认行为，IE 中阻止某个事件的默认行为，必须将 returnValue 属性设置为 false，Mozilla 中，需要调用 preventDefault() 方法；

停止事件冒泡，IE 中阻止事件进一步冒泡，需要设置 cancelBubble 为 true，Mozzilla 中，需要调用 stopPropagation()；
2、IE支持currentStyle，FIrefox使用getComputStyle

3、IE 使用innerText，Firefox使用textContent

4、滤镜方面：IE:filter:alpha(opacity= num)；Firefox：-moz-opacity:num

5、事件方面：IE：attachEvent：火狐是addEventListener

6、鼠标位置：IE是event.clientX；火狐是event.pageX

7、IE使用event.srcElement；Firefox使用event.target`

8、IE中消除list的圆点仅需margin:0即可达到最终效果；FIrefox需要设置margin:0;padding:0以及list-style:none

9、CSS圆角：ie7以下不支持圆角




requestAnimationFrame

移动端性能优化
尽量使用css3动画，开启硬件加速。
适当使用touch事件代替click事件。
避免使用css3渐变阴影效果。
可以用transform: translateZ(0)来开启硬件加速。
不滥用Float。Float在渲染时计算量比较大，尽量减少使用
不滥用Web字体。Web字体需要下载，解析，重绘当前页面，尽量减少使用。
合理使用requestAnimationFrame动画代替setTimeout
CSS中的属性（CSS3 transitions、CSS3 3D transforms、Opacity、Canvas、WebGL、Video）会触发GPU渲染，请合理使用。过度使用会引发手机过耗电增加



如何设计突发大规模并发架构？
部分地区用户反应网站很卡，请问有哪些可能性的原因，以及解决方法？
从打开app到刷新出内容，整个过程中都发生了什么，如果感觉慢，怎么定位问题，怎么解决?
设计一个系统，实现统计网站中每个URL访问到的次数(pv)，以及访问的独立用户数(uv)，其中每个独立网页以URL为key，每个独立用户以ip为key？




浏览器原理解析


JWT


你都使用哪些工具来测试代码的性能？
Profiler, JSPerf（http://jsperf.com/nexttick-vs-setzerotimeout-vs-settimeout）, **Dromaeo**


性能优化  和  代码测试
谈谈性能优化问题
代码层面：避免使用css表达式，避免使用高级选择器，通配选择器。
缓存利用：缓存Ajax，使用CDN，使用外部js和css文件以便缓存，添加Expires头，服务端配置Etag，减少DNS查找等
请求数量：合并样式和脚本，使用css图片精灵，初始首屏之外的图片资源按需加载，静态资源延迟加载。
请求带宽：压缩文件，开启GZIP，
代码层面的优化
用hash-table来优化查找
少用全局变量
用innerHTML代替DOM操作，减少DOM操作次数，优化javascript性能
用setTimeout来避免页面失去响应
缓存DOM节点查找的结果
避免使用CSS Expression
避免全局查询
避免使用with(with会创建自己的作用域，会增加作用域链长度)
多个变量声明合并
避免图片和iFrame等的空Src。空Src会重新加载当前页面，影响速度和效率
尽量避免写在HTML标签中写Style属性
移动端性能优化
尽量使用css3动画，开启硬件加速。
适当使用touch事件代替click事件。
避免使用css3渐变阴影效果。
可以用transform: translateZ(0)来开启硬件加速。
不滥用Float。Float在渲染时计算量比较大，尽量减少使用
不滥用Web字体。Web字体需要下载，解析，重绘当前页面，尽量减少使用。
合理使用requestAnimationFrame动画代替setTimeout
CSS中的属性（CSS3 transitions、CSS3 3D transforms、Opacity、Canvas、WebGL、Video）会触发GPU渲染，请合理使用。过渡使用会引发手机过耗电增加
PC端的在移动端同样适用



defer和async

WEB应用从服务器主动推送Data到客户端有那些方式？
Javascript数据推送
Commet：基于HTTP长连接的服务器推送技术
基于WebSocket的推送方案
SSE（Server-Send Event）：服务器推送数据新方式

说说最近最流行的一些东西吧？常去哪些网站？
Node.js、Mongodb、npm、MVVM、MEAN、three.js,React 。
网站：w3cfuns,sf,hacknews,CSDN,慕课，博客园，InfoQ,w3cplus等

javascript对象的几种创建方式
1，工厂模式
2，构造函数模式
3，原型模式
4，混合构造函数和原型模式
5，动态原型模式
6，寄生构造函数模式
7，稳妥构造函数模式

javascript继承的6种方法
1，原型链继承
2，借用构造函数继承
3，组合继承(原型+借用构造)
4，原型式继承
5，寄生式继承
6，寄生组合式继承

异步加载和延迟加载
1.异步加载的方案： 动态插入script标签
2.通过ajax去获取js代码，然后通过eval执行
3.script标签上添加defer或者async属性
4.创建并插入iframe，让它异步执行js
5.延迟加载：有些 js 代码并不是页面初始化的时候就立刻需要的，而稍后的某些情况才需要的。

sql注入原理
XSS原理及防范
CSRF的防御


前端缓存  浏览器缓存


Http 2.0

OSI 七层 和  TPC/IP 5层

ES6 7 8 || Fetch



算法 和 常见笔试题


web开发中会话跟踪的方法有哪些
cookie
session
url重写
隐藏input
ip地址

谈一谈箭头函数与普通函数的区别？
函数体内的this对象，就是定义时所在的对象，而不是使用时所在的对象
不可以当作构造函数，也就是说，不可以使用new命令，否则会抛出一个错误
不可以使用arguments对象，该对象在函数体内不存在。如果要用，可以用Rest参数代替
不可以使用yield命令，因此箭头函数不能用作Generator函数


jQuery 的实现原理   和 Zepto

window.onload ==? DOMContentLoaded



移动端上什么是点击穿透?

点击穿透现象有3种：
点击穿透问题：点击蒙层（mask）上的关闭按钮，蒙层消失后发现触发了按钮下面元素的click事件跨页面点击穿透问题：如果按钮下面恰好是一个有href属性的a标签，那么页面就会发生跳转另一种跨页面点击穿透问题：这次没有mask了，直接点击页内按钮跳转至新页，然后发现新页面中对应位置元素的click事件被触发了

解决方案：
1、只用touch
最简单的解决方案，完美解决点击穿透问题
把页面内所有click全部换成touch事件（ touchstart 、’touchend’、’tap’）

2、只用click
下下策，因为会带来300ms延迟，页面内任何一个自定义交互都将增加300毫秒延迟

3、tap后延迟350ms再隐藏mask
改动最小，缺点是隐藏mask变慢了，350ms还是能感觉到慢的

4、pointer-events
比较麻烦且有缺陷， 不建议使用mask隐藏后，给按钮下面元素添上 pointer-events: none; 样式，让click穿过去，350ms后去掉这个样式，恢复响应缺陷是mask消失后的的350ms内，用户可以看到按钮下面的元素点着没反应，如果用户手速很快的话一定会发现



正则表达式



CSS hack分类


### 今日头条面经
二分法找出一个array的峰值
牛客网  排序号的链表，去掉其中重复的元素


进程间通信的方式


给你两个大小分别为n和m的有序的数组，找出这两个数组放在一起后第k大的数  归并 和 更优的解法是二分


给你很多个数字，可能有几百亿个，让你找出其中最大的1000个。经典的topK问题


js的堆栈存储

（1）、请简述一下DNS。
（2）、有听过HTTPDNS吗？


6.[不定项选择题]下列排序算法不稳定的有?

　　A.插入排序

　　B.希尔排序

　　C.冒泡排序

　　D.堆排序

　　E.归并排序

　　F.快速排序

　　G.选择排序
答案：B,D,F,G
排序算法总结：http://www.cnblogs.com/zhangxue521/p/6748085.html



防抖和节流
function throttle(method,duration){
    var  begin=new Date();
    return function(){
        var context=this, args=arguments, current=new Date();
        if(current-begin>=duration){
            method.apply(context,args);
            begin=current;
        }
    }
}

function debounce(method,delay){
    var timer=null;
    return function(){
        var context=this, args=arguments;
        clearTimeout(timer);
        timer=setTimeout(function(){
            method.apply(context,args);
        },delay);
    }
}

用过NodeJS的EventEmitter模块吗，它是怎么实现功能的，步骤是什么



### 面试总结

[前端方向、网络方向、算法方向、安全问题]

react 写一个组件
js 模拟函数重载
声明前置

var a = 1;  
if (!(b in window)) {
    var b = 0;
    a += 1;
} else {
    a += 2;
}
console.log(a)
console.log(b)

对象函数作用域
Foo.getName()  Foo().getName() 
function Foo(){
    getName = function(){
        console.log(1);
    };
    return this;
} 

Foo.getName = function(){
    console.log(2);
}

Foo.prototype.getName = function(){
    console.log(3);
}

var getName = function(){
    console.log(4);
}

function getName(){
    console.log(5);
}
Foo.getName();    // 2 
getName();        // 4
Foo().getName();  // 1
getName();        // 1
new Foo.getName();// 2
new Foo().getName(); // 3
new new Foo().getName(); // 3



浏览器缓存 Cache-control、Expires（指定具体过期日期）、Last-Modified（验证资源是否过期）
快速排序 [冒泡、选择]
手动实现bind
函数柯里化
react的优化 PureRender SSR  生命周期
css 不固定大小垂直居中对齐
一个字符串中出现最多的字母和次数
节流函数 和 防抖
js实现sleep

引用类型判断 typeof instanceOf obj.__proto__ = Obj.prototype  [].slice.call() Object.prototype.toString.call() 等等
XSS httpOnly [其他相关的安全问题]
跨域：
  域名 协议 端口
  jsonp  原理和实现方式

vue router 动态路由和获取路由参数
css 实现三角形
rem用过吗？做不同手机的适配怎么做？
event loop  [settimeout、nextTick] promise、setTimeout、async/await的执行顺序
github项目解释
盒子模型
MIME类型

最大和问题 [1, -2, 3, 10, -5, 7, 5, 4] 求最大子数组和 时间复杂度为 o(n)  
对象深拷贝问题 [递归赋值、Object.assign()、转化成字符串在转换成对象]
原型链
单例模式
http TCP/IP 状态码相关
继承
设计模式
webpack 相关操作以及原理



### 其他
印象最深的项目
离职原因
期望薪资
未来规划

