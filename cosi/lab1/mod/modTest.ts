import DataWorker from "./dataWorker";

interface IData {
    index: number;
    prevR: number;
    mult: number;
    rN: number;
    xN: number;
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

export default class ModLab {
    public getData(worker: DataWorker, count: number) {
        let result: number[] = [];
        for (let i = 0; i < count; i++) {
            result.push(worker.next());
        }
        return result;
    }
    public findPeriod(data: number[], currentX: number) {
        let i1: number = -1,
            i2: number = -1,
            i3: number = 0,
            isFirstPoinFound: boolean = false,
            period: number,
            aPeriod: number;
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
        } else {
            return {
                period: period,
                aPeriod: aPeriod,
                data: data.slice(aPeriod, data.length)
            };
        }
    }
    public getMx(data: number[]) {
        return data.reduce((result, current) => result + current, 0) / data.length;
    }
    public getdX(data: number[], mX: number) {
        let dX = 0;
        for (let i = 0, len = data.length; i < len; i++) {
            let value = data[i] = mX;
            dX += mult(value, value);
        }
        dX /= (data.length - 1);
        return dX;
    }
    public checkUniformity(data: number[]) {
        let result: number = 0,
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
}