const recipes = [3, 7];
let recipesStr = "37";
let recipesOffset = 0;
let elf1 = 0;
let elf2 = 1;

function createRecipes() {
    let total = recipes[elf1] + recipes[elf2];

    if (total === 0) {
        recipes.push(0);
        recipesStr += "0";
        return;
    }

    const toAdd = [];
    while (total > 0) {
        const recipe = total % 10;
        total = Math.floor(total / 10);

        toAdd.push(recipe);
    }

    const reversed = toAdd.reverse();
    recipes.push(...reversed);
    recipesStr += reversed.join("");

    const currentLength = recipesStr.length;
    if (currentLength > 10) {
        recipesStr = recipesStr.slice(recipesStr.length - 8, recipesStr.length);
        recipesOffset += (currentLength - recipesStr.length);
    }
}

function elfStep() {
    elf1 = (elf1 + 1 + recipes[elf1]) % recipes.length;
    elf2 = (elf2 + 1 + recipes[elf2]) % recipes.length;
}

function log() {
    let log = "";

    for (let i = 0; i < recipes.length; i++) {
        if (i === elf1) log += `(${recipes[i]}) `;
        else if (i === elf2) log += `[${recipes[i]}] `;
        else log += ` ${recipes[i]}  `;
    }

    console.log(log);
}

function part1(count) {
    while (recipes.length < count + 10) {
        // log();
        createRecipes();
        elfStep();
    }
    // log();

    console.log(recipes.slice(count, count + 10).join(""));
}

function part2(lookingFor) {
    while (true) {
        createRecipes();
        elfStep();

        const index = recipesStr.indexOf(lookingFor);
        if (index !== -1) {
            console.log(recipesOffset + index)
            return;
        }
    }
}

part1(704321);
part2("704321");
