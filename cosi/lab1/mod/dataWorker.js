"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class DataWorker {
    constructor(a, m, r0) {
        this.a = a;
        this.m = m;
        this.r0 = r0;
        this.rPrev = r0;
    }
    next() {
        this.rPrev = (this.a * this.rPrev) % this.m;
        return this.rPrev / this.m;
    }
    current() {
        return this.rPrev / this.m;
    }
    currentR() {
        return this.rPrev;
    }
    getM() {
        return this.m;
    }
    getFirstR() {
        let first = (this.a * this.r0) % this.m;
        return first / this.m;
    }
}
exports.default = DataWorker;
