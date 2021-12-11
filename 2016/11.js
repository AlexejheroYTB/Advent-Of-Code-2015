// The first floor contains a strontium generator, a strontium-compatible microchip, a plutonium generator, and a plutonium-compatible microchip.
// The second floor contains a thulium generator, a ruthenium generator, a ruthenium-compatible microchip, a curium generator, and a curium-compatible microchip.
// The third floor contains a thulium-compatible microchip.
// The fourth floor contains nothing relevant.

const nextTick = require("process").nextTick;
const appendFileSync = require("fs").appendFileSync;

const floors = [
    [{ element: "S", type: "G" }, { element: "S", type: "C" }, { element: "P", type: "G" }, { element: "P", type: "C" }],
    [{ element: "T", type: "G" }, { element: "R", type: "G" }, { element: "R", type: "C" }, { element: "C", type: "G" }, { element: "C", type: "C" }],
    [{ element: "T", type: "C" }],
    []
];

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

let lastState = 0;
function backtracking(floors, current, previousState, steps) {
    // console.log(current, floors[0].length, floors[1].length, floors[2].length, floors[3].length, steps);
    
    if (steps > lastState) {
        lastState = steps;
        console.log(steps);
    }

    if (floors[0].length == 0 && floors[1].length == 0 && floors[2].length == 0) {
        console.log("Found solution in " + steps + " steps");
        appendFileSync("result.txt", steps + "\n");
    }

    // Move two items up
    let movedTwoUp;
    if (current != 3) {
        for (let i = 0; i < floors[current].length; i++) {
            const item1 = floors[current][i];
            for (let j = i + 1; j < floors[current].length; j++) {
                const item2 = floors[current][j];

                const newFloors = JSON.parse(JSON.stringify(floors));
                newFloors[current].splice(newFloors[current].findIndex(o => o.element == item1.element && o.type == item1.type), 1);
                newFloors[current].splice(newFloors[current].findIndex(o => o.element == item2.element && o.type == item2.type), 1);
                newFloors[current + 1].push(JSON.parse(JSON.stringify(item1)));
                newFloors[current + 1].push(JSON.parse(JSON.stringify(item2)));
                if (verify(newFloors[current]) && verify(newFloors[current + 1]) && !previousState.includes(getState(newFloors))) {
                    movedTwoUp = true;
                    nextTick(() => backtracking(newFloors, current + 1, previousState + getState(floors), steps + 1));
                }
            }
        }
    }

    // Move one item up
    if (!movedTwoUp) {
        if (current != 3) {
            for (const item of floors[current]) {
                const newFloors = JSON.parse(JSON.stringify(floors));
                newFloors[current].splice(newFloors[current].findIndex(o => o.element == item.element && o.type == item.type), 1);
                newFloors[current + 1].push(JSON.parse(JSON.stringify(item)));
                if (verify(newFloors[current]) && verify(newFloors[current + 1]) && !previousState.includes(getState(newFloors))) {
                    nextTick(() => backtracking(newFloors, current + 1, previousState + getState(floors), steps + 1));
                }
            }
        }
    }

    // Move one item down
    let movedOneDown;
    if (current != 0) {
        for (const item of floors[current]) {
            const newFloors = JSON.parse(JSON.stringify(floors));
            newFloors[current].splice(newFloors[current].findIndex(o => o.element == item.element && o.type == item.type), 1);
            newFloors[current - 1].push(JSON.parse(JSON.stringify(item)));
            if (verify(newFloors[current]) && verify(newFloors[current - 1]) && !previousState.includes(getState(newFloors))) {
                movedOneDown = true;
                nextTick(() => backtracking(newFloors, current - 1, previousState + getState(floors), steps + 1));
            }
        }
    }

    // Move two items down
    if (!movedOneDown) {
        if (current == 0) return;
        if (current == 1 && floors[0].length == 0) return;
        if (current == 2 && floors[0].length == 0 && floors[1].length == 0) return;

        for (let i = 0; i < floors[current].length; i++) {
            const item1 = floors[current][i];
            for (let j = i + 1; j < floors[current].length; j++) {
                const item2 = floors[current][j];

                const newFloors = JSON.parse(JSON.stringify(floors));
                newFloors[current].splice(newFloors[current].findIndex(o => o.element == item1.element && o.type == item1.type), 1);
                newFloors[current].splice(newFloors[current].findIndex(o => o.element == item2.element && o.type == item2.type), 1);
                newFloors[current - 1].push(JSON.parse(JSON.stringify(item1)));
                newFloors[current - 1].push(JSON.parse(JSON.stringify(item2)));
                if (verify(newFloors[current]) && verify(newFloors[current - 1]) && !previousState.includes(getState(newFloors))) {
                    nextTick(() => backtracking(newFloors, current - 1, previousState + getState(floors), steps + 1));
                }
            }
        }
    }
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

backtracking(floors, 0, "", 0);
