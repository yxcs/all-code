// 金额千分位格式化
const numFormat = (num) => {
  return (num + '').replace(/\d{1,3}(?=(\d{3})+(\.\d*)?$)/g, '$&,')
}
export default numFormat