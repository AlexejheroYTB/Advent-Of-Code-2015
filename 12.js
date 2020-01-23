const fetch = require ("node-fetch");

fetch("https://adventofcode.com/2015/day/12/input", {
  headers: {
    cookie: "session=[TOKEN REMOVED]"
  }
}).then(async res => {
  var json = await res.json();
  console.log(add(json));
});

function add(obj) {
  var num = 0;
  for (var o of Object.values(obj)) {
    if (Object.values(obj).includes("red") && !Array.isArray(obj)) continue;
    if (typeof o == "number") num += o;
    if (typeof o == "object") num += add(o);
  }
  return num;
}