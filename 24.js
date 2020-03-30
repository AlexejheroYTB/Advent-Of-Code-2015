const combinatorics = require("js-combinatorics");
const input = [1, 2, 3, 7, 11, 13, 17, 19, 23, 31, 37, 41, 43, 47, 53, 59, 61, 67, 71, 73, 79, 83, 89, 97, 101, 103, 107, 109, 113];
const weight = input.reduce((a, b) => a + b, 0) / 4;

console.log(combinatorics.combination(input, 4).filter(a => a.reduce((a, b) => a + b, 0) == weight).reduce((a, b) => [...a, b.reduce((c, d) => c * d, 1)], []).sort((a, b) => a < b ? -1 : a == b ? 0 : 1)[0]);