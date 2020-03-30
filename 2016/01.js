const input = ["R4", "R5", "L5", "L5", "L3", "R2", "R1", "R1", "L5", "R5", "R2", "L1", "L3", "L4", "R3", "L1", "L1", "R2", "R3", "R3", "R1", "L3", "L5", "R3", "R1", "L1", "R1", "R2", "L1", "L4", "L5", "R4", "R2", "L192", "R5", "L2", "R53", "R1", "L5", "R73", "R5", "L5", "R186", "L3", "L2", "R1", "R3", "L3", "L3", "R1", "L4", "L2", "R3", "L5", "R4", "R3", "R1", "L1", "R5", "R2", "R1", "R1", "R1", "R3", "R2", "L1", "R5", "R1", "L5", "R2", "L2", "L4", "R3", "L1", "R4", "L5", "R4", "R3", "L5", "L3", "R4", "R2", "L5", "L5", "R2", "R3", "R5", "R4", "R2", "R1", "L1", "L5", "L2", "L3", "L4", "L5", "L4", "L5", "L1", "R3", "R4", "R5", "R3", "L5", "L4", "L3", "L1", "L4", "R2", "R5", "R5", "R4", "L2", "L4", "R3", "R1", "L2", "R5", "L5", "R1", "R1", "L1", "L5", "L5", "L2", "L1", "R5", "R2", "L4", "L1", "R4", "R3", "L3", "R1", "R5", "L1", "L4", "R2", "L3", "R5", "R3", "R1", "L3"];

var visited = [[0, 0]];

var posX = 0, posY = 0, direction = 0;

for (var i of input) {
  switch (i.substr(0, 1)) {
    case "L":
      direction--;
      if (direction == -1) direction = 3;
      break;
    case "R":
      direction++;
      if (direction == 4) direction = 0;
      break;
  }
  var amount = parseInt(i.substr(1));
  switch (direction) {
    case 0:
      add(false, amount);
      break;
    case 1:
      add(true, amount);
      break;
    case 2:
      add(false, -amount);
      break;
    case 3:
      add(true, -amount);
      break;
  }
}

function add(x, amount) {
  for (var i = 0; i < Math.abs(amount); i++) {
    if (amount < 0) {
      if (x) posX--;
      else posY--;
    } else {
      if (x) posX++;
      else posY++;
    }
    if (visited.filter(v => v[0] == posX && v[1] == posY).length > 0) {
      console.log(Math.abs(posX) + Math.abs(posY));
      process.exit(0);
    }
    visited.push([posX, posY]);
  }
}

