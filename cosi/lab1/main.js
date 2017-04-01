"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
let getXData = (count) => {
    let i = 0, res = [];
    for (i = 0; i < count; i++) {
        res.push(i);
    }
    return res;
}, getMagnitudeFromComplex = (data) => data.map(complex => complex.magnitude), getPhaseFromComplex = (data) => data.map(complex => complex.phase), getRealFromComplex = (data) => data.map(complex => complex.re);
