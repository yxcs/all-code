# Tab


### 
```js
const Tabs = [{title: 'First'}, {title: 'Second'}, {title: 'Third'}];
const Normal = () => (
  <Tab tabs={Tabs}>
    <div style={{height: 100, backgroundColor: 'white'}}>tab1</div>
    <div style={{height: 100, backgroundColor: 'white'}}>tab2</div>
    <div style={{height: 100, backgroundColor: 'white'}}>tab3</div>
  </Tab>
);

```


### 
```js
const TintColor = () => (
  <Tab tabs={Tabs} tintColor="green">
    <div style={{height: 100, backgroundColor: 'white'}}>tab1</div>
    <div style={{height: 100, backgroundColor: 'white'}}>tab2</div>
    <div style={{height: 100, backgroundColor: 'white'}}>tab3</div>
  </Tab>
);

```


### 
```js
const Tabs5 = [
  {title: 'First'},
  {title: 'Second'},
  {title: 'Third'},
  {title: 'Forth'},
  {title: 'Fifth'}
];
const Over3Tabs = () => (
  <Tab tabs={Tabs5}>
    <div style={{height: 100, backgroundColor: 'white'}}>tab1</div>
    <div style={{height: 100, backgroundColor: 'white'}}>tab2</div>
    <div style={{height: 100, backgroundColor: 'white'}}>tab3</div>
    <div style={{height: 100, backgroundColor: 'white'}}>tab4</div>
    <div style={{height: 100, backgroundColor: 'white'}}>tab5</div>
  </Tab>
);

```


### 
```js
const NoAnimation = () => (
  <Tab tabs={Tabs5} animation={false}>
    <div style={{height: 100, backgroundColor: 'white'}}>tab1</div>
    <div style={{height: 100, backgroundColor: 'white'}}>tab2</div>
    <div style={{height: 100, backgroundColor: 'white'}}>tab3</div>
    <div style={{height: 100, backgroundColor: 'white'}}>tab4</div>
    <div style={{height: 100, backgroundColor: 'white'}}>tab5</div>
  </Tab>
);

```


### 
```js
const Swipeable = () => (
  <Tab tabs={Tabs5} swipeable={true}>
    <div style={{height: 100, backgroundColor: 'white'}}>tab1</div>
    <div style={{height: 100, backgroundColor: 'white'}}>tab2</div>
    <div style={{height: 100, backgroundColor: 'white'}}>tab3</div>
    <div style={{height: 100, backgroundColor: 'white'}}>tab4</div>
    <div style={{height: 100, backgroundColor: 'white'}}>tab5</div>
  </Tab>
);

```


### 
```js
const TabsNumber = () => (
  <Tab tabs={Tabs5} tabsNumber={5}>
    <div style={{height: 100, backgroundColor: 'white'}}>tab1</div>
    <div style={{height: 100, backgroundColor: 'white'}}>tab2</div>
    <div style={{height: 100, backgroundColor: 'white'}}>tab3</div>
    <div style={{height: 100, backgroundColor: 'white'}}>tab4</div>
    <div style={{height: 100, backgroundColor: 'white'}}>tab5</div>
  </Tab>
);

```


### 
```js
const Tabs8 = [
  {title: 'First'},
  {title: 'Second'},
  {title: 'Third'},
  {title: 'Forth'},
  {title: 'Fifth'},
  {title: 'Six'},
  {title: 'Seven'},
  {title: 'Eight'}
];
const TabsNumberOverFive = () => (
  <Tab tabs={Tabs8} tabsNumber={5}>
    <div style={{height: 100, backgroundColor: 'white'}}>tab1</div>
    <div style={{height: 100, backgroundColor: 'white'}}>tab2</div>
    <div style={{height: 100, backgroundColor: 'white'}}>tab3</div>
    <div style={{height: 100, backgroundColor: 'white'}}>tab4</div>
    <div style={{height: 100, backgroundColor: 'white'}}>tab5</div>
    <div style={{height: 100, backgroundColor: 'white'}}>tab6</div>
    <div style={{height: 100, backgroundColor: 'white'}}>tab7</div>
    <div style={{height: 100, backgroundColor: 'white'}}>tab8</div>
  </Tab>
);
const TabsDemo = () => (
  <div>
    <Normal />
    <WhiteSpace />
    <TintColor />
    <WhiteSpace />
    <Over3Tabs />
    <WhiteSpace />
    <NoAnimation />
    <WhiteSpace />
    <Swipeable />
    <WhiteSpace />
    <TabsNumber />
    <WhiteSpace />
    <TabsNumberOverFive />
  </div>
);

```


## API 描述
|名字| 描述|类型|是否需要|默认值|
| ------------- |:-------------:|:-----:| -----:|-----:|
|tabs| tab 组件的数据源|array|false|undefined|
|initialPage| 初始页面的 index, 从 0 开始|number|false|0|
|tintColor| tab 的颜色|string|false|#FF9900|
|onTabPress| 当 tab 被点击时触发|func|false|undefined|
|onChange| 当 tab 切换时触发|func|false|undefined|
|animation| 切换是否有动画|bool|false|true|
|swipeable| 能否手指滑动切换|bool|false|false|
|tabsNumber| tabs 在屏幕中显示的个数|number|false|3|
    