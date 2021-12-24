const length = 3012210;
const elves = [];

for (let i = 0; i < length; i++) elves[i] = i;

start: while (elves.length > 1) {
    for (let i = 0; i < elves.length; i++) {
        var stealFrom = (i + Math.floor(elves.length / 2)) % elves.length;
        
        if (i == stealFrom) continue start;
        elves.splice(stealFrom, 1);
        if (stealFrom < i) i--;

        // for (let j = i+1; j < length * 2; j++) {
        //     if (!elves[j % length]) continue;
        //     if (i == j % length) continue start;
        //     elves[i]+=elves[j % length];
        //     elves[j % length] = 0;
        //     break;
        // }
    }
    console.log(elves.length);
}

console.log("Done!");

for (let i = 0; i < elves.length; i++) console.log(elves[i]+1) ;
