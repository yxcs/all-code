# by-back-cli

用于搭建后端项目vue框架的脚手架

## 使用

1. 开发模式

```shell
git clone ***
cd by-back-cli
npm i
npm link
```

接下来就可以直接使用命令了

```shell
biu
```

2. 指令模式

暂不支持

## 常用命令

1. biu 运行指令，查看是否安装成功
2. biu create <filename> 创建指定名称的项目
3. biu create <filename> -B|--build <type> 使用 `type` 类型的模板创建名称为 `filename` 的项目
   type:
   - base：基础版
   - normal: 通用版
   - senior: 高级版
   - demo: 现有系统demo
   - select: 以基础版开始搭建项目，不传type时，默认为select
