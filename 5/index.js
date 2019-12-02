const fetch = require("node-fetch");

fetch("https://gist.githubusercontent.com/AlexejheroYTB/6196bb3f5a342473a5c94245a9582462/raw/9b55e517125317f06e5c314dac34b96112544200/Data-5.json").then(async res => {
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