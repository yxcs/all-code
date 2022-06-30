//占位符
const placeholder = (val, place) => {
  return (val === '' || val === null) ? (place || '--') : val
}
export default placeholder