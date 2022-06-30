---
title: promise generator async 解析
abbrlink: 61901
date: 2018-09-21 10:40:46
categories: 前端
tags:
  - js
  - es6
---
### Promise
解决的问题:回调地狱

#### Promise规范:
1. promise有三种状态，等待（pending）、已完成（fulfilled/resolved）、已拒绝（rejected）.Promise的状态只能从“等待”转到“完成”或者“拒绝”，不能逆向转换，同时“完成”和“拒绝”也不能相互转换.
2. promise 必须提供一个 then方法以访问其当前值、终值和据因。promise.then(resolve, reject),resolve 和 reject都是可选参数。如果 resolve 或reject 不是函数，其必须被忽略.
3. then 方法必须返回一个 promise 对象.

### 使用:
1. 实例化promise对象需要传入函数(包含两个参数),resolve和reject,内部确定状态.resolve和reject函数可以传入参数在回调函数中使用.
2. resolve和reject都是函数,传入的参数在then的回调函数中接收.
```javascript
var promise = new Promise(function(resolve, reject) {
  setTimeout(function(){
    resolve('好哈哈哈哈');
  });
});
promise.then(function(val){
  console.log(val)
})
```
3. then接收两个函数,分别对应resolve和reject状态的回调,函数中接收实例化时传入的参数.
```javascript
promise.then(val=>{
  //resolved
},reason=>{
  //rejected
})
```
3. catch相当于.then(null, rejection)。当then中没有传入rejection时,错误会冒泡进入catch函数中,若传入了rejection,则错误会被rejection捕获,而且不会进入catch.此外,then中的回调函数中发生的错误只会在下一级的then中被捕获,不会影响该promise的状态.
```javascript
new Promise((resolve,reject)=>{
   throw new Error('错误')
 }).then(null,(err)=>{
   console.log(err,1);//此处捕获
 }).catch((err)=>{
   console.log(err,2);
 });
 // 对比
 new Promise((resolve,reject)=>{
   throw new Error('错误')
 }).then(null,null).catch((err)=>{
   console.log(err,2);//此处捕获
 });
 // 错误示例
 new Promise((resolve,reject)=>{
   resolve('正常');
 }).then((val)=>{
   throw new Error('回调函数中错误')
 },(err)=>{
   console.log(err,1);
 }).then(null,(err)=>{
   console.log(err,2);//此处捕获,也可用catch
 });
 ```
4. 两者不等价的情况: 
    此时，catch捕获的并不是p1的错误，而是p2的错误
```javascript
p1().then(res=>{ 
  return p2()//p2返回一个promise对象 
}).catch(err=> console.log(err))
```
5. 一个错误捕获的错误用例:
    该函数调用中即使发生了错误依然会进入then中的resolve的回调函数,因为函数p1中实例化promise对象时已经调用了catch,若发生错误会进入catch中,此时会返回一个新的promise,因此即使发生错误依然会进入p1函数的then链中的resolve回调函数.
```javascript
function p1(val){
  return new Promise((resolve,reject)=>{
    if(val){
      var len = val.length;//传入null会发生错误,进入catch捕获错误
      resolve(len);
    }else{
      reject();
    }
  }).catch((err)=>{
    console.log(err)
  })
};
p1(null).then((len)=>{
    console.log(len,'resolved');
},()=>{
  console.log('rejected');
}).catch((err)=>{
  console.log(err,'catch');
})
```
6. Promise回调链:
    promise能够在回调函数里面使用 return 和 throw， 所以在then中可以return出一个promise对象或其他值，也可以throw出一个错误对象，但如果没有return，将默认返回 undefined，那么后面的then中的回调参数接收到的将是undefined.
```javascript
function p1(val){
  return new Promise((resolve,reject)=>{
    val==1?resolve(1):reject()
  })
};
function p2(val){
  return new Promise((resolve,reject)=>{
    val==2?resolve(2):reject();
  })
};
let promimse = new Promise(function(resolve,reject){
          resolve(1)
})
promimse.then(function(data1) {
  return p1(data1)//如果去掉return,则返回undefined而不是p1的返回值,会导致报错
})
.then(function(data2){
  return p2(data2+1)
})
.then(res=>console.log(res))
```