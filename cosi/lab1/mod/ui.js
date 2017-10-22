"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
let buttonId = "modButtonId1", chartId = "modChart1Id", formDataId = "formDataId", formOutputDataId = "formOutputDataId", ui = {
    id: "modId",
    css: "bg_panel_raised",
    type: "space",
    autoheight: true,
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
                {
                    view: "form",
                    id: formDataId,
                    cols: [
                        {
                            view: "text",
                            value: "",
                            name: "a",
                            label: "A:",
                            labelAlign: "left"
                        },
                        {
                            view: "text",
                            value: "",
                            name: "m",
                            label: "M:",
                            labelAlign: "left"
                        },
                        {
                            view: "text",
                            value: "",
                            name: "r0",
                            label: "R0:",
                            labelAlign: "left"
                        },
                        {}
                    ]
                },
                {}
            ]
        },
        {
            view: "form",
            id: formOutputDataId,
            disabled: true,
            cols: [
                {
                    view: "text",
                    value: "",
                    name: "period",
                    label: "Period:",
                    labelAlign: "left"
                },
                {
                    view: "text",
                    value: "",
                    name: "aPeriod",
                    label: "Aperiod:",
                    labelAlign: "left"
                },
                {
                    view: "text",
                    value: "",
                    name: "mX",
                    label: "Mx:",
                    labelAlign: "left"
                },
                {
                    view: "text",
                    value: "",
                    name: "dX",
                    label: "Dx:",
                    labelAlign: "left"
                },
                {
                    view: "text",
                    value: "",
                    name: "uniformity",
                    label: "Uniformity:",
                    labelAlign: "left"
                }
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
            },
            yAxis: {
                template: function (data) {
                    return data;
                }
            }
        },
        {}
    ]
};
exports.buttonId = buttonId;
exports.chartId = chartId;
exports.formDataId = formDataId;
exports.formOutputDataId = formOutputDataId;
exports.UI = ui;
