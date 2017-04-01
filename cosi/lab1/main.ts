import {Complex, CreateSamples, DFT, FFT} from "./test";

let getXData = (count: number): number[] => {
        let i = 0,
            res: number[] = [];
        for (i = 0; i < count; i++) {
            res.push(i);
        }
        return res;
    },
    getMagnitudeFromComplex = (data: Complex[]): number[] => data.map(complex => complex.magnitude),
    getPhaseFromComplex = (data: Complex[]): number[] => data.map(complex => complex.phase),
    getRealFromComplex = (data: Complex[]): number[] => data.map(complex => complex.re),
    runLab = () => {
        let amount: number = 8192,
            data: Complex[] = CreateSamples(amount, 8000, 187.5, (value: number) => {
                return Math.cos(3 * value) + Math.sin(2 * value);
            }),
            xData: number[] = getXData(amount);
    },
    getData = (x: number[], y: number[]): {x: number; y: number}[] => {
        let len = x.length,
            res: {x: number, y: number}[] = [];
        for (let i = 0; i < len; i++) {
            res.push({
                x: x[i],
                y: y[i]}
            );
        }
        return res;
    },
    drawChart = (x: number[], y: number[], chartContainer: any) => {
        new Chart(chartContainer).Line({
            labels: x.map(value => value.toString()),
            datasets: [{
                highlightFill: "white",
                highlightStroke: "white",
                pointColor: "red",
                pointHighlightFill: "red",
                pointHighlightStroke: "red",
                pointStrokeColor: "red",
                strokeColor: "blue",
                label: "asdasd",
                fillColor: "white",
                data: y
            }]
        });
    };

window["lab"] = {};