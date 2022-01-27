/* Part 2 (manual decompilation)

b = 105700;
c = 122700;
h = 0;

while (true) {
    f = 1;

    // here: for (let d = 2; d < b - 1; d++) {
    //     for (let e = 2; e < b - 1; e++) {
    //         if (d * e == b) {
    //             f = 0;
    //             break here;
    //         }
    //     }
    // }

    for (let i = 2; i < b / 2; i++) {
        if (b % i == 0) {
            f = 0;
            break;
        }
    }

    if (f == 0) h++;
    g = b - c;

    if (g == 0) {
        console.log(h);
        return;
    }

    b += 17;
}

*/

const input = `set b 57
set c b
jnz a 2
jnz 1 5
mul b 100
sub b -100000
set c b
sub c -17000
set f 1
set d 2
set e 2
set g d
mul g e
sub g b
jnz g 2
set f 0
sub e -1
set g e
sub g b
jnz g -8
sub d -1
set g d
sub g b
jnz g -13
jnz f 2
sub h -1
set g b
sub g c
jnz g 2
jnz 1 3
sub b -17
jnz 1 -23`.split("\n").map(c => c.split(" "));

const registers = {a:1};

let v = 0;

for (let i = 0; i < input.length; i++) {
    const cmd = input[i];
    console.log(i, cmd, registers.g, registers.e);
    switch (cmd[0]) {
        case "set":
            registers[cmd[1]] = r(cmd[2]);
            break;

        case "sub":
            if (!registers[cmd[1]]) registers[cmd[1]] = 0;
            registers[cmd[1]] -= r(cmd[2]);
            break;

        case "mul":
            v++;
            if (!registers[cmd[1]]) registers[cmd[1]] = 0;
            registers[cmd[1]] *= r(cmd[2]);
            break;

        case "jnz":
            if (r(cmd[1]) != 0) {
                i += r(cmd[2]) - 1;
            }
            console.log();
            break;
    }
}

function r(a) {
    if (!isNaN(parseInt(a))) return parseInt(a);
    return registers[a] || 0;
}

console.log(registers[h])
