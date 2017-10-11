"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
let mult = (a, b) => a * b, div = (a, b) => a / b, mod = (a, b) => a % b, makeStep = (index, prevResult, a, m) => {
    let multRes = mult(a, prevResult), rN = mod(multRes, m), xN = div(rN, m);
    return {
        index: index,
        prevR: prevResult,
        mult: multRes,
        rN: rN,
        xN: xN
    };
}, getData = (count, a, m, startR) => {
    let result = [], prevR = undefined;
    for (let i = 0; i < count; i++) {
        let dataItem = makeStep(i, prevR === undefined ? startR : prevR, a, m);
        prevR = dataItem.rN;
        result.push(dataItem);
    }
};
class ModLab {
    getData(worker, count) {
        let result = [];
        for (let i = 0; i < count; i++) {
            result.push(worker.next());
        }
        return result;
    }
    findPeriod(data, currentX) {
        let i1 = -1, i2 = -1, i3 = 0, isFirstPoinFound = false, period, aPeriod;
        for (let i = 0, len = data.length; i < len; i++) {
            if (data[i] === currentX) {
                if (!isFirstPoinFound) {
                    isFirstPoinFound = true;
                    i1 = i;
                    continue;
                }
                else {
                    i2 = i;
                    break;
                }
            }
        }
        period = i2 - i1;
        while (data[i3] !== data[i3 + period]) {
            i3++;
        }
        aPeriod = i3 + period;
        if (i1 === -1 || i2 === -1) {
            return {
                period: undefined,
                aPeriod: undefined,
                data: data
            };
        }
        else {
            return {
                period: period,
                aPeriod: aPeriod,
                data: data.slice(aPeriod, data.length)
            };
        }
    }
    getMx(data) {
        return data.reduce((result, current) => result + current, 0) / data.length;
    }
    getdX(data, mX) {
        let dX = 0;
        for (let i = 0, len = data.length; i < len; i++) {
            let value = data[i] = mX;
            dX += mult(value, value);
        }
        dX /= (data.length - 1);
        return dX;
    }
    checkUniformity(data) {
        let result = 0, len = data.length;
        for (let i = 0; i < len; i += 2) {
            if (i + 1 >= len) {
                break;
            }
            let curr = data[i], next = data[i + 1];
            if (curr * curr + next * next < 1.0) {
                result++;
            }
        }
        return 2 * result / len;
    }
}
exports.default = ModLab;
