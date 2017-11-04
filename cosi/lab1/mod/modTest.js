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
class ModLabUtils {
    getData(worker, count) {
        let result = [];
        for (let i = 0; i < count; i++) {
            result.push(worker.next());
        }
        return result;
    }
    findPeriod(data, currentX) {
        let i1 = -1, i2 = -1, i3 = 0, isFirstPointFound = false, period, aPeriod;
        for (let i = 0, len = data.length; i < len; i++) {
            if (data[i] === currentX) {
                if (!isFirstPointFound) {
                    isFirstPointFound = true;
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
                data: data.slice(i1, i2)
            };
        }
    }
    getMx(data) {
        return data.reduce((result, current) => result + current, 0) / data.length;
    }
    getDx(data, mX) {
        let dX = 0;
        for (let i = 0, len = data.length; i < len; i++) {
            let value = data[i] - mX;
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
    getMin(data) {
        let reduceFunc = (res, curr) => curr < res ? curr : res;
        return data.reduce(reduceFunc, Infinity);
    }
    getMax(data) {
        let reduceFunc = (res, curr) => curr > res ? curr : res;
        return data.reduce(reduceFunc, -Infinity);
    }
    getChartData(data) {
        let partsCount = 20, partLength = (this.getMax(data) - this.getMin(data)) / partsCount, frequency = [], dataLength = data.length, xValues = [this.getMin(data)], result = [];
        for (let i = 1; i <= partsCount; i++) {
            xValues[i] = xValues[i - 1] + partLength;
        }
        for (let i = 0; i < partsCount; i++) {
            frequency[i] = 0;
            for (let j = 0; j < dataLength; j++) {
                let dataItem = data[j];
                if (dataItem >= xValues[i] && dataItem < (xValues[i + 1])) {
                    frequency[i]++;
                }
            }
            frequency[i] /= dataLength;
        }
        for (let i = 0; i < partsCount; i++) {
            result.push({ x: xValues[i], y: frequency[i] });
        }
        return result;
    }
    getRandom() {
        return Math.random();
    }
    uniformDistribution(a, b, count) {
        let result = [];
        for (let i = 0; i < count; i++) {
            result.push(a + (b - a) * this.getRandom());
        }
        result;
    }
    gaussDistribution(m, sko, count, n) {
        let result = [], getSumOfRandom = (len) => {
            let temp = 0;
            for (let i = 0; i < len; i++) {
                temp += this.getRandom();
            }
            return temp;
        };
        for (let i = 0; i < count; i++) {
            result.push(m + sko * Math.sqrt(12.0 / n) * (getSumOfRandom(n) - n / 2));
        }
        return result;
    }
    exponentialDistribution(alpha, count) {
        let result = [];
        for (let i = 0; i < count; i++) {
            result.push(-Math.log(this.getRandom()) / alpha);
        }
        return result;
    }
    gammaDistribution(alpha, ny, count) {
        let result = [], getMultOfRandom = (len) => {
            let temp = 1;
            for (let i = 0; i < len; i++) {
                temp *= this.getRandom();
            }
            return temp;
        };
        for (let i = 0; i < count; i++) {
            result.push(-Math.log(getMultOfRandom(ny)) / alpha);
        }
        return result;
    }
    triangleDistribution(a, b, count) {
        let result = [];
        for (let i = 0; i < count; i++) {
            result.push(a + (b - a) * Math.max(this.getRandom(), this.getRandom()));
        }
    }
    simpsonDistribution(a, b, count) {
        let result = [], getValue = (a1, b1) => a1 / 2 + (b1 / 2 - a1 / 2) * this.getRandom();
        for (let i = 0; i < count; i++) {
            result.push(getValue(a, b) + getValue(a, b));
        }
        return result;
    }
}
exports.default = ModLabUtils;
