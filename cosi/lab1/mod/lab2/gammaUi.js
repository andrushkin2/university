"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const uiItems_1 = require("./uiItems");
const modTest_1 = require("../modTest");
let defaultData = {
    alpha: 2.5,
    ny: 18,
    count: 10000
}, gammaRunButtonId = "gammaRunID", gammaFormId = "gammaFormId", gammaOutPutFormId = "gammaOutputFromId", gammaChartId = "gammaChartId", gammaUi = {
    type: "space",
    rows: [
        {
            type: "toolbar",
            css: "bg_panel",
            cols: [
                uiItems_1.getButton(gammaRunButtonId),
                uiItems_1.getForm(gammaFormId, [
                    uiItems_1.getTextField("alpha", "Alpha:", defaultData.alpha),
                    uiItems_1.getTextField("ny", "Ny:", defaultData.ny),
                    uiItems_1.getTextField("count", "Count:", defaultData.count)
                ]),
                {}
            ]
        },
        uiItems_1.getForm(gammaOutPutFormId, [
            uiItems_1.getTextField("mX", "Mx:"),
            uiItems_1.getTextField("dX", "Dx:")
        ], true),
        uiItems_1.getChart(gammaChartId),
        {}
    ]
}, initFunction = () => {
    let form = $$(gammaFormId), formOutput = $$(gammaOutPutFormId), chart = $$(gammaChartId), utils = new modTest_1.default();
    $$(gammaRunButtonId).attachEvent("onItemClick", function () {
        let data = form.getValues(), results = utils.gammaDistribution(parseInt(data.alpha), parseInt(data.ny), parseInt(data.count)), mX = utils.getMx(results), dX = utils.getDx(results, mX), chartData = utils.getChartData(results);
        formOutput.setValues({ mX, dX });
        chart.show();
        chart.clearAll();
        chart.parse(chartData, "json");
    });
};
exports.gammaUi = gammaUi;
exports.initFunction = initFunction;
