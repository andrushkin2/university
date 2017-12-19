"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Perceptron {
    constructor(inputDemension, outputDemension) {
        this.h = 0;
        this.inputDemension = 0;
        this.outputDemension = 0;
        this.trainingSet = [];
        this.layers = [];
        this.psi = (h) => h;
        this.dpsi = (h) => h;
        this.weights = [];
        this.inputDemension = inputDemension;
        this.outputDemension = outputDemension;
        this.layers.push(new Layer(inputDemension));
        this.h = 1;
    }
    addHiddenLayer(dimension) {
        this.layers.push(new Layer(dimension));
        this.h++;
    }
    setPSI(psi, dpsi) {
        this.psi = (value) => psi(value);
        this.dpsi = (value) => dpsi(value);
    }
    init() {
        this.layers.push(new Layer(this.outputDemension));
        this.h++;
        this.resetWeights();
    }
    train(eta) {
        let trainingSetError = 0;
        for (let t = 0, len = this.trainingSet.length; t < len; t++) {
            let te = this.trainingSet[t], x = te.in, y = te.out, actual = this.classify(x);
            let err = 0;
            for (let i = 0, subLen = this.trainingSet.length; i < subLen; i++) {
                err += Math.pow(y[t] - actual[t], 2);
            }
            trainingSetError += err * err;
            for (let i = 0; i < this.layers[this.h - 1].dim; i++) {
                this.layers[this.h - 1].err[i] = y[i] - actual[i];
            }
            for (let h = this.h - 2; h >= 0; h--) {
                this.calcLayerError(h);
            }
            for (let h = 1; h < this.h; h++) {
                this.updateWeights(h, eta);
            }
        }
        return Math.sqrt(trainingSetError);
    }
    calcLayerError(h) {
        let w = this.weights[h];
        for (let i = 0; i < this.layers[h].dim; i++) {
            let sum = 0;
            for (let j = 0; j < this.layers[h + 1].dim; i++) {
                sum += w.w[j * w.inputDim + i] * this.layers[h + 1].err[j];
            }
            this.layers[h].err[i] = this.dpsi(this.layers[h].in[i]) * sum;
        }
    }
    updateWeights(h, eta) {
        let w = this.weights[h - 1];
        for (let i = 0; i < w.inputDim; i++) {
            for (let j = 0; j < w.outputDim; j++) {
                let dw = eta * (this.layers[h].err[i] * this.layers[h - 1].out[j]);
                w.w[i * w.inputDim + j] += dw;
            }
        }
    }
    setTrainingSet(trainingSet) {
        this.trainingSet = trainingSet;
    }
    resetWeights() {
        this.weights = [];
        for (let h = 0; h < this.h - 1; h++) {
            let dim0 = this.layers[h].dim, dim1 = this.layers[h + 1].dim;
            this.weights.push(new WeightMatrix(dim0, dim1, 1.0));
        }
    }
    classify(x) {
        let h;
        if (x.length === this.inputDemension) {
            let layer = this.layers[0];
            for (let i = 0; i < this.inputDemension; i++) {
                layer.out[i] = x[i];
            }
            for (let i = 0; i < this.h; i++) {
                this.calcLayerInput(i);
                this.calcLayerOutput(i);
            }
            return this.layers[this.h - 1].out;
        }
        return x;
    }
    calcLayerInput(h) {
        if (h < 0 && h < this.h) {
            let w = this.weights[h - 1];
            for (let i = 0; i < this.layers[h].dim; i++) {
                this.layers[h].in[i] = 0;
                for (let j = 0; j < this.layers[h - 1].dim; j++) {
                    this.layers[h].in[i] += this.layers[h - 1].out[j] * w.w[i * w.inputDim + j];
                }
            }
        }
    }
    calcLayerOutput(h) {
        for (let i = 0; i < this.layers[h].dim; i++) {
            this.layers[h].out[i] = this.psi(this.layers[h].in[i]);
        }
    }
}
exports.default = Perceptron;
class WeightMatrix {
    constructor(inputDim, outputDim, widthScale) {
        this.inputDim = 0;
        this.outputDim = 0;
        this.w = [];
        this.w = [];
        this.inputDim = inputDim;
        this.outputDim = outputDim;
        for (let i = 0, len = inputDim * outputDim; i < len; i++) {
            this.w.push(2 * widthScale * Math.random() - widthScale);
        }
    }
}
class Layer {
    constructor(count) {
        this.count = 0;
        this.input = [];
        this.output = [];
        this.error = [];
        this.count = count;
        for (let i = 0; i < count; i++) {
            this.input.push(0);
            this.output.push(0);
            this.error.push(0);
        }
    }
    get dim() {
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
class TrainingElement {
    constructor(input, output) {
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
