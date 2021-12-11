// The first floor contains a strontium generator, a strontium-compatible microchip, a plutonium generator, and a plutonium-compatible microchip.
// The second floor contains a thulium generator, a ruthenium generator, a ruthenium-compatible microchip, a curium generator, and a curium-compatible microchip.
// The third floor contains a thulium-compatible microchip.
// The fourth floor contains nothing relevant.

const appendFileSync = require("fs").appendFileSync;

let floors = [
    [{ element: "S", type: "G" }, { element: "S", type: "C" }, { element: "P", type: "G" }, { element: "P", type: "C" }],
    [{ element: "T", type: "G" }, { element: "R", type: "G" }, { element: "R", type: "C" }, { element: "C", type: "G" }, { element: "C", type: "C" }],
    [{ element: "T", type: "C" }],
    []
];
// floors[0].push({ element: "E", type: "G" }, { element: "E", type: "C" }, { element: "D", type: "G" }, { element: "D", type: "C" });

const cache = [];

// floors = [
//     [{ element: "H", type: "C" }, { element: "L", type: "C" }],
//     [{ element: "H", type: "G" }],
//     [{ element: "L", type: "G" }],
//     []
// ]

function verify(floor) {
    for (item of floor) {
        if (item.type == "C") {
            if (floor.filter(x => x.element == item.element && x.type == "G").length == 0 && 
                floor.filter(x => x.element != item.element && x.type == "G").length != 0) {
                return false;
            }
        }
    }
    return true;
}

function getState(floors) {
    let state = "";
    for (const floor of floors) {
        for (const item of floor.sort(itemSort)) {
            state += item.element + item.type;
        }
        state += ",";
    }
    return state + "\n";
}

function itemSort(a, b) {
    if (a.element < b.element) {
        return -1;
    }
    if (a.element > b.element) {
        return 1;
    }
    if (a.type < b.type) {
        return -1;
    }
    if (a.type > b.type) {
        return 1;
    }
    return 0;
}

function sortFloors(floors) {
    for (const floor of floors) {
        floor.sort(itemSort);
    }
}

let lastState = 0, fewestSteps = 100000;
function backtracking(floors, current, steps) {
    if (steps > 40) return;

    if (cache.includes(getState(floors) + " " + current)) return;
    cache.push(getState(floors) + " " + current);

    if (current == 3 && floors[0].length == 0 && floors[1].length == 0 && floors[2].length == 2) debugger;

    sortFloors(floors);

    // if (steps == 37) console.log(current, floors[0].length, floors[1].length, floors[2].length, floors[3].length, steps, current, floors[current].length);
    
    if (steps > lastState) {
        lastState = steps;
        console.log(steps);
    }

    if (floors[0].length == 0 && floors[1].length == 0 && floors[2].length == 0) {
        // console.log("Found solution in " + steps + " steps");
        // appendFileSync("result.txt", steps + "\n");
        if (steps < fewestSteps) {
            console.log("Solution found: " + steps);
            fewestSteps = steps;
        }
        return;
    }

    // Move two items up
    let movedTwoUp;
    if (current != 3) {
        sortFloors(floors);
        for (let i = 0; i < floors[current].length; i++) {
            const item1 = floors[current][i];
            for (let j = i + 1; j < floors[current].length; j++) {
                const item2 = floors[current][j];
                floors[current].splice(floors[current].findIndex(o => o.element == item1.element && o.type == item1.type), 1);
                floors[current].splice(floors[current].findIndex(o => o.element == item2.element && o.type == item2.type), 1);
                floors[current + 1].push(item1, item2);
                if (verify(floors[current]) && verify(floors[current + 1])) {
                    movedTwoUp = true;
                    backtracking(floors, current + 1, steps + 1);
                }
                floors[current + 1].splice(floors[current + 1].findIndex(o => o.element == item1.element && o.type == item1.type), 1);
                floors[current + 1].splice(floors[current + 1].findIndex(o => o.element == item2.element && o.type == item2.type), 1);
                floors[current].push(item2, item1);
                sortFloors(floors);
            }
        }
    }

    // Move one item up
    if (!movedTwoUp && current != 3) {
        sortFloors(floors);
        for (let i = 0; i < floors[current].length; i++) {
            const item = floors[current][i];
            floors[current].splice(floors[current].findIndex(o => o.element == item.element && o.type == item.type), 1);
            floors[current + 1].push(item);
            if (verify(floors[current]) && verify(floors[current + 1])) {
                backtracking(floors, current + 1, steps + 1);
            }
            floors[current + 1].splice(floors[current + 1].findIndex(o => o.element == item.element && o.type == item.type), 1)
            floors[current].push(item);
            sortFloors(floors);
        }
    }

    if (!((current == 1 && floors[current][0].length == 0) || (current == 2 && floors[current][0].length == 0 && floors[current][1].length == 0))) {
        // Move one item down
        let movedOneDown;
        if (current != 0) {
            sortFloors(floors);
            for (let i = 0; i < floors[current].length; i++) {
                const item = floors[current][i];
                floors[current].splice(floors[current].findIndex(o => o.element == item.element && o.type == item.type), 1);
                floors[current - 1].push(item);
                if (verify(floors[current]) && verify(floors[current - 1])) {
                    movedOneDown = true;
                    backtracking(floors, current - 1, steps + 1);
                }
                floors[current - 1].splice(floors[current - 1].findIndex(o => o.element == item.element && o.type == item.type), 1);
                floors[current].push(item);
                sortFloors(floors);
            }
        }

        // Move two items down
        if (!movedOneDown && current != 0) {
            sortFloors(floors);
            for (let i = 0; i < floors[current].length; i++) {
                const item1 = floors[current][i];
                for (let j = i + 1; j < floors[current].length; j++) {
                    const item2 = floors[current][j];
                    floors[current].splice(floors[current].findIndex(o => o.element == item1.element && o.type == item1.type), 1);
                    floors[current].splice(floors[current].findIndex(o => o.element == item2.element && o.type == item2.type), 1);
                    floors[current - 1].push(item1, item2);
                    if (verify(floors[current]) && verify(floors[current - 1])) {
                        backtracking(floors, current - 1, steps + 1);
                    }
                    floors[current - 1].splice(floors[current - 1].findIndex(o => o.element == item1.element && o.type == item1.type), 1);
                    floors[current - 1].splice(floors[current - 1].findIndex(o => o.element == item2.element && o.type == item2.type), 1);
                    floors[current].push(item1, item2);
                    sortFloors(floors);
                }
            }
        }
    }

    sortFloors(floors);
}

backtracking(floors, 0, 0);
console.log("Fewest steps: " + fewestSteps);
debugger;
