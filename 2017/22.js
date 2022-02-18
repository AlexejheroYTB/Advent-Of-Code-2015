const input = `...#.#.####.....#.##..###
##.#.###..#.....#.##...#.
..#.##..#.#.##.#...#..###
###...##....###.#..#...#.
...#..#.........##..###..
#..#.#.#.#.#.#.#.##.####.
#...#.##...###...##..#..#
##...#.###..###...####.##
###..#.#####.##..###.#.##
#..#....#.##..####...####
...#.#......###.#..#..##.
.#.#...##.#.#####..###.#.
.....#..##..##..###....##
#.#..###.##.##.#####.##..
###..#..###.##.#..#.##.##
.#######.###....######.##
..#.#.###.##.##...###.#..
#..#.####...###..###..###
#...#..###.##..##...#.#..
........###..#.#.##..##..
.#############.#.###..###
##..#.###....#.#..#..##.#
..#.#.#####....#..#####..
.#.#..#...#...##.#..#....
##.#..#..##........#..##.`.split("\n").map(l => l.split("").map(c => c == "#" ? 2 : 0));

const grid = [];
let posX = 50000 + Math.floor(input[0].length / 2);
let posY = 50000 + Math.floor(input.length / 2);
let facing = 0;

for (let y = 0; y < input.length; y++) {
    for (let x = 0; x < input[y].length; x++) {
        (grid[50000 + y] ??= [])[50000 + x] = input[y][x];
    }
}

let infected = 0;

for (let i = 0; i < 10000000; i++) {
    if (!(grid[posY] ??= [])[posX]) {
        (grid[posY] ??= [])[posX] = 1;
        facing--;
    } else if ((grid[posY] ??= [])[posX] == 1) {
        (grid[posY] ??= [])[posX] = 2;
        infected++;
    } else if ((grid[posY] ??= [])[posX] == 2) {
        (grid[posY] ??= [])[posX] = 3;
        facing++;
    } else {
        (grid[posY] ??= [])[posX] = 0;
        facing += 2;
    }

    if (facing == -1) facing = 3;
    if (facing == 4) facing = 0;
    if (facing == 5) facing = 1;

    switch (facing) {
        case 0:
            posY--;
            break;
            
        case 1:
            posX++;
            break;

        case 2:
            posY++;
            break;

        case 3:
            posX--;
            break;
    }
}

console.log(infected);