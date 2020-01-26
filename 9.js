var distances = [
  ["Faerun", "Norrath", 129],
  ["Faerun", "Tristram", 58],
  ["Faerun", "AlphaCentauri", 13],
  ["Faerun", "Arbre", 24],
  ["Faerun", "Snowdin", 60],
  ["Faerun", "Tambi", 71],
  ["Faerun", "Straylight", 67],
  ["Norrath", "Tristram", 142],
  ["Norrath", "AlphaCentauri", 15],
  ["Norrath", "Arbre", 135],
  ["Norrath", "Snowdin", 75],
  ["Norrath", "Tambi", 82],
  ["Norrath", "Straylight", 54],
  ["Tristram", "AlphaCentauri", 118],
  ["Tristram", "Arbre", 122],
  ["Tristram", "Snowdin", 103],
  ["Tristram", "Tambi", 49],
  ["Tristram", "Straylight", 97],
  ["AlphaCentauri", "Arbre", 116],
  ["AlphaCentauri", "Snowdin", 12],
  ["AlphaCentauri", "Tambi", 18],
  ["AlphaCentauri", "Straylight", 91],
  ["Arbre", "Snowdin", 129],
  ["Arbre", "Tambi", 53],
  ["Arbre", "Straylight", 40],
  ["Snowdin", "Tambi", 15],
  ["Snowdin", "Straylight", 99],
  ["Tambi", "Straylight", 70],
];

var places = [];

for (var distance of distances) {
  if (!places.includes(distance[0])) places.push(distance[0]);
  if (!places.includes(distance[1])) places.push(distance[1]);
}

var max = 0;
for (var place1 of places) {
  for (var place2 of places.filter(p => p != place1)) {
    for (var place3 of places.filter(p => p != place1 && p != place2)) {
      for (var place4 of places.filter(p => p != place1 && p != place2 && p != place3)) {
        for (var place5 of places.filter(p => p != place1 && p != place2 && p != place3 && p != place4)) {
          for (var place6 of places.filter(p => p != place1 && p != place2 && p != place3 && p != place4 && p != place5)) {
            for (var place7 of places.filter(p => p != place1 && p != place2 && p != place3 && p != place4 && p != place5 && p != place6)) {
              for (var place8 of places.filter(p => p != place1 && p != place2 && p != place3 && p != place4 && p != place5 && p != place6 && p != place7)) {
                var d = getDistanceBetween(place1, place2) + getDistanceBetween(place2, place3) + getDistanceBetween(place3, place4) + getDistanceBetween(place4, place5) + getDistanceBetween(place5, place6) + getDistanceBetween(place6, place7) + getDistanceBetween(place7, place8);

                console.log(d);

                if (d > max) max = d;
              }
            }
          }
        }
      }
    }
  }
}

console.log(max);

function getDistanceBetween(l1, l2) {
  return distances.filter(d => (d[0] == l1 && d[1] == l2) || (d[0] == l2 && d[1] == l1))[0][2];
}

/*
  var distanceTravelled = 0;
  var remainingPlaces = [...places].filter(p => p != place);
  var currentPlace = place;

  while (true) {
    var matchingDistances = distances.filter(d => d[0] == currentPlace || d[1] == currentPlace).filter(d => remainingPlaces.includes(d[0]) || remainingPlaces.includes(d[1])).sort(dSort);

    console.log(currentPlace);

    if (matchingDistances.length == 0) { 
      console.log(distanceTravelled);
      console.log();
      console.log();
      break;
    }

    distanceTravelled += matchingDistances[0][2];
    var newPlace = matchingDistances[0][0] == currentPlace ? matchingDistances[0][1] : matchingDistances[0][0];
    remainingPlaces = remainingPlaces.filter(p => p != newPlace);
    currentPlace = newPlace;
  }
}

function dSort(a, b) {
  return a[2] > b[2] ? 1 : a[2] == b[2] ? 0 : -1;
}
*/