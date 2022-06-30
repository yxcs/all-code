//货币符号
const currency = (val, type) => {
  return (val === '' || val === null) ?  '--' : (type||'￥') + ' ' + val
}
export default currency