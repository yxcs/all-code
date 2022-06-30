class iFunction {
  constructor() {
    super();
  }
  /**
   * 函数延迟执行
   * @param {*} func 需要执行的函数
   * @param {*} wait 延迟时间
   */
  delay(func, wait) {
    if (typeof func !== 'function') {
      return false;
    }
    var args = slice.call(arguments, 2);
    return setTimeout(function () {
      return func.apply(null, args);
    }, wait);
  }

  // 函数节流方法, throttle方法主要用于控制函数的执行频率, 在被控制的时间间隔内, 频繁调用函数不会被多次执行
  // 在时间间隔内如果多次调用了函数, 时间隔截止时会自动调用一次, 不需要等到时间截止后再手动调用(自动调用时不会有返回值)
  // throttle函数一般用于处理复杂和调用频繁的函数, 通过节流控制函数的调用频率, 节省处理资源
  // 例如window.onresize绑定的事件函数, 或element.onmousemove绑定的事件函数, 可以用throttle进行包装
  // throttle方法返回一个函数, 该函数会自动调用func并进行节流控制
  /**
   * 函数节流
   * @param {*} fn 
   * @param {*} wait 
   */
  throttle(fn, wait, time) {
    var previous = null; //记录上一次运行的时间
    var timer = null;
    return function () {
      var now = +new Date();
      if (!previous) previous = now;
      //当上一次执行的时间与当前的时间差大于设置的执行间隔时长的话，就主动执行一次
      if (now - previous > time) {
        clearTimeout(timer);
        fn();
        previous = now; // 执行函数后，马上记录当前时间
      } else {
        clearTimeout(timer);
        timer = setTimeout(function () {
          fn();
        }, wait);
      }
    }
  }
  // debounce与throttle方法类似, 用于函数节流, 它们的不同之处在于:
  // -- throttle关注函数的执行频率, 在指定频率内函数只会被执行一次;
  // -- debounce函数更关注函数执行的间隔, 即函数两次的调用时间不能小于指定时间;
  // 如果两次函数的执行间隔小于wait, 定时器会被清除并重新创建, 这意味着连续频繁地调用函数, 函数一直不会被执行, 直到某一次调用与上一次调用的时间不小于wait毫秒
  // debounce函数一般用于控制需要一段时间之后才能执行的操作, 例如在用户输入完毕200ms后提示用户, 可以使用debounce包装一个函数, 绑定到onkeyup事件
  // ----------------------------------------------------------------
  /**
   * 函数防抖
   * @param {*} fn 
   * @param {*} wait 
   */
  debounce(fn, wait) {
    var timer = null;
    return function () {
      clearTimeout(timer)
      timer = setTimeout(() => {
        fn()
      }, wait)
    }
  }
  /**
   * 函数只执行一次
   * @param {*} func 
   */
  once(func) {
    // ran记录函数是否被执行过
    // memo记录函数最后一次执行的结果
    var ran = false,
      memo;
    return function () {
      // 如果函数已被执行过, 则直接返回第一次执行的结果
      if (ran)
        return memo;
      ran = true;
      return memo = func.apply(this, arguments);
    };
  }

  //获取正在执行的js标签
  getCurInteractiveScript() {
    //先看ff4+原生支持的  
    if (document.currentScript) {
      return document.currentScript;
    }

    var elems = document.getElementsByTagName("script");
    for (var i = 0, elem; elem = elems[i++];) {
      if (elem.readyState === 'interactive') {
        return elem;
      }
    }

    return null;
  }

  /**
   * 函数重载
   * 同一个函数接收不同的函数，返回不同的结果
   * @param {*} obj 
   * @param {*} name 
   * @param {*} fn 
   */
  addMethod(obj,name,fn) {
    var old = obj[name] 
    obj[name] = function  () {
      arguments.length==fn.length?fn.apply(this.arguments):typeof old =='function'&&old.apply(this.arguments)
    }
  }

}