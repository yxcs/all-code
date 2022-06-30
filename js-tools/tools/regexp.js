/*
 * 数字转化为带三位逗号的字符串
 * @param number num 数字
 * @param string type 类型 1.正常 2.保留两位小数
 */
function numFormat(num, type='1'){
  if(type === '2' || type === 2){
    num = num.toFixed(2);
  }
  const res=num.toString().replace(/\d+/, function(n){ // 先提取整数部分
    return n.replace(/(\d)(?=(\d{3})+$)/g,function($1){
      return $1+",";
    });
  })
  return res;
}

/*
 * 生成从minNum到maxNum的随机数
 * @param number minNum 最小值
 * @param number maxNum 最大值
 */
function randomNum(minNum,maxNum){
  switch(arguments.length){
    case 1:
      return parseInt(Math.random()*minNum+1,10);
    case 2:
      if((maxNum-minNum) > 0){
        return parseInt(Math.random()*(maxNum-minNum+1)+minNum,10);
      }else{
        return 0;
      }
    default:
      return 0;
  }
}

/*
 * 手机号验证
 * @param number phone 手机号
 */
function checkPhone(phone){
  if(/^1[34578]\d{9}$/.test(phone)){
    return true;
  } else {
    return false;
  }
}

/*
 * 固定电话
 * @param number tel 电话号吗
 */
function checkTel(tel){
  if(/^(\(\d{3,4}\)|\d{3,4}-|\s)?\d{7,14}$/.test(tel)){
    return true;
  } else {
    return false;
  }
}

/*
 * 身份证验证
 * @param number idCard 省份证号码
 */
function checkIDCard(idCard){
  const length = idCard.length;
  if(length === 15){
    if(/^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$/.test(idCard)){
      return true;
    } else {
      return false;
    }
  }
  if(length === 18){
    if(/^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{4}$/.test(idCard)){
      return true;
    } else {
      return false;
    }
  }
  return false;
}


var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };


/*
* 判断值是否为null或者undefind
* @param string val 字符串
*/
function val_empty(val) {
  if (val == null || typeof val == "undefined" || val == '') {
    return false;
  } else if ((typeof val === "undefined" ? "undefined" : _typeof(val)) == "object") {
    return true;
  } else {
    return true;
  }
}

/*
 * 截取字符串
 * @param string str 字符串
 * @param int length 截取长度
 */
function str_cut(str, length) {
  if (!val_empty(str)) {
    return '';
  }
  if (str.length > length) {
    str = str.slice(0, length) + '...';
  }
  return str;
}

/*
 * 除去字符串中的空格
 */
function str_space(str) {
  var result = str.replace(/(^\s+)|(\s+$)/g, "");
  return result.replace(/\s/g, "");
}
/*
 * 判断是否包函字符串
 * @param string str 字符串
 * @param string instr 所包含的字符串
 */
//判断是否包含字符串
function isInstr(str, instr) {
  if (typeof str !== 'string') {
    console.log('错误：这不是一个字符串');
    return false;
  }
  if (str.indexOf(instr) >= 0) {
    return true;
  } else {
    return false;
  }
}

/*
** randomWords 产生任意长度随机字母数字组合
** min-任意长度最小位[只填第一个参数生成的数为固定位数] max-任意长度最大位
** isNumber 是否包含数字
*/

function randomWords(min, max=0, isNumber=true){
  var str = "",
    range,
    arr = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];

  // 随机产生
  if(max > min){
    range = Math.round(Math.random() * (max-min)) + min;
  }else{
    range = min;
  }
  if(isNumber){
    arr.push('0', '1', '2', '3', '4', '5', '6', '7', '8', '9');
  }
  for(let i=0; i<range; i++){
    const pos = Math.round(Math.random() * (arr.length-1));
    str += arr[pos];
  }
  return str;
}

/*
 * 验证邮箱
 */
function checkEmail(email){
  if( /^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/.test(email)){
    return true;
  } else {
    return false;
  }
}