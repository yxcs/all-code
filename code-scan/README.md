# 代码提交扫描项目

## 代码扫描归类

### gerrit

  Gerrit是Google开源的一套基于web的代码review工具，它是基于git的版本管理系统。Google开源Gerrit旨在提供一个轻量级框架，用于在代码入库之前对每个提交进行审阅。每个修改都将提交到gerrit上，但实际上没有真正意义的成为项目的一部分，直到提交被管理员review和submit。它是标准开源过程的一个简单工具来支持提交补丁程序，然后由项目成员在应用到代码库之前进行review。

### jsprime：AST语法树方式

  1、把源代码喂给 Esprime，Esprime 负责把代码生成 AST。

  2、接下来就是解析 JSON AST（Esprime 会生成 JSON 格式的 AST）。

  3、找出所有的 sources(包括 对象，原型) ，同时跟踪 sources 的作用范围。

  4、找出 sources 别名，也就是把 soruce 值赋值给了另一变量，同时跟踪 sources 的作用范围。

  5、找出 skins 和 skins 别名，同时跟踪他们的作用范围。

  6、找出 sources 被哪些函数当成参数使用，包括闭包函数、匿名函数，同时跟踪他们的返回值。

  7、当所有的 sources 和 source 别名被收集，检查其中的 source 有过滤函数处理了的，则放弃。

  8、剩下的 source 当被赋值给 skins 或被传递为参数操作后到达 skins 的，则跟踪这些 source。

  9、以同样的流程，按照反向重复一次，以确认我们可以反向到达同一个 source。

  10、一旦确认 source 流入到了 skin 中，则取出行号和语句，然后以不同颜色输出到报表中。

### NodeJSScan

NodeJSScan 是一套用 python 实现的 node 应用代码扫描器，他的原理是通过正则表达式来匹配源码文件中的每一行，每个正则表达式都代表一种漏洞扫描规则，如是否使用了 url 中的值当成 readFile 函数参数，把这些规则用来检查代码中的每一行，一旦匹配则就说明有漏洞。

NodeJSSCan 实现原理
  1、用户把代码打包成一个 zip 包并上传，服务端解压这个包

  2、迭代每一个文件(有文件夹则递归)把读出文件内容

  3、文件内容通过 jsbeautify 格式化，并把注释去掉

  4、迭代每一行，把代码代入设置的规则中(正则，或字符串查找)，当匹配了，则记录起来

  6、把匹配规则的代码行按类别存放，如 rce，xss，ssrf，sqli

  7、生成结果报告

### Sonarqube

### gitlab

1. Gitlab Custom_hooks
2. gitlab+checkstyle

## 引用文档

https://segmentfault.com/a/1190000017790694 代码扫描基础
https://blog.csdn.net/u011521203/article/details/87546146  执行过程原理
https://blog.csdn.net/wei371522/article/details/84070803   git message信息说明

## 提交信息相关依赖

npm install --save-dev @commitlint/config-conventional @commitlint/cli
eslint-plugin-vuefix
eslint
prettier
husky

## git hooks（git周期钩子）

husky:
  pre-commit
  prepare-commit-msg
  commit-msg
  post-commit

```json
"husky": {
  "hooks": {
    "pre-commit": "lint-staged",
    "commit-msg": "commitlint -e $HUSKY_GIT_PARAMS || (node scripts/pre-commit.js&&exit 8)"
  }
}
```

type:种类，必写
scope：影响范围 可以不写
subject：简短说明，50字符内
其实还有body,footer什么的，我觉得写个subject简短说明就够了，难不成还在commit里写作文
注意: <font color="red">冒号后面一定要加空格，否则不能通过commitlint验证</font>

如果当前 commit 用于撤销以前的 commit，则必须以revert:开头，后面跟着被撤销 Commit 的 Header。

revert: feat(pencil): add 'graphiteWidth' option

## angular规范

@commitlint/config-angular

commit格式错误，正确示例：git commit -m 'fix: 修复bug'
type （只允许下列7个标识）：
feat：新功能（feature）
fix：修补bug
docs：文档（documentation）
style： 格式（不影响代码运行的变动）
refactor：重构（即不是新增功能，也不是修改bug的代码变动）
test：增加测试
chore：构建过程或辅助工具的变动

## git钩子详解

刚才用到了pre-commit, commit-msg，解释如下，有点像vue的生命周期钩子函数，在提交前依次执行，我这里把eslint检查放在pre-commit里，commitlint检查放commit-msg里
具体：自定义 Git - Git 钩子
pre-commit 钩子在键入提交信息前运行。 它用于检查即将提交的快照，例如，检查是否有所遗漏，确保测试运行，以及核查代码。 如果该钩子以非零值退出，Git 将放弃此次提交，不过你可以用 git commit --no-verify 来绕过这个环节。 你可以利用该钩子，来检查代码风格是否一致（运行类似 lint 的程序）、尾随空白字符是否存在（自带的钩子就是这么做的），或新方法的文档是否适当。

prepare-commit-msg 钩子在启动提交信息编辑器之前，默认信息被创建之后运行。 它允许你编辑提交者所看到的默认信息。 该钩子接收一些选项：存有当前提交信息的文件的路径、提交类型和修补提交的提交的 SHA-1 校验。 它对一般的提交来说并没有什么用；然而对那些会自动产生默认信息的提交，如提交信息模板、合并提交、压缩提交和修订提交等非常实用。 你可以结合提交模板来使用它，动态地插入信息。

commit-msg 钩子接收一个参数，此参数即上文提到的，存有当前提交信息的临时文件的路径。 如果该钩子脚本以非零值退出，Git 将放弃提交，因此，可以用来在提交通过前验证项目状态或提交信息。 在本章的最后一节，我们将展示如何使用该钩子来核对提交信息是否遵循指定的模板。

post-commit 钩子在整个提交过程完成后运行。 它不接收任何参数，但你可以很容易地通过运行 git log -1 HEAD 来获得最后一次的提交信息。 该钩子一般用于通知之类的事情。

## 规则

比如某个文件不想eslint检查，可以在文件开头加注释
/* eslint-disable */

"no-alert": 0,//禁止使用alert confirm prompt
"no-array-constructor": 2,//禁止使用数组构造器
"no-bitwise": 0,//禁止使用按位运算符
"no-caller": 1,//禁止使用arguments.caller或arguments.callee
"no-catch-shadow": 2,//禁止catch子句参数与外部作用域变量同名
"no-class-assign": 2,//禁止给类赋值
"no-cond-assign": 2,//禁止在条件表达式中使用赋值语句
"no-console": 2,//禁止使用console
"no-const-assign": 2,//禁止修改const声明的变量
"no-constant-condition": 2,//禁止在条件中使用常量表达式 if(true) if(1)
"no-continue": 0,//禁止使用continue
"no-control-regex": 2,//禁止在正则表达式中使用控制字符
"no-debugger": 2,//禁止使用debugger
"no-delete-var": 2,//不能对var声明的变量使用delete操作符
"no-div-regex": 1,//不能使用看起来像除法的正则表达式/=foo/
"no-dupe-keys": 2,//在创建对象字面量时不允许键重复 {a:1,a:1}
"no-dupe-args": 2,//函数参数不能重复
"no-duplicate-case": 2,//switch中的case标签不能重复
"no-else-return": 2,//如果if语句里面有return,后面不能跟else语句
"no-empty": 2,//块语句中的内容不能为空
"no-empty-character-class": 2,//正则表达式中的[]内容不能为空
"no-empty-label": 2,//禁止使用空label
"no-eq-null": 2,//禁止对null使用==或!=运算符
"no-eval": 1,//禁止使用eval
"no-ex-assign": 2,//禁止给catch语句中的异常参数赋值
"no-extend-native": 2,//禁止扩展native对象
"no-extra-bind": 2,//禁止不必要的函数绑定
"no-extra-boolean-cast": 2,//禁止不必要的bool转换
"no-extra-parens": 2,//禁止非必要的括号
"no-extra-semi": 2,//禁止多余的冒号
"no-fallthrough": 1,//禁止switch穿透
"no-floating-decimal": 2,//禁止省略浮点数中的0 .5 3.
"no-func-assign": 2,//禁止重复的函数声明
"no-implicit-coercion": 1,//禁止隐式转换
"no-implied-eval": 2,//禁止使用隐式eval
"no-inline-comments": 0,//禁止行内备注
"no-inner-declarations": [2, "functions"],//禁止在块语句中使用声明（变量或函数）
"no-invalid-regexp": 2,//禁止无效的正则表达式
"no-invalid-this": 2,//禁止无效的this，只能用在构造器，类，对象字面量
"no-irregular-whitespace": 2,//不能有不规则的空格
"no-iterator": 2,//禁止使用__iterator__ 属性
"no-label-var": 2,//label名不能与var声明的变量名相同
"no-labels": 2,//禁止标签声明
"no-lone-blocks": 2,//禁止不必要的嵌套块
"no-lonely-if": 2,//禁止else语句内只有if语句
"no-loop-func": 1,//禁止在循环中使用函数（如果没有引用外部变量不形成闭包就可以）
"no-mixed-requires": [0, false],//声明时不能混用声明类型
"no-mixed-spaces-and-tabs": [2, false],//禁止混用tab和空格
"linebreak-style": [0, "windows"],//换行风格
"no-multi-spaces": 1,//不能用多余的空格
"no-multi-str": 2,//字符串不能用\换行
"no-multiple-empty-lines": [1, {"max": 2}],//空行最多不能超过2行
"no-native-reassign": 2,//不能重写native对象
"no-negated-in-lhs": 2,//in 操作符的左边不能有!
"no-nested-ternary": 0,//禁止使用嵌套的三目运算
"no-new": 1,//禁止在使用new构造一个实例后不赋值
"no-new-func": 1,//禁止使用new Function
"no-new-object": 2,//禁止使用new Object()
"no-new-require": 2,//禁止使用new require
"no-new-wrappers": 2,//禁止使用new创建包装实例，new String new Boolean new Number
"no-obj-calls": 2,//不能调用内置的全局对象，比如Math() JSON()
"no-octal": 2,//禁止使用八进制数字
"no-octal-escape": 2,//禁止使用八进制转义序列
"no-param-reassign": 2,//禁止给参数重新赋值
"no-path-concat": 0,//node中不能使用__dirname或__filename做路径拼接
"no-plusplus": 0,//禁止使用++，--
"no-process-env": 0,//禁止使用process.env
"no-process-exit": 0,//禁止使用process.exit()
"no-proto": 2,//禁止使用__proto__属性
"no-redeclare": 2,//禁止重复声明变量
"no-regex-spaces": 2,//禁止在正则表达式字面量中使用多个空格 /foo bar/
"no-restricted-modules": 0,//如果禁用了指定模块，使用就会报错
"no-return-assign": 1,//return 语句中不能有赋值表达式
"no-script-url": 0,//禁止使用javascript:void(0)
"no-self-compare": 2,//不能比较自身
"no-sequences": 0,//禁止使用逗号运算符
"no-shadow": 2,//外部作用域中的变量不能与它所包含的作用域中的变量或参数同名
"no-shadow-restricted-names": 2,//严格模式中规定的限制标识符不能作为声明时的变量名使用
"no-spaced-func": 2,//函数调用时 函数名与()之间不能有空格
"no-sparse-arrays": 2,//禁止稀疏数组， [1,,2]
"no-sync": 0,//nodejs 禁止同步方法
"no-ternary": 0,//禁止使用三目运算符
"no-trailing-spaces": 1,//一行结束后面不要有空格
"no-this-before-super": 0,//在调用super()之前不能使用this或super
"no-throw-literal": 2,//禁止抛出字面量错误 throw "error";
"no-undef": 1,//不能有未定义的变量
"no-undef-init": 2,//变量初始化时不能直接给它赋值为undefined
"no-undefined": 2,//不能使用undefined
"no-unexpected-multiline": 2,//避免多行表达式
"no-underscore-dangle": 1,//标识符不能以_开头或结尾
"no-unneeded-ternary": 2,//禁止不必要的嵌套 var isYes = answer === 1 ? true : false;
"no-unreachable": 2,//不能有无法执行的代码
"no-unused-expressions": 2,//禁止无用的表达式
"no-unused-vars": [2, {"vars": "all", "args": "after-used"}],//不能有声明后未被使用的变量或参数
"no-use-before-define": 2,//未定义前不能使用
"no-useless-call": 2,//禁止不必要的call和apply
"no-void": 2,//禁用void操作符
"no-var": 0,//禁用var，用let和const代替
"no-warning-comments": [1, { "terms": ["todo", "fixme", "xxx"], "location": "start" }],//不能有警告备注
"no-with": 2,//禁用with

"array-bracket-spacing": [2, "never"],//是否允许非空数组里面有多余的空格
"arrow-parens": 0,//箭头函数用小括号括起来
"arrow-spacing": 0,//=>的前/后括号
"accessor-pairs": 0,//在对象中使用getter/setter
"block-scoped-var": 0,//块语句中使用var
"brace-style": [1, "1tbs"],//大括号风格
"callback-return": 1,//避免多次调用回调什么的
"camelcase": 2,//强制驼峰法命名
"comma-dangle": [2, "never"],//对象字面量项尾不能有逗号
"comma-spacing": 0,//逗号前后的空格
"comma-style": [2, "last"],//逗号风格，换行时在行首还是行尾
"complexity": [0, 11],//循环复杂度
"computed-property-spacing": [0, "never"],//是否允许计算后的键名什么的
"consistent-return": 0,//return 后面是否允许省略
"consistent-this": [2, "that"],//this别名
"constructor-super": 0,//非派生类不能调用super，派生类必须调用super
"curly": [2, "all"],//必须使用 if(){} 中的{}
"default-case": 2,//switch语句最后必须有default
"dot-location": 0,//对象访问符的位置，换行的时候在行首还是行尾
"dot-notation": [0, { "allowKeywords": true }],//避免不必要的方括号
"eol-last": 0,//文件以单一的换行符结束
"eqeqeq": 2,//必须使用全等
"func-names": 0,//函数表达式必须有名字
"func-style": [0, "declaration"],//函数风格，规定只能使用函数声明/函数表达式
"generator-star-spacing": 0,//生成器函数*的前后空格
"guard-for-in": 0,//for in循环要用if语句过滤
"handle-callback-err": 0,//nodejs 处理错误
"id-length": 0,//变量名长度
"indent": [2, 4],//缩进风格
"init-declarations": 0,//声明时必须赋初值
"key-spacing": [0, { "beforeColon": false, "afterColon": true }],//对象字面量中冒号的前后空格
"lines-around-comment": 0,//行前/行后备注
"max-depth": [0, 4],//嵌套块深度
"max-len": [0, 80, 4],//字符串最大长度
"max-nested-callbacks": [0, 2],//回调嵌套深度
"max-params": [0, 3],//函数最多只能有3个参数
"max-statements": [0, 10],//函数内最多有几个声明
"new-cap": 2,//函数名首行大写必须使用new方式调用，首行小写必须用不带new方式调用
"new-parens": 2,//new时必须加小括号
"newline-after-var": 2,//变量声明后是否需要空一行
"object-curly-spacing": [0, "never"],//大括号内是否允许不必要的空格
"object-shorthand": 0,//强制对象字面量缩写语法
"one-var": 1,//连续声明
"operator-assignment": [0, "always"],//赋值运算符 += -=什么的
"operator-linebreak": [2, "after"],//换行时运算符在行尾还是行首
"padded-blocks": 0,//块语句内行首行尾是否要空行
"prefer-const": 0,//首选const
"prefer-spread": 0,//首选展开运算
"prefer-reflect": 0,//首选Reflect的方法
"quotes": [1, "single"],//引号类型 `` "" ''
"quote-props":[2, "always"],//对象字面量中的属性名是否强制双引号
"radix": 2,//parseInt必须指定第二个参数
"id-match": 0,//命名检测
"require-yield": 0,//生成器函数必须有yield
"semi": [2, "always"],//语句强制分号结尾
"semi-spacing": [0, {"before": false, "after": true}],//分号前后空格
"sort-vars": 0,//变量声明时排序
"space-after-keywords": [0, "always"],//关键字后面是否要空一格
"space-before-blocks": [0, "always"],//不以新行开始的块{前面要不要有空格
"space-before-function-paren": [0, "always"],//函数定义时括号前面要不要有空格
"space-in-parens": [0, "never"],//小括号里面要不要有空格
"space-infix-ops": 0,//中缀操作符周围要不要有空格
"space-return-throw-case": 2,//return throw case后面要不要加空格
"space-unary-ops": [0, { "words": true, "nonwords": false }],//一元运算符的前/后要不要加空格
"spaced-comment": 0,//注释风格要不要有空格什么的
"strict": 2,//使用严格模式
"use-isnan": 2,//禁止比较时使用NaN，只能用isNaN()
"valid-jsdoc": 0,//jsdoc规则
"valid-typeof": 2,//必须使用合法的typeof的值
"vars-on-top": 2,//var必须放在作用域顶部
"wrap-iife": [2, "inside"],//立即执行函数表达式的小括号风格
"wrap-regex": 0,//正则表达式字面量用小括号包起来
"yoda": [2, "never"]//禁止尤达条件

// "strict": "off",
// "no-console": "off",
// "import/no-dynamic-require": "off",
// "global-require": "off",
// "require-yield": "off",
// 自定义的规则
// 必须使用 === 或 !==，禁止使用 == 或 !=，与 null 比较时除外
// @warn 在异步接口返回时不确定参数是数值还是字符串，有时可利用这个类型转换
'eqeqeq': 'warn',
// 禁止在 if 代码块内出现函数声明
// @off 在for循环中会经常使用定义var  for(var i = 0; i < 10; ++i)
'no-inner-declarations': 'off',
// switch 的 case 内有变量定义的时候，必须使用大括号将 case 内变成一个代码块
// @off 太严格
'no-case-declarations': 'off',
// 禁止使用 !! ~ 等难以理解的运算符
// @off 有些时候会用到 if (!!abc)   '' + 100   +new Date() 等
'no-implicit-coercion': 'off',
// 禁止在全局作用域下定义变量或申明函数
// @off 太严格
'no-implicit-globals': 'off',
// 禁止使用没必要的 {} 作为代码块
// @off 有时候需要用代码块做逻辑区分
'no-lone-blocks': 'off',
// 禁止出现 location.href = 'javascript:void(0)';
// @off 有时候需要用便捷的 javascript:;
'no-script-url': 'off',
// 对象字面量只有一行时，大括号内的首尾必须有空格
// @off 没有必要限制
'object-curly-spacing': 'off',
// 禁止对函数的参数重新赋值
// @warn 警示即可
'no-param-reassign': 'warn',
// 文件最后一行必须有一个空行
// @error 应该在文件末尾保持一个换行
'eol-last': 'error',
// 代码块嵌套的深度禁止超过 10 层
// @warn 有些特殊情况会出现  警示即可
'max-depth': [
  'warn',
  10
],
// 禁止函数的循环复杂度超过 100
// @error 最大值可以宽松点
'complexity': [
  'error',
  {
    max: 100
  }
],
// 定义过的变量必须使用
// @warn 多文件互相引用时 偶尔会出现无引用的情况
'no-unused-vars': [
  'warn',
  {
    vars: 'all',
    args: 'none',
    caughtErrors: 'none',
    ignoreRestSiblings: true
  }
],
// 在ES5中需使用var
// @off 没有必要限制
'no-var': 'off',
// 禁止使用未定义的变量  建议将相关变量在上方 globals 配置项中配置
// @warn 警示即可
'no-undef': 'warn',
// 函数的参数禁止超过10个
// @warn 警示即可
'max-params': ['warn', 10],
// 回调函数嵌套禁止超过 5 层
// @warn 警示即可
'max-nested-callbacks': ['warn', 5],
// 循环内的函数中不能出现循环体条件语句中定义的变量
// @warn 警示即可
'no-loop-func': 'warn',
// Promise 的 reject 中必须传入 Error 对象
// @off 不需要限制
'prefer-promise-reject-errors': 'off',
// 变量声明时尽量使用一个var声明连续的多个
// @warn 警示即可
'one-var': [
  'error',
  'consecutive'
],
// 变量申明必须每行一个
// @error 赋值时保证处于一行即可
'one-var-declaration-per-line': [
  'error',
  'initializations'
],
'block-spacing': 'error'

// 禁止使用已废弃的 api
// @off 不需要限制
// 'react/no-deprecated': 'off',
// 禁止使用字符串 ref
// @warn 警告即可
// 'react/no-string-refs': 'warn',
// 必须使用 Class 的形式创建组件
// @warn 警告即可
// 'react/prefer-es6-class': [
//   'warn',
//   'always'
// ],
// 禁止在 componentDidUpdate 里面使用 setState
// @warn 警告即可
// 'react/no-did-update-set-state': 'warn',
// // 组件内方法必须按照一定规则排序
// // @off 不需要限制
// 'react/sort-comp': 'off',

// jsx 的 props 缩进必须为四个空格
// @off 不需要限制
// 'react/jsx-indent-props': 'off',

