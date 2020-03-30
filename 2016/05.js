const md5 = require("md5");

const input = "wtnhxymk";
var password = ["", "", "", "", "", "", "", ""];
var passwordC = 0;

for (var i = 0; true; i++) {
  var hash = md5(input + i);
  if (hash.startsWith("00000")) {
    var pos = parseInt(hash.substr(5, 1));
    if (pos >= 0 && pos <= 7) {
      if (!password[pos]) {
        password[pos] = hash.substr(6, 1);
        passwordC++;
      }
    }
  }
  if (passwordC == 8) {
    console.log(password.join(""));
    break;
  }
}