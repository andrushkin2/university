import DataWorker from "./dataWorker";

interface IData {
    index: number;
    prevR: number;
    mult: number;
    rN: number;
    xN: number;
}

export interface IChartData {
    x: number;
    y: number;
}

let mult = (a: number, b: number) => a * b,
    div = (a: number, b: number) => a / b,
    mod = (a: number, b: number) => a % b,
    makeStep = (index: number, prevResult: number, a: number, m: number): IData => {
        let multRes = mult(a, prevResult),
            rN = mod(multRes, m),
            xN = div(rN, m);
        return {
            index: index,
            prevR: prevResult,
            mult: multRes,
            rN: rN,
            xN: xN
        };
    },
    getData = (count: number, a: number, m: number, startR: number) => {
        let result: IData[] = [],
            prevR: number | undefined = undefined;
        for (let i = 0; i < count; i++) {
            let dataItem = makeStep(i, prevR === undefined ? startR : prevR, a, m);
            prevR = dataItem.rN;
            result.push(dataItem);
        }
    };

export default class ModLabUtils {
    public getData(worker: DataWorker, count: number) {
        let result: number[] = [];
        for (let i = 0; i < count; i++) {
            result.push(worker.next());
        }
        return result;
    }
    public findPeriod(data: number[], currentX: number) {
        let i1 = -1,
            i2 = -1,
            i3 = 0,
            isFirstPointFound = false,
            period: number,
            aPeriod: number;
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
        } else {
            return {
                period: period,
                aPeriod: aPeriod,
                data: data.slice(i1, i2)
            };
        }
    }
    public getMx(data: number[]) {
        return data.reduce((result, current) => result + current, 0) / data.length;
    }
    public getDx(data: number[], mX: number) {
        let dX = 0;
        for (let i = 0, len = data.length; i < len; i++) {
            let value = data[i] - mX;
            dX += mult(value, value);
        }
        dX /= (data.length - 1);
        return dX;
    }
    public checkUniformity(data: number[]) {
        let result = 0,
            len = data.length;
        for (let i = 0; i < len; i += 2) {
            if (i + 1 >= len) {
                break;
            }
            let curr = data[i],
                next = data[i + 1];
            if (curr * curr + next * next < 1.0) {
                result++;
            }
        }
        return 2 * result / len;
    }
    public getMin(data: number[]) {
        let reduceFunc = (res: number, curr: number) => curr < res ? curr : res;
        return data.reduce(reduceFunc, Infinity);
    }
    public getMax(data: number[]) {
        let reduceFunc = (res: number, curr: number) => curr > res ? curr : res;
        return data.reduce(reduceFunc, -Infinity);
    }
    public getChartData(data: number[]) {
        let partsCount = 20,
            partLength = (this.getMax(data) - this.getMin(data)) / partsCount,
            frequency: number[] = [],
            dataLength = data.length,
            xValues: number[] = [this.getMin(data)],
            result: IChartData[] = [];

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
    public getRandom() {
        return Math.random();
    }
    public uniformDistribution(a: number, b: number, count: number) {
        let result: number[] = [];
        for (let i = 0; i < count; i++) {
            result.push(a + (b - a) * this.getRandom());
        }
        return result;
    }
    public gaussDistribution(m: number, sko: number, count: number, n: number) {
        let result: number[] = [],
            getSumOfRandom = (len: number) => {
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
    public exponentialDistribution(alpha: number, count: number) {
        let result: number[] = [];
        for (let i = 0; i < count; i++) {
            result.push(-Math.log(this.getRandom()) / alpha);
        }
        return result;
    }
    public gammaDistribution(alpha: number, ny: number, count: number) {
        let result: number[] = [],
            getMultOfRandom = (len: number) => {
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
    public triangleDistribution(a: number, b: number, count: number) {
        let result: number[] = [];
        for (let i = 0; i < count; i++) {
            result.push(a + (b - a) * Math.max(this.getRandom(), this.getRandom()));
        }
        return result;
    }
    public simpsonDistribution(a: number, b: number, count: number) {
        let result: number[] = [],
            getValue = (a1: number, b1: number) => a1 / 2 + (b1 / 2 - a1 / 2) * this.getRandom();
        for (let i = 0; i < count; i++) {
            result.push(getValue(a, b) + getValue(a, b));
        }
        return result;
    }
}