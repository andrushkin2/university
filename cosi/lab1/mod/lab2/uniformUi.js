"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const uiItems_1 = require("./uiItems");
let defaultData = {
    a: 5,
    b: 10,
    n: 1000
}, uniformRunButtonId = "uniformRunID", uniformFormId = "uniformFormId", uniformOutPutFormId = "uniformOutputFromId", uniformChartId = "uniformChartId", uniformUi = {
    type: "space",
    rows: [
        {
            type: "toolbar",
            css: "bg_panel",
            cols: [
                uiItems_1.getButton(uniformRunButtonId),
                uiItems_1.getForm(uniformFormId, [
                    uiItems_1.getTextField("a", "A:", defaultData.a),
                    uiItems_1.getTextField("b", "B:", defaultData.b),
                    uiItems_1.getTextField("an", "N:", defaultData.n)
                ]),
                {}
            ]
        },
        uiItems_1.getForm(uniformOutPutFormId, [
            uiItems_1.getTextField("mX", "Mx:"),
            uiItems_1.getTextField("dX", "Dx:")
        ], true),
        uiItems_1.getChart(uniformChartId),
        {}
    ]
}, initFunction = () => {
    let form = $$(uniformFormId);
    $$(uniformRunButtonId).attachEvent("onItemClick", function () {
        let data = form.getValues();
        if (!data.a) {
            webix.message("a is not valid");
        }
    });
};
exports.uniformRunButtonId = uniformRunButtonId;
exports.uniformFormId = uniformFormId;
exports.uniformOutPutFormId = uniformOutPutFormId;
exports.uniformChartId = uniformChartId;
exports.uniformUi = uniformUi;
