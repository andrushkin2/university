import DisjointSet from "./disjointSet";
import { debug } from "util";

interface IFinalSign {
    area: number;
    perimeter: number;
    copmactness: number;
    elongation: number;
}

interface ISign extends IFinalSign {
    coMX: number;
    coMY: number;
    m20: number;
    m02: number;
    m11: number;
}

interface ISignData {
    [key: string]: ISign;
}

interface IDistanceMatrix {
    [key: string]: { [key: string]: number };
}

interface IClusterData {
    clusterId: number;
    vectors: Vector[];
    totalCost: number;
}

interface INewClustesData {
    totalCost: number;
    clusters: IClusterData[];
}

interface IKeyBool {
    [key: string]: boolean;
}

export class Vector {
    public cluster = 0;
    public id = 0;
    public distanse = 0;
    public signs: IFinalSign = { area: 0, copmactness: 0, elongation: 0, perimeter: 0 };
    public tempCluster: number | undefined = undefined;
    public tempDistance: number | undefined = undefined;
    constructor(newSigns: IFinalSign) {
        this.signs = newSigns;
    }
    public resetTempValues() {
        this.tempCluster = undefined;
        this.tempDistance = undefined;
    }
    public saveNewState() {
        if (this.tempCluster !== undefined) {
            this.cluster = this.tempCluster;
        }
        if (this.tempDistance !== undefined) {
            this.distanse = this.tempDistance;
        }
        this.resetTempValues();
    }
}

export default class ExtraUtils {
    public toGrayscale(data: Uint8ClampedArray) {
        let result: Uint8ClampedArray = new Uint8ClampedArray(data.length);
        for (let i = 0, len = data.length; i < len; i += 4) {
            let avg: number = Math.round((data[i] + data[i + 1] + data[i + 2]) / 3);
            result[i] = avg;
            result[i + 1] = avg;
            result[i + 2] = avg;
            result[i + 3] = 255;
        }
        return result;
    }
    public toBlackAndWhite(data: number[][][], p = 195) {
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
                result[i][j] = k > p ? 1 : 0;
                resultData[i][j] = [newValue, newValue, newValue, pixel[3]];
            }
        }
        return {
            data: resultData,
            bitMap: result
        };
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
    public connectedComponents(elements: number[][]) {
        let unions = new DisjointSet(10000),
            rows = elements.length,
            cols = elements[0].length,
            label = 3,
            result = this.getEmptyArray(rows, cols);
        for (let x = 1; x < rows; x++) {
            for (let y = 1; y < cols; y++) {
                if (elements[x][y]) {
                    let a = result[x][y],
                        b = result[x - 1][y],
                        c = result[x][y - 1];
                    if (!b && !c) {
                        label += 1;
                        result[x][y] = label;
                    } else if (b && !c) {
                        result[x][y] = result[x - 1][y];
                    } else if (!b && c) {
                        result[x][y] = result[x][y - 1];
                    } else {
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
    public getVectors(data: ISignData) {
        let result: Vector[] = [];
        for (let i = 0, keys = Object.keys(data), len = keys.length; i < len; i++) {
            let key = keys[i],
                obj = data[key],
                vector = new Vector({
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
    public getSigns(data: number[][]) {
        let result: ISignData = {},
            getObject = (key: string, dataObj: ISignData) => {
                if (!dataObj[key]) {
                    dataObj[key] = { area: 0, coMX: 0, coMY: 0, copmactness: 0, elongation: 0, m02: 0, m11: 0, m20: 0, perimeter: 0 };
                }
                return dataObj[key];
            },
            square = (value: number) => value * value;

        for (let x = 1, rows = data.length - 1; x < rows; x ++) {
            let rowData = data[x],
                prevRowData = data[x - 1],
                nextRowData = data[x + 1];
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
                    let obj = result[pixel.toString()],
                        tmpX = y - obj.coMX,
                        tmpY = x - obj.coMY;
                    obj.m20 += square(tmpX);
                    obj.m02 += square(tmpY);
                    obj.m11 += tmpX * tmpY;
                }
            }
        }

        for (let i = 0, keys = Object.keys(result), len = keys.length; i < len; i++) {
            let obj = result[keys[i]],
                tmp1 = obj.m20 + obj.m02,
                temp = obj.m20 - obj.m02 + 4.0 * square(obj.m11),
                tmp2 = temp >= 0 ? Math.sqrt(temp) : 0;
            obj.elongation = (tmp1 + tmp2) / (tmp1 - tmp2) || 0;
        }

        for (let i = 0, keys = Object.keys(result), len = keys.length; i < len; i++) {
            let key = keys[i],
                obj = result[key];
            if (obj.area < 10) {
                delete result[key];
            }
        }

        return result;
    }
    public kMedoids(objects: Vector[], length: number, k: number, maxStep: number) {
        let distanceMatrix = this.getDistanceMatrix(objects, length),
            usedClisters: IKeyBool = {},
            getUsedClasterId = (clusters: Vector[]) => clusters.map(val => val.id).join("_"),
            getRandomClusters = (vectors: Vector[], amount: number) => {
                let res: number[] = [],
                    len = vectors.length,
                    sorted = vectors.slice(0).sort((a, b) => a.signs.area > b.signs.area ? -1 : 1);
                res.push(Math.round(length / 2));
                while (res.length < amount) {
                    let i = this.getRandom(Math.round(length * 0.25), Math.round(length * 0.75));
                    res.indexOf(i) === -1 && res.push(i);
                }
                return res.map(value => sorted[value]);
            },
            updateVectors = (vectors: Vector[], isNeedToSet: boolean) => {
                for (let i = 0, len = vectors.length; i < len; i++) {
                    let vector = vectors[i];
                    isNeedToSet ? vector.saveNewState() : vector.resetTempValues();
                }
            },
            getBiggestCluster = (data: IClusterData[], isFindBeggest: boolean) => {
                if (data.length === 0) {
                    throw new Error("Cluster data shouldn't be an empty array");
                }
                let biggestCluster = data[0],
                    compare = (len1: number, len2: number) => len1 > len2 ? isFindBeggest : !isFindBeggest;
                for (let i = 1, len = data.length; i < len; i++) {
                    let cluster = data[i];
                    if (compare(cluster.vectors.length, biggestCluster.vectors.length)) {
                        biggestCluster = cluster;
                    }
                }
                return biggestCluster;
            },
            findNewCenters = (data: IClusterData[], currCenters: Vector[], isFindBeggest: boolean) => {
                let currentCenters = currCenters.slice(0),
                    biggestCluster = getBiggestCluster(data, isFindBeggest);
                for (let i = 0, len = currentCenters.length; i < len; i++) {
                    let currentClusterId = currentCenters[i].id;
                    if (currentClusterId !== biggestCluster.clusterId) {
                        continue;
                    }
                    let vectors = biggestCluster.vectors.slice(0).sort((value1, value2) => value1.distanse > value2.distanse ? 1 : -1),
                        randomCluster = vectors[0],
                        tempCenters = currentCenters.slice(0);
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
            },
            centers: Vector[] = getRandomClusters(objects, k);
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
            } else {
                updateVectors(objects, false);
            }
        }

        let centersObject: {[key: number]: Vector} = {};
        let result: { [key: number]: number[] } = {};
        centers.forEach((value, index) => {
            let color = this.colors[index] || this.colors[5];
            centersObject[value.id] = value;
            result[value.id] = [color[0], color[1], color[2], 255];
        });
        let variance = 0.7;

        for (let i = 0; i < length; i ++) {
            let vector = objects[i];
            for (let j = 0, keys = Object.keys(vector.signs), len = keys.length; i < len; i++) {
                let key = keys[j],
                    value = vector.signs[key];
                if (value > (1.0 + variance) * centersObject[vector.cluster].signs[key] || value < (1.0 - variance) * centersObject[vector.cluster].signs[key]) {
                    vector.cluster = -1;
                    break;
                }
            }
        }

        return result;
    }
    private colors: number[][] = [[255, 102, 102], [157, 226, 79], [255, 189, 86], [135, 206, 250], [177, 91, 222], [255, 165, 0] ];
    private getRandom(min: number, max: number) {
        return Math.floor(Math.random() * (max - min)) + min;
    }
    private getDicstance(vec1: Vector, vec2: Vector) {
        let result = 0.0,
            vec1Sign = vec1.signs,
            vec2Sign = vec2.signs,
            square = (value: number) => value * value;
        for (let i = 0, keys = Object.keys(vec1Sign), len = keys.length; i < len; i++) {
            let key = keys[i];
            result += square(vec1Sign[key] - vec2Sign[key]);
        }
        return result;
    }
    private getDistanceMatrix(objects: Vector[], length: number) {
        let result: IDistanceMatrix = {};
        for (let i = 0; i < length; i++) {
            for (let j = 0; j < length; j++) {
                let vec1 = objects[i],
                    vec2 = objects[j],
                    keyVec1 = vec1.id,
                    keyVec2 = vec2.id;
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
    private findNewClustters(objects: Vector[], distanceMatrix: IDistanceMatrix, centers: Vector[]) {
        let result: INewClustesData = {
                totalCost: 0,
                clusters: centers.map(vec => (<IClusterData>{
                    clusterId: vec.id,
                    vectors: [],
                    totalCost: 0
                }))
            },
            getNewCluster = (vector: Vector, centerVectors: Vector[], matrix: IDistanceMatrix) => {
                vector.resetTempValues();
                for (let i = 0, len = centerVectors.length; i < len; i++) {
                    let centerVector = centerVectors[i],
                        distance = matrix[vector.id][centerVector.id];
                    if (vector.tempDistance === undefined || vector.tempDistance > distance) {
                        vector.tempDistance = distance;
                        vector.tempCluster = centerVector.id;
                    }
                }
            },
            addItemToCluster = (vector: Vector, clusters: IClusterData[]) => {
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
        for (let i = 0, len = objects.length; i < len; i ++) {
            getNewCluster(objects[i], centers, distanceMatrix);
        }

        for (let i = 0, len = objects.length; i < len; i ++) {
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