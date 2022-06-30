// 时间转为时间字符串
const time2str = (val) => {
  if (!val) return null
  val = new Date(val)
  let h = val.getHours()
  let m = val.getMinutes()
  let s = val.getSeconds()
  return [h > 9 ? h : '0' + h, m > 9 ? m : '0' + m, s > 9 ? s : '0' + s].join(':')
}
export default time2str