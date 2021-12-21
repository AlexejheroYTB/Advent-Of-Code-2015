var input = `cpy a b
dec b
cpy a d
cpy 0 a
cpy b c
mul c a d




dec b
cpy b c
cpy c d
mov d c


tgl c
cpy -16 c
jnz 1 c
cpy 86 c
jnz 77 d
inc a
inc d
jnz d -2
inc c
jnz c -5`;

const instructions = [];
const registers = {"a": 12, "b": 0, "c": 0, "d": 0};

for (const i of input.split(/\n/g)) {
    const [command, a, b, c] = i.split(/\s+/);
    instructions.push({ command, a, b, c });
}

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
    }
}

console.log(registers);
