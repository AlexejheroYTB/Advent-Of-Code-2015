for (var i = 800000; true; i++) {
  var p = getPresents(i);
  console.log(`${i} - ${p}`);
  if (p >= 34000000) {
    console.log(i);
    break;
  }
}

function getPresents(i) {
  var p = 0;
  for (var x = 1; x <= i; x++) {
    if (i % x == 0 && i / x <= 50) p += x * 11;
  }
  return p;
}