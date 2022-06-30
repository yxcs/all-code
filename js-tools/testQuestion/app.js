// let a = ['a', 'b', 'c', 'd', 'e','f','g'];

// const chunk = (arr, num) => {
//   if (num <= 0) return arr;
//   const len = arr.length;
//   if (num >= len) return [arr];
//   const nArr = [];
//   let flag = 0;
//   let index = 0;
//   for (let i = 0; i < len; i++) {
//     if (flag >= num) {
//       flag = 0;
//       index ++;
//     }
//     if (!!nArr[index]) {
//       nArr[index].push(arr[i]);
//     } else {
//       nArr[index] = [arr[i]];
//     }
//     flag ++;
//   }
//   return nArr;
// }

// console.log(chunk(a, 1))

// let data = {
//   rows: [
//     ["Lisa", 16, "Female", "2000-12-01"],
//     ["Bob", 22, "Male", "1996-01-21"]
//   ],
//   metaData: [{
//     name: "name",
//     note: ''
//   }, {
//     name: "age",
//     note: ''
//   }, {
//     name: "gender",
//     note: ''
//   }, {
//     name: "birthday",
//     note: ''
//   }]
// }


// const parseData = (data) => {
//   if (!data.rows || !data.metaData) return [];
//   const result = [];
//   data.rows.map(item => {
//     let col = {};
//     item.map((sItem, sIndex) => {
//       col[data.metaData[sIndex].name] = sItem
//     })
//     result.push(col);
//   })
//   return result;
// }

// console.log(parseData(data))


function Presion(name) {
  this.actions = [];
  this.current = 0;

  var helloFunc = function () {
      console.log("Hi This is " + name + "!");
      this.act();
  }.bind(this)

  this.addAction(helloFunc);

  setTimeout(function () {
      this.act();
  }.bind(this), 0);
}

// 调用下一个动作
Presion.prototype.act = function () {
  var actions = this.actions;
  return actions[this.current] && actions[this.current++]();
}

// 向动作队列添加动作
Presion.prototype.addAction = function (func, isFirst) {
  if (!isFirst) {
      this.actions.push(func);
  } else {
      this.actions.unshift(func);
  }
}

// 休眠
Presion.prototype.sleep = function (time) {
  var sleepFunc = function () {
      setTimeout(function () {
          console.log("Wake up after " + time + "ms");
          this.act();
      }.bind(this), time)
  }.bind(this);
  this.addAction(sleepFunc);
  return this;
}

// 吃饭
Presion.prototype.eat = function (food) {
  var eatFunc = function () {
      console.log("Eat " + food + "~");
      this.act();
  }.bind(this);
  this.addAction(eatFunc);
  return this;
}

// 睡觉优先
Presion.prototype.sleepFirst = function (time) {
  var sleepFirstFunc = function () {
      setTimeout(function () {
          console.log("Wake up after " + time + "ms");
          this.act();
      }.bind(this), time)
  }.bind(this);
  this.addAction(sleepFirstFunc, true);
  return this;
}