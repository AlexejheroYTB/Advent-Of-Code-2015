var rep = [
  ["Al", "ThF"],
  ["Al", "ThRnFAr"],
  ["B", "BCa"],
  ["B", "TiB"],
  ["B", "TiRnFAr"],
  ["Ca", "CaCa"],
  ["Ca", "PB"],
  ["Ca", "PRnFAr"],
  ["Ca", "SiRnFYFAr"],
  ["Ca", "SiRnMgAr"],
  ["Ca", "SiTh"],
  ["F", "CaF"],
  ["F", "PMg"],
  ["F", "SiAl"],
  ["H", "CRnAlAr"],
  ["H", "CRnFYFYFAr"],
  ["H", "CRnFYMgAr"],
  ["H", "CRnMgYFAr"],
  ["H", "HCa"],
  ["H", "NRnFYFAr"],
  ["H", "NRnMgAr"],
  ["H", "NTh"],
  ["H", "OB"],
  ["H", "ORnFAr"],
  ["Mg", "BF"],
  ["Mg", "TiMg"],
  ["N", "CRnFAr"],
  ["N", "HSi"],
  ["O", "CRnFYFAr"],
  ["O", "CRnMgAr"],
  ["O", "HP"],
  ["O", "NRnFAr"],
  ["O", "OTi"],
  ["P", "CaP"],
  ["P", "PTi"],
  ["P", "SiRnFAr"],
  ["Si", "CaSi"],
  ["Th", "ThCa"],
  ["Ti", "BP"],
  ["Ti", "TiTi"],
  ["e", "HF"],
  ["e", "NAl"],
  ["e", "OMg"]
]

var input = "CRnCaCaCaSiRnBPTiMgArSiRnSiRnMgArSiRnCaFArTiTiBSiThFYCaFArCaCaSiThCaPBSiThSiThCaCaPTiRnPBSiThRnFArArCaCaSiThCaSiThSiRnMgArCaPTiBPRnFArSiThCaSiRnFArBCaSiRnCaPRnFArPMgYCaFArCaPTiTiTiBPBSiThCaPTiBPBSiRnFArBPBSiRnCaFArBPRnSiRnFArRnSiRnBFArCaFArCaCaCaSiThSiThCaCaPBPTiTiRnFArCaPTiBSiAlArPBCaCaCaCaCaSiRnMgArCaSiThFArThCaSiThCaSiRnCaFYCaSiRnFYFArFArCaSiRnFYFArCaSiRnBPMgArSiThPRnFArCaSiRnFArTiRnSiRnFYFArCaSiRnBFArCaSiRnTiMgArSiThCaSiThCaFArPRnFArSiRnFArTiTiTiTiBCaCaSiRnCaCaFYFArSiThCaPTiBPTiBCaSiThSiRnMgArCaF"

input = input.split("").reverse().join("");

for (var r of rep) {
  r[0] = r[0].split("").reverse().join("");
  r[1] = r[1].split("").reverse().join("");
}

var c = 0;
while (input.length > 1) {
  for (var r of rep) {
    var index = input.indexOf(r[1]);
    while (index != -1) {
      input = input.replace(r[1], r[0]);
      index = input.indexOf(r[1]);
      c++;
    }
  }
}

console.log(c);

/*
var results = [];

input.forEach((char, i) => {
  var preps = rep.filter(e => e[0] == char).map(e => e[1]);
  for (var prep of preps) {
    var s = [...input];
    s[i] = prep;
    var x = s.join("");
    if (!results.includes(x)) {
      results.push(x);
      console.log(x);
    }
  }

  var doublePreps = rep.filter(e => e[0].charAt(0) == char && e[0].charAt(1) == input[i + 1]).map(e => e[1]);
  for (var prep of doublePreps) {
    var s = [...input];
    s[i] = prep;
    s[i + 1] = "";
    var x = s.join("");
    if (!results.includes(x)) {
      results.push(x);
      console.log(x);
    }
  }
});

console.log(results.length);
*/