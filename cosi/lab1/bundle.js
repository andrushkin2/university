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
}, getWn = (n, direction) => {
    return new Complex(Math.cos(2.0 * Math.PI / n), direction * Math.sin(2.0 * Math.PI / n));
}, fft = (arr, n, direction, iterations) => {
    if (arr.length === 1) {
        return arr;
    }
    let wn = getWn(n, direction), w = new Complex(1.0), len = arr.length, halfOfLen = len / 2, first = [], second = [];
    for (let i = 0; i < halfOfLen; i++) {
        let currentComplex = arr[i], jumpedComplex = arr[i + halfOfLen];
        first[i] = currentComplex.add(jumpedComplex);
        second[i] = (currentComplex.sub(jumpedComplex)).mult(w);
        w = w.mult(wn);
        // update counter
        iterations.count++;
    }
    let firstFFT = fft(first, halfOfLen, direction, iterations), secondFFT = fft(second, halfOfLen, direction, iterations);
    return firstFFT.concat(secondFFT);
}, getSample = (length, rate, frequency, func) => {
    let period = rate / frequency / 2, res = [];
    for (let i = 0; i < length; i++) {
        res[i] = new Complex(func(i * Math.PI / period));
    }
    return res;
}, arr = getSample(8192, 8000, 187.5, (value) => {
    return Math.cos(3 * value) + Math.sin(2 * value);
});
/*console.time("Start fft");
let iterRes: {count: number} = {count: 0};
let res = fft(arr.slice(0), 8192, 1, iterRes);
console.timeEnd("Start fft");
console.log(iterRes.count);

console.time("Start");
let iterRes2: {count: number} = {count: 0};
let res2 = dft(arr.slice(0), 8192, false, iterRes2);
console.timeEnd("Start");
console.log(iterRes2.count);*/
let createSamples = (length, rate, frequency, func) => getSample(length, rate, frequency, func), dftFunc = (array, n, reverse) => {
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
};
exports.CreateSamples = createSamples;
exports.DFT = dftFunc;
exports.FFT = fftFunc;

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

},{"./test":1}]},{},[2]);
