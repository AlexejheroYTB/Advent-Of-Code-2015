const fetch = require("node-fetch");

fetch("https://raw.githubusercontent.com/AlexejheroYTB/AdventOfCode2015/master/5/data.json?token=AHV6XKFW25OLCBUIIQ7QKQC55YKYS").then(async res => {
    var json = await res.json();
    
    var total = 0;
    
    for (var s of json) {
      var b1 = false, b2 = false;
      s.split("").forEach((v, i) => {
        if (s[i] == s[i+2]) b1 = true;
        if (((s).match(new RegExp(`${s[i]}${s[i+1]}`, 'g')) || []).length > 1) b2 = true;
      });
      if (b1 && b2) total++;
    }
    
    console.log(total);
}).catch(e => console.error(e));
