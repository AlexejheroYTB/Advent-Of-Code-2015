const combinatorics = require("js-combinatorics");

const input = [1, 2, 3, 7, 11, 13, 17, 19, 23, 31, 37, 41, 43, 47, 53, 59, 61, 67, 71, 73, 79, 83, 89, 97, 101, 103, 107, 109, 113];
var minAmount = Infinity, minQE = Infinity, c = 1;

function rec(j, first, second, third) {
  if (j == input.length) {
    if (weight(first) == weight(second) && weight(first) == weight(third)) {
      console.log([c, first.length, second.length, third.length, qe(first), qe(second), qe(third)]);
      c++;
      if (first.length < minAmount) {
        minAmount = first.length;
        minQE = qe(first);
      }
      if (second.length < minAmount) {
        minAmount = second.length;
        minQE = qe(second);
      }
      if (third.length < minAmount) {
        minAmount = third.length;
        minQE = qe(third);
      }
      if (first.length == minAmount && qe(first) < minQE) {
        minQE = qe(first);
      }
      if (second.length == minAmount && qe(second) < minQE) {
        minQE = qe(second);
      }
      if (third.length == minAmount && qe(third) < minQE) {
        minQE = qe(third);
      }
    }
  } else {
    rec(j + 1, [...first, input[j]], [...second], [...third]);
    rec(j + 1, [...first], [...second, input[j]], [...third]);
    rec(j + 1, [...first], [...second], [...third, input[j]]);
  }
}

function weight(arr) {
  return arr.reduce((a, b) => a + b, 0);
}

function qe(arr) {
  return arr.reduce((a, b) => a * b, 1);
}

rec(0, [], [], []);
console.log(minQE);