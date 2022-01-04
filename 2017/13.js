let input = `0: 5
1: 2
2: 3
4: 4
6: 6
8: 4
10: 6
12: 10
14: 6
16: 8
18: 6
20: 9
22: 8
24: 8
26: 8
28: 12
30: 12
32: 8
34: 8
36: 12
38: 14
40: 12
42: 10
44: 14
46: 12
48: 12
50: 24
52: 14
54: 12
56: 12
58: 14
60: 12
62: 14
64: 12
66: 14
68: 14
72: 14
74: 14
80: 14
82: 14
86: 14
90: 18
92: 17`.split("\n").map(r => r.split(": ").map(Number));

// input = `0: 3
// 1: 2
// 4: 4
// 6: 4`.split("\n").map(r => r.split(": ").map(Number));

const firewall = [];
for (let i = 0; i <= 92; i++) {
    firewall[i] = Number.MIN_SAFE_INTEGER;
}

here: for (let delay = 0; true; delay++) {
    for (let i = 0; i < input.length; i++) {
        firewall[input[i][0]] = 0;
    }
    
    for (let j = 0; j < input.length; j++) {
        firewall[input[j][0]] = delay;

        if (firewall[input[j][0]] >= input[j][1]) {
            // console.log(firewall[input[j][0]], input[j][1]);
            firewall[input[j][0]] = firewall[input[j][0]] - (Math.ceil(firewall[input[j][0]] / (2 * input[j][1] - 2))) * (2 * input[j][1] - 2);
            // console.log(firewall[input[j][0]]);
            // console.log();
        }
    }
    
    let severity = 0;
    for (let i = 0; i <= 92; i++) {
        if (firewall[i] == 0) {
            continue here;
            severity += i * input.filter(r => r[0] == i)[0][1];
        }
    
        for (let j = 0; j < input.length; j++) {
            firewall[input[j][0]]++;
            if (firewall[input[j][0]] == input[j][1]) {
                firewall[input[j][0]] = 2 - firewall[input[j][0]];
            }
        }
    }
    
    // console.log(delay, severity);
    if (severity == 0) {
        console.log(delay);
        break;
    }
}
