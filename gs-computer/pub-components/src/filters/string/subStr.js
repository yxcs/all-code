// 溢出显示省略号
const subStr = (val, length) => {
  return val.length <= length ? val : val.substr(0, length) + '…'
}
export default subStr