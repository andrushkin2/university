(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ui_1 = require("./ui");
class UiLogic {
    constructor() {
        this.image = new Image();
        let canvas = document.querySelector(`#${ui_1.canvasId}`), context;
        if (canvas === null) {
            throw new Error(`Cannot find canvas element with ID: ${ui_1.canvasId}`);
        }
        context = canvas.getContext("2d");
        if (context === null) {
            throw new Error("Cannot get context of canvas");
        }
        this.image.style.display = "none";
        this.canvas = canvas;
        this.context = context;
        $$(ui_1.uploaderId).attachEvent("onAfterFileAdd", (e) => {
            this.loadFile(e.file).then(data => this.insertImageToCanvas(data)).then(() => {
                debugger;
            }).catch(reason => {
                new webix.message(reason.message || reason.text || "Error was happened");
            });
        });
    }
    insertImageToCanvas(urlData) {
        return new Promise((resolve, reject) => {
            this.image.src = urlData;
            this.image.onload = () => {
                this.context.drawImage(this.image, 0, 0);
                resolve({});
            };
            this.image.onerror = e => {
                reject(e);
            };
        });
    }
    loadFile(file) {
        if (file instanceof File) {
            return new Promise((resolve, reject) => {
                if (FileReader) {
                    let loader = new FileReader();
                    loader.onload = () => {
                        resolve(loader.result);
                    };
                    loader.onerror = (e) => {
                        reject(e);
                    };
                    loader.readAsDataURL(file);
                }
                else {
                    reject(new Error("The browser doesn't support FileReader"));
                }
            });
        }
        return Promise.reject(new Error("File not found"));
    }
}
exports.default = UiLogic;

},{"./ui":2}],2:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
let uploaderId = "imageUploader", canvasId = "canvasImage1", ui = {
    id: "lab5",
    rows: [
        { type: "header", template: "Functions", height: 50 },
        {
            cols: [
                {
                    view: "uploader",
                    value: "Load file",
                    id: uploaderId,
                    autosend: false,
                    multiple: false
                },
                {}
            ]
        },
        {
            rows: [
                { type: "header", template: "Image", height: 50 },
                {
                    template: `<div><canvas id="${canvasId}" width="1000" height="500"></canvas></div>`
                }
            ]
        }
    ]
};
exports.uploaderId = uploaderId;
exports.canvasId = canvasId;
exports.ui = ui;

},{}],3:[function(require,module,exports){
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
    let res = [];
    for (let i = 0; i < length; i++) {
        res[i] = new Complex(func(i * 2 * Math.PI / length));
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
    for (let m = 0; m < len - 1; m++) {
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
        result[m] = result[m].divNumber(len / 2);
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
    let len = firstSignal.length, firstImage = fft(firstSignal, len, 1, { count: 0 }), secondImage = fft(secondSignal, len, 1, { count: 0 }), result = [];
    for (let i = 0; i < len; i++) {
        result[i] = firstImage[i].conjugate.mult(secondImage[i]);
    }
    return fft(result, len, -1, { count: 0 });
}, fwht = (data, length) => {
    if (length === 1) {
        return data;
    }
    let half = length / 2, firstHalf = [], secondHalf = [], result = [], i, firstPart, secondPart;
    for (i = 0; i < half; i++) {
        firstHalf[i] = data[i] + data[i + half];
        secondHalf[i] = -1 * data[i + half] + data[i];
    }
    firstPart = fwht(firstHalf, half);
    secondPart = fwht(secondHalf, half);
    for (i = 0; i < half; i++) {
        result[i] = firstPart[i];
        result[i + half] = secondPart[i];
    }
    return result;
}, getPhaseAndAmplitude = (mas, len) => {
    let amplitude = [mas[0] * mas[0]], phase = [0], i = 1;
    for (; i < len / 2 - 1; i++) {
        amplitude[i] = mas[2 * i - 1] * mas[2 * i - 1] + mas[2 * i] * mas[2 * i];
        phase[i] = (amplitude[i] > 0.001) ? Math.atan2(mas[2 * i - 1], mas[2 * i]) : 0.0;
    }
    amplitude[len / 2 - 1] = mas[len - 1] * mas[len - 1];
    phase[len / 2 - 1] = 0;
    return { phase, amplitude };
};
exports.CreateSamples = createSamples;
exports.DFT = dftFunc;
exports.FFT = fftFunc;
exports.Correlation = correlation;
exports.Convolution = convolution;
exports.ConvolutionFourier = convolutionFourier;
exports.CorrelationFourier = correlationFourier;
exports.FWHT = fwht;
exports.GetPhaseAndAmplitude = getPhaseAndAmplitude;

},{}],4:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const test_1 = require("./test");
const ui_1 = require("./lab1/ui");
const logic_1 = require("./lab1/logic");
let getXData = (count) => {
    let i = 0, res = [];
    for (i; i < count; i++) {
        res.push(i);
    }
    return res;
}, getXDataComplex = (count) => {
    let i = 0, res = [];
    for (i; i < count; i++) {
        res.push(new test_1.Complex(0.0, 0.0));
    }
    return res;
}, getMagnitudeFromComplex = (data) => data.map(complex => complex.magnitude), getPhaseFromComplex = (data) => {
    return data.map(complex => complex.magnitude > 0.3 ? complex.phase : 0);
}, getRealFromComplex = (data) => data.map(complex => complex.re), getHalfData = (data) => {
    let newData = data.slice(0);
    newData.length = newData.length / 2;
    return newData;
}, bih = (noise, grade) => {
    let result = [], temp = [], acc = 0;
    for (let t = grade / 2; t < noise.length; t++) {
        temp[t] = noise[t];
    }
    for (let i = 0; i < grade / 2; i++) {
        acc += noise[i] + noise[noise.length - i - 1];
    }
    for (let i = 0; i < noise.length - grade; i++) {
        acc = acc + temp[i + grade / 2] - temp[i + grade];
        result[i] = acc / grade * (-1);
    }
    return result;
}, kih = (nF, x, grade, N) => {
    let blackman = [], result = [];
    // for (let i = 0; i < grade; i++) {
    //     if (i - grade / 2 !== 0) {
    //         blackman[i] = Math.sin(2 * Math.PI * nF * (i - grade / 2)) * (0.54 - 0.46 * Math.cos(2 * Math.PI * i / grade)) / (i - grade / 2);
    //     } else {
    //         blackman[i] = 2 * Math.PI * nF * (0.54 - 0.46 * Math.cos(2 * Math.PI * i / grade));
    //     }
    // }
    for (let i = 0; i < grade; i++) {
        if (i - grade / 2 !== 0) {
            blackman[i] = Math.sin(2 * Math.PI * nF * (i - grade / 2)) * (0.42 - 0.5 * Math.cos(2 * Math.PI * i / grade) + 0.08 * Math.cos(4 * Math.PI / grade)) / (i - grade / 2);
        }
        else {
            blackman[i] = 2 * Math.PI * nF * (0.42 - 0.5 * Math.cos(2 * Math.PI * i / grade) + 0.08 * Math.cos(4 * Math.PI / grade));
        }
    }
    let dSum = 0;
    for (let i = 0; i < grade; i++) {
        dSum += blackman[i];
    }
    for (let i = 0; i < grade; i++) {
        blackman[i] /= dSum * (-1);
    }
    for (let i = grade; i < N; i++) {
        result[i - grade] = 0;
        for (let t = 0; t < grade; t++) {
            result[i - grade] = result[i - grade] + x[i - t] * blackman[t];
        }
        result[i - grade] *= -1;
    }
    return result;
}, addNoise = (y) => {
    let temp = [], len = y.length, getRandomArbitrary = (min, max) => (Math.random() * (max - min) + min);
    for (let i = 0; i < len; i++) {
        temp[i] = y[i] + Math.sin(getRandomArbitrary(0, 360)) / 8;
    }
    return temp;
}, runLab4 = () => {
    let amount = 1024, grade = 64, nF = 0.015, createData = (length, getSignal) => {
        let step = 2 * Math.PI / length, curStep = 0.0, arr = [], i = 0;
        for (; curStep < 2 * Math.PI; curStep += step, i++) {
            arr[i] = getSignal(curStep);
        }
        arr[length - 1] = getSignal(2 * Math.PI);
        return arr;
    }, data = createData(amount, value => Math.cos(3.0 * value) + Math.sin(2.0 * value)), withNoise = addNoise(data), kihData = kih(nF, withNoise, grade, amount), bihData = bih(withNoise, grade), xData = getXData(amount);
    drawChart(xData, data, $$(lab4Data1));
    drawChart(xData, withNoise, $$(lab4Data2));
    drawChart(getXData(kihData.length), kihData, $$(lab4Data3));
    drawChart(getXData(bihData.length), bihData, $$(lab4Data4));
}, runLab = () => {
    let amount = 1024, data = test_1.CreateSamples(amount, 8000, 187.5, (value) => {
        return Math.sin(3.0 * value) + Math.cos(value);
    }), xData = getXData(amount), dftData = test_1.DFT(data, amount, false), dftDataReverse = test_1.DFT(dftData.result, amount, true), fftData = test_1.FFT(data, amount, false), fftReverse = test_1.FFT(fftData.result, amount, true);
    drawChart(xData, getRealFromComplex(data), $$(firstChartId));
    console.log(`DFT iterations: ${dftData.count}`);
    console.log(`FFT iterations: ${fftData.count}`);
    // DFT
    drawChart(getHalfData(xData), getHalfData(getPhaseFromComplex(dftData.result)), $$(dftPhaseId));
    drawChart(getHalfData(xData), getHalfData(getMagnitudeFromComplex(dftData.result)), $$(dftMagnitudeId));
    drawChart(xData, getRealFromComplex(dftDataReverse.result), $$(dftId));
    // FFT
    drawChart(getHalfData(xData), getHalfData(getPhaseFromComplex(fftData.result)), $$(fftPhaseId));
    drawChart(getHalfData(xData), getHalfData(getMagnitudeFromComplex(fftData.result)), $$(fftMagnitudeId));
    drawChart(xData, getRealFromComplex(fftReverse.result), $$(fftId));
}, runLab2 = () => {
    let amount = 512, xData = getXData(amount * 2), dataLab1 = test_1.CreateSamples(amount, 8000, 187.5, (value) => {
        return Math.cos(3.0 * value) /* + Math.cos(value)*/;
    }).concat(getXDataComplex(amount)), dataLab2 = test_1.CreateSamples(amount, 8000, 187.5, (value) => {
        return Math.cos(3.0 * value) + Math.sin(2.0 * value);
    }).concat(getXDataComplex(amount)), convolutionRezult = test_1.Convolution(dataLab1, dataLab2), correlationRezult = test_1.Correlation(dataLab1, dataLab2), correlationFourier = test_1.CorrelationFourier(dataLab1, dataLab2), convolutionFourier = test_1.ConvolutionFourier(dataLab1, dataLab2);
    drawChart(getHalfData(xData), getHalfData(getRealFromComplex(dataLab1)), $$(lab2Data1Id));
    drawChart(getHalfData(xData), getHalfData(getRealFromComplex(dataLab2)), $$(lab2Data2Id));
    drawChart(getHalfData(xData), getRealFromComplex(convolutionRezult), $$(lab2Conv1Id));
    drawChart(getHalfData(xData), getRealFromComplex(convolutionFourier), $$(lab2Conv2Id));
    drawChart(getHalfData(xData), getRealFromComplex(correlationRezult), $$(lab2Corr1Id));
    drawChart(getHalfData(xData), getRealFromComplex(correlationFourier), $$(lab2Corr2Id));
}, runLab3 = () => {
    const N = 8, size = 64, len = N * size;
    let createData = (length, getSignal) => {
        let step = 2 * Math.PI / length, curStep = 0.0, arr = [], i = 0;
        for (; curStep < 2 * Math.PI; curStep += step, i++) {
            arr[i] = getSignal(curStep);
        }
        arr[length - 1] = getSignal(2 * Math.PI);
        return arr;
    }, xData = getXData(len), data = createData(len, value => Math.cos(3.0 * value) + Math.sin(2.0 * value)), fwhtData = test_1.FWHT(data, len), i = 0;
    for (; i < len; i++) {
        fwhtData[i] /= len; // this for normalisation
    }
    let extraData = test_1.GetPhaseAndAmplitude(fwhtData, len);
    drawChart(xData, data, $$(lab3Data1Id));
    drawChart(getHalfData(xData), extraData.phase, $$(lab3Data2Id));
    drawChart(getHalfData(xData), extraData.amplitude, $$(lab3Data3Id));
    drawChart(xData, test_1.FWHT(fwhtData, len), $$(lab3Data4Id));
}, lab4Data1 = "lab4Data1", lab4Data2 = "lab4Data2", lab4Data3 = "lab4Data3", lab4Data4 = "lab4Data4", lab3Data1Id = "lab3Data1Id", lab3Data2Id = "lab3Data2Id", lab3Data3Id = "lab3Data3Id", lab3Data4Id = "lab3Data4Id", lab2Data1Id = "lab2Data1Id", lab2Data2Id = "lab2Data2Id", lab2Conv1Id = "lab2Conv1Id", lab2Conv2Id = "lab2Conv2Id", lab2Corr1Id = "lab2Corr1Id", lab2Corr2Id = "lab2Corr2Id", firstChartId = "firstChart", dftId = "dftREverse", dftPhaseId = "dftPhase", dftMagnitudeId = "dftMagnitude", fftId = "fftREverse", fftPhaseId = "fftPhase", fftMagnitudeId = "fftMagnitude", getData = (x, y) => {
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
        width: 800,
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
            template: function (inedx) {
                return $$(id).getIndexById(inedx.id) % 100 ? "" : inedx.x;
            },
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
                            { value: "Lab 2", id: "lab2" },
                            { value: "Lab 3", id: "lab3" },
                            { value: "Lab 4", id: "lab4" },
                            { value: "Lab 1 gen.2", id: "lab5" }
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
                        },
                        {
                            id: "lab3",
                            rows: [
                                { type: "header", template: "Function", height: 50 },
                                { template: "y = cos(3x) + sin(2x)", height: 30 },
                                getChartObject(lab3Data1Id),
                                { template: "Revert function", height: 30 },
                                getChartObject(lab3Data4Id),
                                { type: "header", template: "Phase", height: 50 },
                                getChartObject(lab3Data2Id),
                                { type: "header", template: "Magnitude", height: 50 },
                                getChartObject(lab3Data3Id)
                            ]
                        },
                        {
                            id: "lab4",
                            rows: [
                                { type: "header", template: "Function", height: 50 },
                                { template: "y = cos(3x) + sin(2x)", height: 30 },
                                getChartObject(lab4Data1),
                                { template: "With noise", height: 30 },
                                getChartObject(lab4Data2),
                                { type: "header", template: "KIH filter", height: 50 },
                                getChartObject(lab4Data3),
                                { type: "header", template: "BIH filter", height: 50 },
                                getChartObject(lab4Data4)
                            ]
                        },
                        ui_1.ui
                    ]
                }
            }
        ]
    });
    let uiLogic;
    $$("tabbar").attachEvent("onAfterTabClick", (e) => {
        if (uiLogic === undefined) {
            uiLogic = new logic_1.default();
        }
    });
    $$("runId").attachEvent("onItemClick", () => {
        switch ($$("tabbar").getValue()) {
            case "lab1":
                runLab();
                return;
            case "lab2":
                runLab2();
                return;
            case "lab3":
                runLab3();
                return;
            case "lab4":
                runLab4();
                return;
            default: break;
        }
    });
});

},{"./lab1/logic":1,"./lab1/ui":2,"./test":3}]},{},[4]);
