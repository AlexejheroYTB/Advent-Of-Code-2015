// Part 1

// const step = 366;
// const buffer = [0];
// let position = 0;

// for (let i = 0; i < 2017; i++) {
//     position = (position + step) % buffer.length + 1;
//     buffer.splice(position, 0, i+1);
// }

// console.log(buffer[position + 1]);

// Part 2

const step = 366;
let length = 1;
let currentPosition = 0;
let zeroPosition = 0;
let rightElement = -1;

for (let i = 1; i <= 50000000; i++) {
    currentPosition = (currentPosition + step) % length + 1;
    if (currentPosition <= zeroPosition) zeroPosition++;
    if (currentPosition == zeroPosition + 1) rightElement = i;
    length++;
}

console.log(rightElement);
