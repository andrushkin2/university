import {Complex, CreateSamples, DFT, FFT} from "./test";

let getXData = (count: number): number[] => {
        let i = 0,
            res: number[] = [];
        for (i = 0; i < count; i++) {
            res.push(i);
        }
        return res;
    },
    getMagnitudeFromComplex = (data: Complex[]): number[] => data.map(complex => complex.magnitude),
    getPhaseFromComplex = (data: Complex[]): number[] => data.map(complex => complex.phase),
    getRealFromComplex = (data: Complex[]): number[] => data.map(complex => complex.re);