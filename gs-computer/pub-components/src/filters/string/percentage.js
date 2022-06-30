//百分比
const percentage = (val,place) => {
  return (val === '' || val === null) ? (place || '--') : val + '%'
}
export default percentage