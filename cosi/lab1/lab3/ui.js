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
                        template: `<div id="${containerId}" style="width: 100%; height: 100%;"></div>`
                    }
                }
            ]
        }
    ]
}, t = [
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 1, 1, 1, 1, 1, 1, 0, 0],
    [0, 0, 1, 1, 1, 1, 1, 1, 0, 0],
    [0, 0, 0, 0, 1, 1, 0, 0, 0, 0],
    [0, 0, 0, 0, 1, 1, 0, 0, 0, 0],
    [0, 0, 0, 0, 1, 1, 0, 0, 0, 0],
    [0, 0, 0, 0, 1, 1, 0, 0, 0, 0],
    [0, 0, 0, 0, 1, 1, 0, 0, 0, 0],
    [0, 0, 0, 0, 1, 1, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
], b = [
    [0, 0, 1, 1, 1, 1, 1, 0, 0, 0],
    [0, 0, 1, 1, 1, 1, 1, 1, 0, 0],
    [0, 0, 1, 1, 0, 0, 1, 1, 0, 0],
    [0, 0, 1, 1, 0, 0, 1, 1, 0, 0],
    [0, 0, 1, 1, 1, 1, 1, 0, 0, 0],
    [0, 0, 1, 1, 1, 1, 1, 0, 0, 0],
    [0, 0, 1, 1, 0, 0, 1, 1, 0, 0],
    [0, 0, 1, 1, 0, 0, 1, 1, 0, 0],
    [0, 0, 1, 1, 1, 1, 1, 1, 0, 0],
    [0, 0, 1, 1, 1, 1, 1, 0, 0, 0]
], l = [
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 1, 1, 1, 1, 1, 1, 0, 0],
    [0, 0, 1, 1, 1, 1, 1, 1, 0, 0],
    [0, 0, 1, 1, 0, 0, 1, 1, 0, 0],
    [0, 0, 1, 1, 0, 0, 1, 1, 0, 0],
    [0, 0, 1, 1, 0, 0, 1, 1, 0, 0],
    [0, 0, 1, 1, 0, 0, 1, 1, 0, 0],
    [0, 1, 1, 1, 0, 0, 1, 1, 0, 0],
    [0, 1, 1, 1, 0, 0, 1, 1, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
], initLab6 = () => {
    let container = document.querySelector(`#${containerId}`), runButton = $$(runButtonId), network = new network_1.default();
    runButton.attachEvent("onItemClick", () => {
        let weights = network.learnNetwork([t, b, l], 100);
        debugger;
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
