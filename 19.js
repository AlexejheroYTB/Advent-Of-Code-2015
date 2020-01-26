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

var input = "CRnCaCaCaSiRnBPTiMgArSiRnSiRnMgArSiRnCaFArTiTiBSiThFYCaFArCaCaSiThCaPBSiThSiThCaCaPTiRnPBSiThRnFArArCaCaSiThCaSiThSiRnMgArCaPTiBPRnFArSiThCaSiRnFArBCaSiRnCaPRnFArPMgYCaFArCaPTiTiTiBPBSiThCaPTiBPBSiRnFArBPBSiRnCaFArBPRnSiRnFArRnSiRnBFArCaFArCaCaCaSiThSiThCaCaPBPTiTiRnFArCaPTiBSiAlArPBCaCaCaCaCaSiRnMgArCaSiThFArThCaSiThCaSiRnCaFYCaSiRnFYFArFArCaSiRnFYFArCaSiRnBPMgArSiThPRnFArCaSiRnFArTiRnSiRnFYFArCaSiRnBFArCaSiRnTiMgArSiThCaSiThCaFArPRnFArSiRnFArTiTiTiTiBCaCaSiRnCaCaFYFArSiThCaPTiBPTiBCaSiThSiRnMgArCaF".split("");



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