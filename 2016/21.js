let input = `swap letter a with letter d
move position 6 to position 4
move position 5 to position 1
swap letter h with letter e
rotate based on position of letter a
move position 6 to position 2
reverse positions 0 through 1
rotate based on position of letter h
rotate based on position of letter g
rotate based on position of letter h
reverse positions 4 through 7
swap letter a with letter f
swap position 2 with position 7
move position 7 to position 5
reverse positions 0 through 5
rotate based on position of letter f
rotate right 4 steps
swap position 3 with position 0
move position 1 to position 2
reverse positions 4 through 6
swap position 3 with position 5
swap letter a with letter c
swap position 5 with position 2
swap position 7 with position 2
move position 2 to position 5
rotate based on position of letter h
rotate right 2 steps
swap position 3 with position 4
move position 0 to position 1
reverse positions 1 through 7
reverse positions 1 through 4
rotate based on position of letter b
rotate right 7 steps
rotate left 0 steps
swap position 6 with position 1
reverse positions 1 through 3
reverse positions 0 through 3
move position 0 to position 4
rotate based on position of letter f
reverse positions 0 through 7
reverse positions 0 through 1
move position 1 to position 7
move position 7 to position 6
rotate based on position of letter b
reverse positions 3 through 5
reverse positions 0 through 3
swap letter c with letter h
reverse positions 3 through 5
swap position 3 with position 6
swap letter d with letter g
move position 5 to position 6
swap position 6 with position 2
rotate right 5 steps
swap letter e with letter g
rotate based on position of letter e
rotate based on position of letter c
swap letter g with letter e
rotate based on position of letter b
rotate based on position of letter b
swap position 0 with position 2
move position 6 to position 0
move position 5 to position 0
rotate left 2 steps
move position 0 to position 5
rotate left 7 steps
swap letter b with letter g
rotate based on position of letter d
swap letter h with letter e
swap letter d with letter c
rotate based on position of letter f
move position 5 to position 0
rotate left 5 steps
swap position 0 with position 7
swap position 0 with position 3
rotate left 4 steps
rotate left 1 step
rotate right 6 steps
swap position 0 with position 1
reverse positions 4 through 6
reverse positions 4 through 6
move position 6 to position 3
move position 7 to position 4
rotate right 4 steps
swap letter g with letter d
swap letter c with letter e
swap letter e with letter h
rotate right 5 steps
rotate based on position of letter g
rotate based on position of letter g
rotate left 3 steps
swap letter h with letter g
reverse positions 0 through 4
rotate right 4 steps
move position 6 to position 4
rotate based on position of letter c
swap position 2 with position 6
swap position 7 with position 2
rotate right 1 step
swap position 3 with position 1
swap position 4 with position 6`.split("\n").reverse();
let data = "fbgdceah";

// input = ["swap position 4 with position 0","swap letter d with letter b","reverse positions 0 through 4","rotate left 1 step","move position 1 to position 4",
// "move position 3 to position 0","rotate based on position of letter b","rotate based on position of letter d"].reverse();
// data = "decab";

for (const instruction of input) {
    console.log()
    console.log(data)
    console.log(instruction)

    if (instruction.startsWith("swap position")) {
        let [, index1, index2] = instruction.match(/swap position (\d+) with position (\d+)/);
        const chars = data.split("");
        let temp = chars[index1];
        chars[index1] = chars[index2];
        chars[index2] = temp;
        data = chars.join("");
    } else if (instruction.startsWith("swap letter")) {
        const [, char1, char2] = instruction.match(/swap letter (\w) with letter (\w)/);
        data = data.replace(new RegExp(char1, "g"), "@");
        data = data.replace(new RegExp(char2, "g"), char1);
        data = data.replace(new RegExp("@", "g"), char2);
    } else if (instruction.startsWith("rotate based")) {
        const [, char] = instruction.match(/rotate based on position of letter (\w)/);

        // let rotations = data.indexOf(char) + 1;
        // if (rotations >= 5) rotations++;

        let modifiedData = data;

        for (let i = 0; i < modifiedData.length; i++) {
            const arr = modifiedData.split("");
            arr.push(arr.shift());
            modifiedData = arr.join("");

            const index = modifiedData.indexOf(char);
            let amount;
            if (index >= 4) {
                amount = modifiedData.length - index - 2;
                if (amount < 0) amount = modifiedData.length + amount;
            } else {
                amount = modifiedData.length - index - 1;
                if (amount < 0) amount = modifiedData.length + amount;
            }
            let newData = modifiedData.substr(amount) + modifiedData.substr(0, amount);
            if (newData == data) {
                data = modifiedData;
                break;
            }
        }

    } else if (instruction.startsWith("rotate ")) {
        const [, direction, steps] = instruction.match(/rotate (left|right) (\d+) steps?/);
        const stepsInt = parseInt(steps);
        if (direction == "right") {
            let amount = stepsInt;
            if (amount < 0) amount = data.length + amount;
            data = data.substr(amount) + data.substr(0, amount);
        } else {
            let amount = data.length - stepsInt;
            if (amount < 0) amount = data.length + amount;
            data = data.substr(amount) + data.substr(0, amount);
        }
    } else if (instruction.startsWith("reverse")) {
        const [, index1, index2] = instruction.match(/reverse positions (\d+) through (\d+)/);
        const index1Int = parseInt(index1);
        const index2Int = parseInt(index2);
        data = data.substr(0, index1Int) + data.substr(index1Int, index2Int - index1Int + 1).split("").reverse().join("") + data.substr(index2Int + 1);
    } else if (instruction.startsWith("move")) {
        const [, index2, index1] = instruction.match(/move position (\d+) to position (\d+)/);
        const index1Int = parseInt(index1);
        const index2Int = parseInt(index2);
        const char = data[index1Int];
        data = data.substr(0, index1Int) + data.substr(index1Int + 1);
        data = data.substr(0, index2Int) + char + data.substr(index2Int);
    }

    console.log(data);
}