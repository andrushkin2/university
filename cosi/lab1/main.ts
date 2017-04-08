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
        let amount: number = 1024,
            data: Complex[] = CreateSamples(amount, 8000, 187.5, (value: number) => {
                return Math.cos(3.0 * value) + Math.sin(2.0 * value);
            }),
            xData: number[] = getXData(amount),
            dftData = DFT(data, amount, false),
            dftDataReverse = DFT(dftData.result, amount, true),
            fftData = FFT(data, amount, false),
            fftReverse = FFT(fftData.result, amount, true);

        drawChart(xData, getRealFromComplex(data), $$(firstChartId) as webix.ui.chart);
        console.log(`DFT iterations: ${dftData.count}`);
        console.log(`FFT iterations: ${fftData.count}`);
        // DFT
        drawChart(xData, getPhaseFromComplex(dftData.result), $$(dftPhaseId) as webix.ui.chart);
        drawChart(xData, getMagnitudeFromComplex(dftData.result), $$(dftMagnitudeId) as webix.ui.chart);
        drawChart(xData, getRealFromComplex(dftDataReverse.result), $$(dftId) as webix.ui.chart);
        // FFT
        drawChart(xData, getPhaseFromComplex(fftData.result), $$(fftPhaseId) as webix.ui.chart);
        drawChart(xData, getMagnitudeFromComplex(fftData.result), $$(fftMagnitudeId) as webix.ui.chart);
        drawChart(xData, getRealFromComplex(fftReverse.result), $$(fftId) as webix.ui.chart);
    },
    firstChartId = "firstChart",
    dftId = "dftREverse",
    dftPhaseId = "dftPhase",
    dftMagnitudeId = "dftMagnitude",
    fftId = "fftREverse",
    fftPhaseId = "fftPhase",
    fftMagnitudeId = "fftMagnitude",
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
    drawChart = (x: number[], y: number[], chartContainer: webix.ui.chart) => {
        let cartData = getData(x, y);
        chartContainer.clearAll();
        chartContainer.parse(cartData, "json");
    },
    getChartObject = (id: string) => {
        return {
            view: "chart",
            type: "line",
            height: 300,
            id: id,
            value: "#y#",
            line: {
                color: "#8ecf03",
                width: 1,
                shadow: false
            },
            item: {
                radius: 0
            },
            xAxis: {
                template: "",
                lines: function(index) {
                    return this.getIndexById(index.id) % 100 ? false : true;
                }
            },
            yAxis: {
                template: function(index) {
                    return index;
                },
                lines: function(index) {
                    return this.getIndexById(index.id) % 100 ? false : true;
                }
            }
        };
    };

window["lab"] = {
    run: () => {
        runLab();
    }
};

webix.ready(() => {
    webix.ui({
        type: "space",
        rows: [
            {
                view: "toolbar",
                cols: [
                    { template: "Transform", type: "header", width: 100, borderless: true },
                    { view: "button", id: "runId", value: "Run", width: 100, align: "left" },
                    {}
                ]
            },
            {
                view: "scrollview",
                scroll: "y",
                body: {
                    rows: [
                        { type: "header", template: "Start state", height: 50 },
                        getChartObject(firstChartId),
                        { template: "FFT reverse", height: 30 },
                        getChartObject(fftId),
                        { template: "DFT reverse", height: 30 },
                        getChartObject(dftId),
                        { type: "header", template: "Phase", height: 50},
                        { template: "FFT phase", height: 30 },
                        getChartObject(fftPhaseId),
                        { template: "DFT phase", height: 30 },
                        getChartObject(dftPhaseId),
                        { type: "header", template: "Magnitude", height: 50},
                        { template: "DFT magnitude", height: 30 },
                        getChartObject(dftMagnitudeId),
                        { template: "FFT magnitude", height: 30 },
                        getChartObject(fftMagnitudeId)
                    ]
                }
            }
        ]
    });
    (<webix.ui.button>$$("runId")).attachEvent("onItemClick", () => {
        runLab();
    });
});