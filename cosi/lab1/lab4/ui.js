"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const uiItems_1 = require("../mod/lab2/uiItems");
const svgPicture_1 = require("./svgPicture");
const perceptron_1 = require("./perceptron");
let runButtonId = "lab7RunButton", lab7FindButton = "lab7FindButton", containerId = "lab7COntainerId", lab7COntainer1Id = "lab7COntainer1Id", lab7FormId = "lab7FormId", lab7FormOutputId = "lab7FormOutputId", ui = {
    id: "lab7",
    type: "space",
    rows: [
        {
            type: "toolbar",
            height: 50,
            cols: [
                uiItems_1.getButton(runButtonId, "Training"),
                uiItems_1.getForm(lab7FormId, [
                    uiItems_1.getTextField("error", "Error:", 0.001)
                ])
            ]
        },
        {
            template: `<div id="${lab7COntainer1Id}" style="width: 100:; height: auto; overflow-y: auto; padding: 5px; background: grey;"></div>`
        },
        {
            type: "toolbar",
            height: 50,
            cols: [
                uiItems_1.getButton(lab7FindButton),
                uiItems_1.getForm(lab7FormOutputId, [
                    uiItems_1.getTextField("1", "1:", 0),
                    uiItems_1.getTextField("2", "2:", 0),
                    uiItems_1.getTextField("3", "3:", 0),
                    uiItems_1.getTextField("4", "4:", 0),
                    uiItems_1.getTextField("5", "5:", 0)
                ])
            ]
        }
    ]
}, d = [
    [1, 1, 0, 0, 0, 0],
    [1, 0, 1, 0, 0, 0],
    [1, 0, 1, 0, 0, 0],
    [1, 0, 1, 0, 0, 0],
    [1, 0, 1, 0, 0, 0],
    [1, 1, 0, 0, 0, 0]
], f = [
    [1, 1, 1, 1, 0, 0],
    [1, 0, 0, 0, 0, 0],
    [1, 0, 0, 0, 0, 0],
    [1, 1, 0, 0, 0, 0],
    [1, 0, 0, 0, 0, 0],
    [1, 0, 0, 0, 0, 0]
], iLatter = [
    [0, 1, 1, 1, 0, 0],
    [0, 0, 1, 0, 0, 0],
    [0, 0, 1, 0, 0, 0],
    [0, 0, 1, 0, 0, 0],
    [0, 0, 1, 0, 0, 0],
    [0, 1, 1, 1, 0, 0]
], nLatter = [
    [1, 0, 0, 0, 0, 1],
    [1, 1, 0, 0, 0, 1],
    [1, 0, 1, 0, 0, 1],
    [1, 0, 0, 1, 0, 1],
    [1, 0, 0, 0, 1, 1],
    [1, 0, 0, 0, 0, 1]
], p = [
    [1, 1, 1, 0, 0, 0],
    [1, 0, 0, 1, 0, 0],
    [1, 0, 0, 1, 0, 0],
    [1, 1, 1, 0, 0, 0],
    [1, 0, 0, 0, 0, 0],
    [1, 0, 0, 0, 0, 0]
], initLab7 = () => {
    let container1 = document.querySelector(`#${lab7COntainer1Id}`), runButton = $$(runButtonId), form = $$(lab7FormId), a = 0.5, psi = (value) => 1.0 / (1.0 + Math.exp(-a * value)), dpsi = (value) => psi(value) * (1.0 - psi(value));
    let perceprtor = new perceptron_1.default(36, 5), trainingElements = [], setTrainElement = (image, n) => {
        if (!trainingElements[n]) {
            trainingElements[n] = new perceptron_1.TrainingElement([], []);
        }
        let trainingElement = trainingElements[n];
        for (let i = 0, k = 0; i < 6; i++) {
            for (let j = 0; j < 6; j++, k++) {
                trainingElement.in[k] = image[i][j];
            }
        }
        for (let i = 0; i < 5; i++) {
            if (i !== n) {
                trainingElement.out[i] = 0.0;
            }
            else {
                trainingElement.out[i] = 1.0;
            }
        }
    };
    [d, f, iLatter, nLatter, p].forEach((value, n) => {
        setTrainElement(value, n);
        let svg = new svgPicture_1.default();
        svg.updateValues(value);
        container1.appendChild(svg.container);
    });
    perceprtor.addHiddenLayer(40);
    perceprtor.setPSI(psi, dpsi);
    perceprtor.init();
    runButton.attachEvent("onItemClick", () => {
        debugger;
        perceprtor.setTrainingSet(trainingElements);
        let error;
        do {
            error = perceprtor.train(0.2);
        } while (error > 0.005);
    });
};
exports.ui = ui;
exports.initLab7 = initLab7;
