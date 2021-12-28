let input = "225,171,131,2,35,5,0,13,1,246,54,97,255,98,254,110".split("").map(c => c.charCodeAt(0));
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

console.log(hash.map(c => c.toString(16).padStart(2, "0")).join(""));
