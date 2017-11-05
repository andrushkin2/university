"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const uiItems_1 = require("./uiItems");
const modTest_1 = require("../modTest");
let defaultData = {
    a: 18,
    b: 30,
    count: 10000
}, simpsonRunButtonId = "simpsonRunID", simpsonFormId = "simpsonFormId", simpsonOutPutFormId = "simpsonOutputFromId", simpsonChartId = "simpsonChartId", simpsonUi = {
    type: "space",
    rows: [
        {
            type: "toolbar",
            css: "bg_panel",
            cols: [
                uiItems_1.getButton(simpsonRunButtonId),
                uiItems_1.getForm(simpsonFormId, [
                    uiItems_1.getTextField("a", "A:", defaultData.a),
                    uiItems_1.getTextField("b", "B:", defaultData.b),
                    uiItems_1.getTextField("count", "Count:", defaultData.count)
                ]),
                {}
            ]
        },
        uiItems_1.getForm(simpsonOutPutFormId, [
            uiItems_1.getTextField("mX", "Mx:"),
            uiItems_1.getTextField("dX", "Dx:")
        ], true),
        uiItems_1.getChart(simpsonChartId),
        {}
    ]
}, initFunction = () => {
    let form = $$(simpsonFormId), formOutput = $$(simpsonOutPutFormId), chart = $$(simpsonChartId), utils = new modTest_1.default();
    $$(simpsonRunButtonId).attachEvent("onItemClick", function () {
        let data = form.getValues(), results = utils.simpsonDistribution(parseInt(data.a), parseInt(data.b), parseInt(data.count)), mX = utils.getMx(results), dX = utils.getDx(results, mX), chartData = utils.getChartData(results);
        formOutput.setValues({ mX, dX });
        chart.show();
        chart.clearAll();
        chart.parse(chartData, "json");
    });
};
exports.simpsonUi = simpsonUi;
exports.initFunction = initFunction;
