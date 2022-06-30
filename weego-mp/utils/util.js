const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}

const transformWithComma = number => {
  if (typeof number !== 'number') {
    return number;
  }
  if (number < 999) {
    return number;
  }

  const reverseNumArray = number.toString().split('').reverse();
  const result = [];

  reverseNumArray.forEach((x, i) => {
    result.push(x);
    if ((i + 1) % 3 === 0 && reverseNumArray[i + 1]) {
      result.push(',');
    }
  });

  return result.reverse().join('');
};

const throttle = (func, wait, options) => {
  var context, args, result;
  var timeout = null;
  var previous = 0;
  if (!options) options = {};
  var later = function() {
    previous = options.leading === false ? 0 : +new Date();
    timeout = null;
    result = func.apply(context, args);
    if (!timeout) context = args = null;
  };
  return function() {
    var now = +new Date();
    // 记录第一次进入时间
    if (!previous && options.leading === false) previous = now;
    // 剩余时间
    var remaining = wait - (now - previous);
    context = this;
    args = arguments;
    // 判断是否间隔规定时间
    if (remaining <= 0 || remaining > wait) {
      if (timeout) {
        clearTimeout(timeout);
        timeout = null;
      }
      previous = now;
      result = func.apply(context, args);
      if (!timeout) context = args = null;
    } else if (!timeout && options.trailing !== false) {
      timeout = setTimeout(later, remaining);
    }
    return result;
  };
};

const mapOrderStatus = status => {
  let text = '';
  switch (status) {
    case 'cancelled':
      text = '已取消';
      break;
    case 'unpaid':
      text = '未支付';
      break;
    case 'paying':
      text = '支付中';
      break;
    case 'paid':
      text = '已支付,待确认';
      break;
    case 'confirmed':
      text = '已确认';
      break;
    case 'consumed':
      text = '已消费';
      break;
    case 'expired':
      text = '已过期';
      break;
    case 'refund_pending':
      text = '退款中';
      break;
    case 'refund_confirmed':
      text = '已退款';
      break;
    default:
      break;
  }

  return text;
};

module.exports = {
  formatTime: formatTime,
  transformWithComma: transformWithComma,
  throttle: throttle,
  mapOrderStatus: mapOrderStatus
}
