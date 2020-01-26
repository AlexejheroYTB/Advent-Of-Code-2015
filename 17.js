var t = [];

for (var a1 = 0; a1 < 2; a1++)
for (var a2 = 0; a2 < 2; a2++)
for (var a3 = 0; a3 < 2; a3++)
for (var a4 = 0; a4 < 2; a4++)
for (var a5 = 0; a5 < 2; a5++)
for (var a6 = 0; a6 < 2; a6++)
for (var a7 = 0; a7 < 2; a7++)
for (var a8 = 0; a8 < 2; a8++)
for (var a9 = 0; a9 < 2; a9++)
for (var a10 = 0; a10 < 2; a10++)
for (var a11 = 0; a11 < 2; a11++)
for (var a12 = 0; a12 < 2; a12++)
for (var a13 = 0; a13 < 2; a13++)
for (var a14 = 0; a14 < 2; a14++)
for (var a15 = 0; a15 < 2; a15++)
for (var a16 = 0; a16 < 2; a16++)
for (var a17 = 0; a17 < 2; a17++)
for (var a18 = 0; a18 < 2; a18++)
for (var a19 = 0; a19 < 2; a19++)
for (var a20 = 0; a20 < 2; a20++) {
  
  var s1 = a1 ? 43 : 0;
  var s2 = a2 ? 3 : 0;
  var s3 = a3 ? 4 : 0;
  var s4 = a4 ? 10 : 0;
  var s5 = a5 ? 21 : 0;  
  var s6 = a6 ? 44 : 0;
  var s7 = a7 ? 4 : 0;
  var s8 = a8 ? 6 : 0;
  var s9 = a9 ? 47 : 0;
  var s10 = a10 ? 41 : 0;  
  var s11 = a11 ? 34 : 0;
  var s12 = a12 ? 17 : 0;
  var s13 = a13 ? 17 : 0;
  var s14 = a14 ? 44 : 0;
  var s15 = a15 ? 36 : 0;  
  var s16 = a16 ? 31 : 0;
  var s17 = a17 ? 46 : 0;
  var s18 = a18 ? 9 : 0;
  var s19 = a19 ? 27 : 0;
  var s20 = a20 ? 38 : 0;

  var s = s1+s2+s3+s4+s5+s6+s7+s8+s9+s10+s11+s12+s13+s14+s15+s16+s17+s18+s19+s20;
  var c = a1+a2+a3+a4+a5+a6+a7+a8+a9+a10+a11+a12+a13+a14+a15+a16+a17+a18+a19+a20;
  if (s == 150) {
    t.push(c);
  }

  console.log(`${a1}${a2}${a3}${a4}${a5}${a6}${a7}${a8}${a9}${a10}${a11}${a12}${a13}${a14}${a15}${a16}${a17}${a18}${a19}${a20} - ${c} - ${s}${(s == 150 ? " (YES)" : "")}`)

}

t.sort();
console.log(`${t[0]} - ${t.filter(x => x == t[0]).length}`);