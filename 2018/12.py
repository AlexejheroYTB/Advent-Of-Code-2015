initial_state = "#.#..#..###.###.#..###.#####...########.#...#####...##.#....#.####.#.#..#..#.#..###...#..#.#....##."
rules_data = """#.### => .
###.# => #
.##.. => .
..### => .
..##. => .
##... => #
###.. => #
.#... => #
##..# => #
#.... => .
.#.#. => .
####. => .
#.#.. => .
#.#.# => .
#..## => #
.#### => #
...## => .
#..#. => #
.#.## => #
..#.# => #
##.#. => #
#.##. => #
##### => .
..#.. => #
....# => .
##.## => .
.###. => #
..... => .
...#. => #
.##.# => .
#...# => .
.#..# => #""".splitlines()

SIZE = 10000

pots = [False for _ in range(SIZE)]
rules = {s.split(" => ")[0]: s.split(" => ")[1] for s in rules_data}

gen_cache = {}

for i, char in enumerate(initial_state):
    if char == "#":
        pots[i+(SIZE//2)] = True

# The code below shows that I don't actually know python that well
for gen in range(50000000000):
    new_pots = [False for _ in range(SIZE)]
    for i, _ in enumerate(pots):
        if i < 2 or i > SIZE-3:
            continue

        string = ""
        string += "#" if pots[i-2] else "."
        string += "#" if pots[i-1] else "."
        string += "#" if pots[i] else "."
        string += "#" if pots[i+1] else "."
        string += "#" if pots[i+2] else "."

        new_pots[i] = string in rules and rules[string] == "#"
    pots = new_pots

    string_representation = "".join(["#" if pot else "." for pot in pots])
    if string_representation in gen_cache:
        print("Generation", gen, "is the same as", gen_cache[string_representation])
    else:
        gen_cache[string_representation] = gen

    dbg = 0
    for i, pot in enumerate(pots):
        if pot:
            dbg += (i-(SIZE//2))

    print("Generation", gen, "sum", dbg)

    if gen == 19:
        total = 0
        for i, pot in enumerate(pots):
            if pot:
                total += (i-(SIZE//2))
        print("Part 1:", total)


total = 0
for i, pot in enumerate(pots):
    if pot:
        total += (i-SIZE//2)
print("Part 2:", total)
