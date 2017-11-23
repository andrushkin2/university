import { canvasId, uploaderId, buttonId, redChartId, IChartData, greenChartId, buttonResetId, blueChartId, buttonLogParseId, logToolbarFormId, logToolbarId, buttonRobertsId, buttonLab2Id } from "./ui";
import DisjointSet from "./disjointSet";

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
        (<webix.ui.button>$$(buttonLab2Id)).attachEvent("onItemClick", () => {
            let data = this.getContextData(),
                newData = this.toGrayscale(data.data);
            debugger;
            this.updateContextData(data.data, newData);
            this.putContextData(data);
            debugger;
            let median = this.medianFilter(newData);
            this.updateContextData(data.data, this.toFlatArray(median));
            this.putContextData(data);
            debugger;
            let blackWhite = this.toBlackAndWhite(median);
            this.updateContextData(data.data, this.toFlatArray(blackWhite.data));
            this.putContextData(data);
            let connectedData = this.connectedComponents(blackWhite.bitMap);
            debugger;
            this.updateContextData(data.data, this.toFlatArrayItems(connectedData));
            this.putContextData(data);
            debugger;
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
    private getEmptyArray(rows: number, cols: number) {
        let result: number[][] = [];
        for (let i = 0; i < rows; i++) {
            let temp: number[] = [];
            for (let y = 0; y < cols; y++) {
                temp[y] = 0;
            }
            result[i] = temp;
        }
        return result;
    }
    private connectedComponents(elements: number[][]) {
        let unions = new DisjointSet(10000),
            rows = elements.length,
            cols = elements[0].length,
            label = 0,
            result = this.getEmptyArray(rows, cols);
        for (let x = 1; x < rows; x++) {
            for (let y = 1; y < cols; y++) {
                if (elements[x][y]) {
                    let a = result[x][y],
                        b = result[x - 1][y],
                        c = result[x][y - 1];
                    if (!b && !c) {
                        result[x][y] = ++label;
                    } else if (b && !c) {
                        result[x][y] = result[x - 1][y];
                    } else if (!b && c) {
                        result[x][y] = result[x][y - 1];
                    } else {
                        result[x][y] = (b < c) ? result[x - 1][y] : result[x][y - 1];
                        if (b !== c) {
                            unions.join(result[x - 1][y], result[x][y - 1]);
                        }
                    }
                }
            }
        }

        for (let i = 0; i < rows; i++) {
            for (let j = 0; j < cols; j++) {
                let element = result[i][j];
                if (element) {
                    result[i][j] = unions.find(element);
                }
            }
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
    private toFlatArray(data: number[][][]) {
        let res: number[] = [];
        for (let i = 0, len = data.length; i < len; i++) {
            let row = data[i];
            for (let j = 0, subLen = row.length; j < subLen; j++) {
                let pixel = row[j];
                res.push(pixel[0]);
                res.push(pixel[1]);
                res.push(pixel[2]);
                res.push(pixel[3]);
            }
        }
        return res;
    }
    private toFlatArrayItems(data: number[][]) {
        let res: number[] = [];
        for (let i = 0, len = data.length; i < len; i++) {
            let row = data[i];
            for (let j = 0, subLen = row.length; j < subLen; j++) {
                let pixel = row[j];
                res.push(100);
                res.push(pixel);
                res.push(100);
                res.push(255);
            }
        }
        return res;
    }
    private toGrayscale(data: Uint8ClampedArray) {
        let result: Uint8ClampedArray = new Uint8ClampedArray(data.length);
        for (let i = 0, len = data.length; i < len; i += 4) {
            let avg: number = (data[i] + data[i + 1] + data[i + 2]) / 3;
            result[i] = avg;
            result[i + 1] = avg;
            result[i + 2] = avg;
            result[i + 3] = data[i + 3];
        }
        return result;
    }
    private getPixelsAround(data: number[][][], i: number, j: number) {
        let current = data[i][j],
            left: number[] | undefined = data[i][j - 1],
            right: number[] | undefined = data[i][j + 1],
            isHasInTop: boolean = data[i - 1] !== undefined,
            isHasInBottom: boolean = data[i + 1] !== undefined,
            top: number[] | undefined = isHasInTop ? data[i - 1][j] : undefined,
            bottom: number[] | undefined = isHasInBottom ? data[i + 1][j] : undefined,
            topLeft: number[] = isHasInTop ? data[i - 1][j - 1] || top || current : left || current,
            topRight: number[] = isHasInTop ? data[i - 1][j + 1] || top || current : right || current,
            bottomLeft: number[] = isHasInBottom ? data[i + 1][j - 1] || bottom || current : left || current,
            bottomRight: number[] = isHasInBottom ? data[i + 1][j + 1] || bottom || current : right || current;
        return [
            [topLeft, top || current, topRight],
            [left || current, current, right || current],
            [bottomLeft, bottom || current, bottomRight]
        ];
    }
    private calcMedium(pixels: number[][][]) {
        let red: number[] = [],
            green: number[] = [],
            blue: number[] = [];
        for (let i = 0, len = pixels.length; i < len; i++) {
            let row = pixels[i];
            for (let j = 0, subLen = row.length; j < subLen; j++) {
                let pixel = row[j];
                red.push(pixel[0]);
                green.push(pixel[1]);
                blue.push(pixel[2]);
            }
        }
        red.sort();
        green.sort();
        blue.sort();
        let determinate = Math.round(red.length / 2);
        return [red[determinate], green[determinate], blue[determinate]];
    }
    private medianFilter(data: Uint8ClampedArray) {
        let arr: number[][][] = this.flatArrayToMatrix(data),
            result: number[][][] = [];
        for (let i = 0, len = arr.length; i < len; i++) {
            let item = arr[i],
                rowItems: number[][] = [];
            for (let j = 0, subLen = item.length; j < subLen; j++) {
                let pixel = item[j],
                    mediumValue = this.calcMedium(this.getPixelsAround(arr, i, j));
                rowItems.push([mediumValue[0], mediumValue[1], mediumValue[2], pixel[3]]);
            }
            result[i] = rowItems;
        }
        return result;
    }
    private toBlackAndWhite(data: number[][][], p = 195) {
        let result: number[][] = [],
            resultData: number[][][] = [];
        for (let i = 0, len = data.length; i < len; i++) {
            let item = data[i];
            result[i] = [];
            resultData[i] = [];
            for (let j = 0, subLen = item.length; j < subLen; j++) {
                let pixel: number[] = data[i][j],
                    k: number = (pixel[0] + pixel[1] + pixel[2]) / 3,
                    newValue: number = k > p ? 255 : 0;
                result[i][j] = newValue;
                resultData[i][j] = [newValue, newValue, newValue, pixel[3]];
            }
        }
        return {
            data: resultData,
            bitMap: result
        };
    }
}