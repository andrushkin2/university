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
                let calcValue = flattenImages.reduce((prev, image) => prev + (image[i] * image[j]), 0.0);
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
    recognize(image, weightMatrix) {
        let isDoSearch = true, flattenImage = this.toFlattenArray(image);
        while (isDoSearch) {
            isDoSearch = this.step(flattenImage, weightMatrix);
        }
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
        let val = flattenArray.reduce((prev, current, index) => prev + matrixRow[index], 0.0);
        return val > 0 ? this.upper : this.lower;
    }
}
exports.default = NetworkUtils;
