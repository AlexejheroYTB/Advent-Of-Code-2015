const multiplier = 252533;
const dividend = 33554393;
const targetX = 3029, targetY = 2947;

var number = 20151125;
var x = 1, y = 1;

while (x != targetX || y != targetY) {
  number = number * multiplier % dividend;
  if (y == 1) {
    y = x + 1;
    x = 1;
  } else {
    x++;
    y--;
  }
}
console.log(number);