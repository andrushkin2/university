export default class Perceptron {
    private h = 0;
    private inputDemension = 0;
    private outputDemension = 0;
    private trainingElements: TrainingElement[] = [];
    private layers: Layer[] = [];
    private psi: (value: number) => number = (h) => h;
    private dpsi: (value: number) => number = (h) => h;
    private weights: WeightMatrix[] = [];
    constructor(inputDemension: number, outputDemension: number) {
        this.inputDemension = inputDemension;
        this.outputDemension = outputDemension;

        this.layers.push(new Layer(inputDemension));
        this.h = 1;
    }
    public addHiddenLayer(layerSize: number) {
        this.layers.push(new Layer(layerSize));
        this.h++;
    }
    public setPSI(psi: (value: number) => number, dpsi: (value: number) => number) {
        this.psi = (value: number) => psi(value);
        this.dpsi = (value: number) => dpsi(value);
    }
    public initOuputLayer() {
        this.layers.push(new Layer(this.outputDemension));
        this.h++;
        // reset weights
        this.resetWeights();
    }
    public startTraining(learningSpeed: number) {
        let trainingSetError = 0;
        for (let t = 0, len = this.trainingElements.length; t < len; t++) {
            let trainingElement = this.trainingElements[t],
                elementInput = trainingElement.in,
                elementOutput = trainingElement.out;

            // classify current element
            let foundOutput = this.classifyElement(elementInput);

            // calc global error
            let err = 0;
            for (let i = 0, subLen = foundOutput.length; i < subLen; i++) {
                err += Math.pow(elementOutput[i] - foundOutput[i], 2);
            }
            trainingSetError += err * err;

            // calc error for output layer
            for (let i = 0; i < this.layers[this.h - 1].size; i++) {
                this.layers[this.h - 1].err[i] = elementOutput[i] - foundOutput[i];
            }

            // backpropogate error
            for (let h = this.h - 2; h >= 0; h--) {
                this.updateLayerErrors(h);
            }

            // update weights
            for (let h = 1; h < this.h; h++) {
                this.updateWeights(h, learningSpeed);
            }
        }
        return Math.sqrt(trainingSetError);
    }
    private updateLayerErrors(h: number) {
        let w = this.weights[h],
            inputSize = w.inputSize,
            weights = w.w,
            layer = this.layers[h],
            layerError = layer.err,
            layerInput = layer.in;

        for (let i = 0, len = layer.size; i < len; i++) {
            let sum = 0,
                nextLayer = this.layers[h + 1],
                nextLayerErrors = nextLayer.err;

            for (let j = 0, jLen = nextLayer.size; j < jLen; j++) {
                sum += weights[j * inputSize + i] * nextLayerErrors[j];
            }

            layerError[i] = this.dpsi(layerInput[i]) * sum;
        }
    }
    private updateWeights(h: number, learningSpeed: number) {
        let w = this.weights[h - 1],
            wInputSize = w.inputSize,
            weights = w.w,
            layerError = this.layers[h].err,
            prevLayerOutput = this.layers[h - 1].out;

        for (let i = 0, len = w.outputSize; i < len; i++) {
            for (let j = 0, jLen = wInputSize; j < jLen; j++) {
                let dw = learningSpeed * (layerError[i] * prevLayerOutput[j]);
                weights[i * wInputSize + j] += dw;
            }
        }
    }
    public setTrainingElements(trainingElements: TrainingElement[]) {
        this.trainingElements = trainingElements;
    }
    private resetWeights() {
        this.weights = [];
        for (let h = 0; h < this.h - 1; h++) {
            let dim0 = this.layers[h].size,
                dim1 = this.layers[h + 1].size;
            this.weights.push(new WeightMatrix(dim0, dim1, 1.0));
        }
    }
    public classifyElement(x: number[]) {
        let h: number;
        if (x.length === this.inputDemension) {
            let layerOutput = this.layers[0].out;
            // update first layer output
            for (let i = 0; i < this.inputDemension; i++) {
                layerOutput[i] = x[i];
            }
            // update input/output of all layers
            for (let i = 1; i < this.h; i++) {
                this.updateLayerInput(i);
                this.updateLayerOutput(i);
            }

            return this.layers[this.h - 1].out;
        }
        return x;
    }
    private updateLayerInput(layerIndex: number) {
        if (layerIndex > 0 && layerIndex < this.h) {
            let weightPrev = this.weights[layerIndex - 1].w,
                wPrevInputSize = this.weights[layerIndex - 1].inputSize,
                layer = this.layers[layerIndex],
                layerInput = layer.in;

            for (let i = 0, len = layer.size; i < len; i++) {
                layerInput[i] = 0;

                let weightIndex = i * wPrevInputSize,
                    prevLayer = this.layers[layerIndex - 1],
                    prevLayerOutput = prevLayer.out;

                for (let j = 0, jLen = prevLayer.size; j < jLen; j++) {
                    layerInput[i] += prevLayerOutput[j] * weightPrev[weightIndex + j];
                }
            }
        }
    }
    private updateLayerOutput(layerIndex: number) {
        let layer = this.layers[layerIndex],
            output = layer.out,
            inpit = layer.in;
        for (let i = 0, len = layer.size; i < len; i++) {
            output[i] = this.psi(inpit[i]);
        }
    }
}

class WeightMatrix {
    public inputSize = 0;
    public outputSize = 0;
    public w: number[] = [];
    constructor(inputDim: number, outputDim: number, widthScale: number) {
        this.w = [];
        this.inputSize = inputDim;
        this.outputSize = outputDim;
        for (let i = 0, len = inputDim * outputDim; i < len; i++) {
            this.w.push(2 * widthScale * Math.random() - widthScale);
        }
    }
}

class Layer {
    private count = 0;
    private input: number[] = [];
    private output: number[] = [];
    private error: number[] = [];
    constructor(count: number) {
        this.count = count;
        for (let i = 0; i < count; i++) {
            this.input.push(0);
            this.output.push(0);
            this.error.push(0);
        }
    }
    get size() {
        return this.count;
    }
    get in() {
        return this.input;
    }
    get out() {
        return this.output;
    }
    get err() {
        return this.error;
    }
}


export class TrainingElement {
    private input: number[];
    private output: number[];
    constructor(input: number[], output: number[]) {
        this.input = input.slice(0);
        this.output = output.slice(0);
    }
    get in() {
        return this.input;
    }
    get out() {
        return this.output;
    }
}