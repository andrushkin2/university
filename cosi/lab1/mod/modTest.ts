
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

    let testData = getData(1000, 3, 5, 1);
    console.log(testData);