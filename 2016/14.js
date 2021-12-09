const md5 = require("md5");
const process = require("process");

const salt = "zpqevtbw";
const cache = [];

let keys = 47;
let index = 17686;

function beegHash(index) {
    if (cache[index]) return cache[index];

    let result = salt + index;
    for (let i = 1; i <= 2017; i++) {
        result = md5(result);
    }
    
    cache[index] = result;
    return result;
}

here: while (true) {
    const hash = beegHash(index);
    const match = (hash.match(/(.)\1\1/g) || [])[0];
    
    index++;
    if (!match) continue;

    for (let i = 1; i <= 1000; i++) {
        const nextHash = beegHash(index+i-1);
        const char = match.split("")[0];
        if (nextHash.includes(char + char + char + char + char)) {
            keys++;
            
            console.log("Found key " + keys + " at index " + (index - 1));

            if (keys.length == 64) {
                console.log(index - 1);
                break here;
            }

            break;
        }
    }
}
