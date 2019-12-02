const md5 = require("md5");
const key = "ckczppom";

for (var i = 1; true; i++) {
  if (md5(key+i).startsWith("000000")) {
    console.log(md5(key+i));
    console.log(i);
    break;
  }
}