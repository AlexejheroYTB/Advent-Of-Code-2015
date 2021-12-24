var input = `cpy a d
cpy 7 c
cpy 362 b
inc d
dec b
jnz b -2
dec c
jnz c -5
cpy d a
jnz 0 0
cpy a b
cpy 0 a
cpy 2 c
jnz b 2
jnz 1 6
dec b
dec c
jnz c -4
inc a
jnz 1 -7
cpy 2 b
jnz c 2
jnz 1 4
dec b
dec c
jnz 1 -4
jnz 0 0
out b
jnz a -19
jnz 1 -21`;

const instructions = [];
const registers = {"a": 0, "b": 0, "c": 0, "d": 0};
var startingA = 0;

for (const i of input.split(/\n/g)) {
    const [command, a, b, c] = i.split(/\s+/);
    instructions.push({ command, a, b, c });
}


while (true) {
    var last = 2;
    var count = 0;

    for (let i = 0; i < instructions.length; i++) {
        // console.log(i, registers);
    
        const { command, a, b, c } = instructions[i];
    
        if (command == 'cpy') {
            if (!isNaN(parseInt(b))) continue;
    
            if (isNaN(parseInt(a))) {
                registers[b] = registers[a];
            } else {
                registers[b] = parseInt(a);
            }
        } else if (command == 'inc') {
            if (isNaN(parseInt(a))) registers[a]++;
        } else if (command == 'dec') {
            if (isNaN(parseInt(a))) registers[a]--;
        } else if (command == 'jnz') {
            if (isNaN(parseInt(a))) {
                if (registers[a] != 0) {
                    if (isNaN(parseInt(b))) i += registers[b] - 1;
                    else i += parseInt(b) - 1;
                }
            } else {
                if (a != 0) {
                    if (isNaN(parseInt(b))) i += registers[b] - 1;
                    else i += parseInt(b) - 1;
                }
            }
        } else if (command == 'tgl') {
            if (isNaN(parseInt(a))) {
                const toModify = instructions[i + registers[a]];
                if (!toModify) continue;
                if (!toModify.b) {
                    if (toModify.command == "inc") toModify.command = "dec";
                    else toModify.command = "inc";
                } else {
                    if (toModify.command == "jnz") toModify.command = "cpy";
                    else toModify.command = "jnz";
                }
            } else {
                const toModify = instructions[i + a];
                if (!toModify) continue;
                if (!toModify.b) {
                    if (toModify.command == "inc") toModify.command = "dec";
                    else toModify.command = "inc";
                } else {
                    if (toModify.command == "jnz") toModify.command = "cpy";
                    else toModify.command = "jnz";
                }
            }
        } else if (command == "mov") {
            registers[b] += registers[a];
            registers[a] = 0;
            i+=2;
        } else if (command == "mul") {
            registers[b] += registers[a] * registers[c];
            registers[a] = 0;
            registers[c] = 0;
            i+=4;
        } else if (command == "out") {
            if (isNaN(parseInt(a))) {
                if (last != registers[a]) {
                    last = registers[a];
                    count++;
                } else {
                    console.log(startingA, "no worky");
                    break;
                }
            } else {
                if (last != parseInt(a)) {
                    last = parseInt(a);
                    count++;
                } else {
                    console.log(startingA, "no worky");
                    break;
                }
            }
        }
    }

    startingA++;
    registers.a = startingA;
    registers.b = registers.c = registers.d = 0;
}

console.log(registers);
