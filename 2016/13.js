const pf = require("pathfinding");

function canWalkOn(x, y) {
    if (x == 1 && y == 1) return true;
    let find = x*x+3*x+2*x*y+y+y*y+1364;
    return find.toString(2).split("").filter(x => x == "1").length % 2 == 0;
}

let ok = 0;
for (let i = 0; i < 100; i++) {
    for (let j = 0; j < 100; j++) {
        const grid = new pf.Grid(100, 100);

        for (let i = 0; i < 100; i++) {
            for (let j = 0; j < 100; j++) {
                grid.setWalkableAt(i, j, canWalkOn(i, j));
            }
        }

        const length = new pf.AStarFinder().findPath(1, 1, i, j, grid).length;
        if (length > 0 && length <= 51) {
            console.log(`Can reach ${i}x${j} with ${length} steps`);
            ok++;
        }
    }
}

console.log(ok)