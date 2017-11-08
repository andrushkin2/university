"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ui_1 = require("./ui");
class UiLogic {
    constructor() {
        let canvas = document.querySelector(`#${ui_1.canvasId}`), context, logToolbar = $$(ui_1.logToolbarId), logToolbarForm = $$(ui_1.logToolbarFormId);
        if (canvas === null) {
            throw new Error(`Cannot find canvas element with ID: ${ui_1.canvasId}`);
        }
        context = canvas.getContext("2d");
        if (context === null) {
            throw new Error("Cannot get context of canvas");
        }
        this.canvas = canvas;
        this.context = context;
        $$(ui_1.uploaderId).attachEvent("onAfterFileAdd", (e) => {
            this.loadFile(e.file).then(data => this.insertImageToCanvas(data)).catch(reason => {
                new webix.message(reason.message || reason.text || "Error was happened");
            });
        });
        $$(ui_1.buttonId).attachEvent("onItemClick", () => {
            let data = this.getInfoFromContext(this.getContextData());
            this.drawChartData(ui_1.redChartId, data.red.map);
            this.drawChartData(ui_1.greenChartId, data.green.map);
            this.drawChartData(ui_1.blueChartId, data.blue.map);
        });
        $$(ui_1.buttonResetId).attachEvent("onItemClick", () => {
            let data = this.getContextData();
            this.updateContextData(data.data, this.firstData);
            this.putContextData(data);
            let info = this.getInfoFromContext(this.getContextData());
            this.drawChartData(ui_1.redChartId, info.red.map);
            this.drawChartData(ui_1.greenChartId, info.green.map);
            this.drawChartData(ui_1.blueChartId, info.blue.map);
        });
        $$(ui_1.buttonRobertsId).attachEvent("onItemClick", () => {
            let data = this.getContextData(), newData = this.runRobertsTransform(data.data);
            this.updateContextData(data.data, newData);
            this.putContextData(data);
            let info = this.getInfoFromContext(this.getContextData());
            this.drawChartData(ui_1.redChartId, info.red.map);
            this.drawChartData(ui_1.greenChartId, info.green.map);
            this.drawChartData(ui_1.blueChartId, info.blue.map);
        });
        $$(ui_1.buttonLogParseId).attachEvent("onItemClick", () => {
            if (!logToolbar.isVisible()) {
                logToolbar.show();
                return;
            }
            let formData = logToolbarForm.getValues(), data = this.getContextData();
            this.logCorrection(data.data, parseFloat(formData.c));
            this.putContextData(data);
            let info = this.getInfoFromContext(this.getContextData());
            this.drawChartData(ui_1.redChartId, info.red.map);
            this.drawChartData(ui_1.greenChartId, info.green.map);
            this.drawChartData(ui_1.blueChartId, info.blue.map);
        });
    }
    updateContextData(data, newData) {
        for (let i = 0, len = data.length; i < len; i += 4) {
            data[i] = newData[i];
            data[i + 1] = newData[i + 1];
            data[i + 2] = newData[i + 2];
            data[i + 3] = newData[i + 3];
        }
    }
    drawChartData(chartId, data) {
        let chart = $$(chartId);
        chart.clearAll();
        chart.parse(this.getChartData(data), "json");
    }
    getChartData(data) {
        let result = [], keys = Object.keys(data);
        for (let i = 0, len = keys.length; i < len; i++) {
            let key = keys[i], item = data[key];
            result.push({
                pixel: parseInt(key),
                value: data[key]
            });
        }
        return result;
    }
    clearCanvas() {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }
    insertImageToCanvas(urlData) {
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
    loadFile(file) {
        if (file instanceof File) {
            return new Promise((resolve, reject) => {
                if (FileReader) {
                    let loader = new FileReader();
                    loader.onload = () => {
                        resolve(loader.result);
                    };
                    loader.onerror = (e) => {
                        reject(e);
                    };
                    loader.readAsDataURL(file);
                }
                else {
                    reject(new Error("The browser doesn't support FileReader"));
                }
            });
        }
        return Promise.reject(new Error("File not found"));
    }
    getChannels(data) {
        let res = { red: [], green: [], blue: [] };
        for (let i = 0, len = data.length; i < len; i += 4) {
            res.red.push(data[i]);
            res.green.push(data[i + 1]);
            res.blue.push(data[i + 2]);
        }
        return res;
    }
    logCorrection(data, c) {
        let getValue = (value, cVal) => cVal * Math.log(1 + value);
        for (let i = 0, len = data.length; i < len; i += 4) {
            data[i] = getValue(data[i], c);
            data[i + 1] = getValue(data[i + 1], c);
            data[i + 2] = getValue(data[i + 2], c);
        }
        return data;
    }
    flatArrayToMatrix(data) {
        let itemsInRow = this.canvas.width * 4, rows = this.canvas.height, yIndex = 0, rowIndex = 0, result = [];
        while (rowIndex < rows) {
            let maxIndex = itemsInRow * rowIndex + itemsInRow, tempArr = [];
            while (yIndex < maxIndex) {
                tempArr.push([data[yIndex], data[yIndex + 1], data[yIndex + 2], data[yIndex + 3]]);
                yIndex += 4;
            }
            result[rowIndex] = tempArr;
            rowIndex++;
        }
        return result;
    }
    runRobertsTransform(data) {
        let arr = this.flatArrayToMatrix(data), result = [], calcNewValue = (xCurr, x1y1, xy1, x1y) => Math.sqrt(Math.pow(xy1 - x1y, 2) + Math.pow(xCurr - x1y1, 2)), culcLayers = (xy, xy1, x1y, x1y1) => {
            for (let i = 0; i < 3; i++) {
                result.push(calcNewValue(xy[i], x1y1[i], xy1[i], x1y[i]));
            }
            result.push(xy[3]);
        }, runCircle = (subArr, nextArr) => {
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
    getContextData() {
        return this.context.getImageData(0, 0, this.canvas.width, this.canvas.height);
    }
    putContextData(data) {
        this.context.putImageData(data, 0, 0);
    }
    getInfoFromContext(imageData) {
        let channels = this.getChannels(imageData.data);
        return {
            red: this.getPixelColorfull(channels.red),
            green: this.getPixelColorfull(channels.green),
            blue: this.getPixelColorfull(channels.blue)
        };
    }
    getPixelColorfull(colorsChannel) {
        let reduceFunc = (result, current) => {
            let value = result.map[current];
            if (value === undefined) {
                result.map[current] = 1;
            }
            else {
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
exports.default = UiLogic;
