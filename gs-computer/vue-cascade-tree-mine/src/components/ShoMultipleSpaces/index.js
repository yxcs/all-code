const multipleSpace = {
  bind: (el, binding, vnode) => {
    let val = binding.value
    val = binding.value.split('')
    val = val.map(item => {
      if (item === ' ') {
        item = '&nbsp;'
      }
      return item
    })
    val = val.join('')
    el.innerHTML = `<span>${val}</span>`
  }
}

export default multipleSpace