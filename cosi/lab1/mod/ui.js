"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
let buttonId = "modButtonId1", chartId = "modChart1Id", ui = {
    id: "modId",
    css: "bg_panel_raised",
    type: "space",
    rows: [
        {
            type: "toolbar",
            css: "bg_panel",
            cols: [
                { template: "MOD", type: "header", width: 100, borderless: true },
                {
                    view: "button",
                    css: "button_primary button_raised",
                    id: buttonId,
                    width: 100,
                    value: "Run"
                },
                {}
            ]
        },
        {
            view: "chart",
            css: "bg_panel",
            id: chartId,
            type: "bar",
            label: function (value) {
                return parseFloat(value.y).toFixed(4);
            },
            value: "#y#",
            barWidth: 35,
            radius: 0,
            gradient: "falling",
            xAxis: {
                template: function (data) {
                    return parseFloat(data.x).toFixed(4);
                }
            }
        },
        {}
    ]
};
exports.buttonId = buttonId;
exports.chartId = chartId;
exports.UI = ui;
