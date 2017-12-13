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
        return val > 0 ? this.upper : val === 0 ? 0 : this.lower;
    }
}
exports.default = NetworkUtils;
