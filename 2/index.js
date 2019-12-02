const fetch = require("node-fetch");

fetch("https://raw.githubusercontent.com/AlexejheroYTB/AdventOfCode2015/master/2/data.json?token=AHV6XKFEVENBUBY4WHXAORC55YKUS").then(async res => {
    var json = await res.json();
    
    var total = 0;
    
    for (var s of json) {
        var w = s.split("x")[0];
        var h = s.split("x")[1];
        var l = s.split("x")[2];
        
        var f1 = w*h;
        var f2 = h*l;
        var f3 = w*l;
		
		var a = Math.min(w, h, l);
        var b = Math.min(a == w ? 100000 : w, a == h && a != w ? 100000 : h, a == l && a != w && a != h ? 100000 : l);
        
        //total += Math.min(f1, f2, f3) + 2 * (f1 + f2 + f3);
		total += w*h*l + 2 * (a + b);
    }
    
    console.log(total);
}).catch(e => console.error(e));
