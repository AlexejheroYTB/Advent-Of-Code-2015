const instructions = `jio a, +18
inc a
tpl a
inc a
tpl a
tpl a
tpl a
inc a
tpl a
inc a
tpl a
inc a
inc a
tpl a
tpl a
tpl a
inc a
jmp +22
tpl a
inc a
tpl a
inc a
inc a
tpl a
inc a
tpl a
inc a
inc a
tpl a
tpl a
inc a
inc a
tpl a
inc a
inc a
tpl a
inc a
inc a
tpl a
jio a, +8
inc b
jie a, +4
tpl a
inc a
jmp +2
hlf a
jmp -7`.split("\n").map(s => s.split(/,? /g));

var vars = {
  a: 1,
  b: 0
}

var i = 0;

while (i < instructions.length) {
  var instruction = instructions[i];
  console.log(`${instruction[0]} ${instruction[1]}${instruction[2] ? " " + instruction[2] : ""} - ${vars.a} ${vars.b}`);
  switch (instruction[0]) {
    case "hlf":
      vars[instruction[1]] = Math.floor(vars[instruction[1]] / 2);
      i++;
      break;
    case "tpl":
      vars[instruction[1]] *= 3;
      i++;
      break;
    case "inc":
      vars[instruction[1]]++;
      i++;
      break;
    case "jmp":
      i += Number.parseInt(instruction[1]);
      break;
    case "jie":
      if (vars[instruction[1]] % 2 == 0) i += Number.parseInt(instruction[2]);
      else i++;
      break;
    case "jio":
      if (vars[instruction[1]] == 1) i += Number.parseInt(instruction[2]);
      else i++;
      break;
  }
}

console.log(vars.b);