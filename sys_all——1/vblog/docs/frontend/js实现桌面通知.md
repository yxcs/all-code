---
title: js实现桌面通知
date: 2017-05-26 15:35:17
tags: JS
description: 
---

```html
<!DOCTYPE html>
<html>
 
	<head>
		<title>Google 桌面通知</title>
		<meta name="generator" content="editplus" />
		<meta name="author" content="" />
		<meta name="keywords" content="" />
		<meta name="description" content="" />
		<meta http-equiv='content-type' content='text/html; charset=utf-8' />
	</head>
 
	<body>
 
		<button id='btn'>显示桌面通知</button>
 
		<script type='text/javascript'>
			document.querySelector("#btn").addEventListener('click', notify, false);
 
			function notify() {
				showMsgNotification('这里填入标题','这里是消息的内容');
				
			}
			function showMsgNotification(title, msg, icon) {
					var options = {
						body: msg,
						icon: icon||"image_url"
					};
					var Notification = window.Notification || window.mozNotification || window.webkitNotification;
					if (Notification && Notification.permission === "granted") {
						var instance = new Notification(title, options);
						instance.onclick = function() {
							// Something to do
						};
						instance.onerror = function() {
							// Something to do
						};
						instance.onshow = function() {
							// Something to do
//							setTimeout(instance.close, 3000);
							setTimeout(function () {
								instance.close();
							},3000)
							console.log(instance.body)
						};
						instance.onclose = function() {
							// Something to do
						};
						console.log(instance)
					} else if (Notification && Notification.permission !== "denied") {
						Notification.requestPermission(function(status) {
							if (Notification.permission !== status) {
								Notification.permission = status;
							}
							// If the user said okay
							if (status === "granted") {
								var instance = new Notification(title, options);
								instance.onclick = function() {
									// Something to do
								};
								instance.onerror = function() {
									// Something to do
								};
								instance.onshow = function() {
									// Something to do
									setTimeout(instance.close, 3000);
								};
								instance.onclose = function() {
									// Something to do
								};
							} else {
								return false
							}
						});
					} else {
						return false;
					}
				}
		</script>
	</body>
 
</html>
```
