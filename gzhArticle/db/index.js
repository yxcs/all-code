var time = 12;
var num = 10;
var sum = 0;
var current = 0;

for (var i = 1; i <= time; i++) {
  current = i * num;
  sum += current;
}

console.log(sum);