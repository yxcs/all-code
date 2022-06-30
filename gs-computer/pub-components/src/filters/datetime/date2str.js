// 日期转为日期字符串
const date2str = (val) => {
  if (!val) return null
  val = new Date(val)
  let Y = val.getFullYear()
  let M = val.getMonth() + 1
  let D = val.getDate()
  let h = val.getHours()
  let m = val.getMinutes()
  let s = val.getSeconds()
  return [[Y, M > 9 ? M : '0' + M, D > 9 ? D : '0' + D].join('-'), [h > 9 ? h : '0' + h, m > 9 ? m : '0' + m, s > 9 ? s : '0' + s].join(':')].join(' ')
}
export default date2str