vuejs 基础必备
1. active-class 是哪个组件的属性？嵌套路由怎么定义

　　(1)、active-class 是 vue-router 模块的 router-link 组件的属性
　　(2)、使用 children 定义嵌套路由

2. 怎么定义 vue-router 的动态路由? 怎么获取传过来的值

　　在 router 目录下的 index.js 文件中，对 path 属性加上 /:id。

　　使用 router 对象的 params.id 获取

3. vue-router 有哪几种导航钩子?

　　三种，

　　(1)、全局导航钩子

　　　　router.beforeEach(to, from, next),

　　　　router.beforeResolve(to, from, next),

　　　　router.afterEach(to, from ,next)

　　(2)、组件内钩子
　　　　
　　　　beforeRouteEnter, beforeRouteUpdate, beforeRouteLeave

　　(3)、单独路由独享组件

　　　　beforeEnter

4. v-model 是什么？怎么使用？ vue中标签怎么绑定事件

　　v-model 可以实现双向绑定，

　　绑定事件：<input @click="rdhub.cn" />

5. axios 是什么？怎么使用？描述使用它实现登录功能的流程

　　axios 是请求后台资源的模块。 npm i axios -S

　　如果发送的是跨域请求，需在配置文件中 config/index.js 进行配置

6. vuex 是什么？怎么使用？哪种功能场景使用它

　　vuex 是专门为 vue 开发的数据状态管理模式。组件之间数据状态共享

　　使用场景：音乐播放、登录状态、购物车

// 新建 store.js
import vue from 'vue'
import vuex form 'vuex'
vue.use(vuex)
export default new vuex.store({ 
    //...rdhub.cn
}) 

//main.js
import store from './store'
...
7. mvvm 框架是什么？它和其他框架(jquery) 的区别是什么？哪些场景适合

　　mvvm 是 model + view + viewmodel 框架，通过 viewmodel 连接数据模型model 和 view

　　区别：vue 是数据驱动，通过数据来显示视图层而不是节点操用

　　场景：数据操作比较多的场景，更加快捷

    MVVM 是 Model-View-ViewModel 的缩写。
    Model代表数据模型，也可以在Model中定义数据修改和操作的业务逻辑。
    View 代表UI 组件，它负责将数据模型转化成UI 展现出来。
    ViewModel 监听模型数据的改变和控制视图行为、处理用户交互，简单理解就是一个同步View 和 Model的对象，连接Model和View。
    在MVVM架构下，View 和 Model 之间并没有直接的联系，而是通过ViewModel进行交互，Model 和 ViewModel 之间的交互是双向的， 因此View 数据的变化会同步到Model中，而Model 数据的变化也会立即反应到View 上。
    ViewModel 通过双向数据绑定把 View 层和 Model 层连接了起来，而View 和 Model 之间的同步工作完全是自动的，无需人为干涉，因此开发者只需关注业务逻辑，不需要手动操作DOM, 不需要关注数据状态的同步问题，复杂的数据状态维护完全由 MVVM 来统一管理。

8. 自定义指令(v-check, v-focus) 的方法有哪些? 它有哪些钩子函数? 还有哪些钩子函数参数

　　全局定义指令：在 vue 对象的 directive 方法里面有两个参数, 一个是指令名称, 另一个是函数。

　　组件内定义指令：directives

　　钩子函数: bind(绑定事件出发)、inserted(节点插入时候触发)、update(组件内相关更新)

　　钩子函数参数： el、binding

9. 说出至少 4 种 vue 当中的指令和它的用法

　　v-if(判断是否隐藏)、v-for(把数据遍历出来)、v-bind(绑定属性)、v-model(实现双向绑定)

10. vue-router 是什么?它有哪些组件

　　vue-router 是 vue 的路由插件,

　　组件：router-link router-view

11. vue 的双向绑定的原理是什么

　　vue.js 是采用数据劫持结合发布者-订阅者模式的方式，通过Object.defineProperty()来劫持各个属性的setter，getter，在数据变动时发布消息给订阅者，触发相应的监听回调。

　　具体步骤：

　　第一步：需要 observe 的数据对象进行递归遍历，包括子属性对象的属性，都加上 setter 和 getter 
这样的话，给这个对象的某个值赋值，就会触发setter，那么就能监听到了数据变化

　　第二步：compile解析模板指令，将模板中的变量替换成数据，然后初始化渲染页面视图，并将每个指令对应的节点绑定更新函数，添加监听数据的订阅者，一旦数据有变动，收到通知，更新视图

　　第三步：Watcher订阅者是Observer和Compile之间通信的桥梁，主要做的事情是:

　　1、在自身实例化时往属性订阅器(dep)里面添加自己

　　2、自身必须有一个update()方法

　　3、待属性变动dep.notice()通知时，能调用自身的 update() 方法，并触发Compile中绑定的回调，则功成身退。

　　第四步：MVVM作为数据绑定的入口，整合Observer、Compile和Watcher三者，通过Observer来监听自己的model数据变化，通过Compile来解析编译模板指令，最终利用Watcher搭起Observer和Compile之间的通信桥梁，达到数据变化 -> 视图更新；视图交互变化(input) -> 数据model变更的双向绑定效果。

12. 请详细说下你对vue生命周期的理解

　　总共分为8个阶段创建前/后，载入前/后，更新前/后，销毁前/后。

　　创建前/后

　　在beforeCreated阶段，vue实例的挂载元素$el和数据对象data都为undefined，还未初始化。

　　在created阶段，vue实例的数据对象data有了，$el还没有。

　　载入前/后

　　在beforeMount阶段，vue实例的$el和data都初始化了，但还是挂载之前为虚拟的dom节点，data.message还未替换。

　　在mounted阶段，vue实例挂载完成，data.message成功渲染。

　　更新前/后

　　当data变化时，会触发beforeUpdate和updated方法。

　　销毁前/后

　　在执行destroy方法后，对data的改变不会再触发周期函数，说明此时vue实例已经解除了事件监听以及和dom的绑定，但是dom结构依然存在

13. 请说下 vue 组件的优点，以及注册使用的过程？

答：首先，组件可以提升整个项目的开发效率。能够把页面抽象成多个相对独立的模块，解决了我们传统项目开发：效率低、难维护、复用性等问题。

使用Vue.component方法注册组件。子组件需要数据，可以在props中接受定义。而子组件修改好数据后，想把数据传递给父组件。可以采用emit方法。


14. 你觉得哪些项目适合vue框架？

答：1、数据信息量比较多的。

2、手机web和app应用多端共用一套界面的项目，因为使用vue.cli+webpack后的前端目录，非常有利于项目的跨平台部署

15. 综合问题
    1. SPA优化、vue优化、后端渲染ssr(seo优化)、组件异步加载、vue如何优化首屏加载速度
    2. Vue与Angular以及React的区别
       1. 与AngularJS的区别
        相同点：
        都支持指令：内置指令和自定义指令；都支持过滤器：内置过滤器和自定义过滤器；都支持双向数据绑定；都不支持低端浏览器。

        不同点：
        AngularJS的学习成本高，比如增加了Dependency Injection特性，而Vue.js本身提供的API都比较简单、直观；在性能上，AngularJS依赖对数据做脏检查，所以Watcher越多越慢；Vue.js使用基于依赖追踪的观察并且使用异步队列更新，所有的数据都是独立触发的。

        2. 与React的区别
        相同点：
        React采用特殊的JSX语法，Vue.js在组件开发中也推崇编写.vue特殊文件格式，对文件内容都有一些约定，两者都需要编译后使用；中心思想相同：一切都是组件，组件实例之间可以嵌套；都提供合理的钩子函数，可以让开发者定制化地去处理需求；都不内置列数AJAX，Route等功能到核心包，而是以插件的方式加载；在组件开发中都支持mixins的特性。
        不同点：
        React采用的Virtual DOM会对渲染出来的结果做脏检查；Vue.js在模板中提供了指令，过滤器等，可以非常方便，快捷地操作Virtual DOM。

16. Vue组件间的参数传递
1.父组件与子组件传值
父组件传给子组件：子组件通过props方法接受数据;
子组件传给父组件：$emit方法传递参数
2.非父子组件间的数据传递，兄弟组件传值
eventBus，就是创建一个事件中心，相当于中转站，可以用它来传递事件和接收事件。项目比较小时，用这个比较合适。（虽然也有不少人推荐直接用VUEX，具体来说看需求咯。技术只是手段，目的达到才是王道。）

17. Vue的路由实现：hash模式 和 history模式
    hash模式：在浏览器中符号“#”，#以及#后面的字符称之为hash，用window.location.hash读取；
    特点：hash虽然在URL中，但不被包括在HTTP请求中；用来指导浏览器动作，对服务端安全无用，hash不会重加载页面。
    hash 模式下，仅 hash 符号之前的内容会被包含在请求中，如 http://www.xxx.com，因此对于后端来说，即使没有做到对路由的全覆盖，也不会返回 404 错误。

    history模式：history采用HTML5的新特性；且提供了两个新方法：pushState（），replaceState（）可以对浏览器历史记录栈进行修改，以及popState事件的监听到状态变更。
    history 模式下，前端的 URL 必须和实际向后端发起请求的 URL 一致，如 http://www.xxx.com/items/id。后端如果缺少对 /items/id 的路由处理，将返回 404 错误。Vue-Router 官网里如此描述：“不过这种模式要玩好，还需要后台配置支持……所以呢，你要在服务端增加一个覆盖所有情况的候选资源：如果 URL 匹配不到任何静态资源，则应该返回同一个 index.html 页面，这个页面就是你 app 依赖的页面。”

18. 对keep-alive 的了解
    keep-alive是 Vue 内置的一个组件，可以使被包含的组件保留状态，或避免重新渲染。
    在vue 2.1.0 版本之后，keep-alive新加入了两个属性: include(包含的组件缓存) 与 exclude(排除的组件不缓存，优先级大于include) 。
    使用方法  
    ```javascript
      <keep-alive include='include_components' exclude='exclude_components'>
        <component>
          <!-- 该组件是否缓存取决于include和exclude属性 -->
        </component>
      </keep-alive>
    ```
    参数解释
    include - 字符串或正则表达式，只有名称匹配的组件会被缓存
    exclude - 字符串或正则表达式，任何名称匹配的组件都不会被缓存
    include 和 exclude 的属性允许组件有条件地缓存。二者都可以用“，”分隔字符串、正则表达式、数组。当使用正则或者是数组时，要记得使用v-bind 。
-------

vuex 面试题
1. 有哪几种属性

　　有 5 种，分别是 state、getter、mutation、action、module

2. vuex 的 store 特性是什么

　　(1) vuex 就是一个仓库，仓库里放了很多对象。其中 state 就是数据源存放地，对应于一般 vue 对象里面的 data

　　(2) state 里面存放的数据是响应式的，vue 组件从 store 读取数据，若是 store 中的数据发生改变，依赖这相数据的组件也会发生更新

　　(3) 它通过 mapState 把全局的 state 和 getters 映射到当前组件的 computed 计算属性

3.  vuex 的 getter 特性是什么

　　(1) getter 可以对 state 进行计算操作，它就是 store 的计算属性

　　(2) 虽然在组件内也可以做计算属性，但是 getters 可以在多给件之间复用

　　(3) 如果一个状态只在一个组件内使用，是可以不用 getters

4. vuex 的 mutation 特性是什么

　　action 类似于 muation, 不同在于：action 提交的是 mutation,而不是直接变更状态

　　action 可以包含任意异步操作

5. vue 中 ajax 请求代码应该写在组件的methods中还是vuex 的action中

　　如果请求来的数据不是要被其他组件公用，仅仅在请求的组件内使用，就不需要放入 vuex 的 state 里

　　如果被其他地方复用，请将请求放入 action 里，方便复用，并包装成 promise 返回

5. 不用 vuex 会带来什么问题

　　可维护性会下降，你要修改数据，你得维护3个地方

　　可读性下降，因为一个组件里的数据，你根本就看不出来是从哪里来的

　　增加耦合，大量的上传派发，会让耦合性大大的增加，本来Vue用Component就是为了减少耦合，现在这么用，和组件化的初衷相背

--------
生命周期面试题
1. 什么是 vue 生命周期

　　vue 实例从创建到销毁的过程就是生命周期。

　　也就是从开始创建、初始化数据、编译模板、挂在 dom -> 渲染、更新 -> 渲染、写在等一系列过程

2. vue生命周期的作用是什么

　　生命周期中有多个事件钩子，让我们在控制整个 vue 实例的过程时更容易形成好的逻辑

3. vue生命周期总共有几个阶段

　　8个阶段：创建前/后、载入前/后、更新前/后、销毁前/后

4. 第一次页面加载会触发哪几个钩子

　　第一次加载会触发 beforeCreate、created、beforeMount、mounted

5. DOM 渲染在哪个周期中就已经完成

　　mounted

6. 简述每个周期具体适合哪些场景

　　生命周期钩子的一些使用方法：

　　beforecreate : 可以在这加个loading事件，在加载实例时触发

　　created : 初始化完成时的事件写在这里，如在这结束loading事件，异步请求也适宜在这里调用

　　mounted : 挂载元素，获取到DOM节点 updated : 如果对数据统一处理，在这里写上相应函数

　　beforeDestroy : 可以做一个确认停止事件的确认框 nextTick : 更新数据后立即操作dom！


----------------

### 一句话就能回答的面试题

1. css只在当前组件起作用
答：在style标签中写入scoped即可 例如：<style scoped></style>

2. v-if 和 v-show 区别
答：v-if按照条件是否渲染，v-show是display的block或none；

3. $route和$router的区别
答：$route是“路由信息对象”，包括path，params，hash，query，fullPath，matched，name等路由信息参数。而$router是“路由实例”对象包括了路由的跳转方法，钩子函数等。

4. vue.js的两个核心是什么？
答：数据驱动、组件系统

5. vue几种常用的指令
答：v-for 、 v-if 、v-bind、v-on、v-show、v-else

6. vue常用的修饰符？
答：.prevent: 提交事件不再重载页面；.stop: 阻止单击事件冒泡；.self: 当事件发生在该元素本身而不是子元素的时候会触发；.capture: 事件侦听，事件发生的时候会调用

7. v-on 可以绑定多个方法吗？
答：可以

8. vue中 key 值的作用？
答：当 Vue.js 用 v-for 正在更新已渲染过的元素列表时，它默认用“就地复用”策略。如果数据项的顺序被改变，Vue 将不会移动 DOM 元素来匹配数据项的顺序， 而是简单复用此处每个元素，并且确保它在特定索引下显示已被渲染过的每个元素。key的作用主要是为了高效的更新虚拟DOM。

9. 什么是vue的计算属性？
答：在模板中放入太多的逻辑会让模板过重且难以维护，在需要对数据进行复杂处理，且可能多次使用的情况下，尽量采取计算属性的方式。好处：①使得数据处理结构清晰；②依赖于数据，数据更新，处理结果自动更新；③计算属性内部this指向vm实例；④在template调用时，直接写计算属性名即可；⑤常用的是getter方法，获取数据，也可以使用set方法改变数据；⑥相较于methods，不管依赖的数据变不变，methods都会重新计算，但是依赖数据不变的时候computed从缓存中获取，不会重新计算。

10. vue等单页面应用及其优缺点
答：优点：Vue 的目标是通过尽可能简单的 API 实现响应的数据绑定和组合的视图组件，核心是一个响应的数据绑定系统。MVVM、数据驱动、组件化、轻量、简洁、高效、快速、模块友好。
缺点：不支持低版本的浏览器，最低只支持到IE9；不利于SEO的优化（如果要支持SEO，建议通过服务端来进行渲染组件）；第一次加载首页耗时相对长一些；不可以使用浏览器的导航按钮需要自行实现前进、后退。

11. 请说出vue.cli项目中src目录每个文件夹和文件的用法？
答：assets文件夹是放静态资源；components是放组件；router是定义路由相关的配置;view视图；app.vue是一个应用主组件；main.js是入口文件

12. vue3 会增加什么？

13. $nextTick的使用

14. v-for 与 v-if 的优先级

15. vue中如何编写可复用的组件

### 加难度问题
1、vue响应式原理？
2、vue-router实现原理？
3、为什么要选vue？与其它框架对比的优势和劣势？
4、vue如何实现父子组件通信，以及非父子组件通信？
5、vuejs与angularjs以及react的区别？
6、vuex是用来做什么的？
7、vue源码结构