---
title: git命令
date: 2017-05-26 15:35:17
tags: JS
description: 
---

Git是什么？

Git是目前世界上最先进的分布式版本控制系统（没有之一）。

Git有什么特点？简单来说就是：高端大气上档次！

1.创建版本库：git init

2.把readme.txt添加到版本库：git add readme.txt

3.把readme.txt提交到到版本库：git commit -m "message"

4.查看仓库状态：git status

5.查看文件不同：git diff readme.txt

6.查看历史记录：git log

7.只查看id信息：git log --pretty=oneline

8.切换到上一个版本：git reset --hard HEAD^

9.切换到上两个版本：git reset --hard HEAD^^

10.切换到具体哪个版本：git reset --hard id

11.显示每一次命令：git reflog

12.丢弃工作区修改：git checkout -- file

13.版本库中删除该文件：git rm file

14.添加远程仓库：git remote add origin git@github.com:TrumanYu/test.git

15.把内容推送到远程仓库：git push -u origin master

16.从远程仓库克隆：git clonegit@github.com:TrumanYu/test.git

17.创建分支：git branch dev

18.切换分支：git checkout dev

19.创建并切换分支：git checkout -b dev

20.合并分支：git merge master

21.删除分支：git branch -d dev

22.查看所有分支：git branch

23.查看分支图：git log --graph --pretty=oneline --abbrev-commit

24.查看远程库信息：git remote (-v)

25.创建标签：git tag v0.0.1

26.查看标签：git tag

27.查看具体标签:git showv0.0.1

如果想从头学git，建议看这个网站上的教程,通熟易懂：[http://www.liaoxuefeng.com/](http://www.liaoxuefeng.com/)