"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const uiItems_1 = require("../mod/lab2/uiItems");
const svgElement_1 = require("./svgElement");
const network_1 = require("./network");
let runButtonId = "lab6RunButton", containerId = "lab6COntainerId", ui = {
    id: "lab6",
    type: "space",
    rows: [
        {
            type: "toolbar",
            height: 50,
            cols: [
                uiItems_1.getButton(runButtonId)
            ]
        },
        {
            rows: [
                {
                    view: "scrollview",
                    height: 1000,
                    scroll: "auto",
                    type: "space",
                    body: {
                        type: "space",
                        template: `<div id="${containerId}" style="width: 100%; height: 100%; overflow-y: auto;"></div>`
                    }
                }
            ]
        }
    ]
}, t = [
    [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
    [-1, -1, 1, 1, 1, 1, 1, 1, -1, -1],
    [-1, -1, 1, 1, 1, 1, 1, 1, -1, -1],
    [-1, -1, -1, -1, 1, 1, -1, -1, -1, -1],
    [-1, -1, -1, -1, 1, 1, -1, -1, -1, -1],
    [-1, -1, -1, -1, 1, 1, -1, -1, -1, -1],
    [-1, -1, -1, -1, 1, 1, -1, -1, -1, -1],
    [-1, -1, -1, -1, 1, 1, -1, -1, -1, -1],
    [-1, -1, -1, -1, 1, 1, -1, -1, -1, -1],
    [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1]
], b = [
    [-1, -1, 1, 1, 1, 1, 1, -1, -1, -1],
    [-1, -1, 1, 1, 1, 1, 1, 1, -1, -1],
    [-1, -1, 1, 1, -1, -1, 1, 1, -1, -1],
    [-1, -1, 1, 1, -1, -1, 1, 1, -1, -1],
    [-1, -1, 1, 1, 1, 1, 1, -1, -1, -1],
    [-1, -1, 1, 1, 1, 1, 1, -1, -1, -1],
    [-1, -1, 1, 1, -1, -1, 1, 1, -1, -1],
    [-1, -1, 1, 1, -1, -1, 1, 1, -1, -1],
    [-1, -1, 1, 1, 1, 1, 1, 1, -1, -1],
    [-1, -1, 1, 1, 1, 1, 1, -1, -1, -1]
], l = [
    [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
    [-1, -1, 1, 1, 1, 1, 1, 1, -1, -1],
    [-1, -1, 1, 1, 1, 1, 1, 1, -1, -1],
    [-1, -1, 1, 1, -1, -1, 1, 1, -1, -1],
    [-1, -1, 1, 1, -1, -1, 1, 1, -1, -1],
    [-1, -1, 1, 1, -1, -1, 1, 1, -1, -1],
    [-1, -1, 1, 1, -1, -1, 1, 1, -1, -1],
    [-1, 1, 1, 1, -1, -1, 1, 1, -1, -1],
    [-1, 1, 1, 1, -1, -1, 1, 1, -1, -1],
    [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1]
], initLab6 = () => {
    let container = document.querySelector(`#${containerId}`), runButton = $$(runButtonId), network = new network_1.default(), clearRowItems = () => {
        let elements = container.querySelectorAll(`.rowItem`);
        for (let len = elements.length - 1, i = len; i >= 0; i--) {
            container.removeChild(elements[i]);
        }
    }, weights;
    runButton.attachEvent("onItemClick", () => {
        clearRowItems();
        weights = weights || network.learnNetwork([t, b, l], 100);
        let images = [t, b, l], percentage = [10, 20, 30, 35, 40, 45, 50, 55, 60, 65, 70, 80, 90, 100];
        for (let i = 0; i < 3; i++) {
            let image = images[i];
            for (let k = 0, len = percentage.length; k < len; k++) {
                let persent = percentage[k], noise = network.getNoise(image, persent, 10), foundImage = network.recognize(noise, weights), rowItem = new svgElement_1.SvgRow(persent);
                rowItem.updateRow(noise, foundImage);
                container.appendChild(rowItem.container);
            }
        }
    });
    let testSVG = new svgElement_1.default();
    container.appendChild(testSVG.container);
    testSVG.updateValues(t);
    let testSVG1 = new svgElement_1.default();
    container.appendChild(testSVG1.container);
    testSVG1.updateValues(b);
    let testSVG2 = new svgElement_1.default();
    container.appendChild(testSVG2.container);
    testSVG2.updateValues(l);
};
exports.ui = ui;
exports.initLab6 = initLab6;
