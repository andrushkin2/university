"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const uiItems_1 = require("./uiItems");
const modTest_1 = require("../modTest");
let defaultData = {
    alpha: 10,
    count: 10000
}, exponentialRunButtonId = "exponentialRunID", exponentialFormId = "exponentialFormId", exponentialOutPutFormId = "exponentialOutputFromId", exponentialChartId = "exponentialChartId", exponentialUi = {
    type: "space",
    rows: [
        {
            type: "toolbar",
            css: "bg_panel",
            cols: [
                uiItems_1.getButton(exponentialRunButtonId),
                uiItems_1.getForm(exponentialFormId, [
                    uiItems_1.getTextField("alpha", "Alpha:", defaultData.alpha),
                    uiItems_1.getTextField("count", "Count:", defaultData.count)
                ]),
                {}
            ]
        },
        uiItems_1.getForm(exponentialOutPutFormId, [
            uiItems_1.getTextField("mX", "Mx:"),
            uiItems_1.getTextField("dX", "Dx:")
        ], true),
        uiItems_1.getChart(exponentialChartId),
        {}
    ]
}, initFunction = () => {
    let form = $$(exponentialFormId), formOutput = $$(exponentialOutPutFormId), chart = $$(exponentialChartId), utils = new modTest_1.default();
    $$(exponentialRunButtonId).attachEvent("onItemClick", function () {
        let data = form.getValues(), results = utils.exponentialDistribution(parseFloat(data.alpha), parseInt(data.count)), mX = utils.getMx(results), dX = utils.getDx(results, mX), chartData = utils.getChartData(results);
        formOutput.setValues({ mX, dX });
        chart.show();
        chart.clearAll();
        chart.parse(chartData, "json");
    });
};
exports.exponentialUi = exponentialUi;
exports.initFunction = initFunction;
