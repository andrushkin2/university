
export default class NetworkUtils {
    readonly lower = -1;
    readonly upper = 1;
    public learnNetwork(images: number[][][], size: number) {
        let result: number[][] = [],
            flattenImages: number[][] = images.map(image => this.toFlattenArray(image));
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
    private toFlattenArray(array: number[][]) {
        let res: number[] = [];
        for (let i = 0, len = array.length; i < len; i++) {
            res = res.concat(array[i]);
        }
        return res;
    }
    public recognize(image: number[][], weightMatrix: number[][]) {
        let isDoSearch = true,
            flattenImage = this.toFlattenArray(image);
        while (isDoSearch) {
            isDoSearch = this.step(flattenImage, weightMatrix);
        }
    }
    private step(flattenImage: number[], matrix: number[][]) {
        let isChanged = false;

        for (let i = 0, len = flattenImage.length; i < len; i++) {
            let oldValue = flattenImage[i];
            let newValue = this.calculate(flattenImage, matrix[i]);
            flattenImage[i] = newValue;
            isChanged = newValue !== oldValue || isChanged;
        }

        return isChanged;
    }
    private calculate(flattenArray: number[], matrixRow: number[]) {
        let val = flattenArray.reduce((prev, current, index) => prev + matrixRow[index], 0.0);
        return val > 0 ? this.upper : this.lower;
    }
}