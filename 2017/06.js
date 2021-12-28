const banks = `11	11	13	7	0	15	5	5	4	4	1	1	7	1	15	11`.split("	").map(Number);
const seen = [];
let steps = 0;
let state;

while (true) {
    seen.push(banks.toString());

    let index = banks.indexOf(Math.max(...banks));
    let remainingBlocks = banks[index];
    banks[index] = 0;

    while (remainingBlocks > 0) {
        index = (index + 1) % banks.length;
        banks[index]++;
        remainingBlocks--;
    }

    steps++;
    if (seen.includes(banks.toString())) {
        state = banks.toString();
        break;
    }
}

steps = 0;
while (true) {
    let index = banks.indexOf(Math.max(...banks));
    let remainingBlocks = banks[index];
    banks[index] = 0;

    while (remainingBlocks > 0) {
        index = (index + 1) % banks.length;
        banks[index]++;
        remainingBlocks--;
    }

    steps++;
    if (banks.toString() == state) break;
}

console.log(steps);