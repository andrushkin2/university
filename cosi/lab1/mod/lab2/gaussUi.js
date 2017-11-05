"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const uiItems_1 = require("./uiItems");
const modTest_1 = require("../modTest");
let defaultData = {
    m: 5,
    a: 10,
    n: 6,
    count: 10000
}, gaussRunButtonId = "gaussRunID", gaussFormId = "gaussFormId", gaussOutPutFormId = "gaussOutputFromId", gaussChartId = "gaussChartId", gaussUi = {
    type: "space",
    rows: [
        {
            type: "toolbar",
            css: "bg_panel",
            cols: [
                uiItems_1.getButton(gaussRunButtonId),
                uiItems_1.getForm(gaussFormId, [
                    uiItems_1.getTextField("m", "M:", defaultData.m),
                    uiItems_1.getTextField("a", "A:", defaultData.a),
                    uiItems_1.getTextField("n", "N:", defaultData.n),
                    uiItems_1.getTextField("count", "Count:", defaultData.count)
                ]),
                {}
            ]
        },
        uiItems_1.getForm(gaussOutPutFormId, [
            uiItems_1.getTextField("mX", "Mx:"),
            uiItems_1.getTextField("dX", "Dx:")
        ], true),
        uiItems_1.getChart(gaussChartId),
        {}
    ]
}, initFunction = () => {
    let form = $$(gaussFormId), formOutput = $$(gaussOutPutFormId), chart = $$(gaussChartId), utils = new modTest_1.default();
    $$(gaussRunButtonId).attachEvent("onItemClick", function () {
        let data = form.getValues(), results = utils.gaussDistribution(parseInt(data.m), parseInt(data.a), parseInt(data.count), parseInt(data.n)), mX = utils.getMx(results), dX = utils.getDx(results, mX), chartData = utils.getChartData(results);
        formOutput.setValues({ mX, dX });
        chart.show();
        chart.clearAll();
        chart.parse(chartData, "json");
    });
};
exports.gaussUi = gaussUi;
exports.initFunction = initFunction;
