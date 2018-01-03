"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const uiItems_1 = require("../mod/lab2/uiItems");
const svgPicture_1 = require("./svgPicture");
const perceptron_1 = require("./perceptron");
let runButtonId = "lab7RunButton", runButton2Id = "runButton2Id", lab7FindButton = "lab7FindButton", containerId = "lab7COntainerId", lab7COntainer1Id = "lab7COntainer1Id", lab7COntainer2Id = "lab7COntainer2Id", lab7FormId = "lab7FormId", lab7FormOutputId = "lab7FormOutputId", ui = {
    id: "lab7",
    type: "space",
    rows: [
        {
            type: "toolbar",
            height: 70,
            cols: [
                uiItems_1.getButton(runButtonId, "Start training"),
                uiItems_1.getForm(lab7FormId, [
                    uiItems_1.getTextField("error", "Error:", 0.001)
                ]),
                {}
            ]
        },
        {
            height: 150,
            template: `<div id="${lab7COntainer1Id}" style="width: 100%; height: auto; overflow-y: auto; padding: 5px; background: #f1f1f1;"></div>`
        },
        {
            type: "toolbar",
            height: 70,
            cols: [
                uiItems_1.getForm(lab7FormOutputId, [
                    uiItems_1.getTextField("1", "1:", 0),
                    uiItems_1.getTextField("2", "2:", 0),
                    uiItems_1.getTextField("3", "3:", 0),
                    uiItems_1.getTextField("4", "4:", 0),
                    uiItems_1.getTextField("5", "5:", 0)
                ]),
                {
                    gravity: 0.4
                }
            ]
        },
        {
            cols: [
                {
                    type: "toolbar",
                    height: 70,
                    cols: [
                        uiItems_1.getButton(runButton2Id, "Classify", 150)
                    ]
                },
                {
                    height: 150,
                    width: 150,
                    template: `<div id="${lab7COntainer2Id}" style="width: 100%; height: auto; overflow-y: auto; padding: 5px; background: #f1f1f1;"></div>`
                }
            ]
        }
    ]
}, up = [
    [0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0],
    [0, 0, 1, 1, 0, 0],
    [0, 1, 1, 1, 1, 0],
    [1, 1, 0, 0, 1, 1],
    [1, 0, 0, 0, 0, 1]
], down = [
    [0, 0, 0, 0, 0, 0],
    [1, 0, 0, 0, 0, 1],
    [1, 1, 0, 0, 1, 1],
    [0, 1, 1, 1, 1, 0],
    [0, 0, 1, 1, 0, 0],
    [0, 0, 0, 0, 0, 0]
], rewindE = [
    [0, 1, 1, 1, 1, 0],
    [0, 0, 0, 0, 1, 0],
    [0, 0, 1, 1, 1, 0],
    [0, 0, 0, 0, 1, 0],
    [0, 0, 0, 0, 1, 0],
    [0, 1, 1, 1, 1, 0]
], right = [
    [0, 0, 0, 0, 0, 0],
    [0, 1, 1, 1, 1, 1],
    [1, 0, 0, 0, 0, 0],
    [1, 0, 0, 0, 0, 0],
    [0, 1, 1, 1, 1, 1],
    [0, 0, 0, 0, 0, 0]
], left = [
    [0, 0, 0, 0, 0, 0],
    [1, 1, 1, 1, 1, 0],
    [0, 0, 0, 0, 0, 1],
    [0, 0, 0, 0, 0, 1],
    [1, 1, 1, 1, 1, 0],
    [0, 0, 0, 0, 0, 0]
], initLab7 = () => {
    let container1 = document.querySelector(`#${lab7COntainer1Id}`), container2 = document.querySelector(`#${lab7COntainer2Id}`), runButton = $$(runButtonId), addNoise = $$(runButton2Id), form = $$(lab7FormId), formOutput = $$(lab7FormOutputId), isLearned = false, a = 0.5, psi = (value) => 1.0 / (1.0 + Math.exp(-a * value)), dpsi = (value) => psi(value) * (1.0 - psi(value));
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
    }, toFlattenArray = (array) => {
        let res = [];
        for (let i = 0, len = array.length; i < len; i++) {
            res = res.concat(array[i]);
        }
        return res;
    }, classify = () => {
        let res = perceprtor.classifyElement(toFlattenArray(activeState));
        formOutput.setValues({
            "1": res[0],
            "2": res[1],
            "3": res[2],
            "4": res[3],
            "5": res[4]
        });
    }, getRandomInt = (min, max) => Math.floor(Math.random() * (max - min)) + min, addNoiseToImage = (image) => {
        let i = getRandomInt(0, 6), j = getRandomInt(0, 6), value = image[i][j], result = image.slice(0);
        result[i][j] = value === 0 ? 1 : 0;
        return result;
    };
    [up, down, rewindE, right, left].forEach((value, n) => {
        setTrainElement(value, n);
        let svg = new svgPicture_1.default();
        svg.updateValues(value);
        svg.container.addEventListener("click", () => {
            activeState = value.slice(0);
            activeSvgEl.updateValues(activeState);
            if (isLearned) {
                classify();
            }
        }, false);
        container1.appendChild(svg.container);
    });
    let activeSvgEl = new svgPicture_1.default(), activeState = up.slice(0);
    container2.appendChild(activeSvgEl.container);
    activeSvgEl.updateValues(activeState);
    perceprtor.addHiddenLayer(40);
    perceprtor.setPSI(psi, dpsi);
    perceprtor.initOuputLayer();
    runButton.attachEvent("onItemClick", () => {
        perceprtor.setTrainingElements(trainingElements);
        let error;
        do {
            error = perceprtor.startTraining(0.2);
        } while (error > 0.005);
        form.setValues({ error });
        isLearned = true;
        runButton.disable();
    });
    addNoise.attachEvent("onItemClick", () => {
        if (!isLearned) {
            webix.message({
                type: "error",
                text: "The network has not learned yet"
            });
            return;
        }
        activeState = addNoiseToImage(activeState);
        activeSvgEl.updateValues(activeState);
        classify();
    });
};
exports.ui = ui;
exports.initLab7 = initLab7;
