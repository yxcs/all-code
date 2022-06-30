// function count() {
//   var arr = [];
//   for (var i=1; i<=3; i++) {
//       arr.push((function (n) {
//           return function () {
//               return n * n;
//           }
//       })(i));
//   }
//   return arr;
// }


// var results = count();
// var f1 = results[0];
// var f2 = results[1];
// var f3 = results[2];

// console.log(f1(), f2(), f3())

// (function (x) { return x * x })(3);

// var zero = function (f) {
//   return function (x) {
//       return x;
//   }
// };

// // 定义数字1:
// var one = function (f) {
//   return function (x) {
//       return f(x);
//   }
// };

// // 定义加法:
// function add(n, m) {
//   return function (f) {
//       return function (x) {
//           return m(f)(n(f)(x));
//       }
//   }
// }

// var two = add(one, one);

// console.log(two()())

function throttle(fn, delay, duration) {
  var timer = null;
  var begin = new Date();

  return function () {
    var that = this;
    var ars = arguments;
    var current = new Date();

    clearTimeout(timer);
    if (current - begin > duration) {
      fn.apply(that, ars);
      begin = current;
    } else {
      timer = setTimeout(function () {
        fn.apply(that, ars);
      }, delay)
    }
  }
}

// var str = '<p>Today: { date }</p>\n<a href="/{ user.id|safe }">{ user.company }</a>';

// var re = /\{\s*([a-zA-Z\.\_0-9()]+)\s*\}/m
// var match = re.exec('a { template } string');
// console.log(match)

// function Template(tpl) {
//   var fn;
//   var match;
//   var code = ['var r = [];'];
//   var re = /\{\s*([a-zA-Z0-9\.\_\-]+)\s*\}/;
//   var addLine = function (text) {
//     code.push('r.push(\'' + text.replace(/\'/g, '\\\'').replace(/\n/g, '\\n').replace(/\r/g, '\\r') + '\');');
//   };
//   while (match = re.exec(tpl)) {
//     if (match.index > 0) {
//         addLine(tpl.slice(0, match.index));
//     }
//     code.push('r.push(this.' + match[1] + ');');
//     tpl = tpl.substring(match.index + match[0].length);
//   }
//   addLine(tpl);
//   code.push('return r.join(\'\');');
//   // 创建函数:
//   fn = new Function(code.join('\n'));
//   // 用render()调用函数并绑定this参数：
//   this.render = function (model) {
//       return fn.apply(model);
//   };
// }

// var tpl = new Template('<p>Today: { date }</p>');
// var elementTxt = tpl.render({
//   date: '2018-09-18'
// })

// console.log(elementTxt)

function get(url, options, callback) {
  var xhr = null;
  if (new XMLHttpRequest()) {
    xhr = new XMLHttpRequest();
  } else {
    xhr = new ActiveXOnject('Microsoft.XMLHTTP');
  }

  xhr.onreadystatechange = function () {
    if (xhr.readystate === 4) {
      if (xhr.status === 200) {
        callback(xhr.responseTxt);
      }
    }
  }

  xhr.open('get', url, true);
  xhr.send(null);
}

// for (var i = 0; i < 5; i++) {
//   setTimeout(function() {
//     console.log(i);
//   }, 1000 * i);
// } // 使得其输出为0，1，2，3，4

// for (var i = 0; i < 5; i++) {
//   (function (i) {
//     setTimeout(function() {
//       console.log(i)
//     }, 1000 * i);
//   })(i)
// }


// 冒泡

// function bubbleSort(arr) {
//   var len = arr.length,
//     t
//   for (j = 0; j <= len - 1; j++) {
//     for (i = 0; i <= len - j - 1; i++) {
//       if (arr[i] > arr[i + 1]) {
//         t = arr[i + 1];
//         arr[i + 1] = arr[i];
//         arr[i] = t;
//       }
//     }
//   }
//   return arr;
// }

// function bubbleSort (arr) {
//   var len = arr.length;
//   var temp ;
//   for (var i = len - 1; i >= 0; i --) {
//     for (var j = i - 1; j >= 0; j --) {
//       if (arr[j] <= arr[j - 1]) {
//         temp = arr[j];
//         arr[j] = arr[j - 1];
//         arr[j - 1] = temp;
//       }
//     }
//   }
//   return arr;
// }

function insertSort(arr) {
  for (var i = 1; i < arr.length; i ++) {
    if (arr[i] < arr[i - 1]) {
      var temp = arr[i];
      var j = i - 1;
      arr[i] = arr[j];
      while(j >= 0 && temp < arr[j]) {
        arr[j + 1] = temp;
        j --;
      }
      arr[j] = temp;
    }
  }
  return arr;
}


function quickSort(arr) {
  if (arr.length <= 1) { //数组长度为1时，则停止递归
    return arr
  }
  var l = Math.floor(arr.length / 2); //选择中间数
  var left = [],
    right = [];
  var splitEle = arr.splice(l, 1)[0] //将中间数从原数组删除并保存
  for (i = 0; i < arr.length; i++) {
    if (arr[i] < splitEle) {
      left.push(arr[i])
    } else {
      right.push(arr[i])
    }
  }
  return quickSort(left).concat(splitEle, quickSort(right))
}

//选择排序
function selectQuot(arr) {
  for (i = 0; i < arr.length - 1; i++) {
    for (j = i + 1; j < arr.length; j++) {
      if (arr[i] > arr[j]) {
        var temp;
        temp = arr[i];
        arr[i] = arr[j];
        arr[j] = temp;
      }
    }
  }
  return arr
}

function insertSort(arr) {
  for (i = 1; i < arr.length; i++) {
    var temp = arr[i],
      j = i - 1;
    while (j >= 0 && temp < arr[j]) {
      arr[j + 1] = arr[j]; //相当于将虚拟数组当前项后移一位，同时虚拟数组长度+1
      j--;
    }
    arr[j + 1] = temp; //新加项最终插入的位置
  }
  return arr;
}

// 归并排序
var mergeSort = {
  splitSort: function (arr) {
    if(arr.length == 1) return arr;
    var mid = Math.floor(arr.length / 2);
    var left = arr.slice(0, mid);
    var right = arr.slice(mid);
    return this.mergeArr(this.splitSort(left), this.splitSort(right));
  },
  mergeArr: function (left, right) {
    var result = [];
    while(left.length > 0 && right.length > 0) {
      if (left[0] < right[0]) {
        result.push(left.shift())
      } else {
        result.push(right.shift())
      }
    }
    return result.concat(left).concat(right);
  }
}

//希尔排序
function shellSort(array) {
  var len = array.length;
  var gap = len;
  do {
      gap = Math.floor(gap/3)+1; // 减小增量
      // 把距离为gap的元素编为一个组，扫描所有组
      for (var i = gap; i < len; i++) {
         var  temp = array[i],
              j = i - gap;
         while(j>=0 && temp < array[j]){
             array[j + gap] = array[j];
             j -= gap;
         }
         array[j+gap] = temp; 
      }
  }while(gap > 1)
  return array
}

// var arr = [3, 4, 7, 6, 2, 1, 9, 1, 10]
// console.log(mergeSort.splitSort(arr));

// var f = true;
// if (f === true) {
//   var a = 10;
// }

// function fn() {
//   var b = 20;
//   c = 30;
// }

// fn();
// console.log(a);
// console.log(b);
// console.log(c);

// if('a' in window) {
//   var a = 10;
// }

// console.log(a);


var url = "http://www.taobao.com/index.php?key0=0&key1=1&key2=2.....";
function parseQueryString(url) {
  var obj = {};
  var query = url.split('?');
  query = query[1];
  var arr = query.split('&');
  for (var i = 0; i < arr.length; i ++) {
    var mid = arr[i].split('=');
    obj[mid[0]] = mid[1];
  }
  return obj;
}
// console.log(parseQueryString(url));

// function randomString(n){
//   var str = 'abcdefghijklmnopqrstuvwxyz0123456789';
//   var tmp = '';
//   for(var i=0;i<n;i++)
//       tmp += str.charAt(Math.round(Math.random()*str.length));
//   return tmp;
// }

// console.log(randomString(7))

// console.log(Math.random() * 34)

// <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, minimum-scale=1, user-scalable=no" />

// Function.prototype.bind = function (ctx) {
//   var outerArgs = Array.prototype.slice.call(arguments, 1);
//   var self = this;
//   return function () {
//     var innerArgs = Array.prototype.slice.call(arguments);
//     var allArgs = outerArgs.concat(innerArgs);
//     return self.apply(ctx, allArgs);
//   }
// }

// Function.prototype.bind = function (ctx) {
//   var outerArgs = Array.prototype.slice.call(arguments, 1);
//   var F = function () {};
//   var self = this;

//   var bound = function () {
//     var innerArgs = Array.prototype.slice.call(arguments);
//     var allArgs = outerArgs.concat(innerArgs);
//     return self.apply(this instanceof F ? this : ctx || window, allArgs);
//   }

//   F.prototype = this.prototype;
//   bound.prototype = new F();
//   return bound;
// }

// function curry(fn, length) {
//     // capture fn's # of parameters
//     length = length || fn.length;
//     return function () {
//         if (arguments.length < length) {
//             // not all arguments have been specified. Curry once more.
//             var combined = [fn].concat(toArray(arguments));
//             return length - arguments.length > 0 
//                 ? curry(sub_curry.apply(this, combined), length - arguments.length)
//                 : sub_curry.call(this, combined );
//         } else {
//             // all arguments have been specified, actually call function
//             return fn.apply(this, arguments);
//         }
//     };
// }

// function curry(fn) {
//   function _c (argNum, argList) {
//     return argNum === 0 ? 
//       fn.apply(null, argList) :
//       function (x) {
//         return _c(argNum - 1, argList.concat(x));
//       }
//   }
//   return _c(fn.length, [])
// }

// var plus = curry(function(a, b) {
//   return a + b;
// });

// console.log(plus(2)(4));



function observr(obj) {
  if (!Object || typeof obj !== 'object') return ;
  for (var key in obj) {
    defineReactive(obj, key, obj[key]);
  }
}

function defineReactive(obj, key, value) {
  observr(value)
  Object.defineProperty(obj, key, {
    enumerable: true,
    configurable: true,
    get: function () {
      console.log(value);
      return value;
    },
    set: function (nV) {
      console.log('set');
      value = nV;
    }
  })
}


// setTimeout(()=>{
//   console.log(0)
// },1000);

// new  Promise((resolve,reject)=>{
//   console.log(1);
//   resolve();
// })
// .then(()=>{
//   setTimeout(()=>{
//       console.log(3)
//   },0);
//   console.log(4);
// })

// process.nextTick(()=>{
//   console.log(5);
// })

// setTimeout((()=>{
//   console.log(6);
//   return ()=>{
//       console.log(7);
//   }
// })(),2000);

// setTimeout(()=>{
//   console.log(8);
// },0)

// setTimeout(function(){
//   console.log(1)
// },0);
// new Promise(function(resolve){
//   console.log(2)
//   for( var i=100000 ; i>0 ; i-- ){
//       i==1 && resolve()
//   }
//   console.log(3)
// }).then(function(){
//   console.log(4)
// });
// console.log(5);

// function binarySearch(target, arr, start, end) {
//   var start = start || 0;
//   var end = end || arr.length - 1;
  
//   var mid = Math.floor(start + (end - start) / 2);
//   if (target === arr[mid]) {
//     return mid;
//   } else if (target > arr[mid]) {
//     return binarySearch(target, arr, mid + 1, end);
//   } else if (target < arr[mid]){
//     return binarySearch(target, arr, start, mid - 1);
//   }
//   return -1;
// }

function quickSort(arr) {
  if (arr.length < 2) return arr;
  var mid = Math.floor(arr.length / 2);
  var midV = arr.splice(mid, 1);
  var left = [];
  var right = [];

  for (var i = 0; i < arr.length; i ++) {
    if(arr[i] <= midV) {
      left.push(arr[i]);
    } else {
      right.push(arr[i]);
    }
  }

  return quickSort(left).concat(midV, quickSort(right));
}


function debounce (fn, duration) {
  var timmer = null;
  return function () {
    if (!timmer) {
      timmer = setTimeout(function () {
        clearTimeout(timmer);
        fn();
      }, duration)
    }
  }
}

function throlle(fn, delay) {
  var start = new Date();
  return function () {
    var context = this;
    var arg = [].slice.apply(arguments);
    var end = new Date();
    if (end - start > delay) {
      fn.apply(context, arg);
      start = new Date();
    }
  }
}

var Singleton = function () {

}

Singleton.getsingle = (function () {
  var isSingle = null;
  return function () {
    if (!isSingle) {
      isSingle = new Singleton();
    }
    return isSingle;
  }
})()