const weapons = [
  [8, 4, 0],
  [10, 5, 0],
  [25, 6, 0],
  [40, 7, 0],
  [74, 8, 0],
];

const armors = [
  [0, 0, 0],
  [13, 0, 1],
  [31, 0, 2],
  [53, 0, 3],
  [75, 0, 4],
  [102, 0, 5],
];

const rings = [
  [0, 0, 0, "a"],
  [0, 0, 0, "b"],
  [25, 1, 0, "c"],
  [50, 2, 0, "d"],
  [100, 3, 0, "e"],
  [20, 0, 1, "f"],
  [40, 0, 2, "g"],
  [80, 0, 3, "h"],
]

var max = 0;
for (var weapon of weapons) {
  for (var armor of armors) {
    for (var ring1 of rings) {
      for (var ring2 of rings.filter(r => r[3] != ring1[3])) {
        var cost = weapon[0] + armor[0] + ring1[0] + ring2[0];
        var damage = weapon[1] + ring1[1] + ring2[1];
        var defense = armor[2] + ring1[2] + ring2[2];
        var win = wouldWin(damage, defense);

        console.log(`${cost} ${damage} ${defense} - ${win}`);

        if (win) continue;
        if (cost > max) max = cost;
      }
    }
  }
}

console.log(max);

function wouldWin(damage, armor) {
  var hp = 100;

  var bossHP = 104;
  var bossDamage = 8;
  var bossArmor = 1;

  while (true) {
    bossHP -= Math.max(1, damage - bossArmor);
    if (bossHP <= 0) return true;

    hp -= Math.max(1, bossDamage - armor);
    if (hp <= 0) return false;
  }
}