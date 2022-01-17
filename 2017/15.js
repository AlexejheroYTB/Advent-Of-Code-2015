const startA = 783;
const startB = 325;

function compare(num1, num2) {
    return (num1 >>> 0).toString(2).split("").slice(-16).join("") == (num2 >>> 0).toString(2).split("").slice(-16).join("");
}

function generateNextValue(prev, isA) {
    let num = prev;
    do {
        num = (num * (isA ? 16807 : 48271)) % 2147483647;
    } while (num % (isA ? 4 : 8) != 0);
    return num;
}

let prevA = startA;
let prevB = startB;
let ok = 0;
for (let i = 0; i < 5000000; i++) {
    if (i % 100000 == 0) console.log(i);

    prevA = generateNextValue(prevA, true);
    prevB = generateNextValue(prevB, false);

    if (compare(prevA, prevB)) ok++;
}

console.log(ok);
