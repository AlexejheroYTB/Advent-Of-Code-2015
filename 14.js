var reindeers = [
  ["Dancer", 27, 5, 132, 0, 0],
  ["Cupid", 22, 2, 41, 0, 0],
  ["Rudolph", 11, 5, 48, 0, 0],
  ["Donner", 28, 5, 134, 0, 0],
  ["Dasher", 4, 16, 55, 0, 0],
  ["Blitzen", 14, 3, 38, 0, 0],
  ["Prancer", 3, 21, 40, 0, 0],
  ["Comet", 18, 6, 103, 0, 0],
  ["Vixen", 18, 5, 84, 0, 0],
]

for (var i = 1; i <= 2503; i++) {
  for (var reindeer of reindeers) {
    var r = i % (reindeer[2] + reindeer[3]);
    if (r > 0 && r <= reindeer[2]) reindeer[4] += reindeer[1];
  }

  for (var reindeer of getLeadingReindeers()) {
    reindeer[5]++;
  }
}

function getLeadingReindeers() {
  reindeers.sort((r1, r2) => r1[4] > r2[4] ? -1 : 1);
  var r = reindeers.filter(r => r[4] == reindeers[0][4]);
  return r;
}

var max = 0
for (var reindeer of reindeers) {
  console.log(`${reindeer[4]} ${reindeer[5]}`);
  if (reindeer[5] > max) max = reindeer[5];
}

console.log(max);