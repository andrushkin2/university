"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const disjointSet_1 = require("./disjointSet");
class Vector {
    constructor(newSigns) {
        this.cluster = 0;
        this.id = 0;
        this.distanse = 0;
        this.signs = { area: 0, copmactness: 0, elongation: 0, perimeter: 0 };
        this.signs = newSigns;
    }
}
class ExtraUtils {
    toGrayscale(data) {
        let result = new Uint8ClampedArray(data.length);
        for (let i = 0, len = data.length; i < len; i += 4) {
            let avg = (data[i] + data[i + 1] + data[i + 2]) / 3;
            result[i] = avg;
            result[i + 1] = avg;
            result[i + 2] = avg;
            result[i + 3] = data[i + 3];
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
                result[i][j] = newValue;
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
        let unions = new disjointSet_1.default(10000), rows = elements.length, cols = elements[0].length, label = 0, result = this.getEmptyArray(rows, cols);
        for (let x = 1; x < rows; x++) {
            for (let y = 1; y < cols; y++) {
                if (elements[x][y]) {
                    let a = result[x][y], b = result[x - 1][y], c = result[x][y - 1];
                    if (!b && !c) {
                        result[x][y] = ++label;
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
    getVectors(data) {
        let result = [];
        for (let i = 0, keys = Object.keys(data), len = keys.length; i < len; i++) {
            let obj = data[keys[i]], vector = new Vector({
                area: obj.area,
                copmactness: obj.copmactness,
                elongation: obj.elongation,
                perimeter: obj.perimeter
            });
            vector.id = i;
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
        return result;
    }
    kMedoids(objects, objCount, k, maxStep) {
        let centers = [];
        for (let i = 0; i < objCount; i++) {
            objects[i].cluster = Math.floor(Math.random() * (k - 0)) + 0;
        }
    }
    kMediodsFindCenters(objects, objCount, centers, k) {
        let clusterSizes = [];
        for (let i = 0; i < objCount; i++) {
            let cluster = objects[i].cluster;
            if (!clusterSizes[cluster]) {
                clusterSizes[cluster] = 1;
            }
            else {
                clusterSizes[cluster]++;
            }
        }
    }
}
exports.default = ExtraUtils;
