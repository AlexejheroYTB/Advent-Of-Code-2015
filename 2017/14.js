const process = require("process");

function knotHash(value) {
    let input = value.split("").map(c => c.charCodeAt(0));
    input.push(17, 31, 73, 47, 23);
    let list = [];
    for (let i = 0; i < 256; i++) list.push(i);
    
    let position = 0; skip = 0;
    
    for (let i = 0; i < 64; i++) {
        for (const length of input) {
            if (length > list.length) continue;
            
            const fromEnd = list.splice(position, length);
            const fromBeginning = list.splice(0, length - fromEnd.length);
            
            const reversed = [...fromEnd, ...fromBeginning].reverse();
            list.splice(position, 0, ...reversed.splice(0, fromEnd.length));
            list.unshift(...reversed);
            
            position = (position + length + skip) % list.length;
            skip++;
        }
    }
    
    let hash = [];
    for (let i = 0; i < 256; i += 16) {
        hash.push(list.slice(i, i + 16).reduce((a, b) => a ^ b));
    }
    
    return hash.map(c => c.toString(2).padStart(8, "0")).join("");
}

const arr = [];
for (let i = 0; i < 128; i++) {
    arr.push(knotHash(`amgozmfv-${i}`).split("").map(Number));
}

console.log(arr.map(a => a.filter(x => x != 0).length).reduce((a, b) => a + b));

let started = 0;
let groups = 0;

function doStuff() {
    if (arr.map(a => a.filter(x => x != 0).length).reduce((a, b) => a + b) == 0) {
        console.log(groups);
        process.exit(0);
    }
    if (started > 0) return;

    here: for (var i = 0; i < 128; i++) {
        for (var j = 0; j < 128; j++) {
            if (arr[i][j]) break here;
        }
    }

    groups++;
    started++;
    arr[i][j] = 0;
    removeConnected(i, j);
}

setInterval(doStuff, 1);

function removeConnected(x, y) {
    if (x != 0 && arr[x - 1][y]) {
        started++;
        arr[x - 1][y] = 0;
        process.nextTick(removeConnected, x - 1, y);
    }

    if (x != 127 && arr[x + 1][y]) {
        started++;
        arr[x + 1][y] = 0;
        process.nextTick(removeConnected, x + 1, y);
    }

    if (y != 0 && arr[x][y - 1]) {
        started++;
        arr[x][y - 1] = 0;
        process.nextTick(removeConnected, x, y - 1);
    }
    
    if (y != 127 && arr[x][y + 1]) {
        started++;
        arr[x][y + 1] = 0;
        process.nextTick(removeConnected, x, y + 1);
    }
    
    started--;
}
