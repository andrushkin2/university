"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const uiItems_1 = require("../mod/lab2/uiItems");
let runButtonId = "lab7RunButton", containerId = "lab7COntainerId", lab7COntainer1Id = "lab7COntainer1Id", lab7FormId = "lab7FormId", ui = {
    id: "lab7",
    type: "space",
    rows: [
        {
            type: "toolbar",
            height: 50,
            cols: [
                uiItems_1.getButton(runButtonId),
                uiItems_1.getForm(lab7FormId, [
                    uiItems_1.getTextField("error", "Error:", 0.001)
                ])
            ]
        },
        {
            template: `<div id="${lab7COntainer1Id}" style="width: 100%; height: 100%; overflow-y: auto;"></div>`
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
}, initLab7 = () => {
    let container = document.querySelector(`#${containerId}`), container1 = document.querySelector(`#${lab7COntainer1Id}`), runButton = $$(runButtonId), form = $$(lab7FormId);
    runButton.attachEvent("onItemClick", () => {
    });
};
exports.ui = ui;
exports.initLab7 = initLab7;
