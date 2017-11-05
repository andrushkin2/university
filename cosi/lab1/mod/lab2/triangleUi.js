"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const uiItems_1 = require("./uiItems");
const modTest_1 = require("../modTest");
let defaultData = {
    a: 2.5,
    b: 18,
    count: 10000
}, triangleRunButtonId = "triangleRunID", triangleFormId = "triangleFormId", triangleOutPutFormId = "triangleOutputFromId", triangleChartId = "triangleChartId", triangleUi = {
    type: "space",
    rows: [
        {
            type: "toolbar",
            css: "bg_panel",
            cols: [
                uiItems_1.getButton(triangleRunButtonId),
                uiItems_1.getForm(triangleFormId, [
                    uiItems_1.getTextField("a", "A:", defaultData.a),
                    uiItems_1.getTextField("b", "B:", defaultData.b),
                    uiItems_1.getTextField("count", "Count:", defaultData.count)
                ]),
                {}
            ]
        },
        uiItems_1.getForm(triangleOutPutFormId, [
            uiItems_1.getTextField("mX", "Mx:"),
            uiItems_1.getTextField("dX", "Dx:")
        ], true),
        uiItems_1.getChart(triangleChartId),
        {}
    ]
}, initFunction = () => {
    let form = $$(triangleFormId), formOutput = $$(triangleOutPutFormId), chart = $$(triangleChartId), utils = new modTest_1.default();
    $$(triangleRunButtonId).attachEvent("onItemClick", function () {
        let data = form.getValues(), results = utils.triangleDistribution(parseInt(data.a), parseInt(data.b), parseInt(data.count)), mX = utils.getMx(results), dX = utils.getDx(results, mX), chartData = utils.getChartData(results);
        formOutput.setValues({ mX, dX });
        chart.show();
        chart.clearAll();
        chart.parse(chartData, "json");
    });
};
exports.triangleUi = triangleUi;
exports.initFunction = initFunction;
