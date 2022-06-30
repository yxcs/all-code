(function() {
	/**
	 * 
	 * 创建对象， 工厂模式
	 * @param {*} name 
	 */
  function createObject(name) {
		var o = new Object();
		o.name = name;
		o.sayName = function () {
			console.log(this.name);
		}
		return o;
	}

	/**
	 * 创建对象，构造函数模式
	 * @param {*} name 
	 */
	function createConstructor(name) {
		this.name = name;
		this.sayName = function () {
			console.log(this.name);
		}
	}

	/**
	 * 创建对象，原型模式
	 */
	function createPrototype() {

	}
	createPrototype.prototype.name = 'lili';
	createPrototype.prototype.sayName = function() {
		console.log(this.name);
	}

	/**
	 * 创建对象，原型构造模式
	 * @param {*} name 
	 * @param {*} arr 
	 */
	function createProCus(name, arr) {
		this.name = name;
		this.arr = arr;
	}
	createProCus.prototype = {
		constructor: createProCus,
		sayName: function() {
			console.log(this.name);
			console.log(this.arr);
		}
	}

	// 初始化
	var _ = {};
	window._ = _;

	// 窗口相对于屏幕左上方坐标
	_.screenLeft = (typeof window.screenLeft == 'number') ? window.screenLeft : window.screenX;
	_.screenTop = (typeof window.screenTop == 'number') ? window.screenTop : window.screenY;

	// 浏览器窗口大小
	function getWindowSize() {
		var pageWidth = window.innerWidth;
		var pageHeight = window.innerHeight;
		if (typeof pageHeight == 'number') {
			if (document.compatMode === 'CSS1Compat') {
				pageWidth = document.documentElement.clientWidth;
				pageHeight = document.documentElement.clientHeight;
			} else {
				pageWidth = document.body.clientWidth;
				pageHeight = document.body.clientHeight;
			}
		}
		return {
			pageWidth: pageWidth,
			pageHeight: pageHeight
		}
	}
	var windowSizeXY = getWindowSize();
	_.innerWidth = windowSizeXY.pageWidth;
	_.innerHeight = windowSizeXY.pageHeight;

	// 浏览器检测
	/*--------------------------------------------------------------------------------------------------*/
	function checkBrowserType(){

		//rendering engines
		var engine = {            
			ie: 0,
			gecko: 0,
			webkit: 0,
			khtml: 0,
			opera: 0,
	
			//complete version
			ver: null  
		};
		
		//browsers
		var browser = {
				
			//browsers
			ie: 0,
			firefox: 0,
			safari: 0,
			konq: 0,
			opera: 0,
			chrome: 0,
	
			//specific version
			ver: null
		};
	
		
		//platform/device/OS
		var system = {
			win: false,
			mac: false,
			x11: false,
				
			//mobile devices
			iphone: false,
			ipod: false,
			ipad: false,
			ios: false,
			android: false,
			nokiaN: false,
			winMobile: false,
				
			//game systems
			wii: false,
			ps: false 
		};    
	
		//detect rendering engines/browsers
		var ua = navigator.userAgent;    
		if (window.opera){
				engine.ver = browser.ver = window.opera.version();
				engine.opera = browser.opera = parseFloat(engine.ver);
		} else if (/AppleWebKit\/(\S+)/.test(ua)){
				engine.ver = RegExp["$1"];
				engine.webkit = parseFloat(engine.ver);
				
				//figure out if it's Chrome or Safari
				if (/Chrome\/(\S+)/.test(ua)){
						browser.ver = RegExp["$1"];
						browser.chrome = parseFloat(browser.ver);
				} else if (/Version\/(\S+)/.test(ua)){
						browser.ver = RegExp["$1"];
						browser.safari = parseFloat(browser.ver);
				} else {
						//approximate version
						var safariVersion = 1;
						if (engine.webkit < 100){
								safariVersion = 1;
						} else if (engine.webkit < 312){
								safariVersion = 1.2;
						} else if (engine.webkit < 412){
								safariVersion = 1.3;
						} else {
								safariVersion = 2;
						}   
						
						browser.safari = browser.ver = safariVersion;        
				}
		} else if (/KHTML\/(\S+)/.test(ua) || /Konqueror\/([^;]+)/.test(ua)){
				engine.ver = browser.ver = RegExp["$1"];
				engine.khtml = browser.konq = parseFloat(engine.ver);
		} else if (/rv:([^\)]+)\) Gecko\/\d{8}/.test(ua)){    
				engine.ver = RegExp["$1"];
				engine.gecko = parseFloat(engine.ver);
				
				//determine if it's Firefox
				if (/Firefox\/(\S+)/.test(ua)){
						browser.ver = RegExp["$1"];
						browser.firefox = parseFloat(browser.ver);
				}
		} else if (/MSIE ([^;]+)/.test(ua)){    
				engine.ver = browser.ver = RegExp["$1"];
				engine.ie = browser.ie = parseFloat(engine.ver);
		}
		
		//detect browsers
		browser.ie = engine.ie;
		browser.opera = engine.opera;
		
	
		//detect platform
		var p = navigator.platform;
		system.win = p.indexOf("Win") == 0;
		system.mac = p.indexOf("Mac") == 0;
		system.x11 = (p == "X11") || (p.indexOf("Linux") == 0);
	
		//detect windows operating systems
		if (system.win){
				if (/Win(?:dows )?([^do]{2})\s?(\d+\.\d+)?/.test(ua)){
						if (RegExp["$1"] == "NT"){
								switch(RegExp["$2"]){
										case "5.0":
												system.win = "2000";
												break;
										case "5.1":
												system.win = "XP";
												break;
										case "6.0":
												system.win = "Vista";
												break;
										case "6.1":
												system.win = "7";
												break;
										default:
												system.win = "NT";
												break;                
								}                            
						} else if (RegExp["$1"] == "9x"){
								system.win = "ME";
						} else {
								system.win = RegExp["$1"];
						}
				}
		}
		
		//mobile devices
		system.iphone = ua.indexOf("iPhone") > -1;
		system.ipod = ua.indexOf("iPod") > -1;
		system.ipad = ua.indexOf("iPad") > -1;
		system.nokiaN = ua.indexOf("NokiaN") > -1;
		
		//windows mobile
		if (system.win == "CE"){
				system.winMobile = system.win;
		} else if (system.win == "Ph"){
				if(/Windows Phone OS (\d+.\d+)/.test(ua)){;
						system.win = "Phone";
						system.winMobile = parseFloat(RegExp["$1"]);
				}
		}
		
		
		//determine iOS version
		if (system.mac && ua.indexOf("Mobile") > -1){
				if (/CPU (?:iPhone )?OS (\d+_\d+)/.test(ua)){
						system.ios = parseFloat(RegExp.$1.replace("_", "."));
				} else {
						system.ios = 2;  //can't really detect - so guess
				}
		}
		
		//determine Android version
		if (/Android (\d+\.\d+)/.test(ua)){
				system.android = parseFloat(RegExp.$1);
		}
		
		//gaming systems
		system.wii = ua.indexOf("Wii") > -1;
		system.ps = /playstation/i.test(ua);
		
		//return it
		return {
				engine:     engine,
				browser:    browser,
				system:     system        
		};
	
	}
	window.checkBrowserType = checkBrowserType;
	/*--------------------------------------------------------------------------------------------------*/

	/**
	 * 获取clientHeight和clientWidth
	 */
	function getViewport() {
		if (document.compatMode === 'BackCompat') {
			return {
				clientHeight: document.body.clientHeight,
				clientWidth: document.body.clientWidth
			}
		} else {
			return {
				clientHeight: document.documentElement.clientHeight,
				clientWidth: document.documentElement.clientWidth
			}
		}
	}
	var clientHW = getViewport();
	_.clientHeight = clientHW.clientHeight;
	_.clientWidth = clientHW.clientWidth;

	
})(window)

console.log(window.checkBrowserType())