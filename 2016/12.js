var input = `cpy 1 a
cpy 1 b
cpy 26 d
jnz c 2
jnz 1 5
cpy 7 c
inc d
dec c
jnz c -2
cpy a c
inc a
dec b
jnz b -2
cpy c b
dec d
jnz d -6
cpy 17 c
cpy 18 d
inc a
dec d
jnz d -2
dec c
jnz c -5`;

const instructions = [];
const registers = {"a": 0, "b": 0, "c": 1, "d": 0};

for (const i of input.split(/\n/g)) {
    const [command, a, b] = i.split(/\s+/);
    instructions.push({ command, a, b });
}

for (let i = 0; i < instructions.length; i++) {
    const { command, a, b } = instructions[i];
    if (command === 'cpy') {
        const value = parseInt(a);
        if (isNaN(value)) {
            registers[b] = registers[a];
        } else {
            registers[b] = a;
        }
    } else if (command === 'inc') {
        registers[a]++;
    } else if (command === 'dec') {
        registers[a]--;
    } else if (command === 'jnz') {
        const value = parseInt(a);
        const oldi = i;
        if (isNaN(value)) {
            if (registers[a] != 0) {
                i += parseInt(b) - 1;
            }
        } else {
            if (a != 0) {
                i += parseInt(b) - 1;
            }
        }
    }
}

console.log(registers)