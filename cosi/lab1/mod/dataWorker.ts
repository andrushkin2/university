
export default class DataWorker {
    private a: number;
    private m: number;
    private rPrev: number;
    private r0: number;
    consctructor(a: number, m: number, r0: number) {
        this.a = a;
        this.m = m;
        this.r0 = r0;
        this.rPrev = r0;
    }
    public next() {
        this.rPrev = (this.a * this.rPrev) / this.m;
        return this.rPrev / this.m;
    }
    public current() {
        return this.rPrev / this.m;
    }
    public currentR() {
        return this.rPrev;
    }
    public getM() {
        return this.m;
    }
}