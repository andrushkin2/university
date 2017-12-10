"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const uiItems_1 = require("../lab2/uiItems");
const logic_1 = require("./logic");
let runLab3Id = "runLab3Id", formLab3Id = "formLab3Id", formOutputLab3Id = "formOutputLab3Id", ui = {
    rows: [
        {
            type: "toolbar",
            css: "bg_panel",
            cols: [
                uiItems_1.getButton(runLab3Id),
                uiItems_1.getForm(formLab3Id, [
                    uiItems_1.getTextField("p1", "P1:", 0.6),
                    uiItems_1.getTextField("p2", "P2:", 0.5),
                    uiItems_1.getTextField("ticks", "Ticks:", 10000)
                ])
            ]
        },
        {
            cols: [
                uiItems_1.getForm(formOutputLab3Id, [
                    uiItems_1.getTextField("a", "A:", 0),
                    uiItems_1.getTextField("l", "L:", 0)
                    // getTextField("ticks", "Ticks:", 1000)
                ], true)
            ]
        }
    ]
}, initLab3 = () => {
    let runButton = $$(runLab3Id), formInput = $$(formLab3Id), formOutput = $$(formOutputLab3Id), parser = new logic_1.default();
    runButton.attachEvent("onItemClick", () => {
        let inputData = formInput.getValues();
        let result = parser.calcValues(parseFloat(inputData.p1), parseFloat(inputData.p2), parseInt(inputData.ticks));
        formOutput.setValues({
            a: result.a,
            l: result.l
        });
    });
};
exports.runLab3Id = runLab3Id;
exports.formLab3Id = formLab3Id;
exports.formOutputLab3Id = formOutputLab3Id;
exports.ui = ui;
exports.initLab3 = initLab3;
