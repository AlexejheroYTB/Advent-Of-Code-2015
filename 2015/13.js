var happinesses = [
  ["Alice", "Bob", -57],
  ["Alice", "Carol", -62],
  ["Alice", "David", -75],
  ["Alice", "Eric", 71],
  ["Alice", "Frank", -22],
  ["Alice", "George", -23],
  ["Alice", "Mallory", -76],
  ["Bob", "Alice", -14],
  ["Bob", "Carol", 48],
  ["Bob", "David", 89],
  ["Bob", "Eric", 86],
  ["Bob", "Frank", -2],
  ["Bob", "George", 27],
  ["Bob", "Mallory", 19],
  ["Carol", "Alice", 37],
  ["Carol", "Bob", 45],
  ["Carol", "David", 24],
  ["Carol", "Eric", 5],
  ["Carol", "Frank", -68],
  ["Carol", "George", -25],
  ["Carol", "Mallory", 30],
  ["David", "Alice", -51],
  ["David", "Bob", 34],
  ["David", "Carol", 99],
  ["David", "Eric", 91],
  ["David", "Frank", -38],
  ["David", "George", 60],
  ["David", "Mallory", -63],
  ["Eric", "Alice", 23],
  ["Eric", "Bob", -69],
  ["Eric", "Carol", -33],
  ["Eric", "David", -47],
  ["Eric", "Frank", 75],
  ["Eric", "George", 82],
  ["Eric", "Mallory", 13],
  ["Frank", "Alice", 77],
  ["Frank", "Bob", 27],
  ["Frank", "Carol", -87],
  ["Frank", "David", 74],
  ["Frank", "Eric", -41],
  ["Frank", "George", -99],
  ["Frank", "Mallory", 26],
  ["George", "Alice", -63],
  ["George", "Bob", -51],
  ["George", "Carol", -60],
  ["George", "David", 30],
  ["George", "Eric", -100],
  ["George", "Frank", -63],
  ["George", "Mallory", 57],
  ["Mallory", "Alice", -71],
  ["Mallory", "Bob", -28],
  ["Mallory", "Carol", -10],
  ["Mallory", "David", 44],
  ["Mallory", "Eric", 22],
  ["Mallory", "Frank", 79],
  ["Mallory", "George", -16],
]

var people = ["me"];

for (var happiness of happinesses) {
  if (!people.includes(happiness[0])) people.push(happiness[0]);
  if (!people.includes(happiness[1])) people.push(happiness[1]);
}

var max = 0;
for (var happy1 of people) {
  for (var happy2 of people.filter(p => p != happy1)) {
    for (var happy3 of people.filter(p => p != happy1 && p != happy2)) {
      for (var happy4 of people.filter(p => p != happy1 && p != happy2 && p != happy3)) {
        for (var happy5 of people.filter(p => p != happy1 && p != happy2 && p != happy3 && p != happy4)) {
          for (var happy6 of people.filter(p => p != happy1 && p != happy2 && p != happy3 && p != happy4 && p != happy5)) {
            for (var happy7 of people.filter(p => p != happy1 && p != happy2 && p != happy3 && p != happy4 && p != happy5 && p != happy6)) {
              for (var happy8 of people.filter(p => p != happy1 && p != happy2 && p != happy3 && p != happy4 && p != happy5 && p != happy6 && p != happy7)) {
                for (var happy9 of people.filter(p => p != happy1 && p != happy2 && p != happy3 && p != happy4 && p != happy5 && p != happy6 && p != happy7 && p != happy8)) {
                    var h = getHappinessBetween(happy1, happy2) + getHappinessBetween(happy2, happy3) + getHappinessBetween(happy3, happy4) + getHappinessBetween(happy4, happy5) + getHappinessBetween(happy5, happy6) + getHappinessBetween(happy6, happy7) + getHappinessBetween(happy7, happy8) + getHappinessBetween(happy8, happy9) + getHappinessBetween(happy9, happy1);

                  console.log(`${h}`);

                  if (h > max) max = h;
                }
              }
            }
          }
        }
      }
    }
  }
}

console.log(max);

function getHappinessBetween(l1, l2) {
  if (l1 == "me" || l2 == "me") return 0;
  return happinesses.filter(d => d[0] == l1 && d[1] == l2)[0][2] + happinesses.filter(d => d[0] == l2 && d[1] == l1)[0][2];
}
