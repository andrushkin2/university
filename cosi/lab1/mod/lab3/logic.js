"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Lab3Logic {
    calcValues(p1, p2, ticks) {
        let input = 0, output = 0, l = 0, states = {}, state = "2000", // t0 - 0   j - 1   t1 - 2  t2 - 3
        calcState = (randP1, randP2) => {
            if (state[2] === "1" && randP1 > p1) {
                state = this.getNewState(state, 0, 2);
                output++;
            }
            if (state[3] === "1" && randP2 > p2) {
                state = this.getNewState(state, 0, 3);
                output++;
            }
            if (state[1] === "2" && (state[2] === "0" || state[3] === "0")) {
                if (state[2] === "0" && state[3] === "0") {
                    // set j = 0
                    state = this.getNewState(state, 0, 1);
                    // set t1 = 1
                    state = this.getNewState(state, 1, 2);
                    // set t2 = 1
                    state = this.getNewState(state, 1, 3);
                }
                else if (state[2] === "0") {
                    let j = parseInt(state[1]);
                    if (j - 1 >= 0) {
                        state = this.getNewState(state, j - 1, 1);
                        state = this.getNewState(state, 1, 2);
                    }
                    else {
                        debugger;
                    }
                }
                else if (state[3] === "0") {
                    let j = parseInt(state[1]);
                    if (j - 1 >= 0) {
                        state = this.getNewState(state, j - 1, 1);
                        state = this.getNewState(state, 1, 3);
                    }
                    else {
                        debugger;
                    }
                }
            }
            if (state[1] === "1" && (state[2] === "0" || state[3] === "0")) {
                if (state[2] === "0") {
                    let j = parseInt(state[1]);
                    if (j - 1 >= 0) {
                        state = this.getNewState(state, j - 1, 1);
                        state = this.getNewState(state, 1, 2);
                    }
                    else {
                        debugger;
                    }
                }
                else if (state[3] === "0") {
                    let j = parseInt(state[1]);
                    if (j - 1 >= 0) {
                        state = this.getNewState(state, j - 1, 1);
                        state = this.getNewState(state, 1, 3);
                    }
                    else {
                        debugger;
                    }
                }
            }
        };
        states[state] = 0;
        for (let i = 0; i < ticks; i++) {
            let randP1 = this.getRandom(), randP2 = this.getRandom();
            switch (state[0]) {
                case "1":
                    calcState(randP1, randP2);
                    if (state === "1211") {
                    }
                    else {
                        let j = parseInt(state[1]);
                        if (j + 1 < 3) {
                            j += 1;
                            state = this.getNewState(state, j, 1);
                            if (j - 1 >= 0 && state[2] === "0") {
                                j -= 1;
                                state = this.getNewState(state, j, 1);
                                state = this.getNewState(state, 1, 2);
                            }
                            if (j - 1 >= 0 && state[3] === "0") {
                                j -= 1;
                                state = this.getNewState(state, j, 1);
                                state = this.getNewState(state, 1, 3);
                            }
                        }
                        else {
                            debugger;
                        }
                        input++;
                    }
                    state = this.getNewState(state, 2, 0);
                    break;
                case "2":
                    calcState(randP1, randP2);
                    state = this.getNewState(state, 1, 0);
                    break;
                default:
                    debugger;
                    break;
            }
            states[state] = this.updateState(states[state]);
            l += parseInt(state[1]) > 0 ? 1 : 0;
        }
        return {
            a: output / ticks,
            l: l / ticks
        };
    }
    getNewState(currState, newValue, valueIndex) {
        let arrString = currState.split("");
        arrString[valueIndex] = newValue.toString();
        return arrString.join("");
    }
    updateState(oldValue) {
        return oldValue === undefined ? 1 : oldValue + 1;
    }
    getRandom() {
        return Math.random();
    }
}
exports.default = Lab3Logic;
