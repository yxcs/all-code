---
title: nodejs搭建web服务器
categories: 后端
tags:
  - node
  - express
abbrlink: 50379
date: 2018-09-08 18:40:58
---

Node.js 是一个基于 Chrome V8 引擎的 JavaScript 运行环境。 Node.js 使用了一个事件驱动、非阻塞式 I/O 的模型，使其轻量又高效
``` javascript
//引入http模块
var http = require("http");
//设置主机名
var hostName = '127.0.0.1';
//设置端口
var port = 8080;
//创建服务
var server = http.createServer(function(req,res){
    res.setHeader('Content-Type','text/plain');
    res.end("hello nodejs");
});
server.listen(port,hostName,function(){
    console.log(`服务器运行在http://${hostName}:${port}`);
});
```  


Express 中跨域解决
``` javascript
var express = require("express");
var app = express();
var hostName = '127.0.0.1';
var port = 8080;

app.all('*', function(req, res, next) {  
    res.header("Access-Control-Allow-Origin", "*");  
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");  
    res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");  
    res.header("X-Powered-By",' 3.2.1')  
    res.header("Content-Type", "application/json;charset=utf-8");  
    next();  
});

app.get("/get",function(req,res){
    console.log("请求url：",req.path)
    console.log("请求参数：",req.query)
    res.send("这是get请求");
})

app.listen(port,hostName,function(){
   console.log(`服务器运行在http://${hostName}:${port}`);
});
``` 