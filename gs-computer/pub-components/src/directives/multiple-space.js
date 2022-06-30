import '../assets/scss/multiple-space.scss'
// 页面显示多空格
const multipleSpace = (el, binding, vnode) => {
  let val = binding.value
  if (val === null || val === undefined) {
    val = ''
  }
  val = binding.value.split('')
  val = val.map(item => {
    if (item === ' ') {
      item = '&nbsp;'
    }
    return item
  })
  val = val.join('')
  el.innerHTML = `<span class="multiple-space-word-break">${val}</span>`
}

export default multipleSpace