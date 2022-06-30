/**
 *  冒泡、选择、插入、希尔排序、归并排序、快速、堆排序、基数排序
 * 
 * 判断一个单词是否是回文
 * 数组去重
 * 统计一个字符串出现最多的字母
 * 斐波那契数列
 * 随机生成指定长度的字符串
 * 获取指定范围内的随机数
 * 数组中最大差值
 * 深拷贝
 * 
 * 实现类似getElementsByClassName 的功能
 * 手写bind
 * new 的过程
 * 手写ajax
 * promise 封装 ajax 
 * 转换url中的query为对象
 * 千分符
 * 取1000个数字里面的质数
 * js的节流和防抖
 * 如何实现sleep的效果
 * 
 *   ## 这些是要看原理的，不一定啥题
 * 实现一个简单的模板引擎  
 * 闭包的题
 * --------------
 */





// **********************  前端8大排序算法  **********************
//  算法	最好时间	最坏时间	平均时间	额外空间	稳定性
//  选择	  n2	      n2	     n2	       1	    稳定   (n的平方)
//  冒泡	  n	        n2	     n2	       1	    不稳定
//  插入	  n       	n2     	 n2	       1	    稳定
//  希尔	  n	        n2	     n1.3    	 1	    不稳定
//  归并	nlog2n	  nlog2n	  nlog2n	   n	    稳定
//  快排	nlog2n	    n2	    nlog2n	log2n至n	不稳定
//  堆	  nlog2n	  nlog2n	  nlog2n	   1	    不稳定
//  基数  	n*k	      n*k	     n*k	    n+k	    稳定

// |---------- 我面试的时候问的排序算法包括 [冒泡，选择排序，快速排序]  我面试了大概10个左右的公司 排序算法就包括这三个  ----------|

// 参考链接 https://blog.csdn.net/weixin_41317985/article/details/79461929

// 描述下二分查找

// 冒泡
function Bubble(arr) {
  for (let i = 0; i < arr.length; i++) { //遍历数组每一个（回合数）
    for (let j = 0; j < arr.length - 1 - i; j++) { //真正进行比较，例：i=0时比较第一次，进入第二层循环arr[0]与arr[1]进行比较，符合交换条件即交换，不符合继续比较
      if (arr[j] < arr[j + 1]) {
        let temp = arr[j + 1] //交换变量
        arr[j + 1] = arr[j]
        arr[j] = temp
      }
    }
  }
  return arr
}

// 选择
function Choose(arr) {
  let maxIndex, temp;
  for (let i = 0; i < arr.length - 1; i++) {
    maxIndex = i //maxIndex始终作为最大值的位置索引，
    for (let j = i + 1; j < arr.length; j++) { //当前最大值的后一位开始比较
      if (arr[j] > arr[maxIndex]) { //当后一位大于当前maxIndex
        maxIndex = j //将最大位置的索引值变为两者中较大的
      }
    }
    temp = arr[i] //当前轮次中的i与最大值进行交换，以达成最大值在前的的目的
    arr[i] = arr[maxIndex]
    arr[maxIndex] = temp
  }
  return arr
}

// 插入
function InsertionSort(array) {
  var length = array.length;
  for (var i = 0; i < length - 1; i++) { //i代表已经排序好的序列最后一项下标(第一项已排好序)
    var insert = array[i + 1]; //insert为待插入组的第一项
    var index = i + 1; //记录要被插入的下标
    for (var j = i; j >= 0; j--) {
      if (insert > array[j]) { //要插入的项比它小/大，往后移动
        array[j + 1] = array[j];
        index = j;
      }
    }
    array[index] = insert;
  }
  return array;
}

// 希尔排序
function shellSort(arr) {
  let temp,
    gap = 1;
  while (gap < arr.length / 3) {
    gap = gap * 3 + 1 //动态定义间隔序列
  }
  for (gap; gap > 0; gap = Math.floor(gap / 3)) { //控制步长（间隔）并不断缩小
    for (var i = gap; i < arr.length; i++) { //按照增量个数对序列进行排序
      temp = arr[i]
      for (var j = i - gap; j >= 0 && arr[j] > temp; j -= gap) { //例：j=0  arr[1]>arr[5]
        arr[j + gap] = arr[j]
      }
      arr[j + gap] = temp
    }
  }
  return arr
}

// 归并排序
function mergeSort(arr) {
  if (arr.length < 2) {
    return arr;
  }
  //将数组分为左右两个子序列
  let middle = Math.floor(arr.length / 2)
  let left = arr.slice(0, middle)
  let right = arr.slice(middle)
  return merge(mergeSort(left), mergeSort(right)) //对两个子序列重复划分为两个进行排序，直到不能划分
}

function merge(left, right) {
  let result = []
  while (left.length > 0 && right.length > 0) {
    if (left[0] < right[0]) { //两两比较，较小的放入结果数组
      result.push(left.shift()) //shift()方法删除数组第一个元素，并返回被删除的元素
    } else {
      result.push(right.shift())
    }
  }
  /* 当左右数组长度不等.将比较完后剩下的数组项链接起来即可 */
  return result.concat(left).concat(right);
}

// 快速
function quickSort(arr) {
  //如果数组<=1,则直接返回
  if (arr.length <= 1) {
    return arr;
  }
  var pivotIndex = Math.floor(arr.length / 2);
  //找基准，并把基准从原数组删除
  var pivot = arr.splice(pivotIndex, 1)[0];
  //定义左右数组
  var left = [];
  var right = [];

  //比基准小的放在left，比基准大的放在right
  for (var i = 0; i < arr.length; i++) {
    if (arr[i] <= pivot) {
      left.push(arr[i]);
    } else {
      right.push(arr[i]);
    }
  }
  //递归
  return quickSort2(left).concat([pivot], quickSort2(right));
}

// 堆排序
var len; // 因为声明的多个函数都需要数据长度，所以把len设置成为全局变量
function buildMaxHeap(arr) { // 建立大顶堆
  len = arr.length;
  for (var i = Math.floor(len / 2); i >= 0; i--) {
    heapify(arr, i);
  }
}

function heapify(arr, i) { // 堆调整
  var left = 2 * i + 1,
    right = 2 * i + 2,
    largest = i;

  if (left < len && arr[left] > arr[largest]) {
    largest = left;
  }

  if (right < len && arr[right] > arr[largest]) {
    largest = right;
  }

  if (largest != i) {
    swap(arr, i, largest);
    heapify(arr, largest);
  }
}

function swap(arr, i, j) {
  var temp = arr[i];
  arr[i] = arr[j];
  arr[j] = temp;
}

function heapSort(arr) {
  buildMaxHeap(arr);

  for (var i = arr.length - 1; i > 0; i--) {
    swap(arr, 0, i);
    len--;
    heapify(arr, 0);
  }
  return arr;
}

// 基数排序
var counter = [];

function radixSort(arr, maxDigit) {
  var mod = 10;
  var dev = 1;
  for (var i = 0; i < maxDigit; i++, dev *= 10, mod *= 10) {
    for (var j = 0; j < arr.length; j++) {
      var bucket = parseInt((arr[j] % mod) / dev);
      if (counter[bucket] == null) {
        counter[bucket] = [];
      }
      counter[bucket].push(arr[j]);
    }
    var pos = 0;
    for (var j = 0; j < counter.length; j++) {
      var value = null;
      if (counter[j] != null) {
        while ((value = counter[j].shift()) != null) {
          arr[pos++] = value;
        }
      }
    }
  }
  return arr;
}


/*********************************************************** 其他算法题 *******************************************************/

//  判断一个单词是否是回文
function checkPalindrom(str) {
  return str == str.split('').reverse().join('');
}

function checkPalindrom1(str) {
  var arr = str.split('');
  var revArr = [];
  for (var i = arr.length - 1; i >= 0; i--) {
    revArr.push(arr[i]);
  }
  return revArr;
}

// 数组去重
function unique(arr) {
  let hashTable = {};
  let data = [];
  for (let i = 0, l = arr.length; i < l; i++) {
    if (!hashTable[arr[i]]) {
      hashTable[arr[i]] = true;
      data.push(arr[i]);
    }
  }
  return data
}
// es6方法实现去重
function unique1(arr) {
  return [...new Set(arr)]
}

// 统计一个字符串出现最多的字母
function findMaxDuplicateChar(str) {
  if (str.length == 1) {
    return str;
  }
  let charObj = {};
  for (let i = 0; i < str.length; i++) {
    if (!charObj[str.charAt(i)]) {
      charObj[str.charAt(i)] = 1;
    } else {
      charObj[str.charAt(i)] += 1;
    }
  }
  let maxChar = '',
    maxValue = 1;
  for (var k in charObj) {
    if (charObj[k] >= maxValue) {
      maxChar = k;
      maxValue = charObj[k];
    }
  }
  return maxChar;

}

// 斐波那契数列
// 0、1、1、2、3、5、8、13、21、34
// fibo[i] = fibo[i-1]+fibo[i-2];  
function getFibonacci(n) {
  var fibarr = [];
  var i = 0;
  while (i < n) {
    if (i <= 1) {
      fibarr.push(i);
    } else {
      fibarr.push(fibarr[i - 1] + fibarr[i - 2])
    }
    i++;
  }

  return fibarr;
}

// 随机生成指定长度的字符串
function randomString(n) {
  let str = 'abcdefghijklmnopqrstuvwxyz9876543210';
  let tmp = '',
    i = 0,
    l = str.length;
  for (i = 0; i < n; i++) {
    tmp += str.charAt(Math.floor(Math.random() * l));
  }
  return tmp;
}


// 获取指定范围内的随机数
function getRadomNum(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// 数组中最大差值
function getMaxProfit(arr) {
  var min = arr[0],
    max = arr[0];
  for (var i = 0; i < arr.length; i++) {
    if (arr[i] < min) min = arr[i];
    if (arr[i] > max) max = arr[i];
  }
  return max - min;
}

// 深拷贝
function deepCopy(obj) {
  var result = Array.isArray(obj) ? [] : {};
  for (var key in obj) {
    if (obj.hasOwnProperty(key)) {
      if (typeof obj[key] === 'object') {
        result[key] = deepCopy(obj[key]); //递归复制
      } else {
        result[key] = obj[key];
      }
    }
  }
  return result;
}
// 对象类型转换实现深拷贝
var copy = JSON.parse(JSON.stringify(person));



/*********************************************************** 前端笔试题 *******************************************************/
// 实现类似getElementsByClassName 的功能
function queryClassName(node, name) {
  var starts = '(^|[ \n\r\t\f])',
    ends = '([ \n\r\t\f]|$)';
  var array = [],
    regex = new RegExp(starts + name + ends),
    elements = node.getElementsByTagName("*"),
    length = elements.length,
    i = 0,
    element;

  while (i < length) {
    element = elements[i];
    if (regex.test(element.className)) {
      array.push(element);
    }

    i += 1;
  }

  return array;
}

// 手写bind
Function.prototype.bind = function (obj) {
  if (typeof this !== "function") { //不是函数不能调用bind方法
    throw new Error("Function.prototype.bind - what is trying to be bound is not callable");
  }
  var that = this;
  var args = [].slice.call(arguments, 1);
  var func = function () {
    that.apply(this instanceof func ? this : obj, args.concat([].splice.call(arguments, 0))); //用来判断是不是作为构造函数：this instanceof func === true是则是构造函数
  };
  fNOP.prototype = this.prototype; //利用空函数fNOP实现继承原型链同时又不改变原函数的原型链
  fbound.prototype = new fNOP();
  return func;
}

// new 的过程

var obj = {};
obj.__proto__ = Base.prototype;
Base.call(obj);
// 第一行，我们创建了一个空对象obj
// 第二行，我们将这个空对象的__proto__成员指向了Base函数对象prototype成员对象
// 第三行，我们将Base函数对象的this指针替换成obj，然后再调用Base函数，于是我们就给obj对象赋值了一个id成员变量，这个成员变量的值是”base”，关于call函数的用法


// 手写ajax 那么加上promise那?
/****************************************************************** ajax start *******************************************************************/
function createXHR() {
  if (typeof XMLHttpRequest != "undefined") { // 非IE6浏览器
    return new XMLHttpRequest();
  } else if (typeof ActiveXObject != "undefined") { // IE6浏览器
    var version = [
      "MSXML2.XMLHttp.6.0",
      "MSXML2.XMLHttp.3.0",
      "MSXML2.XMLHttp",
    ];
    for (var i = 0; i < version.length; i++) {
      try {
        return new ActiveXObject(version[i]);
      } catch (e) {
        //跳过
      }
    }
  } else {
    throw new Error("您的系统或浏览器不支持XHR对象！");
  }
}
// 转义字符
function params(data) {
  var arr = [];
  for (var i in data) {
    arr.push(encodeURIComponent(i) + "=" + encodeURIComponent(data[i]));
  }
  return arr.join("&");
}
// 封装ajax
function ga_ajax(obj) {
  var xhr = createXHR();
  obj.url = obj.url + "?rand=" + Math.random(); // 清除缓存
  obj.data = params(obj.data); // 转义字符串
  if (obj.method === "get") { // 判断使用的是否是get方式发送
    obj.url += obj.url.indexOf("?") == "-1" ? "?" + obj.data : "&" + obj.data;
  }
  // 异步
  if (obj.async === true) {
    // 异步的时候需要触发onreadystatechange事件
    xhr.onreadystatechange = function () {
      // 执行完成
      if (xhr.readyState == 4) {
        callBack();
      }
    }
  }
  xhr.open(obj.method, obj.url, obj.async); // false是同步 true是异步 // "demo.php?rand="+Math.random()+"&name=ga&ga",
  if (obj.method === "post") {
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    xhr.send(obj.data);
  } else {
    xhr.send(null);
  }
  // xhr.abort(); // 取消异步请求
  // 同步
  if (obj.async === false) {
    callBack();
  }
  // 返回数据
  function callBack() {
    // 判断是否返回正确
    if (xhr.status == 200) {
      obj.success(xhr.responseText);
    } else {
      obj.Error("获取数据失败，错误代号为：" + xhr.status + "错误信息为：" + xhr.statusText);
    }
  }
}
/****************************************************************** ajax end *******************************************************************/
/****************************************************************** promise ajax start *******************************************************************/
function ajax(optionsOverride) {
  // 将传入的参数与默认设置合并
  var options = {};
  for (var k in ajaxOptions) {
    options[k] = optionsOverride[k] || ajaxOptions[k];
  }
  options.async = options.async === false ? false : true;
  var xhr = options.xhr = options.xhr || new XMLHttpRequest();

  return new Promise(function (resolve, reject) {
    xhr.open(options.method, options.url, options.async);
    xhr.timeout = options.timeout;

    //设置请求头
    for (var k in options.headers) {
      xhr.setRuquestHeader(k, options.headers[k]);
    }

    // 注册xhr对象事件
    xhr.onprogress = options.onprogress;
    xhr.upload.onprogress = options.onuploadprogress;
    xhr.responseType = options.dataType;

    xhr.onabort = function () {
      reject(new Error({
        errorType: 'abort_error',
        xhr: xhr
      }));
    }
    xhr.ontimeout = function () {
      reject({
        errorType: 'timeout_error',
        xhr: xhr
      });
    }
    xhr.onerror = function () {
      reject({
        errorType: 'onerror',
        xhr: xhr
      })
    }
    xhr.onloadend = function () {
      if ((xhr.status >= 200 && xhr.status < 300) || xhr.status === 304)
        resolve(xhr);
      else
        reject({
          errorType: 'status_error',
          xhr: xhr
        })
    }

    try {
      xhr.send(options.data);
    } catch (e) {
      reject({
        errorType: 'send_error',
        error: e
      });
    }
  })
}
/****************************************************************** promise ajax end *******************************************************************/
// 转换url中的query为对象
function parseObject(url) {
  var obj = {};
  if (url.indexOf('?') !== -1) {
    var url = url.substring(url.indexOf('?') + 1);
  } else {
    return;
  }
  var arr = url.split('&');
  arr.forEach(function (val) {
    var brr = val.split('=');
    obj[brr[0]] = brr[1];
  });
  return obj;
}

// 千分符
function toThousands(num) {
  return parseFloat(num).toFixed(2).replace(/(\d{1,3})(?=(\d{3})+(?:\.))/g, "$1,");
}
// 取1000个数字里面的质数
function getNum(min, max) {
  //求范围内的所有质数
  var array = new Array();

  //判断是否是质数
  for (var i = min; i = max; i++) {
    var isPrime = true;
    for (var j = 2; j < i; j++) {
      //被2或其他小于它的数字整除就不是质数
      if (i % j == 0) {
        isPrime = false;
        break;
      }
    }
    if (isPrime) {
      //true代表是质数
      //向数组中添加这个数字
      array.push(i);
    }
  }
  return array;
}
// js的节流和防抖
/**
 * 防抖函数
 * @param method 事件触发的操作
 * @param delay 多少毫秒内连续触发事件，不会执行
 * @returns {Function}
 */
function debounce(method, delay) {
  let timer = null;
  return function () {
    let self = this,
      args = arguments;
    timer && clearTimeout(timer);
    timer = setTimeout(function () {
      method.apply(self, args);
    }, delay);
  }
}
/**
 * 节流函数
 * @param method 事件触发的操作
 * @param mustRunDelay 间隔多少毫秒需要触发一次事件s
 */
function throttle(method, mustRunDelay) {
  let timer,
    args = arguments,
    start;
  return function loop() {
    let self = this;
    let now = Date.now();
    if (!start) {
      start = now;
    }
    if (timer) {
      clearTimeout(timer);
    }
    if (now - start >= mustRunDelay) {
      method.apply(self, args);
      start = now;
    } else {
      timer = setTimeout(function () {
        loop.apply(self, args);
      }, 50);
    }
  }
}

/** ------------------------------------------------------------- */
// 如何实现sleep的效果
//方法一
function sleep1(ms, callback) {
  setTimeout(callback, ms)
}
//sleep 1s
sleep1(1000, () => {
  console.log(1000)
})
//方法二
function sleep2(ms) {
  return new Promise(function (resolve, reject) {
    setTimeout(resolve, ms)
  })
}
sleep2(1000).then(() => {
  console.log(2000)
})
//方法三
function sleep3(ms) {
  return new Promise(function (resolve, reject) {
    setTimeout(resolve, ms)
  })
}
async function init() {
  await sleep3(1000);
}
init().then(() => {
  console.log(3000)
})



// 实现一个简单的模板引擎
// 闭包的题