import { canvasId, uploaderId, buttonId, redChartId, IChartData, greenChartId, buttonResetId, blueChartId, buttonLogParseId, logToolbarFormId, logToolbarId, buttonRobertsId } from "./ui";

interface IKeyValue<T> {
    [key: string]: T;
}

interface IColorsData {
    maxValue: number;
    map: IKeyValue<number | undefined>;
}

interface IChannelsData {
    red: number[];
    green: number[];
    blue: number[];
}

export default class UiLogic {
    private canvas: HTMLCanvasElement;
    private firstData: Uint8ClampedArray;
    private context: CanvasRenderingContext2D;
    constructor() {
        let canvas = <HTMLCanvasElement | null>document.querySelector(`#${canvasId}`),
            context: CanvasRenderingContext2D | null,
            logToolbar: webix.ui.toolbar = (<webix.ui.toolbar>$$(logToolbarId)),
            logToolbarForm: webix.ui.form = (<webix.ui.form>$$(logToolbarFormId));
        if (canvas === null) {
            throw new Error(`Cannot find canvas element with ID: ${canvasId}`);
        }
        context = canvas.getContext("2d");
        if (context === null) {
            throw new Error("Cannot get context of canvas");
        }
        this.canvas = canvas;
        this.context = context;
        (<webix.ui.uploader>$$(uploaderId)).attachEvent("onAfterFileAdd", (e?) => {
            this.loadFile(e.file).then(data => this.insertImageToCanvas(data)).catch(reason => {
                new webix.message(reason.message || reason.text || "Error was happened");
            });
        });
        (<webix.ui.button>$$(buttonId)).attachEvent("onItemClick", () => {
            let data = this.getInfoFromContext(this.getContextData());
            this.drawChartData(redChartId, data.red.map);
            this.drawChartData(greenChartId, data.green.map);
            this.drawChartData(blueChartId, data.blue.map);
        });
        (<webix.ui.button>$$(buttonResetId)).attachEvent("onItemClick", () => {
            let data = this.getContextData();
            this.updateContextData(data.data, this.firstData);
            this.putContextData(data);
            let info = this.getInfoFromContext(this.getContextData());
            this.drawChartData(redChartId, info.red.map);
            this.drawChartData(greenChartId, info.green.map);
            this.drawChartData(blueChartId, info.blue.map);
        });
        (<webix.ui.button>$$(buttonRobertsId)).attachEvent("onItemClick", () => {
            let data = this.getContextData(),
                newData = this.runRobertsTransform(data.data);
            this.updateContextData(data.data, newData);
            this.putContextData(data);
            let info = this.getInfoFromContext(this.getContextData());
            this.drawChartData(redChartId, info.red.map);
            this.drawChartData(greenChartId, info.green.map);
            this.drawChartData(blueChartId, info.blue.map);
        });
        (<webix.ui.button>$$(buttonLogParseId)).attachEvent("onItemClick", () => {
            if (!logToolbar.isVisible()) {
                logToolbar.show();
                return;
            }
            let formData = logToolbarForm.getValues(),
                data = this.getContextData();
            this.logCorrection(data.data, parseFloat(formData.c));
            this.putContextData(data);
            let info = this.getInfoFromContext(this.getContextData());
            this.drawChartData(redChartId, info.red.map);
            this.drawChartData(greenChartId, info.green.map);
            this.drawChartData(blueChartId, info.blue.map);
        });
    }
    private updateContextData(data: Uint8ClampedArray, newData: Uint8ClampedArray | number[]) {
        for (let i = 0, len = data.length; i < len; i += 4) {
            data[i] = newData[i];
            data[i + 1] = newData[i + 1];
            data[i + 2] = newData[i + 2];
            data[i + 3] = newData[i + 3];
        }
    }
    private drawChartData(chartId: string, data: IKeyValue<number>) {
        let chart = (<webix.ui.chart>$$(chartId));
        chart.clearAll();
        chart.parse(this.getChartData(data), "json");
    }
    private getChartData(data: IKeyValue<number>) {
        let result: IChartData[] = [],
            keys = Object.keys(data);
        for (let i = 0, len = keys.length; i < len; i++) {
            let key = keys[i],
                item = data[key];
            result.push({
                pixel: parseInt(key),
                value: data[key]
            });
        }
        return result;
    }
    private clearCanvas() {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }
    private insertImageToCanvas(urlData: string) {
        return new Promise((resolve, reject) => {
            let image = new Image();
            image.src = urlData;
            image.onload = () => {
                this.clearCanvas();
                this.canvas.width = image.width;
                this.canvas.height = image.height;
                this.context.drawImage(image, 0, 0, this.canvas.width, this.canvas.height);
                this.firstData = this.getContextData().data.slice(0);
                resolve({});
            };
            image.onerror = e => {
                reject(e);
            };
        });
    }
    private loadFile(file?: File) {
        if (file instanceof File) {
            return new Promise<string>((resolve, reject) => {
                if (FileReader) {
                    let loader = new FileReader();
                    loader.onload = () => {
                        resolve(loader.result);
                    };
                    loader.onerror = (e) => {
                        reject(e);
                    };
                    loader.readAsDataURL(file);
                } else {
                    reject(new Error("The browser doesn't support FileReader"));
                }
            });
        }
        return Promise.reject(new Error("File not found"));
    }
    private getChannels(data: Uint8ClampedArray) {
        let res: IChannelsData = { red: [], green: [], blue: [] };
        for (let i = 0, len = data.length; i < len; i += 4) {
            res.red.push(data[i]);
            res.green.push(data[i + 1]);
            res.blue.push(data[i + 2]);
        }
        return res;
    }
    private logCorrection(data: Uint8ClampedArray, c: number) {
        let getValue = (value: number, cVal: number) => cVal * Math.log(1 + value);
        for (let i = 0, len = data.length; i < len; i += 4) {
            data[i] = getValue(data[i], c);
            data[i + 1] = getValue(data[i + 1], c);
            data[i + 2] = getValue(data[i + 2], c);
        }
        return data;
    }
    private flatArrayToMatrix(data: Uint8ClampedArray) {
        let itemsInRow = this.canvas.width * 4,
            rows = this.canvas.height,
            yIndex = 0,
            rowIndex = 0,
            result: number[][][] = [];
        while (rowIndex < rows) {
            let maxIndex = itemsInRow * rowIndex + itemsInRow,
                tempArr: number[][] = [];
            while (yIndex < maxIndex) {
                tempArr.push([data[yIndex], data[yIndex + 1], data[yIndex + 2], data[yIndex + 3]]);
                yIndex += 4;
            }
            result[rowIndex] = tempArr;
            rowIndex++;
        }
        return result;
    }
    private runRobertsTransform(data: Uint8ClampedArray) {
        let arr = this.flatArrayToMatrix(data),
            result: number[] = [],
            calcNewValue = (xCurr: number, x1y1: number, xy1: number, x1y: number) => Math.sqrt(Math.pow(xy1 - x1y, 2) + Math.pow(xCurr - x1y1, 2)),
            culcLayers = (xy: number[], xy1: number[], x1y: number[], x1y1: number[]) => {
                for (let i = 0; i < 3; i++) {
                    result.push(calcNewValue(xy[i], x1y1[i], xy1[i], x1y[i]));
                }
                result.push(xy[3]);
            },
            runCircle = (subArr: number[][], nextArr: number[][]) => {
                for (let i = 0, subLen = subArr.length - 1; i < subLen; i++) {
                    culcLayers(subArr[i], subArr[i + 1], nextArr[i], nextArr[i + 1]);
                }
                let lastIndex = subArr.length - 1;
                culcLayers(subArr[lastIndex], subArr[lastIndex], nextArr[lastIndex], nextArr[lastIndex]);
            };
        for (let i = 0, len = arr.length - 1; i < len; i++) {
            runCircle(arr[i], arr[i + 1]);
        }
        runCircle(arr[arr.length - 1], arr[arr.length - 1]);
        return result;
    }
    private getContextData() {
        return this.context.getImageData(0, 0, this.canvas.width, this.canvas.height);
    }
    private putContextData(data: ImageData) {
        this.context.putImageData(data, 0, 0);
    }
    private getInfoFromContext(imageData: ImageData) {
        let channels = this.getChannels(imageData.data);
        return {
            red: this.getPixelColorfull(channels.red),
            green: this.getPixelColorfull(channels.green),
            blue: this.getPixelColorfull(channels.blue)
        };
    }
    private getPixelColorfull(colorsChannel: number[]) {
        let reduceFunc = (result: IColorsData, current: number) => {
                let value = result.map[current];
                if (value === undefined) {
                    result.map[current] = 1;
                } else {
                    result.map[current] = value + 1;
                }
                if (result.maxValue < current) {
                    result.maxValue = current;
                }
                return result;
            };
        return colorsChannel.reduce(reduceFunc, {
            maxValue: 0,
            map: {}
        });
    }
}