const input = `32/31
2/2
0/43
45/15
33/24
20/20
14/42
2/35
50/27
2/17
5/45
3/14
26/1
33/38
29/6
50/32
9/48
36/34
33/50
37/35
12/12
26/13
19/4
5/5
14/46
17/29
45/43
5/0
18/18
41/22
50/3
4/4
17/1
40/7
19/0
33/7
22/48
9/14
50/43
26/29
19/33
46/31
3/16
29/46
16/0
34/17
31/7
5/27
7/4
49/49
14/21
50/9
14/44
29/29
13/38
31/11`.split("\n").map(c => c.split("/").map(Number));

let maxLength = -1, maxStrength = -1;

function build(next, blocks, length, strength) {
    let end = true;
    for (let block of blocks.filter(b => b.includes(next))) {
        end = false;
        let n = block[0] == next ? block[1] : block[0];
        build(n, blocks.filter(b => b != block), length + 1, strength + block[0] + block[1]);
    }

    if (end) {
        if (length > maxLength) {
            maxLength = length;
            maxStrength = strength;
        } else if (length == maxLength) {
            if (strength > maxStrength) maxStrength = strength;
        }
    }
}

build(0, input, 0, 0);
console.log(maxStrength);
