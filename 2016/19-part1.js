const length = 3012210;
const elves = [];

for (let i = 0; i < length; i++) elves[i] = 1;

start: while (elves.filter(e => e > 0).length > 1) {
    for (let i = 0; i < length; i++) {
        if (!elves[i]) continue;
        
        for (let j = i+1; j < length * 2; j++) {
            if (!elves[j % length]) continue;
            if (i == j % length) continue start;
            elves[i]+=elves[j % length];
            elves[j % length] = 0;
            break;
        }
    }
    console.log(elves.filter(e => e > 0).length);
}

console.log("Done!");

for (let i = 0; i < length; i++) if (elves[i]) console.log(i+1) ;
