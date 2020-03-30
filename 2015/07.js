const fetch = require("node-fetch");

var wires = { };
var signals = { };

fetch("https://untitled-h96qt5ufici0.runkit.sh/").then(async res => {
    var json = await res.json();
    
    for (var s of json) {
      wires[s.split(" -> ")[1]] = s.split(" -> ")[0];
    }
    
    console.log(getsignal("a"));
}).catch(e => console.error(e));

function getsignal(id) {
  if (signals[id]) return signals[id];
  var ins = wires[id];
  var args = ins.split(" ");
  if (ins.includes("NOT")) {
    var val = ~getsignal(args[1]) & 0xFFFF;
    signals[id] = val;
    return val;
  } else if (ins.includes("AND")) {
    if (parseInt(args[0]).toString() == args[0]) {
      var val = parseInt(args[0]) & getsignal(args[2]);
      signals[id] = val;
      return val;
    } else {
      var val = getsignal(args[0]) & getsignal(args[2]);
      signals[id] = val;
      return val;
    }
  } else if (ins.includes("OR")) {
      var val = getsignal(args[0]) | getsignal(args[2]);
      signals[id] = val;
      return val;
  } else if (ins.includes("LSHIFT")) {
      var val = getsignal(args[0]) << parseInt(args[2]);
      signals[id] = val;
      return val;
  } else if (ins.includes("RSHIFT")) {
      var val = getsignal(args[0]) >> parseInt(args[2]);
      signals[id] = val;
      return val;
  } else {
    if (parseInt(args[0]).toString() == args[0]) {
      var val = parseInt(args[0]);
      signals[id] = val;
      return val;
    } else {
      var val = getsignal(args[0]);
      signals[id] = val;
      return val;
    }
  }
}