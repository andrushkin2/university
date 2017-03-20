class Complex {
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
    public abs(): number {
        return Math.sqrt(Math.pow(this.re, 2) + Math.pow(this.im, 2));
    }
    public arg(): number {
        return Math.atan2(this.im, this.re);
    }
}


let dft = (arr: Complex[], n: number, reverse: boolean): void => {
    let tmp: Complex[] = [];
    for (let i = 0; i < n; i++) {
        for (let j = 0; j < n; j++) {
            let calc: number = (2 * Math.PI / n) * j * i,
                w: Complex = new Complex(Math.cos(calc), reverse ? -Math.sin(calc) : Math.sin(calc));
            if (!tmp[i]) {
                tmp[i] = new Complex(0);
            }
            tmp[i].add(w.mult(arr[j]));
        }
    }
    for (let i = 0; i < n; i++) {
        arr[i] = tmp[i];
    }
};

let getWn = (index: number, n: number, direction: number): number => Math.cos(2 * Math.PI / n) + direction * index * Math.sin(2 * Math.PI / n);

let bpf = (arr: Complex[], n: number, direction: number) => {
    if (arr.length === 1) {
        return;
    }
    let wn = getWn(1, n, direction);
}

let getSample = (length: number, rate: number, frequency: number, func: (value: number) => number): Complex[] => {
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

console.time("Start");
dft(arr, 8192, false);
console.timeEnd("Start");