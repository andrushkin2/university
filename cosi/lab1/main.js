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
    abs() {
        return Math.sqrt(Math.pow(this.re, 2) + Math.pow(this.im, 2));
    }
    arg() {
        return Math.atan2(this.im, this.re);
    }
}
let dft = (arr, n, reverse) => {
    let tmp = [];
    for (let i = 0; i < n; i++) {
        for (let j = 0; j < n; j++) {
            let calc = (2 * Math.PI / n) * j * i, w = new Complex(Math.cos(calc), reverse ? -Math.sin(calc) : Math.sin(calc));
            if (!tmp[i]) {
                tmp[i] = new Complex(0);
            }
            tmp[i].add(w.mult(arr[j]));
        }
    }
    for (let i = 0; i < n; i++) {
        arr[i] = tmp[i];
    }
}, getWn = (index, n, direction) => {
    return Math.cos(2 * Math.PI / n) + direction * index * Math.sin(2 * Math.PI / n);
}, bpf = (arr, n, direction) => {
    if (arr.length === 1) {
        return;
    }
    let wn = getWn(1, n, direction);
}, getSample = (length, rate, frequency, func) => {
    let period = rate / frequency / 2, res = [];
    for (let i = 0; i < length; i++) {
        res[i] = new Complex(func(i * Math.PI / period));
    }
    return res;
}, arr = getSample(8192, 8000, 187.5, (value) => {
    return Math.cos(3 * value) + Math.sin(2 * value);
});
console.time("Start");
dft(arr, 8192, false);
console.timeEnd("Start");
