const spells = [
  {
    name: "Magic Missle",
    cost: 53,
    cast: (p, b) => {
      b.health -= 4;
    },
  },
  {
    name: "Drain",
    cost: 73,
    cast: (p, b) => {
      p.health += 2;
      b.health -= 2;
    },
  },
  {
    name: "Shield",
    cost: 113,
    duration: 6,
    cast: (p, b) => {
      p.armor += 7;
    },
    uncast: (p, b) => {
      p.armor -= 7;
    },
  },
  {
    name: "Poison",
    cost: 173,
    duration: 6,
    turn: (p, b) => {
      b.health -= 3;
    },
  },
  {
    name: "Recharge",
    cost: 229,
    duration: 5,
    turn: (p, b) => {
      p.mana += 101;
    }
  }
]

class Character {
  mana = 0;
  health = 0;
  damage = 0;
  armor = 0;
}

function turn(cost, t, Player, Boss, effects) {
  var effectsToRemove = [];
  for (var effect of effects) {
    if (effect.turn) effect.turn(Player, Boss);
    effect.duration--;
    if (effect.duration == 0) {
      effectsToRemove.push(effect);
      if (effect.uncast) effect.uncast(Player, Boss);
    }
  }
  effects = effects.filter(e => !effectsToRemove.includes(e));

  if (Player.health < 1) return;
  if (Boss.health < 1) return finish(cost);

  if (t % 2 == 1) {
    var castableSpells = spells.filter(s => s.cost < Player.mana).filter(s => !effects.map(e => e.name).includes(s.name)).filter(s => cost + s.cost < min);
    if (castableSpells.length == 0) return;
    for (var s of castableSpells.sort(() => Math.floor(Math.random() * 2) * -2 + 1)) {
      spell(s, cost, t, Object.assign(Object.create(Object.getPrototypeOf(Player)), Player), Object.assign(Object.create(Object.getPrototypeOf(Boss)), Boss), [...effects])
    }
  } else {
    Player.health -= Math.max(1, Boss.damage - Player.armor);
  }

  if (Player.health < 1) return;
  if (Boss.health < 1) return finish(cost);

  if (cost >= min) return;
  turn(cost, t + 1, Object.assign(Object.create(Object.getPrototypeOf(Player)), Player), Object.assign(Object.create(Object.getPrototypeOf(Boss)), Boss), [...effects]);
}

function spell(spell, cost, t, Player, Boss, effects) {
  cost += spell.cost;
  if (spell.duration) effects.push(spell);
  if (spell.cast) spell.cast(Player, Boss);

  if (Player.health < 1) return;
  if (Boss.health < 1) return finish(cost);

  if (cost >= min) return;
  turn(cost, t + 1, Object.assign(Object.create(Object.getPrototypeOf(Player)), Player), Object.assign(Object.create(Object.getPrototypeOf(Boss)), Boss), [...effects]);
}

// var min = 802;
var min = Infinity;
function finish(cost) {
  if (cost < min) {
    min = cost;
    console.log(cost);
  }
}

var Player = new Character();
Player.mana = 500;
Player.health = 50;

var Boss = new Character();
Boss.health = 51;
Boss.damage = 9;

turn(0, 1, Player, Boss, []);