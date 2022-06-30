class Tool {
  constructor() {}
  /**
   * 设置cookie
   * @param {名称} c_name 
   * @param {值} value 
   * @param {有效日期 天数} expiredays 
   */
  setCookie(c_name, value, expiredays) {
    const exdate = new Date();
    exdate.setDate(exdate.getDate() + expiredays);
    document.cookie = c_name + "=" + escape(value) + ((expiredays == null) ? "" : ";expires=" + exdate.toGMTString());
    return true;
  }
  getCookie(c_name) {
    const arr, reg = new RegExp("(^| )" + c_name + "=([^;]*)(;|$)");
    if (arr = document.cookie.match(reg)) {
      return (arr[2]);
    } else {
      return null;
    }
  }
  delCookie(c_name) {
    const exp = new Date();
    exp.setTime(exp.getTime() - 1);
    const cval = getCookie(c_name);
    if (cval != null) {
      document.cookie = c_name + "=" + cval + ";expires=" + exp.toGMTString();
    }
    return true;
  }
  /**
   *  url转为对象
   * @param {*} url 
   */
  parseQueryString(url) {
    url = url == null ? window.location.href : url
    var search = url[0] === '?' ? url.substr(1) : url.substring(url.lastIndexOf('?') + 1)
    if (search === '') return {}
    search = search.split('&');
    var query = {};
    for (var i = 0; i < search.length; i++) {
      var pair = search[i].split('=');
      query[decodeURIComponent(pair[0])] = decodeURIComponent(pair[1] || '');
    }
    return query;
  }
  /**
   *  对象序列化(对象转成url参数)
   * @param {*} obj 
   */
  stringfyQueryString(obj) {
    if (!obj) return '';
    var pairs = [];
  
    for (var key in obj) {
      var value = obj[key];
  
      if (value instanceof Array) {
        for (var i = 0; i < value.length; ++i) {
          pairs.push(encodeURIComponent(key + '[' + i + ']') + '=' + encodeURIComponent(value[i]));
        }
        continue;
      }
  
      pairs.push(encodeURIComponent(key) + '=' + encodeURIComponent(obj[key]));
    }
  
    return pairs.join('&');
  }

  /**
   * 格式化现在距${endTime}的剩余时间
   * @param {*} endTime 
   */
  ormatRemainTimefunction(endTime) {
    var startDate = new Date(); //开始时间
    var endDate = new Date(endTime); //结束时间
    var t = endDate.getTime() - startDate.getTime(); //时间差
    var d = 0,
      h = 0,
      m = 0,
      s = 0;
    if (t >= 0) {
      d = Math.floor(t / 1000 / 3600 / 24);
      h = Math.floor(t / 1000 / 60 / 60 % 24);
      m = Math.floor(t / 1000 / 60 % 60);
      s = Math.floor(t / 1000 % 60);
    }
    return doubleNum(d)+ "天 " + doubleNum(h) + "小时 " + doubleNum(m) + "分钟 " + doubleNum(s) + "秒";
  }

  /**
   * 现金额转大写
   * @param {*} n 
   */
  digitUppercase (n) {
    var fraction = ['角', '分'];
    var digit = [
      '零', '壹', '贰', '叁', '肆',
      '伍', '陆', '柒', '捌', '玖'
    ];
    var unit = [
      ['元', '万', '亿'],
      ['', '拾', '佰', '仟']
    ];
    var head = n < 0 ? '欠' : '';
    n = Math.abs(n);
    var s = '';
    for (var i = 0; i < fraction.length; i++) {
      s += (digit[Math.floor(n * 10 * Math.pow(10, i)) % 10] + fraction[i]).replace(/零./, '');
    }
    s = s || '整';
    n = Math.floor(n);
    for (var i = 0; i < unit[0].length && n > 0; i++) {
      var p = '';
      for (var j = 0; j < unit[1].length && n > 0; j++) {
        p = digit[n % 10] + unit[1][j] + p;
        n = Math.floor(n / 10);
      }
      s = p.replace(/(零.)*零$/, '').replace(/^$/, '零') + unit[0][i] + s;
    }
    return head + s.replace(/(零.)*零元/, '元')
        .replace(/(零.)+/g, '零')
        .replace(/^整$/, '零元整');
  }

  /**
   * 邮箱地址判断
   * @memberof Tool
   */
  isEmail(str) {
    return /\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/.test(str);
  }

  /**
   * 身份证检测判断
   * @param {*} str
   * @returns
   * @memberof Tool
   */
  isIdCard(str) {
    return /^(^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$)|(^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])((\d{4})|\d{3}[Xx])$)$/.test(str)
  }

  isPhoneNum(str) {
    return /^(0|86|17951)?(13[0-9]|15[012356789]|17[678]|18[0-9]|14[57])[0-9]{8}$/.test(str)
  }

  isUrl(str) {
    return /[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/i.test(str);
  }

  randomColor() {
    return '#' + ('00000' + (Math.random() * 0x1000000 << 0).toString(16)).slice(-6);
  }
  
  randomNum(min, max) {
    return Math.floor(Math.random() * (max-min+1) )+ min;
  }

  /**
   * 是否为空对象
   */
  isEmptyObject(obj) {
    if (!obj || typeof obj !== 'object' || Array.isArray(obj))
      return false
    return !Object.keys(obj).length
  }

  /**
   * 滚动条到顶部的距离
   * @returns
   * @memberof Tool
   */
  getScrollTop() {
    return (document.documentElement && document.documentElement.scrollTop) || document.body.scrollTop;
  }

  /**
   *
   * @desc 获取浏览器类型和版本
   * @return {String}
   */
  getExplore() {
    var sys = {},
      ua = navigator.userAgent.toLowerCase(),
      s;
    (s = ua.match(/rv:([\d.]+)\) like gecko/)) ? sys.ie = s[1]:
    (s = ua.match(/msie ([\d\.]+)/)) ? sys.ie = s[1] :
    (s = ua.match(/edge\/([\d\.]+)/)) ? sys.edge = s[1] :
    (s = ua.match(/firefox\/([\d\.]+)/)) ? sys.firefox = s[1] :
    (s = ua.match(/(?:opera|opr).([\d\.]+)/)) ? sys.opera = s[1] :
    (s = ua.match(/chrome\/([\d\.]+)/)) ? sys.chrome = s[1] :
    (s = ua.match(/version\/([\d\.]+).*safari/)) ? sys.safari = s[1] : 0;
    // 根据关系进行判断
    if (sys.ie) return ('IE: ' + sys.ie)
    if (sys.edge) return ('EDGE: ' + sys.edge)
    if (sys.firefox) return ('Firefox: ' + sys.firefox)
    if (sys.chrome) return ('Chrome: ' + sys.chrome)
    if (sys.opera) return ('Opera: ' + sys.opera)
    if (sys.safari) return ('Safari: ' + sys.safari)
    return 'Unkonwn'
  }

  /**
   *
   * @description 获取操作系统类型
   * @return {String}
   */
  getOS() {
    var userAgent = 'navigator' in window && 'userAgent' in navigator && navigator.userAgent.toLowerCase() || '';
    var vendor = 'navigator' in window && 'vendor' in navigator && navigator.vendor.toLowerCase() || '';
    var appVersion = 'navigator' in window && 'appVersion' in navigator && navigator.appVersion.toLowerCase() || '';

    if (/iphone/i.test(userAgent) || /ipad/i.test(userAgent) || /ipod/i.test(userAgent)) return 'ios'
    if (/android/i.test(userAgent)) return 'android'
    if (/win/i.test(appVersion) && /phone/i.test(userAgent)) return 'windowsPhone'
    if (/mac/i.test(appVersion)) return 'MacOSX'
    if (/win/i.test(appVersion)) return 'windows'
    if (/linux/i.test(appVersion)) return 'linux'
  }

  /**
   *
   * 去除字符串中的html标签
   * @param {*} str
   * @returns
   * @memberof Tool
   */
  slicpfn(str) {
    var _str = str,
      dd = _str.replace(/<\/?.+?>/g, ""),
      dds = dd.replace(/ /g, "");
    return dds;
  }

  /**
   * 对象深拷贝
   *
   * @param {*} source
   * @returns
   * @memberof Tool
   */
  clone(source) {
    return JSON.parse(JSON.stringify(source))
  }


  /**
   * 设置样式
   * @param {HTMLElement} elem 需要设置的节点
   * @param {Object} prop      CSS属性，键值对象
   */
  setStyle(elem, prop) {
    if (!elem) {
      return false
    };
    for (let i in prop) {
      elem.style[i] = prop[i];
    }
  };
  /**
  * 获取节点css属性
  * @param  {HTMLElement} elem 需要获取的节点
  * @param  {String} name      css属性
  * @return {String}           属性值
  */
  getStyle(elem, name) { // 获取CSS属性函数
    if (elem.style[name] != '') return elem.style[name];
    if (!!window.ActiveXObject) return elem.currentStyle[name];
    return document.defaultView.getComputedStyle(elem, "").getPropertyValue(name.replace(/([A-Z])/g, "-$1").toLowerCase());
  }


  /**
   * 获取鼠标光标相对于整个页面的位置
   * @return {String} 值
   */
  getX(e) {
    e = e || window.event;
    let _left = document.documentElement.scrollLeft || document.body.scrollLeft;
    return e.pageX || e.clientX + _left;
  }
  getY(e) {
    e = e || window.event;
    let _top = document.documentElement.scrollTop || document.body.scrollTop;
    return e.pageY || e.clientY + _top;
  }

  /**
   * 
   * 兼容性事件绑定
   * @param {*} ele
   * @param {*} type
   * @param {*} handle
   * @memberof Tool
   */
  addEvent(ele,type,handle){
    if(ele.addEventListener){
        ele.addEventListener(type,handle,false);
    }else if(ele.attachEvent){
        ele.attachEvent("on"+type,handle);
    }else{
        ele["on"+type] = handle;
    }
  }
  deleteEvent(ele,type,handle){
    if(ele.removeEventListener){
      ele.removeEventListener(type,handle,false);
    }else if(ele.detachEvent){
      ele.detachEvent("on"+type,handle);
    }else{
      ele["on"+type] = null;
    }
  }

  /**
   * 千分位显示 常用于价格
   * @param {Number} num
   */
  toThousands(num) {
    return parseFloat(num).toFixed(2).replace(/(\d{1,3})(?=(\d{3})+(?:\.))/g, "$1,");
  }


  /**
   * 动态加载 CSS 样式文件
   */
  LoadStyle(url) {
    try {
      document.createStyleSheet(url);
    } catch (e) {
      let cssLink = document.createElement('link');
      cssLink.rel = 'stylesheet';
      cssLink.type = 'text/css';
      cssLink.href = url;
      let head = document.getElementsByTagName('head')[0];
      head.appendChild(cssLink);
    }
  }

  /**
   * 判断是否移动设备访问
   */
  isMobileUserAgent() {
    return ((/iphone|ipod|android.*mobile|windows.*phone|blackberry.*mobile/i).test(window.navigator.userAgent.toLowerCase()));
  }

  /**
   * 判断是否Touch屏幕
   */
  isTouchScreen() {
    return (('ontouchstart' in window) || window.DocumentTouch && document instanceof DocumentTouch);
  }

  /**
   * 获取页面高度
   */
  getPageHeight() {
    let g = document,
        a = g.body,
        f = g.documentElement,
        d = g.compatMode == "BackCompat" ?
        a :
        g.documentElement;
    return Math.max(f.scrollHeight, a.scrollHeight, d.clientHeight);
  }

  /**
  * 获取页面scrollLeft
  */
  getPageScrollLeft() {
    return document.documentElement.scrollLeft || document.body.scrollLeft;
  }


  /**
  * 获取页面宽度
  */
  getPageWidth() {
    let g = document,
        a = g.body,
        f = g.documentElement,
        d = g.compatMode == "BackCompat" ?
        a :
        g.documentElement;
    return Math.max(f.scrollWidth, a.scrollWidth, d.clientWidth);
  }

  /**
  * 获取页面scrollTop
  */
  getPageScrollTop() {
    return document.documentElement.scrollTop || document.body.scrollTop;
  }

  /**
  * 获取页面可视高度
  */
  getPageViewHeight() {
    let d = document,
        a = d.compatMode == "BackCompat" ?
        d.body :
        d.documentElement;
    return a.clientHeight;
  }

  /**
   * 中文字符串长度
   * @param {*} str 
   */
  cc_len(str){
    var len=0,
        str_len = str.length,
        i,
        charcode;
    for(i = 0; i<str_len; i++){
      charcode = str.charCodeAt(i);
      if(charcode>=0 && charcode<=128){
        len++;
      }else{
        len+=2;
      }
    }
    return len;
  }

  /**
   * 取消默认事件
   * @param {*} e 
   */
  stopDefault(e) {
    if (e&&e.preventDefault ) {
      e.preventDefault();
    } else {
      window.event.returnValue = false;
    }
    return false;
  }

}