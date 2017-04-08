(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Complex {
    constructor(re, im = 0.0) {
        this.re = re;
        this.im = im;
    }
    mult(comp) {
        return new Complex(this.re * comp.re - this.im * comp.im, this.re * comp.im + this.im * comp.re);
    }
    divNumber(value) {
        return new Complex(this.re / value, this.im / value);
    }
    add(comp) {
        return new Complex(this.re + comp.re, this.im + comp.im);
    }
    sub(comp) {
        return new Complex(this.re - comp.re, this.im - comp.im);
    }
    get conjugate() {
        return new Complex(this.re, -1 * this.im);
    }
    get magnitude() {
        return Math.sqrt(this.re * this.re + this.im * this.im);
    }
    get phase() {
        return Math.atan2(this.im, this.re);
    }
}
exports.Complex = Complex;
let dft = (arr, n, reverse, iterations) => {
    let tmp = [];
    for (let i = 0; i < n; i++) {
        for (let j = 0; j < n; j++) {
            let calc = (2.0 * Math.PI / n) * j * i, w = new Complex(Math.cos(calc), reverse ? -Math.sin(calc) : Math.sin(calc));
            if (!tmp[i]) {
                tmp[i] = new Complex(0.0);
            }
            tmp[i] = tmp[i].add(w.mult(arr[j]));
            //update counter
            iterations.count++;
        }
    }
    return tmp;
}, fft = (arr, n, direction, iterations) => {
    if (arr.length === 1) {
        return arr;
    }
    let arg = 2.0 * Math.PI / n, wn = new Complex(Math.cos(arg), direction * Math.sin(arg)), w = new Complex(1.0), len = arr.length, halfOfLen = len >> 1, first = [], second = [], result = [];
    for (let i = 0; i < halfOfLen; i++) {
        result[i] = arr[i].add(arr[i + halfOfLen]);
        result[i + halfOfLen] = arr[i].sub(arr[i + halfOfLen]).mult(w);
        w = w.mult(wn);
        // update counter
        iterations.count++;
    }
    for (let i = 0; i < halfOfLen; i++) {
        first[i] = result[i];
        second[i] = result[i + halfOfLen];
    }
    let firstFFT = fft(first, halfOfLen, direction, iterations), secondFFT = fft(second, halfOfLen, direction, iterations);
    for (let i = 0; i < halfOfLen; i++) {
        let j = i << 1;
        result[j] = firstFFT[i];
        result[j + 1] = secondFFT[i];
    }
    return result;
}, getSample = (length, rate, frequency, func) => {
    let period = rate / frequency / 2, res = [];
    for (let i = 0; i < length; i++) {
        res[i] = new Complex(func(i * Math.PI / period));
    }
    return res;
}, createSamples = (length, rate, frequency, func) => getSample(length, rate, frequency, func), dftFunc = (array, n, reverse) => {
    console.time("DFT time: ");
    let counter = { count: 0 }, arrRes = dft(array, n, reverse, counter);
    console.timeEnd("DFT time: ");
    return {
        count: counter.count,
        result: arrRes
    };
}, fftFunc = (array, n, reverse) => {
    console.time("FFT time: ");
    let counter = { count: 0 }, arrRes = fft(array, n, reverse ? -1 : 1, counter);
    console.timeEnd("FFT time: ");
    return {
        count: counter.count,
        result: arrRes
    };
}, correlation = (signal1, signal2) => {
    let len = signal1.length, result = [];
    for (let m = 0; m < len; m++) {
        if (!result[m]) {
            result[m] = new Complex(0.0);
        }
        for (let h = 0; h < len; h++) {
            if (m + h < len) {
                result[m] = result[m].add(signal1[h].mult(signal2[m + h]));
            }
            else {
                result[m] = result[m].add(signal1[h].mult(signal2[m + h - len]));
            }
        }
        result[m] = result[m].divNumber(len);
    }
    return result;
}, convolution = (signal1, signal2) => {
    let len = signal1.length, result = [];
    for (let m = 0; m < len; m++) {
        if (!result[m]) {
            result[m] = new Complex(0.0);
        }
        for (let h = 0; h < len; h++) {
            if (m - h >= 0) {
                result[m] = result[m].add(signal1[h].mult(signal2[m - h]));
            }
            else {
                result[m] = result[m].add(signal1[h].mult(signal2[m - h + len]));
            }
        }
        result[m] = result[m].divNumber(len);
    }
    return result;
}, convolutionFourier = (signal1, signal2) => {
    let len = signal1.length, firstImage = fft(signal1, len, 1, { count: 0 }), secondImage = fft(signal2, len, 1, { count: 0 }), result = [];
    for (let i = 0; i < len; i++) {
        result[i] = firstImage[i].mult(secondImage[i]);
    }
    return fft(result, len, -1, { count: 0 });
}, correlationFourier = (firstSignal, secondSignal) => {
    let len = firstSignal.length, firstImage = fft(firstSignal, len, -1, { count: 0 }), secondImage = fft(secondSignal, len, -1, { count: 0 }), result = [];
    for (let i = 0; i < len; i++) {
        result[i] = firstImage[i].conjugate.mult(secondImage[i]);
    }
    return fft(result, len, -1, { count: 0 });
};
exports.CreateSamples = createSamples;
exports.DFT = dftFunc;
exports.FFT = fftFunc;
exports.Correlation = correlation;
exports.Convolution = convolution;
exports.ConvolutionFourier = convolutionFourier;
exports.CorrelationFourier = correlationFourier;

},{}],2:[function(require,module,exports){
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
}, runLab2 = () => {
    let amount = 1024, xData = getXData(amount), dataLab1 = test_1.CreateSamples(amount, 8000, 187.5, (value) => {
        return Math.cos(3.0 * value) + Math.sin(2.0 * value);
    }), dataLab2 = test_1.CreateSamples(amount, 8000, 187.5, (value) => {
        return Math.cos(5.0 * value) /* + Math.sin(6.0 * value)*/;
    }), convolutionRezult = test_1.Convolution(dataLab1, dataLab2), correlationRezult = test_1.Correlation(dataLab1, dataLab2), correlationFourier = test_1.CorrelationFourier(dataLab1, dataLab2), convolutionFourier = test_1.ConvolutionFourier(dataLab1, dataLab2);
    drawChart(xData, getRealFromComplex(dataLab1), $$(lab2Data1Id));
    drawChart(xData, getRealFromComplex(dataLab2), $$(lab2Data2Id));
    drawChart(xData, getRealFromComplex(convolutionRezult), $$(lab2Conv1Id));
    drawChart(xData, getRealFromComplex(convolutionFourier), $$(lab2Conv2Id));
    drawChart(xData, getRealFromComplex(correlationRezult), $$(lab2Corr1Id));
    drawChart(xData, getRealFromComplex(correlationFourier), $$(lab2Corr2Id));
}, lab2Data1Id = "lab2Data1Id", lab2Data2Id = "lab2Data2Id", lab2Conv1Id = "lab2Conv1Id", lab2Conv2Id = "lab2Conv2Id", lab2Corr1Id = "lab2Corr1Id", lab2Corr2Id = "lab2Corr2Id", firstChartId = "firstChart", dftId = "dftREverse", dftPhaseId = "dftPhase", dftMagnitudeId = "dftMagnitude", fftId = "fftREverse", fftPhaseId = "fftPhase", fftMagnitudeId = "fftMagnitude", getData = (x, y) => {
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
                    {
                        view: "segmented", id: "tabbar", value: "lab1", multiview: true, options: [
                            { value: "Lab 1", id: "lab1" },
                            { value: "Lab 2", id: "lab2" }
                        ]
                    },
                    {}
                ]
            },
            {
                view: "scrollview",
                scroll: "y",
                body: {
                    id: "mymultiview",
                    cells: [
                        {
                            id: "lab1",
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
                        },
                        {
                            id: "lab2",
                            rows: [
                                { type: "header", template: "Functions", height: 50 },
                                { template: "y = cos(3x) + sin(2x)", height: 30 },
                                getChartObject(lab2Data1Id),
                                { template: "y =cos(5x)", height: 30 },
                                getChartObject(lab2Data2Id),
                                //  Convolution
                                { type: "header", template: "Convolution", height: 50 },
                                { template: "Using formula", height: 30 },
                                getChartObject(lab2Conv1Id),
                                { template: "Using FFT", height: 30 },
                                getChartObject(lab2Conv2Id),
                                //  Correlation
                                { type: "header", template: "Correlation", height: 50 },
                                { template: "Using formula", height: 30 },
                                getChartObject(lab2Corr1Id),
                                { template: "Using FFT", height: 30 },
                                getChartObject(lab2Corr2Id)
                            ]
                        }
                    ]
                }
            }
        ]
    });
    $$("runId").attachEvent("onItemClick", () => {
        if ($$("tabbar").getValue() === "lab1") {
            runLab();
        }
        else {
            runLab2();
        }
    });
});

},{"./test":1}]},{},[2]);
