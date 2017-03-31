export class Complex {
    public re: number;
    public im: number;
    constructor(re: number, im: number = 0) {
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
    getWn = (n: number, direction: number): Complex => {
        return new Complex(Math.cos(2.0 * Math.PI / n), direction * Math.sin(2.0 * Math.PI / n));
    },
    fft = (arr: Complex[], n: number, direction: number, iterations: {count: number}): Complex[] => {
        if (arr.length === 1) {
            return arr;
        }
        let wn = getWn(n, direction),
            w = new Complex(1.0),
            len = arr.length,
            halfOfLen = len / 2,
            first: Complex[] = [],
            second: Complex[] = [];
        for (let i = 0; i < halfOfLen; i++) {
            let currentComplex = arr[i],
                jumpedComplex = arr[i + halfOfLen];
            first[i] = currentComplex.add(jumpedComplex);
            second[i] = (currentComplex.sub(jumpedComplex)).mult(w);
            w = w.mult(wn);
            // update counter
            iterations.count++;
        }
        let firstFFT = fft(first, halfOfLen, direction, iterations),
            secondFFT = fft(second, halfOfLen, direction, iterations);
        return firstFFT.concat(secondFFT);
    },
    getSample = (length: number, rate: number, frequency: number, func: (value: number) => number): Complex[] => {
        let period = rate / frequency / 2,
            res: Complex[] = [];
        for (let i = 0; i < length; i++) {
            res[i] = new Complex(func(i * Math.PI / period));
        }
        return res;
    },
    arr = getSample(8192, 8000, 187.5, (value: number) => {
        return Math.cos(3 * value) + Math.sin(2 * value);
    });

console.time("Start fft");
let iterRes: {count: number} = {count: 0};
let res = fft(arr.slice(0), 8192, 1, iterRes);
console.timeEnd("Start fft");
console.log(iterRes.count);

console.time("Start");
let iterRes2: {count: number} = {count: 0};
let res2 = dft(arr.slice(0), 8192, false, iterRes2);
console.timeEnd("Start");
console.log(iterRes2.count);


let createSamples = (length: number, rate: number, frequency: number, func: (value) => number): Complex[] => getSample(length, rate, frequency, func),
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
    };

export {createSamples as CreateSamples, dftFunc as DFT, fftFunc as FFT};