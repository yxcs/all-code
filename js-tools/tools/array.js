class IArray {
  constructor() {
    super();
  }
  /**
   * 浅拷贝
   * @param {*} Obj #需要拷贝的对象
   */
  easyClone(obj) {
    const objNew = {};
    for (let i in obj) {
      objNew[i] = obj[i];
    }
    return objNew;
  }
  easyClone2(obj) {
    return JSON.parse(JSON.stringify(obj));
  }
  /**
   * 对象数组深拷贝
   * @param {*} obj #需要拷贝的对象
   */
  deepCopy(obj) {
    if (typeof obj !== "object") {
      return obj;
    }
    const objNew = obj.constructor === Array ? [] : {};
    for (let i in obj) {
      if (typeof p[i] === "object") {
        objNew[i] = p[i].constructor === Array ? [] : {};
        deepCopy(obj[i], objNew[i]);
      } else {
        objNew[i] = obj[i];
      }
    }
    return objNew;
  }
  /**
   * 数组去重
   * @param {*} arr
   */
  unique(arr) {
    var temp = [];
    for (var i = 0; i < arr.length; i++) {
      if (temp.indexOf(arr[i]) == -1) {
        temp.push(arr[i]);
      }
    }
    return temp;
  }
  unique2(arr) {
    const obj = {};
    const newArr = [];
    for (let i = 0; i < arr.length; i++) {
      if (!obj[arr[i]]) {
        obj[arr[i]] = 1;
        newArr.push(arr[i]);
      }
    }
    return newArr;
  }
  unique3(arr) {
    var newArr = [arr[0]];
    for (var i = 1; i < arr.length; i++) {
      var repeat = false;
      for (var j = 0; j < newArr.length; j++) {
        if (arr[i] == newArr[j]) {
          repeat = true;
          break;
        }
      }
      if (!repeat) {
        newArr.push(arr[i]);
      }
    }
    return newArr;
  }
  /**
   * 打乱数组，快排有用？
   * @param {*} arr 
   */
  shuffle(arr) {
    if (!arr && arr instanceof Array) {
      return false;
    }
    var len = arr.length;
    var rand;
    var nArr = [];
    for (var i = 0; i < len; i++) {
      (function(i) {
        rand = Math.floor(Math.random() * (i + 1));
        nArr[i] = nArr[rand];
        nArr[rand] = arr[i];
      })(i);
    }
    return nArr;
  }
  /**
   * 类数组结构转为数组  主要用于arguments
   * @param {*} arg 
   */
  toArray(arg) {
    return Array.prototype.slice.call(arg);
  }
  /*
   * 输入数组，会随机抽取数组中的一个值输出
   */
  arr_random(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
  }
}
