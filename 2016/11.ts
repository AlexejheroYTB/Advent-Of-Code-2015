// The first floor contains a strontium generator, a strontium-compatible microchip, a plutonium generator, and a plutonium-compatible microchip.
// The second floor contains a thulium generator, a ruthenium generator, a ruthenium-compatible microchip, a curium generator, and a curium-compatible microchip.
// The third floor contains a thulium-compatible microchip.
// The fourth floor contains nothing relevant.

type _Object = {
    element: "S" | "P" | "T" | "R" | "C" | "E" | "D" | "H" | "L";
    type: "C" | "G";
};

type _Floor = _Object[];

type _Building = _Floor[];

type _State = {
    floors: _Building;
    elevator: 0 | 1 | 2 | 3;
};

let floors: _Building = [
    [{ element: "S", type: "G" }, { element: "S", type: "C" }, { element: "P", type: "G" }, { element: "P", type: "C" }],
    [{ element: "T", type: "G" }, { element: "R", type: "G" }, { element: "R", type: "C" }, { element: "C", type: "G" }, { element: "C", type: "C" }],
    [{ element: "T", type: "C" }],
    []
];
floors[0].push({ element: "E", type: "G" }, { element: "E", type: "C" }, { element: "D", type: "G" }, { element: "D", type: "C" });

// floors = [
//     [{ element: "H", type: "C" }, { element: "L", type: "C" }],
//     [{ element: "H", type: "G" }],
//     [{ element: "L", type: "G" }],
//     []
// ];

const seenStates: string[] = [];

function getState(floors: _State): string {
    let state = "";
    for (const floor of floors.floors) {
        state += floor.filter(e => e.type == "G").length + "&" + floor.filter(e => e.type == "C").length + ","
    }
    return state + floors.elevator;
}

function verify(floor: _Floor): boolean {
    for (const item of floor) {
        if (item.type == "C") {
            if (floor.filter(x => x.element == item.element && x.type == "G").length == 0 &&
                floor.filter(x => x.element != item.element && x.type == "G").length != 0) {
                return false;
            }
        }
    }
    return true;
}

function nextStates(state: _State): _State[] {
    const results: _State[] = [];

    // Move two items up
    if (state.elevator < 3) {
        for (let i = 0; i < state.floors[state.elevator].length; i++) {
            for (let j = i + 1; j < state.floors[state.elevator].length; j++) {
                const newFloors: _Building = state.floors.map(x => x.slice());
                newFloors[state.elevator + 1].push(newFloors[state.elevator].splice(i, 1)[0]);
                newFloors[state.elevator + 1].push(newFloors[state.elevator].splice(j - 1, 1)[0]);

                if (!verify(newFloors[state.elevator]) || !verify(newFloors[state.elevator + 1])) continue;

                const newState = {
                    floors: newFloors,
                    elevator: state.elevator + 1 as any,
                };

                if (seenStates.includes(getState(newState))) continue;
                seenStates.push(getState(newState));

                results.push(newState);
            }
        }
    }

    // Move one item up
    if (state.elevator < 3) {
        for (let i = 0; i < state.floors[state.elevator].length; i++) {
            const newFloors: _Building = state.floors.map(x => x.slice());
            newFloors[state.elevator + 1].push(newFloors[state.elevator].splice(i, 1)[0]);

            if (!verify(newFloors[state.elevator]) || !verify(newFloors[state.elevator + 1])) continue;

            const newState = {
                floors: newFloors,
                elevator: state.elevator + 1 as any,
            };

            if (seenStates.includes(getState(newState))) continue;
            seenStates.push(getState(newState));

            results.push(newState);
        }
    }

    // Move one item down
    if (state.elevator > 0) {
        for (let i = 0; i < state.floors[state.elevator].length; i++) {
            const newFloors: _Building = state.floors.map(x => x.slice());
            newFloors[state.elevator - 1].push(newFloors[state.elevator].splice(i, 1)[0]);

            if (!verify(newFloors[state.elevator]) || !verify(newFloors[state.elevator - 1])) continue;

            const newState = {
                floors: newFloors,
                elevator: state.elevator - 1 as any,
            };

            if (seenStates.includes(getState(newState))) continue;
            seenStates.push(getState(newState));

            results.push(newState);
        }
    }

    // Move two items down
    if (state.elevator > 0) {
        for (let i = 0; i < state.floors[state.elevator].length; i++) {
            for (let j = i + 1; j < state.floors[state.elevator].length; j++) {
                const newFloors: _Building = state.floors.map(x => x.slice());
                newFloors[state.elevator - 1].push(newFloors[state.elevator].splice(i, 1)[0]);
                newFloors[state.elevator - 1].push(newFloors[state.elevator].splice(j - 1, 1)[0]);

                if (!verify(newFloors[state.elevator]) || !verify(newFloors[state.elevator - 1])) continue;

                const newState = {
                    floors: newFloors,
                    elevator: state.elevator - 1 as any,
                };

                if (seenStates.includes(getState(newState))) continue;
                seenStates.push(getState(newState));

                results.push(newState);
            }
        }
    }

    return results;
}

// TODO: Sort -C-G pairs to the end

let lastState = 0;
function bfs(states: _State[], steps: number) {
    const newStates: _State[] = [];

    for (const state of states) {
        if (state.floors[0].length == 0 && state.floors[1].length == 0 && state.floors[2].length == 0) {
            console.log("Found solution in " + steps + " steps");
            process.exit(0);
        }

        if (steps > lastState) {
            lastState = steps;
            console.log(steps);
        }

        newStates.push(...nextStates(state));
    }

    bfs(newStates, steps + 1);
}

bfs([{ floors: floors, elevator: 0 }], 0);
