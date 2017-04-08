"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const test_1 = require("./test");
let getXData = (count) => {
    let i = 0, res = [];
    for (i = 0; i < count; i++) {
        res.push(i);
    }
    return res;
}, getMagnitudeFromComplex = (data) => data.map(complex => complex.magnitude), getPhaseFromComplex = (data) => data.map(complex => complex.phase), getRealFromComplex = (data) => data.map(complex => complex.re), runLab = () => {
    let amount = 1024, data = test_1.CreateSamples(amount, 8000, 187.5, (value) => {
        return Math.cos(3.0 * value) + Math.sin(2.0 * value);
    }), xData = getXData(amount), dftData = test_1.DFT(data, amount, false), dftDataReverse = test_1.DFT(dftData.result, amount, true), fftData = test_1.FFT(data, amount, false), fftReverse = test_1.FFT(fftData.result, amount, true);
    drawChart(xData, getRealFromComplex(data), $$(firstChartId));
    console.log(`DFT iterations: ${dftData.count}`);
    console.log(`FFT iterations: ${fftData.count}`);
    // DFT
    drawChart(xData, getPhaseFromComplex(dftData.result), $$(dftPhaseId));
    drawChart(xData, getMagnitudeFromComplex(dftData.result), $$(dftMagnitudeId));
    drawChart(xData, getRealFromComplex(dftDataReverse.result), $$(dftId));
    // FFT
    drawChart(xData, getPhaseFromComplex(fftData.result), $$(fftPhaseId));
    drawChart(xData, getMagnitudeFromComplex(fftData.result), $$(fftMagnitudeId));
    drawChart(xData, getRealFromComplex(fftReverse.result), $$(fftId));
}, firstChartId = "firstChart", dftId = "dftREverse", dftPhaseId = "dftPhase", dftMagnitudeId = "dftMagnitude", fftId = "fftREverse", fftPhaseId = "fftPhase", fftMagnitudeId = "fftMagnitude", getData = (x, y) => {
    let len = x.length, res = [];
    for (let i = 0; i < len; i++) {
        res.push({
            x: x[i],
            y: y[i]
        });
    }
    return res;
}, drawChart = (x, y, chartContainer) => {
    let cartData = getData(x, y);
    chartContainer.clearAll();
    chartContainer.parse(cartData, "json");
}, getChartObject = (id) => {
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
            lines: function (index) {
                return this.getIndexById(index.id) % 100 ? false : true;
            }
        },
        yAxis: {
            template: function (index) {
                return index;
            },
            lines: function (index) {
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
                        { type: "header", template: "Phase", height: 50 },
                        { template: "FFT phase", height: 30 },
                        getChartObject(fftPhaseId),
                        { template: "DFT phase", height: 30 },
                        getChartObject(dftPhaseId),
                        { type: "header", template: "Magnitude", height: 50 },
                        { template: "DFT magnitude", height: 30 },
                        getChartObject(dftMagnitudeId),
                        { template: "FFT magnitude", height: 30 },
                        getChartObject(fftMagnitudeId)
                    ]
                }
            }
        ]
    });
    $$("runId").attachEvent("onItemClick", () => {
        runLab();
    });
});
