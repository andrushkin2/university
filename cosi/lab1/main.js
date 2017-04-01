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
    }), xData = getXData(amount), dftData = test_1.DFT(data.slice(0), amount, false), dftDataReverse = test_1.DFT(dftData.result.slice(0), amount, true), fftData = test_1.FFT(data.slice(0), amount, false), fftReverse = test_1.FFT(fftData.result.slice(0), amount, true);
    debugger;
    drawChart(xData, getRealFromComplex(data), $$(firstChartId));
    console.log(`DFT iterations: ${dftData.count}`);
    console.log(`FFT iterations: ${fftData.count}`);
    // DFT
    drawChart(xData.slice(0), getPhaseFromComplex(dftData.result.slice(0)), $$(dftPhaseId));
    drawChart(xData.slice(0), getMagnitudeFromComplex(dftData.result.slice(0)), $$(dftMagnitudeId));
    drawChart(xData.slice(0), getRealFromComplex(dftDataReverse.result.slice(0)), $$(dftId));
    // FFT
    drawChart(xData.slice(0), getPhaseFromComplex(fftData.result.slice(0)), $$(fftPhaseId));
    drawChart(xData.slice(0), getMagnitudeFromComplex(fftData.result.slice(0)), $$(fftMagnitudeId));
    drawChart(xData.slice(0), getRealFromComplex(fftReverse.result.slice(0)), $$(fftId));
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
        rows: [
            {
                template: "Transform",
                height: 30
            },
            {
                view: "scrollview",
                scroll: "y",
                body: {
                    rows: [
                        { template: "Start state", height: 30 },
                        getChartObject(firstChartId),
                        { template: "FFT reverse", height: 30 },
                        getChartObject(fftId),
                        { template: "DFT reverse", height: 30 },
                        getChartObject(dftId),
                        { template: "FFT phase", height: 30 },
                        getChartObject(fftPhaseId),
                        { template: "DFT phase", height: 30 },
                        getChartObject(dftPhaseId),
                        { template: "DFT magnitude", height: 30 },
                        getChartObject(dftMagnitudeId),
                        { template: "FFT magnitude", height: 30 },
                        getChartObject(fftMagnitudeId)
                    ]
                }
            }
        ]
    });
});
