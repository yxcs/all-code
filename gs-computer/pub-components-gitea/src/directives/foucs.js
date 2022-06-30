const focus = {
  inserted (el) {
    let ele = el.tagName === 'INPUT' ? el : el.querySelector('input')
    ele.focus()
  }
}

export default focus
