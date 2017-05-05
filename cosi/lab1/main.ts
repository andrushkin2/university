import {Complex, CreateSamples, DFT, FFT, Convolution, Correlation, ConvolutionFourier, CorrelationFourier, GetPhaseAndAmplitude, FWHT} from "./test";

let getXData = (count: number): number[] => {
        let i: number = 0,
            res: number[] = [];
        for (i; i < count; i++) {
            res.push(i);
        }
        return res;
    },
    getXDataComplex = (count: number): Complex[] => {
        let i: number = 0,
            res: Complex[] = [];
        for (i; i < count; i++) {
            res.push(new Complex(0.0, 0.0));
        }
        return res;
    },
    getMagnitudeFromComplex = (data: Complex[]): number[] => data.map(complex => complex.magnitude),
    getPhaseFromComplex = (data: Complex[]): number[] => {
        return data.map(complex => complex.magnitude > 0.3 ? complex.phase : 0);
    },
    getRealFromComplex = (data: Complex[]): number[] => data.map(complex => complex.re),
    getHalfData = (data: number[]) => {
        let newData = data.slice(0);
        newData.length = newData.length / 2;
        return newData;
    },
    runLab = () => {
        let amount: number = 1024,
            data: Complex[] = CreateSamples(amount, 8000, 187.5, (value: number) => {
                return Math.sin(3.0 * value) + Math.cos(value);
            }),
            xData: number[] = getXData(amount),
            dftData = DFT(data, amount, false),
            dftDataReverse = DFT(dftData.result, amount, true),
            fftData = FFT(data, amount, false),
            fftReverse = FFT(fftData.result, amount, true);

        drawChart(xData, getRealFromComplex(data), $$(firstChartId) as webix.ui.chart);
        console.log(`DFT iterations: ${dftData.count}`);
        console.log(`FFT iterations: ${fftData.count}`);
        // DFT
        drawChart(getHalfData(xData), getHalfData(getPhaseFromComplex(dftData.result)), $$(dftPhaseId) as webix.ui.chart);
        drawChart(getHalfData(xData), getHalfData(getMagnitudeFromComplex(dftData.result)), $$(dftMagnitudeId) as webix.ui.chart);
        drawChart(xData, getRealFromComplex(dftDataReverse.result), $$(dftId) as webix.ui.chart);
        // FFT
        drawChart(getHalfData(xData), getHalfData(getPhaseFromComplex(fftData.result)), $$(fftPhaseId) as webix.ui.chart);
        drawChart(getHalfData(xData), getHalfData(getMagnitudeFromComplex(fftData.result)), $$(fftMagnitudeId) as webix.ui.chart);
        drawChart(xData, getRealFromComplex(fftReverse.result), $$(fftId) as webix.ui.chart);
    },
    runLab2 = () => {
        let amount = 512,
            xData: number[] = getXData(amount * 2),
            dataLab1: Complex[] = CreateSamples(amount, 8000, 187.5, (value: number) => {
                return Math.sin(3.0 * value) + Math.cos(value);
            }).concat(getXDataComplex(amount)),
            dataLab2: Complex[] = CreateSamples(amount, 8000, 187.5, (value: number) => {
                return Math.cos(5.0 * value)/* + Math.sin(6.0 * value)*/;
            }).concat(getXDataComplex(amount)),
            convolutionRezult = Convolution(dataLab1, dataLab2),
            correlationRezult = Correlation(dataLab1, dataLab2),
            correlationFourier = CorrelationFourier(dataLab1, dataLab2),
            convolutionFourier = ConvolutionFourier(dataLab1, dataLab2);
            drawChart(getHalfData(xData), getHalfData(getRealFromComplex(dataLab1)), $$(lab2Data1Id) as webix.ui.chart);
            drawChart(getHalfData(xData), getHalfData(getRealFromComplex(dataLab2)), $$(lab2Data2Id) as webix.ui.chart);
            drawChart(xData, getRealFromComplex(convolutionRezult), $$(lab2Conv1Id) as webix.ui.chart);
            drawChart(xData, getRealFromComplex(convolutionFourier), $$(lab2Conv2Id) as webix.ui.chart);
            drawChart(xData, getRealFromComplex(correlationRezult), $$(lab2Corr1Id) as webix.ui.chart);
            drawChart(xData, getRealFromComplex(correlationFourier), $$(lab2Corr2Id) as webix.ui.chart);
    },
    runLab3 = () => {
        const   N: number = 8,
                size: number = 64,
                len: number = N * size;
        let createData = (length: number, getSignal: (value: number) => number) => {
                let step: number = 2 * Math.PI / length,
                    curStep: number = 0.0,
                    arr: number[] = [],
                    i: number = 0;
                for (; curStep < 2 * Math.PI; curStep += step, i++) {
                    arr[i] = getSignal(curStep);
                }
                arr[length - 1] = getSignal(2 * Math.PI);
                return arr;
            },
            xData = getXData(len),
            data = createData(len, value => Math.sin(3.0 * value) + Math.cos(value)),
            fwhtData = FWHT(data, len),
            i: number = 0;

        for (; i < len; i++) {
            fwhtData[i] /= len; // this for normalisation
        }

        let extraData = GetPhaseAndAmplitude(fwhtData, len);
        drawChart(xData, data, $$(lab3Data1Id) as webix.ui.chart);
        drawChart(getHalfData(xData), extraData.phase, $$(lab3Data2Id) as webix.ui.chart);
        drawChart(getHalfData(xData), extraData.amplitude, $$(lab3Data3Id) as webix.ui.chart);
        drawChart(xData, FWHT(fwhtData, len), $$(lab3Data4Id) as webix.ui.chart);
    },
    lab3Data1Id = "lab3Data1Id",
    lab3Data2Id = "lab3Data2Id",
    lab3Data3Id = "lab3Data3Id",
    lab3Data4Id = "lab3Data4Id",
    lab2Data1Id = "lab2Data1Id",
    lab2Data2Id = "lab2Data2Id",
    lab2Conv1Id = "lab2Conv1Id",
    lab2Conv2Id = "lab2Conv2Id",
    lab2Corr1Id = "lab2Corr1Id",
    lab2Corr2Id = "lab2Corr2Id",
    firstChartId = "firstChart",
    dftId = "dftREverse",
    dftPhaseId = "dftPhase",
    dftMagnitudeId = "dftMagnitude",
    fftId = "fftREverse",
    fftPhaseId = "fftPhase",
    fftMagnitudeId = "fftMagnitude",
    getData = (x: number[], y: number[]): {x: number; y: number}[] => {
        let len = x.length,
            res: {x: number, y: number}[] = [];
        for (let i = 0; i < len; i++) {
            res.push({
                x: x[i],
                y: y[i]}
            );
        }
        return res;
    },
    drawChart = (x: number[], y: number[], chartContainer: webix.ui.chart) => {
        let cartData = getData(x, y);
        chartContainer.clearAll();
        chartContainer.parse(cartData, "json");
    },
    getChartObject = (id: string) => {
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
                template: function(inedx) {
                    return (<webix.ui.chart>$$(id)).getIndexById(inedx.id) % 100 ? "" : inedx.x;
                },
                lines: function(index) {
                    return this.getIndexById(index.id) % 100 ? false : true;
                }
            },
            yAxis: {
                template: function(index) {
                    return index;
                },
                lines: function(index) {
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
                            { value: "Lab 1",  id: "lab1"},
                            { value: "Lab 2",  id: "lab2"},
                            { value: "Lab 3",  id: "lab3"}
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
                                { type: "header", template: "Phase", height: 50},
                                { template: "FFT phase", height: 30 },
                                getChartObject(fftPhaseId),
                                { template: "DFT phase", height: 30 },
                                getChartObject(dftPhaseId),
                                { type: "header", template: "Magnitude", height: 50},
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
                                { type: "header", template: "Phase", height: 50},
                                getChartObject(lab3Data2Id),
                                { type: "header", template: "Magnitude", height: 50},
                                getChartObject(lab3Data3Id)
                            ]
                        }
                    ]
                }
            }
        ]
    });
    (<webix.ui.button>$$("runId")).attachEvent("onItemClick", () => {
        switch ((<webix.ui.segmented>$$("tabbar")).getValue()) {
            case "lab1": runLab(); return;
            case "lab2": runLab2(); return;
            case "lab3": runLab3(); return;
        }
    });
});