const input = `set i 31
set a 1
mul p 17
jgz p p
mul a 2
add i -1
jgz i -2
add a -1
set i 127
set p 618
mul p 8505
mod p a
mul p 129749
add p 12345
mod p a
set b p
mod b 10000
snd b
add i -1
jgz i -9
jgz a 3
rcv b
jgz b -1
set f 0
set i 126
rcv a
rcv b
set p a
mul p -1
add p b
jgz p 4
snd a
set a b
jgz 1 3
snd b
set f 1
add i -1
jgz i -11
snd a
jgz f -16
jgz a -19`.split("\n").map(c => c.split(" "));

const registers0 = {p:0};
const registers1 = {p:1};

const queue0 = [];
const queue1 = [];

let state0 = [0];
let state1 = [0];

let i0 = 0;
let i1 = 0;

let ok = 0;

function r(a, registers) {
    if (!isNaN(parseInt(a))) return parseInt(a);
    return registers[a] || 0;
}

function tick(i, p) {
    const cmd = input[i];
    if (p == 0) {
        var registers = registers0;
        var theirQueue = queue1;
        var myQueue = queue0;
        var state = state0;
    } else {
        var registers = registers1;
        var theirQueue = queue0;
        var myQueue = queue1;
        var state = state1;
    }

    if (i < 0 || i >= input.length) {
        state[0] = -1;
        return i;
    }

    switch (cmd[0]) {
        case "snd":
            if (p == 1) ok++;
            theirQueue.push(r(cmd[1], registers));
            break;

        case "set":
            registers[cmd[1]] = r(cmd[2], registers);
            break;

        case "add":
            if (!registers[cmd[1]]) registers[cmd[1]] = 0;
            registers[cmd[1]] += r(cmd[2], registers);
            break;

        case "mul":
            if (!registers[cmd[1]]) registers[cmd[1]] = 0;
            registers[cmd[1]] *= r(cmd[2], registers);
            break;

        case "mod":
            if (!registers[cmd[1]]) registers[cmd[1]] = 0;
            registers[cmd[1]] %= r(cmd[2], registers);
            break;

        case "rcv":
            if (myQueue.length == 0) state[0] = cmd[1];
            else {
                registers[cmd[1]] = myQueue.shift();
            }
            break;

        case "jgz":
            if (r(cmd[1], registers) > 0) {
                i += r(cmd[2], registers) - 1;
            }
            break;
    }
    
    return i + 1;
}

while (true) {
    if (state0[0] == 0) i0 = tick(i0, 0);
    else if (state0[0] != -1 && queue0.length > 0) {
        registers0[state0[0]] = queue0.shift();
        state0[0] = 0;
    }
    if (state1[0] == 0) i1 = tick(i1, 1);
    else if (state1[0] != -1 && queue1.length > 0) {
        registers1[state1[0]] = queue1.shift();
        state1[0] = 0;
    }

    if (state0[0] != 0 && state1[0] != 0) {
        console.log(ok);
        break;
    }
}
