(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class DisjointSet {
    constructor(amount) {
        this.elements = [];
        this.elements = [];
        for (let i = 0; i < amount; i++) {
            this.elements[i] = new DisjointItem(i, 0, 1);
        }
    }
    join(x, y) {
        if ((x = this.find(x)) === (y = this.find(y))) {
            return { x, y };
        }
        if (this.elements[x].rank < this.elements[y].rank) {
            this.elements[x].p = y;
        }
        else {
            this.elements[y].p = x;
        }
        if (this.elements[x].rank === this.elements[y].rank) {
            ++this.elements[x].rank;
        }
        return { x, y };
    }
    find(x) {
        if (x === this.elements[x].p) {
            return x;
        }
        this.elements[x].p = this.find(this.elements[x].p);
        return this.elements[x].p;
    }
    size(x) {
        return this.elements[x].size;
    }
}
exports.default = DisjointSet;
class DisjointItem {
    constructor(p, rank = 0, size = 1) {
        this.rank = rank,
            this.size = size;
        this.p = p;
    }
}

},{}],2:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const disjointSet_1 = require("./disjointSet");
class Vector {
    constructor(newSigns) {
        this.cluster = 0;
        this.id = 0;
        this.distanse = 0;
        this.signs = { area: 0, copmactness: 0, elongation: 0, perimeter: 0 };
        this.tempCluster = undefined;
        this.tempDistance = undefined;
        this.signs = newSigns;
    }
    resetTempValues() {
        this.tempCluster = undefined;
        this.tempDistance = undefined;
    }
    saveNewState() {
        if (this.tempCluster !== undefined) {
            this.cluster = this.tempCluster;
        }
        if (this.tempDistance !== undefined) {
            this.distanse = this.tempDistance;
        }
        this.resetTempValues();
    }
}
exports.Vector = Vector;
class ExtraUtils {
    constructor() {
        this.colors = [[255, 102, 102], [157, 226, 79], [255, 189, 86], [135, 206, 250], [177, 91, 222], [255, 165, 0]];
    }
    toGrayscale(data) {
        let result = new Uint8ClampedArray(data.length);
        for (let i = 0, len = data.length; i < len; i += 4) {
            let avg = Math.round((data[i] + data[i + 1] + data[i + 2]) / 3);
            result[i] = avg;
            result[i + 1] = avg;
            result[i + 2] = avg;
            result[i + 3] = 255;
        }
        return result;
    }
    toBlackAndWhite(data, p = 195) {
        let result = [], resultData = [];
        for (let i = 0, len = data.length; i < len; i++) {
            let item = data[i];
            result[i] = [];
            resultData[i] = [];
            for (let j = 0, subLen = item.length; j < subLen; j++) {
                let pixel = data[i][j], k = (pixel[0] + pixel[1] + pixel[2]) / 3, newValue = k > p ? 255 : 0;
                result[i][j] = k > p ? 1 : 0;
                resultData[i][j] = [newValue, newValue, newValue, pixel[3]];
            }
        }
        return {
            data: resultData,
            bitMap: result
        };
    }
    getEmptyArray(rows, cols) {
        let result = [];
        for (let i = 0; i < rows; i++) {
            let temp = [];
            for (let y = 0; y < cols; y++) {
                temp[y] = 0;
            }
            result[i] = temp;
        }
        return result;
    }
    connectedComponents(elements) {
        let unions = new disjointSet_1.default(10000), rows = elements.length, cols = elements[0].length, label = 3, result = this.getEmptyArray(rows, cols);
        for (let x = 1; x < rows; x++) {
            for (let y = 1; y < cols; y++) {
                if (elements[x][y]) {
                    let a = result[x][y], b = result[x - 1][y], c = result[x][y - 1];
                    if (!b && !c) {
                        label += 1;
                        result[x][y] = label;
                    }
                    else if (b && !c) {
                        result[x][y] = result[x - 1][y];
                    }
                    else if (!b && c) {
                        result[x][y] = result[x][y - 1];
                    }
                    else {
                        result[x][y] = (b < c) ? result[x - 1][y] : result[x][y - 1];
                        if (b !== c) {
                            let newValues = unions.join(result[x - 1][y], result[x][y - 1]);
                            result[x - 1][y] = newValues.x;
                            result[x][y - 1] = newValues.y;
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
    getVectors(data) {
        let result = [];
        for (let i = 0, keys = Object.keys(data), len = keys.length; i < len; i++) {
            let key = keys[i], obj = data[key], vector = new Vector({
                area: obj.area,
                copmactness: obj.copmactness,
                elongation: obj.elongation,
                perimeter: obj.perimeter
            });
            vector.id = parseInt(key);
            result.push(vector);
        }
        return result;
    }
    getSigns(data) {
        let result = {}, getObject = (key, dataObj) => {
            if (!dataObj[key]) {
                dataObj[key] = { area: 0, coMX: 0, coMY: 0, copmactness: 0, elongation: 0, m02: 0, m11: 0, m20: 0, perimeter: 0 };
            }
            return dataObj[key];
        }, square = (value) => value * value;
        for (let x = 1, rows = data.length - 1; x < rows; x++) {
            let rowData = data[x], prevRowData = data[x - 1], nextRowData = data[x + 1];
            for (let y = 1, cols = data[0].length; y < cols; y++) {
                let pixel = rowData[y];
                if (pixel) {
                    let obj = getObject(pixel.toString(), result);
                    obj.area++;
                    if (!prevRowData[y] || !rowData[y - 1] || !nextRowData[y] || !rowData[y + 1]) {
                        obj.perimeter++;
                    }
                    obj.coMX += y;
                    obj.coMY += x;
                }
            }
        }
        for (let i = 0, keys = Object.keys(result), len = keys.length; i < len; i++) {
            let obj = result[keys[i]];
            obj.copmactness = square(obj.perimeter / obj.area);
            obj.coMX /= obj.area;
            obj.coMY /= obj.area;
        }
        for (let x = 1, rows = data.length - 1; x < rows; x++) {
            let rowData = data[x];
            for (let y = 1, cols = data[0].length; y < cols; y++) {
                let pixel = rowData[y];
                if (pixel) {
                    let obj = result[pixel.toString()], tmpX = y - obj.coMX, tmpY = x - obj.coMY;
                    obj.m20 += square(tmpX);
                    obj.m02 += square(tmpY);
                    obj.m11 += tmpX * tmpY;
                }
            }
        }
        for (let i = 0, keys = Object.keys(result), len = keys.length; i < len; i++) {
            let obj = result[keys[i]], tmp1 = obj.m20 + obj.m02, temp = obj.m20 - obj.m02 + 4.0 * square(obj.m11), tmp2 = temp >= 0 ? Math.sqrt(temp) : 0;
            obj.elongation = (tmp1 + tmp2) / (tmp1 - tmp2) || 0;
        }
        for (let i = 0, keys = Object.keys(result), len = keys.length; i < len; i++) {
            let key = keys[i], obj = result[key];
            if (obj.area < 10) {
                delete result[key];
            }
        }
        return result;
    }
    kMedoids(objects, length, k, maxStep) {
        let distanceMatrix = this.getDistanceMatrix(objects, length), usedClisters = {}, getUsedClasterId = (clusters) => clusters.map(val => val.id).join("_"), getRandomClusters = (vectors, amount) => {
            let res = [], len = vectors.length, sorted = vectors.slice(0).sort((a, b) => a.signs.area > b.signs.area ? -1 : 1);
            res.push(Math.round(length / 2));
            while (res.length < amount) {
                let i = this.getRandom(Math.round(length * 0.25), Math.round(length * 0.75));
                res.indexOf(i) === -1 && res.push(i);
            }
            return res.map(value => sorted[value]);
        }, updateVectors = (vectors, isNeedToSet) => {
            for (let i = 0, len = vectors.length; i < len; i++) {
                let vector = vectors[i];
                isNeedToSet ? vector.saveNewState() : vector.resetTempValues();
            }
        }, getBiggestCluster = (data, isFindBeggest) => {
            if (data.length === 0) {
                throw new Error("Cluster data shouldn't be an empty array");
            }
            let biggestCluster = data[0], compare = (len1, len2) => len1 > len2 ? isFindBeggest : !isFindBeggest;
            for (let i = 1, len = data.length; i < len; i++) {
                let cluster = data[i];
                if (compare(cluster.vectors.length, biggestCluster.vectors.length)) {
                    biggestCluster = cluster;
                }
            }
            return biggestCluster;
        }, findNewCenters = (data, currCenters, isFindBeggest) => {
            let currentCenters = currCenters.slice(0), biggestCluster = getBiggestCluster(data, isFindBeggest);
            for (let i = 0, len = currentCenters.length; i < len; i++) {
                let currentClusterId = currentCenters[i].id;
                if (currentClusterId !== biggestCluster.clusterId) {
                    continue;
                }
                let vectors = biggestCluster.vectors.slice(0).sort((value1, value2) => value1.distanse > value2.distanse ? 1 : -1), randomCluster = vectors[0], tempCenters = currentCenters.slice(0);
                tempCenters[i] = randomCluster;
                if (randomCluster.id !== currentClusterId && usedClisters[getUsedClasterId(tempCenters)] !== true) {
                    currentCenters[i] = randomCluster;
                    continue;
                }
                for (let j = 1, subLen = vectors.length; j < subLen; j++) {
                    randomCluster = vectors[j];
                    tempCenters[i] = randomCluster;
                    if (randomCluster.id !== currentClusterId && usedClisters[getUsedClasterId(tempCenters)] !== true) {
                        currentCenters[i] = randomCluster;
                        break;
                    }
                }
            }
            return currentCenters;
        }, centers = getRandomClusters(objects, k);
        usedClisters[getUsedClasterId(centers)] = true;
        let stepData = this.findNewClustters(objects, distanceMatrix, centers);
        let minDistance = stepData.totalCost;
        updateVectors(objects, true);
        for (let i = 0; i < maxStep; i++) {
            let tempCenters = findNewCenters(stepData.clusters, centers, true);
            if (usedClisters[getUsedClasterId(tempCenters)] === true) {
                tempCenters = findNewCenters(stepData.clusters, centers, false);
            }
            if (usedClisters[getUsedClasterId(tempCenters)] === true) {
                break;
            }
            usedClisters[getUsedClasterId(tempCenters)] = true;
            let tempData = this.findNewClustters(objects, distanceMatrix, tempCenters);
            if (minDistance > tempData.totalCost) {
                centers = tempCenters;
                stepData = tempData;
                minDistance = stepData.totalCost;
                updateVectors(objects, true);
            }
            else {
                updateVectors(objects, false);
            }
        }
        let centersObject = {};
        let result = {};
        centers.forEach((value, index) => {
            let color = this.colors[index] || this.colors[5];
            centersObject[value.id] = value;
            result[value.id] = [color[0], color[1], color[2], 255];
        });
        let variance = 0.3;
        for (let i = 0; i < length; i++) {
            let vector = objects[i];
            for (let j = 0, keys = Object.keys(vector.signs), len = keys.length; i < len; i++) {
                let key = keys[j], value = vector.signs[key];
                if (value > (1.0 + variance) * centersObject[vector.cluster].signs[key] || value < (1.0 - variance) * centersObject[vector.cluster].signs[key]) {
                    vector.cluster = -1;
                    break;
                }
            }
        }
        return result;
    }
    getRandom(min, max) {
        return Math.floor(Math.random() * (max - min)) + min;
    }
    getDicstance(vec1, vec2) {
        let result = 0.0, vec1Sign = vec1.signs, vec2Sign = vec2.signs, square = (value) => value * value;
        for (let i = 0, keys = Object.keys(vec1Sign), len = keys.length; i < len; i++) {
            let key = keys[i];
            result += square(vec1Sign[key] - vec2Sign[key]);
        }
        return result;
    }
    getDistanceMatrix(objects, length) {
        let result = {};
        for (let i = 0; i < length; i++) {
            for (let j = 0; j < length; j++) {
                let vec1 = objects[i], vec2 = objects[j], keyVec1 = vec1.id, keyVec2 = vec2.id;
                if (!result[keyVec1] || !result[keyVec2] || result[keyVec1][keyVec2] === undefined || result[keyVec2][keyVec1] === undefined) {
                    if (!result[keyVec1]) {
                        result[keyVec1] = {};
                    }
                    if (!result[keyVec2]) {
                        result[keyVec2] = {};
                    }
                    let distance = this.getDicstance(vec1, vec2);
                    if (result[keyVec1][keyVec2] === undefined) {
                        result[keyVec1][keyVec2] = distance;
                    }
                    if (result[keyVec2][keyVec1] === undefined) {
                        result[keyVec2][keyVec1] = distance;
                    }
                }
            }
        }
        return result;
    }
    findNewClustters(objects, distanceMatrix, centers) {
        let result = {
            totalCost: 0,
            clusters: centers.map(vec => ({
                clusterId: vec.id,
                vectors: [],
                totalCost: 0
            }))
        }, getNewCluster = (vector, centerVectors, matrix) => {
            vector.resetTempValues();
            for (let i = 0, len = centerVectors.length; i < len; i++) {
                let centerVector = centerVectors[i], distance = matrix[vector.id][centerVector.id];
                if (vector.tempDistance === undefined || vector.tempDistance > distance) {
                    vector.tempDistance = distance;
                    vector.tempCluster = centerVector.id;
                }
            }
        }, addItemToCluster = (vector, clusters) => {
            if (vector.tempCluster === undefined) {
                throw new Error("Some vector doesn't have tempCluster");
            }
            let clusterId = vector.tempCluster;
            for (let i = 0, len = clusters.length; i < len; i++) {
                let cluster = clusters[i];
                if (cluster.clusterId === clusterId) {
                    cluster.vectors.push(vector);
                    cluster.totalCost += vector.tempDistance || 0;
                    return;
                }
            }
        };
        for (let i = 0, len = objects.length; i < len; i++) {
            getNewCluster(objects[i], centers, distanceMatrix);
        }
        for (let i = 0, len = objects.length; i < len; i++) {
            let vector = objects[i];
            if (vector.tempDistance === undefined || vector.tempCluster === undefined) {
                throw new Error("Some vector doesn't have tempDistance or tempCluster");
            }
            result.totalCost += vector.tempDistance;
            addItemToCluster(vector, result.clusters);
        }
        return result;
    }
}
exports.default = ExtraUtils;

},{"./disjointSet":1}],3:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ui_1 = require("./ui");
const lab2Func_1 = require("./lab2Func");
class UiLogic {
    constructor() {
        let canvas = document.querySelector(`#${ui_1.canvasId}`), context, logToolbar = $$(ui_1.logToolbarId), logToolbarForm = $$(ui_1.logToolbarFormId), extraUtils = new lab2Func_1.default(), resetState = () => {
            if (!this.firstData) {
                return;
            }
            let data = this.getContextData();
            this.updateContextData(data.data, this.firstData);
            this.putContextData(data);
            let info = this.getInfoFromContext(this.getContextData());
            this.drawChartData(ui_1.redChartId, info.red.map);
            this.drawChartData(ui_1.greenChartId, info.green.map);
            this.drawChartData(ui_1.blueChartId, info.blue.map);
        };
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
            resetState();
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
        $$(ui_1.buttonLab2Id).attachEvent("onItemClick", () => {
            if (!this.firstData) {
                webix.message({ type: "error", text: "There is no loaded picture" });
                return;
            }
            resetState();
            let data = this.getContextData(), newData = extraUtils.toGrayscale(data.data);
            this.updateContextData(data.data, newData);
            this.putContextData(data);
            let median = this.gaussFilter(newData);
            this.updateContextData(data.data, this.toFlatArray(median));
            this.putContextData(data);
            let blackWhite = extraUtils.toBlackAndWhite(median, 180);
            this.updateContextData(data.data, this.toFlatArray(blackWhite.data));
            this.putContextData(data);
            let erosion = this.erosion(blackWhite.data);
            this.updateContextData(data.data, this.toFlatArray(erosion));
            this.putContextData(data);
            let dilatation = this.dilatation(erosion);
            this.updateContextData(data.data, this.toFlatArray(dilatation));
            this.putContextData(data);
            let connectedData = extraUtils.connectedComponents(this.toBitMap(dilatation));
            this.updateContextData(data.data, this.toFlatArrayItems(connectedData));
            this.putContextData(data);
            let signs = extraUtils.getSigns(connectedData);
            let vectors = extraUtils.getVectors(signs);
            if (vectors.length < 2) {
                webix.message({ type: "error", text: "Cannot find any vector in the pucture" });
                return;
            }
            let colors = extraUtils.kMedoids(vectors, vectors.length, 2, 150);
            let vectorsObject = {};
            vectors.forEach(vector => {
                vectorsObject[vector.id] = vector;
            });
            let realData = this.flatArrayToMatrix(this.firstData.slice(0));
            for (let i = 0, rows = realData.length; i < rows; i++) {
                for (let j = 0, cols = realData[0].length; j < cols; j++) {
                    let key = connectedData[i][j];
                    if (key && vectorsObject[key] && vectorsObject[key].cluster !== -1) {
                        let color = colors[vectorsObject[key].cluster];
                        realData[i][j] = color;
                    }
                }
            }
            this.updateContextData(data.data, this.toFlatArray(realData));
            this.putContextData(data);
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
    toBitMap(data) {
        let res = [];
        for (let i = 0, len = data.length; i < len; i++) {
            let rowData = data[i], temp = [];
            for (let j = 0, subLen = rowData.length; j < subLen; j++) {
                let pixel = rowData[j];
                temp.push(pixel[0] ? 1 : 0);
            }
            res[i] = temp;
        }
        return res;
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
    toFlatArray(data) {
        let res = [];
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
    toFlatArrayItems(data) {
        let res = [];
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
    getPixelsAround(data, i, j, size) {
        let currentRow = data[i], prevJ = j - 1, nextJ = j + 1, nextRow = data[i + 1], prevRow = data[i - 1], current = currentRow[j], left = currentRow[prevJ], right = currentRow[nextJ], isNotUndefined = (value) => value !== undefined, isHasInTop = isNotUndefined(prevRow), isHasInBottom = isNotUndefined(nextRow), top = isHasInTop ? prevRow[j] : undefined, bottom = isHasInBottom ? nextRow[j] : undefined, getValue = (value, reserve) => value === undefined ? reserve : value;
        left = getValue(left, current);
        right = getValue(right, current);
        top = getValue(top, current);
        bottom = getValue(bottom, current);
        let topLeft = isHasInTop ? getValue(prevRow[prevJ], top) : left, topRight = isHasInTop ? getValue(prevRow[nextJ], top) : right, bottomLeft = isHasInBottom ? getValue(nextRow[prevJ], bottom) : left, bottomRight = isHasInBottom ? getValue(nextRow[nextJ], bottom) : right;
        if (size === "3") {
            return [
                [topLeft, top, topRight],
                [left, current, right],
                [bottomLeft, bottom, bottomRight]
            ];
        }
        else {
            let nextNextRow = isHasInBottom ? data[i + 2] || nextRow : currentRow, prevPrevRow = isHasInTop ? data[i - 2] || prevRow : currentRow, prevPrevJ = j - 2, nextNextJ = j + 2;
            prevRow = isHasInTop ? prevRow : currentRow;
            nextRow = isHasInBottom ? nextRow : currentRow;
            return [
                [getValue(prevPrevRow[prevPrevJ], topLeft), getValue(prevPrevRow[prevJ], topLeft), getValue(prevPrevRow[j], top), getValue(prevPrevRow[nextJ], topRight), getValue(prevPrevRow[nextNextJ], topRight)],
                [getValue(prevRow[prevPrevJ], topLeft), topLeft, top, topRight, getValue(prevRow[nextNextJ], topRight)],
                [getValue(currentRow[prevPrevJ], left), left, current, right, getValue(currentRow[nextNextJ], right)],
                [getValue(nextRow[prevPrevJ], bottomLeft), bottomLeft, bottom, bottomRight, getValue(nextRow[nextNextJ], bottomRight)],
                [getValue(nextNextRow[prevPrevJ], bottomLeft), getValue(nextNextRow[prevJ], bottomLeft), getValue(nextNextRow[j], bottom), getValue(nextNextRow[nextJ], bottomRight), getValue(nextNextRow[nextNextJ], bottomRight)]
            ];
        }
    }
    calcMedium(pixels) {
        let red = [], green = [], blue = [];
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
        let determinate = Math.round(red.length / 2) - 1;
        return [red[determinate], green[determinate], blue[determinate]];
    }
    getNewPixel(matrix, pixels, isCommutative) {
        let rows = pixels.length, cols = pixels[0].length;
        if (rows !== matrix.length || cols !== matrix[0].length) {
            throw new Error("An array and matrix should have equal sizes");
        }
        for (let i = 0, len = pixels.length; i < len; i++) {
            let row = pixels[i];
            for (let j = 0, subLen = row.length; j < subLen; j++) {
                let pixel = row[j], matrixValue = matrix[i][j];
                if (isCommutative) {
                    if (pixel[0] * matrixValue > 0 || pixel[1] * matrixValue > 0 || pixel[2] * matrixValue > 0) {
                        return [255, 255, 255, 255];
                    }
                }
                else {
                    if (pixel[0] * matrixValue === 0 || pixel[1] * matrixValue === 0 || pixel[2] * matrixValue === 0) {
                        return [0, 0, 0, 255];
                    }
                }
            }
        }
        return isCommutative ? [0, 0, 0, 255] : [255, 255, 255, 255];
    }
    erosion(arr) {
        let result = [], matrix = [
            [1, 1, 1, 1, 1],
            [1, 1, 1, 1, 1],
            [1, 1, 1, 1, 1],
            [1, 1, 1, 1, 1],
            [1, 1, 1, 1, 1]
        ];
        for (let i = 0, len = arr.length; i < len; i++) {
            let item = arr[i], rowItems = [];
            for (let j = 0, subLen = item.length; j < subLen; j++) {
                let pixel = item[j], newPixel = this.getNewPixel(matrix, this.getPixelsAround(arr, i, j, "5"), false);
                rowItems.push([newPixel[0], newPixel[1], newPixel[2], pixel[3]]);
            }
            result[i] = rowItems;
        }
        return result;
    }
    dilatation(arr) {
        let result = [], matrix = [
            [1, 1, 1, 1, 1],
            [1, 1, 1, 1, 1],
            [1, 1, 1, 1, 1],
            [1, 1, 1, 1, 1],
            [1, 1, 1, 1, 1]
        ];
        for (let i = 0, len = arr.length; i < len; i++) {
            let item = arr[i], rowItems = [];
            for (let j = 0, subLen = item.length; j < subLen; j++) {
                let pixel = item[j], newPixel = this.getNewPixel(matrix, this.getPixelsAround(arr, i, j, "5"), true);
                rowItems.push([newPixel[0], newPixel[1], newPixel[2], pixel[3]]);
            }
            result[i] = rowItems;
        }
        return result;
    }
    gaussFilter(data) {
        let arr = this.flatArrayToMatrix(data), result = [], matrix = [
            [0.000789, 0.006581, 0.013347, 0.006581, 0.000789],
            [0.006581, 0.054901, 0.111345, 0.054901, 0.006581],
            [0.013347, 0.111345, 0.225821, 0.111345, 0.013347],
            [0.006581, 0.054901, 0.111345, 0.054901, 0.006581],
            [0.000789, 0.006581, 0.013347, 0.006581, 0.000789]
        ];
        for (let i = 0, len = arr.length; i < len; i++) {
            let item = arr[i], rowItems = [];
            for (let j = 0, subLen = item.length; j < subLen; j++) {
                let pixel = item[j], newPixel = this.applyMatrix(this.getPixelsAround(arr, i, j, "5"), matrix);
                rowItems.push([newPixel[0], newPixel[1], newPixel[2], pixel[3]]);
            }
            result[i] = rowItems;
        }
        return result;
    }
    applyMatrix(pixels, matrix) {
        let rows = pixels.length, cols = pixels[0].length;
        if (rows !== matrix.length || cols !== matrix[0].length) {
            throw new Error("An array and matrix should have equal sizes");
        }
        let red = 0, green = 0, blue = 0;
        for (let i = 0, len = pixels.length; i < len; i++) {
            let row = pixels[i];
            for (let j = 0, subLen = row.length; j < subLen; j++) {
                let pixel = row[j], matrixValue = matrix[i][j];
                red += pixel[0] * matrixValue;
                green += pixel[1] * matrixValue;
                blue += pixel[2] * matrixValue;
            }
        }
        red = red > 255 ? 255 : red < 0 ? 0 : red;
        green = green > 255 ? 255 : green < 0 ? 0 : green;
        red = blue > 255 ? 255 : blue < 0 ? 0 : blue;
        return [Math.round(red), Math.round(green), Math.round(blue), 255];
    }
    medianFilter(data) {
        let arr = this.flatArrayToMatrix(data), result = [];
        for (let i = 0, len = arr.length; i < len; i++) {
            let item = arr[i], rowItems = [];
            for (let j = 0, subLen = item.length; j < subLen; j++) {
                let pixel = item[j], mediumValue = this.calcMedium(this.getPixelsAround(arr, i, j, "3"));
                rowItems.push([mediumValue[0], mediumValue[1], mediumValue[2], pixel[3]]);
            }
            result[i] = rowItems;
        }
        return result;
    }
}
exports.default = UiLogic;

},{"./lab2Func":2,"./ui":4}],4:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const uiItems_1 = require("../mod/lab2/uiItems");
let uploaderId = "imageUploader", canvasTemplate = (canvasID) => {
    return `<div style="text-align: center;width: 100%; height: 100%; overflow-y: auto;">
            <canvas id="${canvasID}" width="1000" height="500"></canvas>
        </div>`;
}, canvasId = "canvasImage1", buttonId = "buttonId", buttonLogParseId = "buttonLogParseId", buttonRobertsId = "buttonRobertsId", buttonLab2Id = "buttonLab2Id", buttonResetId = "buttonResetId", redChartId = "redChart", logToolbarId = "logToolbarId", logToolbarFormId = "logToolbarFormId", greenChartId = "greenChart", blueChartId = "blueChart", ui = {
    id: "lab5",
    type: "space",
    rows: [
        {
            type: "toolbar",
            height: 50,
            cols: [
                { template: "Functions", type: "header", width: 100, borderless: true },
                {
                    view: "uploader",
                    value: "Load file",
                    id: uploaderId,
                    width: 100,
                    autosend: false,
                    multiple: false
                },
                {
                    view: "button",
                    width: 100,
                    id: buttonId,
                    value: "Parse picture"
                },
                {
                    view: "button",
                    width: 100,
                    id: buttonLogParseId,
                    value: "Log func"
                },
                {
                    view: "button",
                    width: 100,
                    id: buttonRobertsId,
                    value: "Rebert's func"
                },
                {
                    view: "button",
                    width: 100,
                    id: buttonLab2Id,
                    value: "Lab 2"
                },
                {},
                {
                    view: "button",
                    width: 100,
                    id: buttonResetId,
                    value: "Reset"
                }
            ]
        },
        {
            id: logToolbarId,
            type: "toolbar",
            hidden: true,
            cols: [
                uiItems_1.getForm(logToolbarFormId, [
                    uiItems_1.getTextField("c", "C:", "15")
                ]),
                {},
                {
                    view: "button",
                    width: 100,
                    value: "Close",
                    click: function () {
                        $$(logToolbarId).hide();
                    }
                }
            ]
        },
        {
            rows: [
                {
                    view: "scrollview",
                    height: 1000,
                    scroll: "auto",
                    type: "space",
                    body: {
                        type: "space",
                        rows: [
                            {
                                view: "scrollview",
                                height: 600,
                                scroll: true,
                                body: {
                                    template: canvasTemplate(canvasId)
                                }
                            },
                            { type: "header", template: "Charts", height: 50 },
                            {
                                type: "space",
                                height: 250,
                                align: "center",
                                cols: [
                                    {
                                        id: redChartId,
                                        view: "chart",
                                        type: "bar",
                                        css: "bg_panel",
                                        border: false,
                                        value: "#value#",
                                        color: "red",
                                        width: 300,
                                        xAxis: {
                                            lines: function (value) {
                                                return value.pixel % 32 === 0;
                                            },
                                            template: function (value) {
                                                return value.pixel % 32 === 0 ? value.pixel : "";
                                            }
                                        }
                                    },
                                    {
                                        id: greenChartId,
                                        view: "chart",
                                        type: "bar",
                                        css: "bg_panel",
                                        value: "#value#",
                                        border: false,
                                        color: "green",
                                        width: 300,
                                        xAxis: {
                                            lines: function (value) {
                                                return value.pixel % 32 === 0;
                                            },
                                            template: function (value) {
                                                return value.pixel % 32 === 0 ? value.pixel : "";
                                            }
                                        }
                                    },
                                    {
                                        id: blueChartId,
                                        view: "chart",
                                        type: "bar",
                                        border: false,
                                        css: "bg_panel",
                                        value: "#value#",
                                        color: "blue",
                                        width: 300,
                                        xAxis: {
                                            lines: function (value) {
                                                return value.pixel % 32 === 0;
                                            },
                                            template: function (value) {
                                                return value.pixel % 32 === 0 ? value.pixel : "";
                                            }
                                        }
                                    }
                                ]
                            }
                        ]
                    }
                }
            ]
        }
    ]
};
exports.uploaderId = uploaderId;
exports.canvasId = canvasId;
exports.buttonId = buttonId;
exports.buttonLogParseId = buttonLogParseId;
exports.buttonRobertsId = buttonRobertsId;
exports.buttonLab2Id = buttonLab2Id;
exports.buttonResetId = buttonResetId;
exports.redChartId = redChartId;
exports.logToolbarId = logToolbarId;
exports.logToolbarFormId = logToolbarFormId;
exports.greenChartId = greenChartId;
exports.blueChartId = blueChartId;
exports.ui = ui;

},{"../mod/lab2/uiItems":16}],5:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class NetworkUtils {
    constructor() {
        this.lower = -1;
        this.upper = 1;
    }
    learnNetwork(images, size) {
        let result = [], flattenImages = images.map(image => this.toFlattenArray(image));
        for (let i = 0; i < size; i++) {
            for (let j = 0; j < i; j++) {
                let calcValue = flattenImages.reduce((prev, image) => prev + parseFloat((image[i] * image[j]).toString()), 0.0);
                if (!result[i]) {
                    result[i] = [];
                }
                if (!result[j]) {
                    result[j] = [];
                }
                result[i][j] = calcValue;
                result[j][i] = calcValue;
            }
        }
        return result;
    }
    toFlattenArray(array) {
        let res = [];
        for (let i = 0, len = array.length; i < len; i++) {
            res = res.concat(array[i]);
        }
        return res;
    }
    fromFlattenArray(array, step = 10) {
        let result = [];
        for (let i = 0, len = array.length, increment = len / step; i < len; i += increment) {
            result.push(array.slice(i, i + increment));
        }
        if (result.length !== 10 || result[0].length !== 10) {
            debugger;
            throw new Error("Error when convert flatten array");
        }
        return result;
    }
    recognize(image, weightMatrix) {
        let isDoSearch = true, flattenImage = this.toFlattenArray(image);
        while (isDoSearch) {
            isDoSearch = this.step(flattenImage, weightMatrix);
        }
        return this.fromFlattenArray(flattenImage);
    }
    step(flattenImage, matrix) {
        let isChanged = false;
        for (let i = 0, len = flattenImage.length; i < len; i++) {
            let oldValue = flattenImage[i];
            let newValue = this.calculate(flattenImage, matrix[i]);
            flattenImage[i] = newValue;
            isChanged = newValue !== oldValue || isChanged;
        }
        return isChanged;
    }
    calculate(flattenArray, matrixRow) {
        let reduceFunc = (prev, current, index) => {
            let matrixValue = matrixRow[index] || 0;
            return prev + current * matrixValue;
        }, val = flattenArray.reduce(reduceFunc, 0.0);
        return val > 0 ? this.upper : this.lower;
    }
    getNoise(image, percentage = 10, step = 10) {
        let picture = this.toFlattenArray(image), indexes = [];
        if (percentage === 100) {
            for (let i = 0, len = picture.length; i < len; i++) {
                indexes.push(i);
            }
        }
        else {
            let len = picture.length, count = Math.round(picture.length * percentage / 100), getRandom = (min, max) => Math.floor(Math.random() * (max - min)) + min;
            while (indexes.length !== count) {
                let newIndex = getRandom(0, len);
                if (indexes.indexOf(newIndex) === -1) {
                    indexes.push(newIndex);
                }
            }
        }
        for (let i = 0, len = indexes.length; i < len; i++) {
            let index = indexes[i], pictureValue = picture[index];
            picture[index] = pictureValue === -1 ? 1 : -1;
        }
        return this.fromFlattenArray(picture, step);
    }
}
exports.default = NetworkUtils;

},{}],6:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
let itemSize = 15, count = 10, height = count * itemSize, width = height, svgNamespace = "http://www.w3.org/2000/svg", createElement = (tagName, appendTo, props, cssObj) => {
    let el = document.createElementNS(svgNamespace, tagName);
    props !== undefined && setAttributes(el, props);
    cssObj !== undefined && css(el, cssObj);
    appendTo !== undefined && appendTo.appendChild(el);
    return el;
}, setAttributes = (element, props) => {
    for (let i = 0, keys = Object.keys(props), len = keys.length; i < len; i++) {
        element.setAttribute(keys[i], props[keys[i]]);
    }
}, css = (element, cssObj) => {
    for (let i = 0, keys = Object.keys(cssObj), len = keys.length; i < len; i++) {
        element.style[keys[i]] = cssObj[keys[i]];
    }
};
class Checkmate {
    constructor() {
        this.elements = [];
        this.container = this.createSvg();
        for (let i = 0; i < count; i++) {
            let x = i * itemSize, items = [];
            for (let j = 0; j < count; j++) {
                items.push(new Rect(j * itemSize, x, itemSize, this.container));
            }
            this.elements[i] = items;
        }
    }
    updateValues(values) {
        for (let i = 0; i < count; i++) {
            for (let j = 0; j < count; j++) {
                this.elements[i][j].value = values[i][j];
            }
        }
    }
    getValues() {
        let result = [];
        for (let i = 0; i < count; i++) {
            let items = [];
            for (let j = 0; j < count; j++) {
                items[j] = this.elements[i][j].value;
            }
            result[i] = items;
        }
        return result;
    }
    createSvg() {
        let svg = document.createElementNS(svgNamespace, "svg");
        svg.style.webkitTransform = "translateZ(0)";
        svg.style.pointerEvents = "all";
        svg.style.overflow = "hidden";
        svg.style.transformOrigin = "0px 0px 0px";
        svg.setAttributeNS(svgNamespace, "width", `${width}`);
        svg.setAttributeNS(svgNamespace, "height", `${height}`);
        return svg;
    }
}
exports.default = Checkmate;
class Rect {
    constructor(x, y, size, parent) {
        this.state = 1;
        this.container = createElement("rect", parent, {
            x: x,
            y: y,
            width: size,
            height: size,
            fill: "white"
        });
    }
    set value(newValue) {
        this.state = newValue;
        setAttributes(this.container, {
            fill: this.state === -1 ? "black" : "white"
        });
    }
    get value() {
        return this.state;
    }
}
class SvgRow {
    constructor(persent) {
        this.container = document.createElement("div");
        this.container.classList.add("rowItem");
        let containerNumber = document.createElement("div");
        containerNumber.classList.add("rowItemValue");
        containerNumber.textContent = `Persent: ${persent.toString()}`;
        this.container.appendChild(containerNumber);
        this.firstSvg = new Checkmate();
        this.secondSVG = new Checkmate();
        this.container.appendChild(this.firstSvg.container);
        this.container.appendChild(this.secondSVG.container);
    }
    updateRow(firstImage, secondImage) {
        this.firstSvg.updateValues(firstImage);
        this.secondSVG.updateValues(secondImage);
    }
}
exports.SvgRow = SvgRow;

},{}],7:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const uiItems_1 = require("../mod/lab2/uiItems");
const svgElement_1 = require("./svgElement");
const network_1 = require("./network");
let runButtonId = "lab6RunButton", containerId = "lab6COntainerId", ui = {
    id: "lab6",
    type: "space",
    rows: [
        {
            type: "toolbar",
            height: 50,
            cols: [
                uiItems_1.getButton(runButtonId)
            ]
        },
        {
            rows: [
                {
                    view: "scrollview",
                    height: 1000,
                    scroll: "auto",
                    type: "space",
                    body: {
                        type: "space",
                        template: `<div id="${containerId}" style="width: 100%; height: 100%; overflow-y: auto;"></div>`
                    }
                }
            ]
        }
    ]
}, t = [
    [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
    [-1, -1, 1, 1, 1, 1, 1, 1, -1, -1],
    [-1, -1, 1, 1, 1, 1, 1, 1, -1, -1],
    [-1, -1, -1, -1, 1, 1, -1, -1, -1, -1],
    [-1, -1, -1, -1, 1, 1, -1, -1, -1, -1],
    [-1, -1, -1, -1, 1, 1, -1, -1, -1, -1],
    [-1, -1, -1, -1, 1, 1, -1, -1, -1, -1],
    [-1, -1, -1, -1, 1, 1, -1, -1, -1, -1],
    [-1, -1, -1, -1, 1, 1, -1, -1, -1, -1],
    [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1]
], b = [
    [-1, -1, 1, 1, 1, 1, 1, -1, -1, -1],
    [-1, -1, 1, 1, 1, 1, 1, 1, -1, -1],
    [-1, -1, 1, 1, -1, -1, 1, 1, -1, -1],
    [-1, -1, 1, 1, -1, -1, 1, 1, -1, -1],
    [-1, -1, 1, 1, 1, 1, 1, -1, -1, -1],
    [-1, -1, 1, 1, 1, 1, 1, -1, -1, -1],
    [-1, -1, 1, 1, -1, -1, 1, 1, -1, -1],
    [-1, -1, 1, 1, -1, -1, 1, 1, -1, -1],
    [-1, -1, 1, 1, 1, 1, 1, 1, -1, -1],
    [-1, -1, 1, 1, 1, 1, 1, -1, -1, -1]
], l = [
    [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
    [-1, -1, 1, 1, 1, 1, 1, 1, -1, -1],
    [-1, -1, 1, 1, 1, 1, 1, 1, -1, -1],
    [-1, -1, 1, 1, -1, -1, 1, 1, -1, -1],
    [-1, -1, 1, 1, -1, -1, 1, 1, -1, -1],
    [-1, -1, 1, 1, -1, -1, 1, 1, -1, -1],
    [-1, -1, 1, 1, -1, -1, 1, 1, -1, -1],
    [-1, 1, 1, 1, -1, -1, 1, 1, -1, -1],
    [-1, 1, 1, 1, -1, -1, 1, 1, -1, -1],
    [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1]
], initLab6 = () => {
    let container = document.querySelector(`#${containerId}`), runButton = $$(runButtonId), network = new network_1.default(), clearRowItems = () => {
        let elements = container.querySelectorAll(`.rowItem`);
        for (let len = elements.length - 1, i = len; i >= 0; i--) {
            container.removeChild(elements[i]);
        }
    }, weights;
    runButton.attachEvent("onItemClick", () => {
        clearRowItems();
        weights = weights || network.learnNetwork([t, b, l], 100);
        let images = [t, b, l], percentage = [10, 20, 30, 35, 40, 45, 50, 55, 60, 65, 70, 80, 90, 100];
        for (let i = 0; i < 3; i++) {
            let image = images[i];
            for (let k = 0, len = percentage.length; k < len; k++) {
                let persent = percentage[k], noise = network.getNoise(image, persent, 10), foundImage = network.recognize(noise, weights), rowItem = new svgElement_1.SvgRow(persent);
                rowItem.updateRow(noise, foundImage);
                container.appendChild(rowItem.container);
            }
        }
    });
    let testSVG = new svgElement_1.default();
    container.appendChild(testSVG.container);
    testSVG.updateValues(t);
    let testSVG1 = new svgElement_1.default();
    container.appendChild(testSVG1.container);
    testSVG1.updateValues(b);
    let testSVG2 = new svgElement_1.default();
    container.appendChild(testSVG2.container);
    testSVG2.updateValues(l);
};
exports.ui = ui;
exports.initLab6 = initLab6;

},{"../mod/lab2/uiItems":16,"./network":5,"./svgElement":6}],8:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const uiItems_1 = require("../mod/lab2/uiItems");
let runButtonId = "lab7RunButton", containerId = "lab7COntainerId", lab7COntainer1Id = "lab7COntainer1Id", lab7FormId = "lab7FormId", ui = {
    id: "lab7",
    type: "space",
    rows: [
        {
            type: "toolbar",
            height: 50,
            cols: [
                uiItems_1.getButton(runButtonId),
                uiItems_1.getForm(lab7FormId, [
                    uiItems_1.getTextField("error", "Error:", 0.001)
                ])
            ]
        },
        {
            template: `<div id="${lab7COntainer1Id}" style="width: 100%; height: 100%; overflow-y: auto;"></div>`
        },
        {
            rows: [
                {
                    view: "scrollview",
                    height: 1000,
                    scroll: "auto",
                    type: "space",
                    body: {
                        type: "space",
                        template: `<div id="${containerId}" style="width: 100%; height: 100%; overflow-y: auto;"></div>`
                    }
                }
            ]
        }
    ]
}, initLab7 = () => {
    let container = document.querySelector(`#${containerId}`), container1 = document.querySelector(`#${lab7COntainer1Id}`), runButton = $$(runButtonId), form = $$(lab7FormId);
    runButton.attachEvent("onItemClick", () => {
    });
};
exports.ui = ui;
exports.initLab7 = initLab7;

},{"../mod/lab2/uiItems":16}],9:[function(require,module,exports){
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
}
exports.default = DataWorker;

},{}],10:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const uiItems_1 = require("./uiItems");
const modTest_1 = require("../modTest");
let defaultData = {
    alpha: 10,
    count: 10000
}, exponentialRunButtonId = "exponentialRunID", exponentialFormId = "exponentialFormId", exponentialOutPutFormId = "exponentialOutputFromId", exponentialChartId = "exponentialChartId", exponentialUi = {
    type: "space",
    rows: [
        {
            type: "toolbar",
            css: "bg_panel",
            cols: [
                uiItems_1.getButton(exponentialRunButtonId),
                uiItems_1.getForm(exponentialFormId, [
                    uiItems_1.getTextField("alpha", "Alpha:", defaultData.alpha),
                    uiItems_1.getTextField("count", "Count:", defaultData.count)
                ]),
                {}
            ]
        },
        uiItems_1.getForm(exponentialOutPutFormId, [
            uiItems_1.getTextField("mX", "Mx:"),
            uiItems_1.getTextField("dX", "Dx:")
        ], true),
        uiItems_1.getChart(exponentialChartId),
        {}
    ]
}, initFunction = () => {
    let form = $$(exponentialFormId), formOutput = $$(exponentialOutPutFormId), chart = $$(exponentialChartId), utils = new modTest_1.default();
    $$(exponentialRunButtonId).attachEvent("onItemClick", function () {
        let data = form.getValues(), results = utils.exponentialDistribution(parseFloat(data.alpha), parseInt(data.count)), mX = utils.getMx(results), dX = utils.getDx(results, mX), chartData = utils.getChartData(results);
        formOutput.setValues({ mX, dX });
        chart.show();
        chart.clearAll();
        chart.parse(chartData, "json");
    });
};
exports.exponentialUi = exponentialUi;
exports.initFunction = initFunction;

},{"../modTest":21,"./uiItems":16}],11:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const uiItems_1 = require("./uiItems");
const modTest_1 = require("../modTest");
let defaultData = {
    alpha: 2.5,
    ny: 18,
    count: 10000
}, gammaRunButtonId = "gammaRunID", gammaFormId = "gammaFormId", gammaOutPutFormId = "gammaOutputFromId", gammaChartId = "gammaChartId", gammaUi = {
    type: "space",
    rows: [
        {
            type: "toolbar",
            css: "bg_panel",
            cols: [
                uiItems_1.getButton(gammaRunButtonId),
                uiItems_1.getForm(gammaFormId, [
                    uiItems_1.getTextField("alpha", "Alpha:", defaultData.alpha),
                    uiItems_1.getTextField("ny", "Ny:", defaultData.ny),
                    uiItems_1.getTextField("count", "Count:", defaultData.count)
                ]),
                {}
            ]
        },
        uiItems_1.getForm(gammaOutPutFormId, [
            uiItems_1.getTextField("mX", "Mx:"),
            uiItems_1.getTextField("dX", "Dx:")
        ], true),
        uiItems_1.getChart(gammaChartId),
        {}
    ]
}, initFunction = () => {
    let form = $$(gammaFormId), formOutput = $$(gammaOutPutFormId), chart = $$(gammaChartId), utils = new modTest_1.default();
    $$(gammaRunButtonId).attachEvent("onItemClick", function () {
        let data = form.getValues(), results = utils.gammaDistribution(parseInt(data.alpha), parseInt(data.ny), parseInt(data.count)), mX = utils.getMx(results), dX = utils.getDx(results, mX), chartData = utils.getChartData(results);
        formOutput.setValues({ mX, dX });
        chart.show();
        chart.clearAll();
        chart.parse(chartData, "json");
    });
};
exports.gammaUi = gammaUi;
exports.initFunction = initFunction;

},{"../modTest":21,"./uiItems":16}],12:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const uiItems_1 = require("./uiItems");
const modTest_1 = require("../modTest");
let defaultData = {
    m: 5,
    a: 10,
    n: 6,
    count: 10000
}, gaussRunButtonId = "gaussRunID", gaussFormId = "gaussFormId", gaussOutPutFormId = "gaussOutputFromId", gaussChartId = "gaussChartId", gaussUi = {
    type: "space",
    rows: [
        {
            type: "toolbar",
            css: "bg_panel",
            cols: [
                uiItems_1.getButton(gaussRunButtonId),
                uiItems_1.getForm(gaussFormId, [
                    uiItems_1.getTextField("m", "M:", defaultData.m),
                    uiItems_1.getTextField("a", "A:", defaultData.a),
                    uiItems_1.getTextField("n", "N:", defaultData.n),
                    uiItems_1.getTextField("count", "Count:", defaultData.count)
                ]),
                {}
            ]
        },
        uiItems_1.getForm(gaussOutPutFormId, [
            uiItems_1.getTextField("mX", "Mx:"),
            uiItems_1.getTextField("dX", "Dx:")
        ], true),
        uiItems_1.getChart(gaussChartId),
        {}
    ]
}, initFunction = () => {
    let form = $$(gaussFormId), formOutput = $$(gaussOutPutFormId), chart = $$(gaussChartId), utils = new modTest_1.default();
    $$(gaussRunButtonId).attachEvent("onItemClick", function () {
        let data = form.getValues(), results = utils.gaussDistribution(parseInt(data.m), parseInt(data.a), parseInt(data.count), parseInt(data.n)), mX = utils.getMx(results), dX = utils.getDx(results, mX), chartData = utils.getChartData(results);
        formOutput.setValues({ mX, dX });
        chart.show();
        chart.clearAll();
        chart.parse(chartData, "json");
    });
};
exports.gaussUi = gaussUi;
exports.initFunction = initFunction;

},{"../modTest":21,"./uiItems":16}],13:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const uniformUi_1 = require("./uniformUi");
const gaussUi_1 = require("./gaussUi");
const exponentialUi_1 = require("./exponentialUi");
const triangleUi_1 = require("./triangleUi");
const gammaUi_1 = require("./gammaUi");
const simpsonUi_1 = require("./simpsonUi");
let distributionListId = "distributionListId", ui = {
    view: "tabview",
    cells: [
        {
            header: "Uniform",
            body: uniformUi_1.uniformUi
        },
        {
            header: "Gauss",
            body: gaussUi_1.gaussUi
        },
        {
            header: "Exponential",
            body: exponentialUi_1.exponentialUi
        },
        {
            header: "Gamma",
            body: gammaUi_1.gammaUi
        },
        {
            header: "Triangle",
            body: triangleUi_1.triangleUi
        },
        {
            header: "Simpson",
            body: simpsonUi_1.simpsonUi
        }
    ]
};
exports.distributionListId = distributionListId;
exports.ui = ui;

},{"./exponentialUi":10,"./gammaUi":11,"./gaussUi":12,"./simpsonUi":14,"./triangleUi":15,"./uniformUi":17}],14:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const uiItems_1 = require("./uiItems");
const modTest_1 = require("../modTest");
let defaultData = {
    a: 18,
    b: 30,
    count: 10000
}, simpsonRunButtonId = "simpsonRunID", simpsonFormId = "simpsonFormId", simpsonOutPutFormId = "simpsonOutputFromId", simpsonChartId = "simpsonChartId", simpsonUi = {
    type: "space",
    rows: [
        {
            type: "toolbar",
            css: "bg_panel",
            cols: [
                uiItems_1.getButton(simpsonRunButtonId),
                uiItems_1.getForm(simpsonFormId, [
                    uiItems_1.getTextField("a", "A:", defaultData.a),
                    uiItems_1.getTextField("b", "B:", defaultData.b),
                    uiItems_1.getTextField("count", "Count:", defaultData.count)
                ]),
                {}
            ]
        },
        uiItems_1.getForm(simpsonOutPutFormId, [
            uiItems_1.getTextField("mX", "Mx:"),
            uiItems_1.getTextField("dX", "Dx:")
        ], true),
        uiItems_1.getChart(simpsonChartId),
        {}
    ]
}, initFunction = () => {
    let form = $$(simpsonFormId), formOutput = $$(simpsonOutPutFormId), chart = $$(simpsonChartId), utils = new modTest_1.default();
    $$(simpsonRunButtonId).attachEvent("onItemClick", function () {
        let data = form.getValues(), results = utils.simpsonDistribution(parseInt(data.a), parseInt(data.b), parseInt(data.count)), mX = utils.getMx(results), dX = utils.getDx(results, mX), chartData = utils.getChartData(results);
        formOutput.setValues({ mX, dX });
        chart.show();
        chart.clearAll();
        chart.parse(chartData, "json");
    });
};
exports.simpsonUi = simpsonUi;
exports.initFunction = initFunction;

},{"../modTest":21,"./uiItems":16}],15:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const uiItems_1 = require("./uiItems");
const modTest_1 = require("../modTest");
let defaultData = {
    a: 2.5,
    b: 18,
    count: 10000
}, triangleRunButtonId = "triangleRunID", triangleFormId = "triangleFormId", triangleOutPutFormId = "triangleOutputFromId", triangleChartId = "triangleChartId", triangleUi = {
    type: "space",
    rows: [
        {
            type: "toolbar",
            css: "bg_panel",
            cols: [
                uiItems_1.getButton(triangleRunButtonId),
                uiItems_1.getForm(triangleFormId, [
                    uiItems_1.getTextField("a", "A:", defaultData.a),
                    uiItems_1.getTextField("b", "B:", defaultData.b),
                    uiItems_1.getTextField("count", "Count:", defaultData.count)
                ]),
                {}
            ]
        },
        uiItems_1.getForm(triangleOutPutFormId, [
            uiItems_1.getTextField("mX", "Mx:"),
            uiItems_1.getTextField("dX", "Dx:")
        ], true),
        uiItems_1.getChart(triangleChartId),
        {}
    ]
}, initFunction = () => {
    let form = $$(triangleFormId), formOutput = $$(triangleOutPutFormId), chart = $$(triangleChartId), utils = new modTest_1.default();
    $$(triangleRunButtonId).attachEvent("onItemClick", function () {
        let data = form.getValues(), results = utils.triangleDistribution(parseInt(data.a), parseInt(data.b), parseInt(data.count)), mX = utils.getMx(results), dX = utils.getDx(results, mX), chartData = utils.getChartData(results);
        formOutput.setValues({ mX, dX });
        chart.show();
        chart.clearAll();
        chart.parse(chartData, "json");
    });
};
exports.triangleUi = triangleUi;
exports.initFunction = initFunction;

},{"../modTest":21,"./uiItems":16}],16:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
let getButton = (buttonId) => ({
    view: "button",
    css: "button_primary button_raised",
    id: buttonId,
    width: 100,
    value: "Run"
}), getTextField = (name, label, value = "") => ({
    view: "text",
    value: value,
    height: 50,
    name: name,
    label: label,
    labelAlign: "left"
}), getForm = (id, items, isDisabled = false) => ({
    view: "form",
    disabled: isDisabled,
    id: id,
    height: 50,
    gravity: 1.3,
    cols: items
}), getChart = (id) => ({
    view: "chart",
    css: "bg_panel",
    id: id,
    type: "bar",
    label: function (value) {
        return parseFloat(value.y).toFixed(4);
    },
    value: "#y#",
    barWidth: 35,
    radius: 0,
    gradient: "falling",
    xAxis: {
        template: function (data) {
            return parseFloat(data.x).toFixed(4);
        }
    },
    yAxis: {
        template: function (data) {
            return data;
        }
    }
});
exports.getButton = getButton;
exports.getTextField = getTextField;
exports.getForm = getForm;
exports.getChart = getChart;

},{}],17:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const uiItems_1 = require("./uiItems");
const modTest_1 = require("../modTest");
let defaultData = {
    a: 5,
    b: 10,
    n: 1000
}, uniformRunButtonId = "uniformRunID", uniformFormId = "uniformFormId", uniformOutPutFormId = "uniformOutputFromId", uniformChartId = "uniformChartId", uniformUi = {
    type: "space",
    rows: [
        {
            type: "toolbar",
            css: "bg_panel",
            cols: [
                uiItems_1.getButton(uniformRunButtonId),
                uiItems_1.getForm(uniformFormId, [
                    uiItems_1.getTextField("a", "A:", defaultData.a),
                    uiItems_1.getTextField("b", "B:", defaultData.b),
                    uiItems_1.getTextField("n", "N:", defaultData.n)
                ]),
                {}
            ]
        },
        uiItems_1.getForm(uniformOutPutFormId, [
            uiItems_1.getTextField("mX", "Mx:"),
            uiItems_1.getTextField("dX", "Dx:")
        ], true),
        uiItems_1.getChart(uniformChartId),
        {}
    ]
}, initFunction = () => {
    let form = $$(uniformFormId), formOutput = $$(uniformOutPutFormId), chart = $$(uniformChartId), utils = new modTest_1.default();
    $$(uniformRunButtonId).attachEvent("onItemClick", function () {
        let data = form.getValues(), results = utils.uniformDistribution(parseInt(data.a), parseInt(data.b), parseInt(data.n)), mX = utils.getMx(results), dX = utils.getDx(results, mX), chartData = utils.getChartData(results);
        formOutput.setValues({ mX, dX });
        chart.show();
        chart.clearAll();
        chart.parse(chartData, "json");
    });
};
exports.uniformRunButtonId = uniformRunButtonId;
exports.uniformFormId = uniformFormId;
exports.uniformOutPutFormId = uniformOutPutFormId;
exports.uniformChartId = uniformChartId;
exports.uniformUi = uniformUi;
exports.initFunction = initFunction;

},{"../modTest":21,"./uiItems":16}],18:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Lab3Logic {
    calcValues(p1, p2, ticks) {
        let input = 0, output = 0, l = 0, states = {}, state = "2000", // t0 - 0   j - 1   t1 - 2  t2 - 3
        calcState = (randP1, randP2) => {
            if (state[2] === "1" && randP1 > p1) {
                state = this.getNewState(state, 0, 2);
                output++;
            }
            if (state[3] === "1" && randP2 > p2) {
                state = this.getNewState(state, 0, 3);
                output++;
            }
            if (state[1] === "2" && (state[2] === "0" || state[3] === "0")) {
                if (state[2] === "0" && state[3] === "0") {
                    // set j = 0
                    state = this.getNewState(state, 0, 1);
                    // set t1 = 1
                    state = this.getNewState(state, 1, 2);
                    // set t2 = 1
                    state = this.getNewState(state, 1, 3);
                }
                else if (state[2] === "0") {
                    let j = parseInt(state[1]);
                    if (j - 1 >= 0) {
                        state = this.getNewState(state, j - 1, 1);
                        state = this.getNewState(state, 1, 2);
                    }
                    else {
                        debugger;
                    }
                }
                else if (state[3] === "0") {
                    let j = parseInt(state[1]);
                    if (j - 1 >= 0) {
                        state = this.getNewState(state, j - 1, 1);
                        state = this.getNewState(state, 1, 3);
                    }
                    else {
                        debugger;
                    }
                }
            }
            if (state[1] === "1" && (state[2] === "0" || state[3] === "0")) {
                if (state[2] === "0") {
                    let j = parseInt(state[1]);
                    if (j - 1 >= 0) {
                        state = this.getNewState(state, j - 1, 1);
                        state = this.getNewState(state, 1, 2);
                    }
                    else {
                        debugger;
                    }
                }
                else if (state[3] === "0") {
                    let j = parseInt(state[1]);
                    if (j - 1 >= 0) {
                        state = this.getNewState(state, j - 1, 1);
                        state = this.getNewState(state, 1, 3);
                    }
                    else {
                        debugger;
                    }
                }
            }
        };
        states[state] = 0;
        for (let i = 0; i < ticks; i++) {
            let randP1 = this.getRandom(), randP2 = this.getRandom();
            switch (state[0]) {
                case "1":
                    calcState(randP1, randP2);
                    if (state === "1211") {
                    }
                    else {
                        let j = parseInt(state[1]);
                        if (j + 1 < 3) {
                            j += 1;
                            state = this.getNewState(state, j, 1);
                            if (j - 1 >= 0 && state[2] === "0") {
                                j -= 1;
                                state = this.getNewState(state, j, 1);
                                state = this.getNewState(state, 1, 2);
                            }
                            if (j - 1 >= 0 && state[3] === "0") {
                                j -= 1;
                                state = this.getNewState(state, j, 1);
                                state = this.getNewState(state, 1, 3);
                            }
                        }
                        else {
                            debugger;
                        }
                        input++;
                    }
                    state = this.getNewState(state, 2, 0);
                    break;
                case "2":
                    calcState(randP1, randP2);
                    state = this.getNewState(state, 1, 0);
                    break;
                default:
                    debugger;
                    break;
            }
            states[state] = this.updateState(states[state]);
            l += parseInt(state[1]) > 0 ? 1 : 0;
        }
        return {
            a: output / ticks,
            l: l / ticks
        };
    }
    getNewState(currState, newValue, valueIndex) {
        let arrString = currState.split("");
        arrString[valueIndex] = newValue.toString();
        return arrString.join("");
    }
    updateState(oldValue) {
        return oldValue === undefined ? 1 : oldValue + 1;
    }
    getRandom() {
        return Math.random();
    }
}
exports.default = Lab3Logic;

},{}],19:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const uiItems_1 = require("../lab2/uiItems");
const logic_1 = require("./logic");
let runLab3Id = "runLab3Id", formLab3Id = "formLab3Id", formOutputLab3Id = "formOutputLab3Id", ui = {
    rows: [
        {
            type: "toolbar",
            css: "bg_panel",
            cols: [
                uiItems_1.getButton(runLab3Id),
                uiItems_1.getForm(formLab3Id, [
                    uiItems_1.getTextField("p1", "P1:", 0.6),
                    uiItems_1.getTextField("p2", "P2:", 0.5),
                    uiItems_1.getTextField("ticks", "Ticks:", 10000)
                ])
            ]
        },
        {
            cols: [
                uiItems_1.getForm(formOutputLab3Id, [
                    uiItems_1.getTextField("a", "A:", 0),
                    uiItems_1.getTextField("l", "L:", 0),
                    uiItems_1.getTextField("w", "W:", 0)
                ], true)
            ]
        }
    ]
}, initLab3 = () => {
    let runButton = $$(runLab3Id), formInput = $$(formLab3Id), formOutput = $$(formOutputLab3Id), parser = new logic_1.default();
    runButton.attachEvent("onItemClick", () => {
        let inputData = formInput.getValues();
        let result = parser.calcValues(parseFloat(inputData.p1), parseFloat(inputData.p2), parseInt(inputData.ticks));
        formOutput.setValues({
            a: result.a,
            l: result.l,
            w: result.l / result.a
        });
    });
};
exports.runLab3Id = runLab3Id;
exports.formLab3Id = formLab3Id;
exports.formOutputLab3Id = formOutputLab3Id;
exports.ui = ui;
exports.initLab3 = initLab3;

},{"../lab2/uiItems":16,"./logic":18}],20:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ui_1 = require("./ui");
const dataWorker_1 = require("./dataWorker");
const modTest_1 = require("./modTest");
const uniformUi_1 = require("./lab2/uniformUi");
const gaussUi_1 = require("./lab2/gaussUi");
const exponentialUi_1 = require("./lab2/exponentialUi");
const gammaUi_1 = require("./lab2/gammaUi");
const triangleUi_1 = require("./lab2/triangleUi");
const simpsonUi_1 = require("./lab2/simpsonUi");
const ui_2 = require("./lab3/ui");
class ModLab {
    constructor() {
        $$(ui_1.buttonId).attachEvent("onItemClick", () => {
            let startData = this.validateForm(this.formData.getValues());
            if (!startData) {
                webix.message("Start data is not valid");
                return;
            }
            let worker = new dataWorker_1.default(startData["a"], startData["m"], startData["r0"]), data = this.utils.getData(worker, 200000), current = worker.current(), period = this.utils.findPeriod(data, current), chartData = this.utils.getChartData(period.data), mX = this.utils.getMx(period.data), dX = this.utils.getDx(period.data, mX);
            this.formOutputData.setValues({
                period: period.period || "Invalid",
                aPeriod: period.aPeriod || "Invalid",
                mX: mX || "Invalid",
                dX: dX || "Invalid",
                uniformity: this.utils.checkUniformity(period.data) || "Invalid"
            });
            this.chart.config.yAxis.start = this.utils.getMin(period.data);
            this.chart.config.yAxis.end = this.utils.getMax(period.data);
            this.chart.show();
            this.updateChart(chartData);
        });
        this.formData = $$(ui_1.formDataId);
        this.formOutputData = $$(ui_1.formOutputDataId);
        this.utils = new modTest_1.default();
        this.chart = $$(ui_1.chartId);
        this.chart.hide();
        uniformUi_1.initFunction();
        gaussUi_1.initFunction();
        exponentialUi_1.initFunction();
        gammaUi_1.initFunction();
        triangleUi_1.initFunction();
        simpsonUi_1.initFunction();
        ui_2.initLab3();
    }
    validateForm(data) {
        let a = parseInt(data["a"]) || 0, m = parseInt(data["m"]) || 0, r0 = parseInt(data["r0"]) || 0;
        if (!a || a === 0) {
            webix.message("Property A cannot be '0' or empty");
            return false;
        }
        if (!m || m === 0) {
            webix.message("Property M cannot be '0' or empty");
            return false;
        }
        if (!r0 || r0 === 0) {
            webix.message("Property R0 cannot be '0' or empty");
            return false;
        }
        return {
            a: a,
            m: m,
            r0: r0
        };
    }
    updateChart(data) {
        this.chart.clearAll();
        this.chart.parse(data, "json");
    }
}
exports.default = ModLab;

},{"./dataWorker":9,"./lab2/exponentialUi":10,"./lab2/gammaUi":11,"./lab2/gaussUi":12,"./lab2/simpsonUi":14,"./lab2/triangleUi":15,"./lab2/uniformUi":17,"./lab3/ui":19,"./modTest":21,"./ui":22}],21:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
let mult = (a, b) => a * b, div = (a, b) => a / b, mod = (a, b) => a % b, makeStep = (index, prevResult, a, m) => {
    let multRes = mult(a, prevResult), rN = mod(multRes, m), xN = div(rN, m);
    return {
        index: index,
        prevR: prevResult,
        mult: multRes,
        rN: rN,
        xN: xN
    };
}, getData = (count, a, m, startR) => {
    let result = [], prevR = undefined;
    for (let i = 0; i < count; i++) {
        let dataItem = makeStep(i, prevR === undefined ? startR : prevR, a, m);
        prevR = dataItem.rN;
        result.push(dataItem);
    }
};
class ModLabUtils {
    getData(worker, count) {
        let result = [];
        for (let i = 0; i < count; i++) {
            result.push(worker.next());
        }
        return result;
    }
    findPeriod(data, currentX) {
        let i1 = -1, i2 = -1, i3 = 0, isFirstPointFound = false, period, aPeriod;
        for (let i = 0, len = data.length; i < len; i++) {
            if (data[i] === currentX) {
                if (!isFirstPointFound) {
                    isFirstPointFound = true;
                    i1 = i;
                    continue;
                }
                else {
                    i2 = i;
                    break;
                }
            }
        }
        period = i2 - i1;
        while (data[i3] !== data[i3 + period]) {
            i3++;
        }
        aPeriod = i3 + period;
        if (i1 === -1 || i2 === -1) {
            return {
                period: undefined,
                aPeriod: undefined,
                data: data
            };
        }
        else {
            return {
                period: period,
                aPeriod: aPeriod,
                data: data.slice(i1, i2)
            };
        }
    }
    getMx(data) {
        return data.reduce((result, current) => result + current, 0) / data.length;
    }
    getDx(data, mX) {
        let dX = 0;
        for (let i = 0, len = data.length; i < len; i++) {
            let value = data[i] - mX;
            dX += mult(value, value);
        }
        dX /= (data.length - 1);
        return dX;
    }
    checkUniformity(data) {
        let result = 0, len = data.length;
        for (let i = 0; i < len; i += 2) {
            if (i + 1 >= len) {
                break;
            }
            let curr = data[i], next = data[i + 1];
            if (curr * curr + next * next < 1.0) {
                result++;
            }
        }
        return 2 * result / len;
    }
    getMin(data) {
        let reduceFunc = (res, curr) => curr < res ? curr : res;
        return data.reduce(reduceFunc, Infinity);
    }
    getMax(data) {
        let reduceFunc = (res, curr) => curr > res ? curr : res;
        return data.reduce(reduceFunc, -Infinity);
    }
    getChartData(data) {
        let partsCount = 20, partLength = (this.getMax(data) - this.getMin(data)) / partsCount, frequency = [], dataLength = data.length, xValues = [this.getMin(data)], result = [];
        for (let i = 1; i <= partsCount; i++) {
            xValues[i] = xValues[i - 1] + partLength;
        }
        for (let i = 0; i < partsCount; i++) {
            frequency[i] = 0;
            for (let j = 0; j < dataLength; j++) {
                let dataItem = data[j];
                if (dataItem >= xValues[i] && dataItem < (xValues[i + 1])) {
                    frequency[i]++;
                }
            }
            frequency[i] /= dataLength;
        }
        for (let i = 0; i < partsCount; i++) {
            result.push({ x: xValues[i], y: frequency[i] });
        }
        return result;
    }
    getRandom() {
        return Math.random();
    }
    uniformDistribution(a, b, count) {
        let result = [];
        for (let i = 0; i < count; i++) {
            result.push(a + (b - a) * this.getRandom());
        }
        return result;
    }
    gaussDistribution(m, sko, count, n) {
        let result = [], getSumOfRandom = (len) => {
            let temp = 0;
            for (let i = 0; i < len; i++) {
                temp += this.getRandom();
            }
            return temp;
        };
        for (let i = 0; i < count; i++) {
            result.push(m + sko * Math.sqrt(12.0 / n) * (getSumOfRandom(n) - n / 2));
        }
        return result;
    }
    exponentialDistribution(alpha, count) {
        let result = [];
        for (let i = 0; i < count; i++) {
            result.push(-Math.log(this.getRandom()) / alpha);
        }
        return result;
    }
    gammaDistribution(alpha, ny, count) {
        let result = [], getMultOfRandom = (len) => {
            let temp = 1;
            for (let i = 0; i < len; i++) {
                temp *= this.getRandom();
            }
            return temp;
        };
        for (let i = 0; i < count; i++) {
            result.push(-Math.log(getMultOfRandom(ny)) / alpha);
        }
        return result;
    }
    triangleDistribution(a, b, count) {
        let result = [];
        for (let i = 0; i < count; i++) {
            result.push(a + (b - a) * Math.max(this.getRandom(), this.getRandom()));
        }
        return result;
    }
    simpsonDistribution(a, b, count) {
        let result = [], getValue = (a1, b1) => a1 / 2 + (b1 / 2 - a1 / 2) * this.getRandom();
        for (let i = 0; i < count; i++) {
            result.push(getValue(a, b) + getValue(a, b));
        }
        return result;
    }
}
exports.default = ModLabUtils;

},{}],22:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mainUi_1 = require("./lab2/mainUi");
const ui_1 = require("./lab3/ui");
let buttonId = "modButtonId1", chartId = "modChart1Id", formDataId = "formDataId", formOutputDataId = "formOutputDataId", tabbarId = "modLabsSegmentedId", modLab1Id = "modLab1Id", modLab2Id = "modLab2Id", modLab3Id = "modLab3Id", ui = {
    id: "modId",
    css: "bg_panel_raised",
    type: "space",
    autoheight: true,
    rows: [
        {
            view: "toolbar",
            cols: [
                {
                    view: "segmented", id: tabbarId, value: modLab1Id, multiview: true, options: [
                        { value: "Lab 1", id: modLab1Id },
                        { value: "Lab 2", id: modLab2Id },
                        { value: "Lab 3", id: modLab3Id }
                    ]
                },
                {}
            ]
        },
        {
            cells: [
                {
                    id: modLab1Id,
                    rows: [
                        {
                            type: "toolbar",
                            css: "bg_panel",
                            cols: [
                                { template: "MOD", type: "header", width: 100, borderless: true },
                                {
                                    view: "button",
                                    css: "button_primary button_raised",
                                    id: buttonId,
                                    width: 100,
                                    value: "Run"
                                },
                                {
                                    view: "form",
                                    id: formDataId,
                                    gravity: 1.3,
                                    cols: [
                                        {
                                            view: "text",
                                            value: "",
                                            name: "a",
                                            label: "A:",
                                            labelAlign: "left"
                                        },
                                        {
                                            view: "text",
                                            value: "",
                                            name: "m",
                                            label: "M:",
                                            labelAlign: "left"
                                        },
                                        {
                                            view: "text",
                                            value: "",
                                            name: "r0",
                                            label: "R0:",
                                            labelAlign: "left"
                                        },
                                        {}
                                    ]
                                },
                                {}
                            ]
                        },
                        {
                            view: "form",
                            id: formOutputDataId,
                            disabled: true,
                            cols: [
                                {
                                    view: "text",
                                    value: "",
                                    name: "period",
                                    label: "Period:",
                                    labelAlign: "left"
                                },
                                {
                                    view: "text",
                                    value: "",
                                    name: "aPeriod",
                                    label: "Aperiod:",
                                    labelAlign: "left"
                                },
                                {
                                    view: "text",
                                    value: "",
                                    name: "mX",
                                    label: "Mx:",
                                    labelAlign: "left"
                                },
                                {
                                    view: "text",
                                    value: "",
                                    name: "dX",
                                    label: "Dx:",
                                    labelAlign: "left"
                                },
                                {
                                    view: "text",
                                    value: "",
                                    name: "uniformity",
                                    label: "Uniformity:",
                                    labelAlign: "left"
                                }
                            ]
                        },
                        {
                            view: "chart",
                            css: "bg_panel",
                            id: chartId,
                            type: "bar",
                            label: function (value) {
                                return parseFloat(value.y).toFixed(4);
                            },
                            value: "#y#",
                            barWidth: 35,
                            radius: 0,
                            gradient: "falling",
                            xAxis: {
                                template: function (data) {
                                    return parseFloat(data.x).toFixed(4);
                                }
                            },
                            yAxis: {
                                template: function (data) {
                                    return data;
                                }
                            }
                        },
                        {}
                    ]
                },
                {
                    id: modLab2Id,
                    rows: [
                        mainUi_1.ui
                    ]
                },
                {
                    id: modLab3Id,
                    rows: [
                        ui_1.ui
                    ]
                }
            ]
        }
    ]
};
exports.buttonId = buttonId;
exports.chartId = chartId;
exports.formDataId = formDataId;
exports.formOutputDataId = formOutputDataId;
exports.UI = ui;

},{"./lab2/mainUi":13,"./lab3/ui":19}],23:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Complex {
    constructor(re, im = 0.0) {
        this.re = re;
        this.im = im;
    }
    mult(comp) {
        return new Complex(this.re * comp.re - this.im * comp.im, this.re * comp.im + this.im * comp.re);
    }
    divNumber(value) {
        return new Complex(this.re / value, this.im / value);
    }
    add(comp) {
        return new Complex(this.re + comp.re, this.im + comp.im);
    }
    sub(comp) {
        return new Complex(this.re - comp.re, this.im - comp.im);
    }
    get conjugate() {
        return new Complex(this.re, -1 * this.im);
    }
    get magnitude() {
        return Math.sqrt(this.re * this.re + this.im * this.im);
    }
    get phase() {
        return Math.atan2(this.im, this.re);
    }
}
exports.Complex = Complex;
let dft = (arr, n, reverse, iterations) => {
    let tmp = [];
    for (let i = 0; i < n; i++) {
        for (let j = 0; j < n; j++) {
            let calc = (2.0 * Math.PI / n) * j * i, w = new Complex(Math.cos(calc), reverse ? -Math.sin(calc) : Math.sin(calc));
            if (!tmp[i]) {
                tmp[i] = new Complex(0.0);
            }
            tmp[i] = tmp[i].add(w.mult(arr[j]));
            //update counter
            iterations.count++;
        }
    }
    return tmp;
}, fft = (arr, n, direction, iterations) => {
    if (arr.length === 1) {
        return arr;
    }
    let arg = 2.0 * Math.PI / n, wn = new Complex(Math.cos(arg), direction * Math.sin(arg)), w = new Complex(1.0), len = arr.length, halfOfLen = len >> 1, first = [], second = [], result = [];
    for (let i = 0; i < halfOfLen; i++) {
        result[i] = arr[i].add(arr[i + halfOfLen]);
        result[i + halfOfLen] = arr[i].sub(arr[i + halfOfLen]).mult(w);
        w = w.mult(wn);
        // update counter
        iterations.count++;
    }
    for (let i = 0; i < halfOfLen; i++) {
        first[i] = result[i];
        second[i] = result[i + halfOfLen];
    }
    let firstFFT = fft(first, halfOfLen, direction, iterations), secondFFT = fft(second, halfOfLen, direction, iterations);
    for (let i = 0; i < halfOfLen; i++) {
        let j = i << 1;
        result[j] = firstFFT[i];
        result[j + 1] = secondFFT[i];
    }
    return result;
}, getSample = (length, rate, frequency, func) => {
    let res = [];
    for (let i = 0; i < length; i++) {
        res[i] = new Complex(func(i * 2 * Math.PI / length));
    }
    return res;
}, createSamples = (length, rate, frequency, func) => getSample(length, rate, frequency, func), dftFunc = (array, n, reverse) => {
    console.time("DFT time: ");
    let counter = { count: 0 }, arrRes = dft(array, n, reverse, counter);
    console.timeEnd("DFT time: ");
    return {
        count: counter.count,
        result: arrRes
    };
}, fftFunc = (array, n, reverse) => {
    console.time("FFT time: ");
    let counter = { count: 0 }, arrRes = fft(array, n, reverse ? -1 : 1, counter);
    console.timeEnd("FFT time: ");
    return {
        count: counter.count,
        result: arrRes
    };
}, correlation = (signal1, signal2) => {
    let len = signal1.length, result = [];
    for (let m = 0; m < len - 1; m++) {
        if (!result[m]) {
            result[m] = new Complex(0.0);
        }
        for (let h = 0; h < len; h++) {
            if (m + h < len) {
                result[m] = result[m].add(signal1[h].mult(signal2[m + h]));
            }
            else {
                result[m] = result[m].add(signal1[h].mult(signal2[m + h - len]));
            }
        }
        result[m] = result[m].divNumber(len / 2);
    }
    return result;
}, convolution = (signal1, signal2) => {
    let len = signal1.length, result = [];
    for (let m = 0; m < len; m++) {
        if (!result[m]) {
            result[m] = new Complex(0.0);
        }
        for (let h = 0; h < len; h++) {
            if (m - h >= 0) {
                result[m] = result[m].add(signal1[h].mult(signal2[m - h]));
            }
            else {
                result[m] = result[m].add(signal1[h].mult(signal2[m - h + len]));
            }
        }
        result[m] = result[m].divNumber(len);
    }
    return result;
}, convolutionFourier = (signal1, signal2) => {
    let len = signal1.length, firstImage = fft(signal1, len, 1, { count: 0 }), secondImage = fft(signal2, len, 1, { count: 0 }), result = [];
    for (let i = 0; i < len; i++) {
        result[i] = firstImage[i].mult(secondImage[i]);
    }
    return fft(result, len, -1, { count: 0 });
}, correlationFourier = (firstSignal, secondSignal) => {
    let len = firstSignal.length, firstImage = fft(firstSignal, len, 1, { count: 0 }), secondImage = fft(secondSignal, len, 1, { count: 0 }), result = [];
    for (let i = 0; i < len; i++) {
        result[i] = firstImage[i].conjugate.mult(secondImage[i]);
    }
    return fft(result, len, -1, { count: 0 });
}, fwht = (data, length) => {
    if (length === 1) {
        return data;
    }
    let half = length / 2, firstHalf = [], secondHalf = [], result = [], i, firstPart, secondPart;
    for (i = 0; i < half; i++) {
        firstHalf[i] = data[i] + data[i + half];
        secondHalf[i] = -1 * data[i + half] + data[i];
    }
    firstPart = fwht(firstHalf, half);
    secondPart = fwht(secondHalf, half);
    for (i = 0; i < half; i++) {
        result[i] = firstPart[i];
        result[i + half] = secondPart[i];
    }
    return result;
}, getPhaseAndAmplitude = (mas, len) => {
    let amplitude = [mas[0] * mas[0]], phase = [0], i = 1;
    for (; i < len / 2 - 1; i++) {
        amplitude[i] = mas[2 * i - 1] * mas[2 * i - 1] + mas[2 * i] * mas[2 * i];
        phase[i] = (amplitude[i] > 0.001) ? Math.atan2(mas[2 * i - 1], mas[2 * i]) : 0.0;
    }
    amplitude[len / 2 - 1] = mas[len - 1] * mas[len - 1];
    phase[len / 2 - 1] = 0;
    return { phase, amplitude };
};
exports.CreateSamples = createSamples;
exports.DFT = dftFunc;
exports.FFT = fftFunc;
exports.Correlation = correlation;
exports.Convolution = convolution;
exports.ConvolutionFourier = convolutionFourier;
exports.CorrelationFourier = correlationFourier;
exports.FWHT = fwht;
exports.GetPhaseAndAmplitude = getPhaseAndAmplitude;

},{}],24:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const test_1 = require("./test");
const ui_1 = require("./lab1/ui");
const logic_1 = require("./lab1/logic");
const ui_2 = require("./mod/ui");
const madLab_1 = require("./mod/madLab");
const ui_3 = require("./lab3/ui");
const ui_4 = require("./lab4/ui");
let getXData = (count) => {
    let i = 0, res = [];
    for (i; i < count; i++) {
        res.push(i);
    }
    return res;
}, getXDataComplex = (count) => {
    let i = 0, res = [];
    for (i; i < count; i++) {
        res.push(new test_1.Complex(0.0, 0.0));
    }
    return res;
}, getMagnitudeFromComplex = (data) => data.map(complex => complex.magnitude), getPhaseFromComplex = (data) => {
    return data.map(complex => complex.magnitude > 0.3 ? complex.phase : 0);
}, getRealFromComplex = (data) => data.map(complex => complex.re), getHalfData = (data) => {
    let newData = data.slice(0);
    newData.length = newData.length / 2;
    return newData;
}, bih = (noise, grade) => {
    let result = [], temp = [], acc = 0;
    for (let t = grade / 2; t < noise.length; t++) {
        temp[t] = noise[t];
    }
    for (let i = 0; i < grade / 2; i++) {
        acc += noise[i] + noise[noise.length - i - 1];
    }
    for (let i = 0; i < noise.length - grade; i++) {
        acc = acc + temp[i + grade / 2] - temp[i + grade];
        result[i] = acc / grade * (-1);
    }
    return result;
}, kih = (nF, x, grade, N) => {
    let blackman = [], result = [];
    // for (let i = 0; i < grade; i++) {
    //     if (i - grade / 2 !== 0) {
    //         blackman[i] = Math.sin(2 * Math.PI * nF * (i - grade / 2)) * (0.54 - 0.46 * Math.cos(2 * Math.PI * i / grade)) / (i - grade / 2);
    //     } else {
    //         blackman[i] = 2 * Math.PI * nF * (0.54 - 0.46 * Math.cos(2 * Math.PI * i / grade));
    //     }
    // }
    for (let i = 0; i < grade; i++) {
        if (i - grade / 2 !== 0) {
            blackman[i] = Math.sin(2 * Math.PI * nF * (i - grade / 2)) * (0.42 - 0.5 * Math.cos(2 * Math.PI * i / grade) + 0.08 * Math.cos(4 * Math.PI / grade)) / (i - grade / 2);
        }
        else {
            blackman[i] = 2 * Math.PI * nF * (0.42 - 0.5 * Math.cos(2 * Math.PI * i / grade) + 0.08 * Math.cos(4 * Math.PI / grade));
        }
    }
    let dSum = 0;
    for (let i = 0; i < grade; i++) {
        dSum += blackman[i];
    }
    for (let i = 0; i < grade; i++) {
        blackman[i] /= dSum * (-1);
    }
    for (let i = grade; i < N; i++) {
        result[i - grade] = 0;
        for (let t = 0; t < grade; t++) {
            result[i - grade] = result[i - grade] + x[i - t] * blackman[t];
        }
        result[i - grade] *= -1;
    }
    return result;
}, addNoise = (y) => {
    let temp = [], len = y.length, getRandomArbitrary = (min, max) => (Math.random() * (max - min) + min);
    for (let i = 0; i < len; i++) {
        temp[i] = y[i] + Math.sin(getRandomArbitrary(0, 360)) / 8;
    }
    return temp;
}, runLab4 = () => {
    let amount = 1024, grade = 64, nF = 0.015, createData = (length, getSignal) => {
        let step = 2 * Math.PI / length, curStep = 0.0, arr = [], i = 0;
        for (; curStep < 2 * Math.PI; curStep += step, i++) {
            arr[i] = getSignal(curStep);
        }
        arr[length - 1] = getSignal(2 * Math.PI);
        return arr;
    }, data = createData(amount, value => Math.cos(3.0 * value) + Math.sin(2.0 * value)), withNoise = addNoise(data), kihData = kih(nF, withNoise, grade, amount), bihData = bih(withNoise, grade), xData = getXData(amount);
    drawChart(xData, data, $$(lab4Data1));
    drawChart(xData, withNoise, $$(lab4Data2));
    drawChart(getXData(kihData.length), kihData, $$(lab4Data3));
    drawChart(getXData(bihData.length), bihData, $$(lab4Data4));
}, runLab = () => {
    let amount = 1024, data = test_1.CreateSamples(amount, 8000, 187.5, (value) => {
        return Math.sin(3.0 * value) + Math.cos(value);
    }), xData = getXData(amount), dftData = test_1.DFT(data, amount, false), dftDataReverse = test_1.DFT(dftData.result, amount, true), fftData = test_1.FFT(data, amount, false), fftReverse = test_1.FFT(fftData.result, amount, true);
    drawChart(xData, getRealFromComplex(data), $$(firstChartId));
    console.log(`DFT iterations: ${dftData.count}`);
    console.log(`FFT iterations: ${fftData.count}`);
    // DFT
    drawChart(getHalfData(xData), getHalfData(getPhaseFromComplex(dftData.result)), $$(dftPhaseId));
    drawChart(getHalfData(xData), getHalfData(getMagnitudeFromComplex(dftData.result)), $$(dftMagnitudeId));
    drawChart(xData, getRealFromComplex(dftDataReverse.result), $$(dftId));
    // FFT
    drawChart(getHalfData(xData), getHalfData(getPhaseFromComplex(fftData.result)), $$(fftPhaseId));
    drawChart(getHalfData(xData), getHalfData(getMagnitudeFromComplex(fftData.result)), $$(fftMagnitudeId));
    drawChart(xData, getRealFromComplex(fftReverse.result), $$(fftId));
}, runLab2 = () => {
    let amount = 512, xData = getXData(amount * 2), dataLab1 = test_1.CreateSamples(amount, 8000, 187.5, (value) => {
        return Math.cos(3.0 * value) /* + Math.cos(value)*/;
    }).concat(getXDataComplex(amount)), dataLab2 = test_1.CreateSamples(amount, 8000, 187.5, (value) => {
        return Math.cos(3.0 * value) + Math.sin(2.0 * value);
    }).concat(getXDataComplex(amount)), convolutionRezult = test_1.Convolution(dataLab1, dataLab2), correlationRezult = test_1.Correlation(dataLab1, dataLab2), correlationFourier = test_1.CorrelationFourier(dataLab1, dataLab2), convolutionFourier = test_1.ConvolutionFourier(dataLab1, dataLab2);
    drawChart(getHalfData(xData), getHalfData(getRealFromComplex(dataLab1)), $$(lab2Data1Id));
    drawChart(getHalfData(xData), getHalfData(getRealFromComplex(dataLab2)), $$(lab2Data2Id));
    drawChart(getHalfData(xData), getRealFromComplex(convolutionRezult), $$(lab2Conv1Id));
    drawChart(getHalfData(xData), getRealFromComplex(convolutionFourier), $$(lab2Conv2Id));
    drawChart(getHalfData(xData), getRealFromComplex(correlationRezult), $$(lab2Corr1Id));
    drawChart(getHalfData(xData), getRealFromComplex(correlationFourier), $$(lab2Corr2Id));
}, runLab3 = () => {
    const N = 8, size = 64, len = N * size;
    let createData = (length, getSignal) => {
        let step = 2 * Math.PI / length, curStep = 0.0, arr = [], i = 0;
        for (; curStep < 2 * Math.PI; curStep += step, i++) {
            arr[i] = getSignal(curStep);
        }
        arr[length - 1] = getSignal(2 * Math.PI);
        return arr;
    }, xData = getXData(len), data = createData(len, value => Math.cos(3.0 * value) + Math.sin(2.0 * value)), fwhtData = test_1.FWHT(data, len), i = 0;
    for (; i < len; i++) {
        fwhtData[i] /= len; // this for normalisation
    }
    let extraData = test_1.GetPhaseAndAmplitude(fwhtData, len);
    drawChart(xData, data, $$(lab3Data1Id));
    drawChart(getHalfData(xData), extraData.phase, $$(lab3Data2Id));
    drawChart(getHalfData(xData), extraData.amplitude, $$(lab3Data3Id));
    drawChart(xData, test_1.FWHT(fwhtData, len), $$(lab3Data4Id));
}, lab4Data1 = "lab4Data1", lab4Data2 = "lab4Data2", lab4Data3 = "lab4Data3", lab4Data4 = "lab4Data4", lab3Data1Id = "lab3Data1Id", lab3Data2Id = "lab3Data2Id", lab3Data3Id = "lab3Data3Id", lab3Data4Id = "lab3Data4Id", lab2Data1Id = "lab2Data1Id", lab2Data2Id = "lab2Data2Id", lab2Conv1Id = "lab2Conv1Id", lab2Conv2Id = "lab2Conv2Id", lab2Corr1Id = "lab2Corr1Id", lab2Corr2Id = "lab2Corr2Id", firstChartId = "firstChart", dftId = "dftREverse", dftPhaseId = "dftPhase", dftMagnitudeId = "dftMagnitude", fftId = "fftREverse", fftPhaseId = "fftPhase", fftMagnitudeId = "fftMagnitude", getData = (x, y) => {
    let len = x.length, res = [];
    for (let i = 0; i < len; i++) {
        res.push({
            x: x[i],
            y: y[i]
        });
    }
    return res;
}, drawChart = (x, y, chartContainer) => {
    let cartData = getData(x, y);
    chartContainer.clearAll();
    chartContainer.parse(cartData, "json");
}, getChartObject = (id) => {
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
            template: function (inedx) {
                return $$(id).getIndexById(inedx.id) % 100 ? "" : inedx.x;
            },
            lines: function (index) {
                return this.getIndexById(index.id) % 100 ? false : true;
            }
        },
        yAxis: {
            template: function (index) {
                return index;
            },
            lines: function (index) {
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
let cosiUi = {
    id: "cosiId",
    rows: [
        {
            view: "toolbar",
            cols: [
                { template: "Transform", type: "header", width: 100, borderless: true },
                { view: "button", id: "runId", value: "Run", width: 100, align: "left" },
                {
                    view: "segmented", id: "tabbar", value: "lab1", multiview: true, options: [
                        { value: "Lab 1", id: "lab1" },
                        { value: "Lab 2", id: "lab2" },
                        { value: "Lab 3", id: "lab3" },
                        { value: "Lab 4", id: "lab4" },
                        { value: "Lab 1 gen.2", id: "lab5" },
                        { value: "Lab 3 gen.2", id: "lab6" },
                        { value: "Lab 4 gen.2", id: "lab7" }
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
                            { type: "header", template: "Phase", height: 50 },
                            { template: "FFT phase", height: 30 },
                            getChartObject(fftPhaseId),
                            { template: "DFT phase", height: 30 },
                            getChartObject(dftPhaseId),
                            { type: "header", template: "Magnitude", height: 50 },
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
                            { type: "header", template: "Phase", height: 50 },
                            getChartObject(lab3Data2Id),
                            { type: "header", template: "Magnitude", height: 50 },
                            getChartObject(lab3Data3Id)
                        ]
                    },
                    {
                        id: "lab4",
                        rows: [
                            { type: "header", template: "Function", height: 50 },
                            { template: "y = cos(3x) + sin(2x)", height: 30 },
                            getChartObject(lab4Data1),
                            { template: "With noise", height: 30 },
                            getChartObject(lab4Data2),
                            { type: "header", template: "KIH filter", height: 50 },
                            getChartObject(lab4Data3),
                            { type: "header", template: "BIH filter", height: 50 },
                            getChartObject(lab4Data4)
                        ]
                    },
                    ui_1.ui,
                    ui_3.ui,
                    ui_4.ui
                ]
            }
        }
    ]
}, testUi = {
    type: "space",
    rows: [
        {
            view: "toolbar",
            cols: [
                {
                    view: "segmented", id: "subjectsId", value: "cosiId", multiview: true, options: [
                        { value: "COSI", id: "cosiId" },
                        { value: "MOD", id: "modId" }
                    ]
                }
            ]
        },
        {
            view: "scrollview",
            scroll: "y",
            body: {
                id: "subjectId",
                cells: [
                    cosiUi,
                    ui_2.UI
                ]
            }
        }
    ]
};
webix.ready(() => {
    window.addEventListener("error", e => {
        let error = new Error(e.error || e);
        webix.message({
            type: "error",
            text: JSON.stringify({
                name: error.name || "Error",
                message: error.message || "Unknown error",
                stack: error.stack
            }, undefined, "\t").toString()
        });
    });
    webix.ui(testUi);
    let uiLogic, modLab, lab6Run = false;
    $$("tabbar").attachEvent("onAfterTabClick", (e) => {
        if (e === "lab5" && uiLogic === undefined) {
            uiLogic = new logic_1.default();
        }
        if (e === "lab6" && !lab6Run) {
            ui_3.initLab6();
            lab6Run = true;
        }
        if (e === "lab7" && !lab6Run) {
            ui_4.initLab7();
            lab6Run = true;
        }
    });
    $$("subjectsId").attachEvent("onAfterTabClick", (e) => {
        if (modLab === undefined) {
            modLab = new madLab_1.default();
        }
    });
    $$("runId").attachEvent("onItemClick", () => {
        switch ($$("tabbar").getValue()) {
            case "lab1":
                runLab();
                return;
            case "lab2":
                runLab2();
                return;
            case "lab3":
                runLab3();
                return;
            case "lab4":
                runLab4();
                return;
            default: break;
        }
    });
});

},{"./lab1/logic":3,"./lab1/ui":4,"./lab3/ui":7,"./lab4/ui":8,"./mod/madLab":20,"./mod/ui":22,"./test":23}]},{},[24]);
