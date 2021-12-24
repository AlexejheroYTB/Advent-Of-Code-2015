const input = "^..^^.^^^..^^.^...^^^^^....^.^..^^^.^.^.^^...^.^.^.^.^^.....^.^^.^.^.^.^.^.^^..^^^^^...^.....^....^.";
const grid = [input.split("").map(c => c == "." ? 0 : 1)];

for (let i = 1; i < 400000; i++) {
    let row = [];
    let prev = grid[grid.length - 1];
    for (let j = 0; j < prev.length; j++) {
        let left = prev[j - 1] || 0;
        let center = prev[j];
        let right = prev[j + 1] || 0;
        if ((left && center && !right) || (!left && center && right) || (left && !center && !right) || (!left && !center && right)) {
            row.push(1);
        } else {
            row.push(0);
        }
    }
    grid.push(row);
}

console.log(grid.flat().length - grid.flat().reduce((a, b) => a + b));
