/*
Begin in state A.
Perform a diagnostic checksum after 12994925 steps.

In state A:
  If the current value is 0:
    - Write the value 1.
    - Move one slot to the right.
    - Continue with state B.
  If the current value is 1:
    - Write the value 0.
    - Move one slot to the left.
    - Continue with state F.

In state B:
  If the current value is 0:
    - Write the value 0.
    - Move one slot to the right.
    - Continue with state C.
  If the current value is 1:
    - Write the value 0.
    - Move one slot to the right.
    - Continue with state D.

In state C:
  If the current value is 0:
    - Write the value 1.
    - Move one slot to the left.
    - Continue with state D.
  If the current value is 1:
    - Write the value 1.
    - Move one slot to the right.
    - Continue with state E.

In state D:
  If the current value is 0:
    - Write the value 0.
    - Move one slot to the left.
    - Continue with state E.
  If the current value is 1:
    - Write the value 0.
    - Move one slot to the left.
    - Continue with state D.

In state E:
  If the current value is 0:
    - Write the value 0.
    - Move one slot to the right.
    - Continue with state A.
  If the current value is 1:
    - Write the value 1.
    - Move one slot to the right.
    - Continue with state C.

In state F:
  If the current value is 0:
    - Write the value 1.
    - Move one slot to the left.
    - Continue with state A.
  If the current value is 1:
    - Write the value 1.
    - Move one slot to the right.
    - Continue with state A.
*/

function loop(state, tape, cursor, steps) {
    while (steps < 12994925) {
        switch (state) {
            case "A":
                if (!tape[cursor]) {
                    tape[cursor] = 1;
                    cursor++;
                    state = "B";
                } else {
                    tape[cursor] = 0;
                    cursor--;
                    state = "F";
                }
                break;
    
            case "B":
                if (!tape[cursor]) {
                    tape[cursor] = 0;
                    cursor++;
                    state = "C";
                } else {
                    tape[cursor] = 0;
                    cursor++;
                    state = "D";
                }
                break;
            
            case "C":
                if (!tape[cursor]) {
                    tape[cursor] = 1;
                    cursor--;
                    state = "D";
                } else {
                    tape[cursor] = 1;
                    cursor++;
                    state = "E";
                }
                break;
    
            case "D":
                if (!tape[cursor]) {
                    tape[cursor] = 0;
                    cursor--;
                    state = "E";
                } else {
                    tape[cursor] = 0;
                    cursor--;
                    state = "D";
                }
                break;
    
            case "E":
                if (!tape[cursor]) {
                    tape[cursor] = 0;
                    cursor++;
                    state = "A";
                } else {
                    tape[cursor] = 1;
                    cursor++;
                    state = "C";
                }
                break;
    
            case "F":
                if (!tape[cursor]) {
                    tape[cursor] = 1;
                    cursor--;
                    state = "A";
                } else {
                    tape[cursor] = 1;
                    cursor++;
                    state = "A";
                }
                break;
        }

        steps++;
    }

    console.log(tape.filter(t => t).length);
}

loop("A", [], 50000, 0);
