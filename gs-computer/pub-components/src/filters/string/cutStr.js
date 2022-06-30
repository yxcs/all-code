// 超出截断
const cutStr = (val, length) => {
  return val.length <= length ? val : val.substr(0, length)
}
export default cutStr