// console.log(window.foo)
// if (!window.foo) {
//   window.foo = 0;
// }
// console.log(window.foo)

console.log(boo)
if (boo in window) {
  console.log(boo)
  var boo = 10;
  console.log(boo)
}
console.log(boo)


function curry(fn) {
  function _c(len, args) { 
    return len === 0 ? 
      fn.apply(null, args) :
      function (x) {
        return _c(len - 1, args.concat(x));
      }
  }
  return _c(fn.length, []);
}