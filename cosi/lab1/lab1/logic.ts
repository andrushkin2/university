import { canvasId, uploaderId, buttonId, redChartId, IChartData, greenChartId, blueChartId } from "./ui";

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
    private context: CanvasRenderingContext2D;
    constructor() {
        let canvas = <HTMLCanvasElement | null>document.querySelector(`#${canvasId}`),
            context: CanvasRenderingContext2D | null;
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
            this.loadFile(e.file).then(data => this.insertImageToCanvas(data)).then(() => {
                debugger;
            }).catch(reason => {
                new webix.message(reason.message || reason.text || "Error was happened");
            });
        });
        (<webix.ui.button>$$(buttonId)).attachEvent("onItemClick", () => {
            let data = this.getInfoFromContext();
            this.drawChartData(redChartId, data.red.map);
            this.drawChartData(greenChartId, data.green.map);
            this.drawChartData(blueChartId, data.blue.map);
        });
    }
    private drawChartData(chartId: string, data: IKeyValue<number>) {
        let chart = (<webix.ui.chart>$$(chartId));
        chart.clearAll();
        chart.parse(this.getChartData(data), "json");
    }
    private getChartData(data: IKeyValue<number>) {
        let result: IChartData[] = [],
            keys = Object.keys(data);
        for (let i = 0, len  = keys.length; i < len; i++) {
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
                this.context.drawImage(image, 0, 0, 1000, 500);
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
    private getInfoFromContext() {
        let imageData = this.context.getImageData(0, 0, this.canvas.width, this.canvas.height),
            channels = this.getChannels(imageData.data);
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