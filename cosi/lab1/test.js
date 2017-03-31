"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Complex {
    constructor(re, im = 0) {
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
console.time("Start fft");
let iterRes = { count: 0 };
let res = fft(arr.slice(0), 8192, 1, iterRes);
console.timeEnd("Start fft");
console.log(iterRes.count);
console.time("Start");
let iterRes2 = { count: 0 };
let res2 = dft(arr.slice(0), 8192, false, iterRes2);
console.timeEnd("Start");
console.log(iterRes2.count);
let createSamples = (length, rate, frequency, func) => getSample(length, rate, frequency, func), dftFunc = (array, n, reverse) => {
    let counter = { count: 0 }, arrRes = dft(array, n, reverse, counter);
    return {
        count: counter.count,
        result: arrRes
    };
}, fftFunc = (array, n, reverse) => {
    let counter = { count: 0 }, arrRes = fft(array, n, reverse ? -1 : 1, counter);
    return {
        count: counter.count,
        result: arrRes
    };
};
exports.CreateSamples = createSamples;
exports.DFT = dftFunc;
exports.FFT = fftFunc;
