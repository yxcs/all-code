var arr = [];
for(var i = 0; i < 10; i ++) {
  arr[i] = function(num) {
      return function() {
          return num;
      }
  }(i);
}

console.log(arr[1]())