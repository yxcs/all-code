## 知识点罗列

1. ### script标签 async  defer
2. ### 标准模式和混杂模式
3. ### typeof
    * typeof null -> "object"
    * typeof undefined -> 'typeof undefined'
    * typeof 'undefined' -> "string"
    * typeof 1 -> "number"
    * typeof Array -> "function"
    * typeof [] -> "object"
    * typeof Object -> "function"
    * typeof Object() -> "object"
    * typeof {} -> "object"
    * typeof Function -> "function"
    * typeof function(){} -> "function"
    * typeof true -> "boolean"
    注意:  
    null == undefined -> true
    null === undefined -> false
3. ### 数据类型：number string boolean null undefined Object
4. ### 垃圾回收： 标记清除  引用计数
5. ### 正则表达式
6. ### Object
  - 工厂模式
  ``` javascript
    function createObject(name) {
			var o = new Object();
		  o.name = name;
		  o.sayName = function () {
				console.log(this.name);
		  }
			return o;
		}
	  var obj = createObject('lili');
	  obj.sayName()
  ```
  - 构造函数模式
  ``` javascript 
    function createConstructor(name) {
		  this.name = name;
		  this.sayName = function () {
			  console.log(this.name);
		  }
	  }
	  var objConstructor = new createConstructor('lili');
	  objConstructor.sayName();
  ``` 
  - 调用够造函数经历步骤
    1. 创建一个新对象
    2. 将构造函数的作用域赋值给新对象(this指向新对象)
    3. 执行构造函数中的代码(为新队形添加属性)
    4. 返回新对象 
	
- 原型模式
``` javascript
	function createPrototype() {
	}
	createPrototype.prototype.name = 'lili';
	createPrototype.prototype.sayName = function() {
		console.log(this.name);
	}
	var objPrototype = new createPrototype();
	obj.sayName();
```
- Prototype 和 Constructor 
- 原型构造模式
``` javascript
	function createProCus(name, arr) {
		this.name = name;
		this.arr = arr;
	}
	createProCus.prototype = {
		constructor: createProCus,
		sayName: function() {
			console.log(this.name);
			console.log(this.arr);
		}
	}
	var objProCus = new createProCus('lili', [1,2,3]);
	objProCus.sayName();
```
- 继承
7. ### 函数
	- 递归  arguments.callee() (调用自身)
	- 闭包
		1. this 指向问题
		2. 内存泄漏问题
		3. 内存占用过多问题
	- 方法
		1. arguments
		2. this
		3. bind()
		4. call()
		5. apply()

8. ### Window
	- IFrame
	- compatMode
		* CSS1Compat 标准模式
		* BackCompat 怪异模式
	- 方法
		* open()
		* close()
		* screenLeft | IE screenX
		* screenTop | IE screenY
		* moveTo()
		* moveTo()
		* innerHeight outerHeight | IE document.documentElement.clientHeight | IE9- document.body.clientHeight
		* innerWidth outerWidth | IE document.documentElement.clientWidth | IE9- document.body.clientWidth
		* resizeTo()
		* resizeBy()
		* alert()
		* confirm()
		* prompt()
		* setTimeout()  clearTimeout()
		* setIintervl() clearInterval()
		* location
			- hash
			- host
			- hostname
			- href 
			- pathname 
			- port 
			- protocol
			- search
			- assign()
			- replace()
			- reload()
		* navigator 
			- appCodeName
			- appName
			- appVersion
			- cookieEnabled
			- onLine
			- platform
			- plugins
			- product        产品名称
			- userAgent
			- vendor         浏览器品牌 
		* screen
		 	- avaiHeight | avaiWidth
		 	- avaiLeft | avaiTop
		 	- height | width
		 	- colorDepth
		* history
			- go()
			- back()
			- forward() 

9. ### DOM
	* NODE TYPE
		- Node.ELEMENT_NODE(1)
		- Node.ATTRIBUTE_NODE(2)
		- Node.TEXT_NODE(3)
		- Node.COMMENT_NODE(8)
	* 方法
		- hasChildNodes()
		- firstChild
		- lastChild
		- childNodes
		- parentNode
		- nextSibling
		- previousSibling
		- nodeName
		- nodeType
		- nodeValue
		- attributes
		- appendChild()
		- removeChild()
		- replaceChild()
		- insertChild()
		- tagName
		- getAttribute()
		- setAttribute()
		- innerHtml()
		- className
		- cloneChild()
		- normalize()
	* document
		- documentElement          取得对\<html\>的引用
		- body                     取得对\<body\>的引用
		- title 
		- domain
		- getElementById()
		- getElementsByTagName()
		- getElementsByName()
		- write() | wirteln()
		- createElement()
		- createTextEleemnt()
		- createCommet()
		- style -> cssText
	* 扩展 
		- getElementsByClassName()
		- querySelector()
		- querySelectorAll()
		- matchsSelector()
		- childElementCount
		- firstElementChild
		- lastElementChild
		- previousElementChild
		- nextElementChild
		- element->classList
			* add()
			* contains()
			* remove()
			* toggle()
		- activeElement
		- readystatus (loading  complete)
		- compatMode (CSS1compat, BackCompat)
		- outerHTML
		- innerHTML
		- insertAjacentHTML()  [beforebegin, afterbegin, beforeend, afterend]
		- scrollIntoView()
		- innerText()
		- outerText()
		- document.defaultView.getComputedStyle(ele, null)
		- document.getElementById(ele).currentStyle
	* 位置
		- offsetHeight
		- offsetWidth
		- offsetTop
		- offsetLeft
		- offsetParent
		- clientWidth
		- clientHeight
		- clientWidth
		- clientHeight
		- scrollHeight
		- scrollWidth
		- scrollLeft
		- scrollTop
		- getBoundingClientRect()

10. ### 事件
  * 事件绑定 
	- addEventListener  removeEventlistener 
	- attachEvent  detachEvent 
	- html元素绑定 -> onclick
		

		