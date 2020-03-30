var s = "3113322113";
var o = "";

for (var i = 0; i < 50; i++) {
  console.log(i);
  var c = 0, v;
  for (var x = 0; x < s.length; x++) {
    if (!v) {
      v = s[x];
      c = 1;
    } 
    else if (v == s[x]) c++;
    else {
      o += c;
      o += v;
      v = s[x];
      c = 1;
    }
  }
  o += c;
  o += v;

  s = o;
  o = "";
  c = 0;
  v = null;
}

//console.log(s);
console.log(s.length);