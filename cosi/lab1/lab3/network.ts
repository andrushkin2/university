
export default class NetworkUtils {
    public learnNetwork(images: number[][][], size: number) {
        let result: number[][] = [],
            flattenImages: number[][] = images.map(image => this.toFlattenArray(image));
        for (let i = 0; i < size; i++) {
            for (let j = 0; j < i; j++) {
                let calcValue = flattenImages.reduce((prev, image) => prev + (image[i] * image[j]), 0.0);
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
        
    }
}