export class Complex {
    public re: number;
    public im: number;
    constructor(re: number, im: number = 0.0) {
        this.re = re;
        this.im = im;
    }
    public mult(comp: Complex): Complex {
        return new Complex(this.re * comp.re - this.im * comp.im, this.re * comp.im + this.im * comp.re);
    }
    public divNumber(value: number): Complex {
        return new Complex(this.re / value, this.im / value);
    }
    public add(comp: Complex): Complex {
        return new Complex(this.re + comp.re, this.im + comp.im);
    }
    public sub(comp: Complex): Complex {
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


let dft = (arr: Complex[], n: number, reverse: boolean, iterations: {count: number}): Complex[] => {
        let tmp: Complex[] = [];
        for (let i = 0; i < n; i++) {
            for (let j = 0; j < n; j++) {
                let calc: number = (2.0 * Math.PI / n) * j * i,
                    w: Complex = new Complex(Math.cos(calc), reverse ? -Math.sin(calc) : Math.sin(calc));
                if (!tmp[i]) {
                    tmp[i] = new Complex(0.0);
                }
                tmp[i] = tmp[i].add(w.mult(arr[j]));
                //update counter
                iterations.count++;
            }
        }
        return tmp;
    },
    fft = (arr: Complex[], n: number, direction: number, iterations: {count: number}): Complex[] => {
        if (arr.length === 1) {
            return arr;
        }
        let arg: number = 2.0 * Math.PI / n,
            wn = new Complex(Math.cos(arg), direction * Math.sin(arg)),
            w = new Complex(1.0),
            len = arr.length,
            halfOfLen = len >> 1,
            first: Complex[] = [],
            second: Complex[] = [],
            result: Complex[] = [];
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
        let firstFFT = fft(first, halfOfLen, direction, iterations),
            secondFFT = fft(second, halfOfLen, direction, iterations);
        for (let i = 0; i < halfOfLen; i++) {
            let j = i << 1;
            result[j] = firstFFT[i];
            result[j + 1] = secondFFT[i];
        }
        return result;
    },
    getSample = (length: number, rate: number, frequency: number, func: (value: number) => number): Complex[] => {
        let period = rate / frequency / 2,
            res: Complex[] = [];
        for (let i = 0; i < length; i++) {
            res[i] = new Complex(func(i * 2 * Math.PI / length));
        }
        return res;
    },
    createSamples = (length: number, rate: number, frequency: number, func: (value) => number): Complex[] => getSample(length, rate, frequency, func),
    dftFunc = (array: Complex[], n: number, reverse: boolean): {result: Complex[], count: number} => {
        console.time("DFT time: ");
        let counter = {count: 0},
            arrRes: Complex[] = dft(array, n, reverse, counter);
        console.timeEnd("DFT time: ");
        return {
            count: counter.count,
            result: arrRes
        };
    },
    fftFunc = (array: Complex[], n: number, reverse: boolean): {result: Complex[], count: number} => {
        console.time("FFT time: ");
        let counter = {count: 0},
            arrRes: Complex[] = fft(array, n, reverse ? -1 : 1, counter);
        console.timeEnd("FFT time: ");
        return {
            count: counter.count,
            result: arrRes
        };
    },
    correlation = (signal1: Complex[], signal2: Complex[]) => {
        let len: number = signal1.length,
            result: Complex[] = [];
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
    },
    convolution = (signal1: Complex[], signal2: Complex[]) => {
        let len = signal1.length,
            result: Complex[] = [];
        for (let m = 0; m < len; m++) {
            if (!result[m]) {
                result[m] = new Complex(0.0);
            }
            for (let h = 0; h < len; h++) {
                if (m - h >= 0) {
                    result[m] = result[m].add(signal1[h].mult(signal2[m - h]));
                } else {
                    result[m] = result[m].add(signal1[h].mult(signal2[m - h + len]));
                }
            }
            result[m] = result[m].divNumber(len);
        }
        return result;
    },
    convolutionFourier = (signal1: Complex[], signal2: Complex[]) => {
        let len = signal1.length,
            firstImage: Complex[] = fft(signal1, len, 1, {count: 0}),
            secondImage: Complex[] = fft(signal2, len, 1, {count: 0}),
            result: Complex[] = [];
        for (let i = 0; i < len; i++) {
            result[i] = firstImage[i].mult(secondImage[i]);
        }
        return fft(result, len, -1, {count: 0});
    },
    correlationFourier = (firstSignal: Complex[], secondSignal: Complex[]) => {
        let len = firstSignal.length,
            firstImage = fft(firstSignal, len, 1, {count: 0}),
            secondImage = fft(secondSignal, len, 1, {count: 0}),
            result: Complex[] = [];
        for (let i = 0; i < len; i++) {
            result[i] = firstImage[i].conjugate.mult(secondImage[i]);
        }
        return fft(result, len, -1, {count: 0});
    };

export {createSamples as CreateSamples, dftFunc as DFT, fftFunc as FFT, correlation as Correlation, convolution as Convolution, convolutionFourier as ConvolutionFourier, correlationFourier as CorrelationFourier};