const md5 = require("md5");

var minSteps = " ".repeat(1000);
var maxSteps = "";
function backtracking(x, y, steps) {
    if (x == 3 && y == 3) {
        if (steps.length < minSteps.length) {
            minSteps = steps;
        }

        if (steps.length > maxSteps.length) {
            maxSteps = steps;
        }

        return;
    }

    const hash = md5("dmypynyp" + steps);
    if (y != 0 && "bcdef".includes(hash[0])) {
        backtracking(x, y - 1, steps + "U");
    }
    if (y != 3 && "bcdef".includes(hash[1])) {
        backtracking(x, y + 1, steps + "D");
    }
    if (x != 0 && "bcdef".includes(hash[2])) {
        backtracking(x - 1, y, steps + "L");
    }
    if (x != 3 && "bcdef".includes(hash[3])) {
        backtracking(x + 1, y, steps + "R");
    }
}

backtracking(0, 0, "");
console.log(minSteps.length, minSteps);
console.log(maxSteps.length, maxSteps);
