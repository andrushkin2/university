"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const uiItems_1 = require("../mod/lab2/uiItems");
let uploaderId = "imageUploader", canvasTemplate = (canvasID) => {
    return `<div style="text-align: center;width: 100%; height: 100%; overflow-y: auto;">
            <canvas id="${canvasID}" width="1000" height="500"></canvas>
        </div>`;
}, canvasId = "canvasImage1", buttonId = "buttonId", buttonLogParseId = "buttonLogParseId", buttonRobertsId = "buttonRobertsId", buttonLab2Id = "buttonLab2Id", buttonResetId = "buttonResetId", redChartId = "redChart", logToolbarId = "logToolbarId", logToolbarFormId = "logToolbarFormId", greenChartId = "greenChart", blueChartId = "blueChart", ui = {
    id: "lab5",
    type: "space",
    rows: [
        {
            type: "toolbar",
            height: 50,
            cols: [
                { template: "Functions", type: "header", width: 100, borderless: true },
                {
                    view: "uploader",
                    value: "Load file",
                    id: uploaderId,
                    width: 100,
                    autosend: false,
                    multiple: false
                },
                {
                    view: "button",
                    width: 100,
                    id: buttonId,
                    value: "Parse picture"
                },
                {
                    view: "button",
                    width: 100,
                    id: buttonLogParseId,
                    value: "Log func"
                },
                {
                    view: "button",
                    width: 100,
                    id: buttonRobertsId,
                    value: "Rebert's func"
                },
                {
                    view: "button",
                    width: 100,
                    id: buttonLab2Id,
                    value: "Lab 2"
                },
                {},
                {
                    view: "button",
                    width: 100,
                    id: buttonResetId,
                    value: "Reset"
                }
            ]
        },
        {
            id: logToolbarId,
            type: "toolbar",
            hidden: true,
            cols: [
                uiItems_1.getForm(logToolbarFormId, [
                    uiItems_1.getTextField("c", "C:", "15")
                ]),
                {},
                {
                    view: "button",
                    width: 100,
                    value: "Close",
                    click: function () {
                        $$(logToolbarId).hide();
                    }
                }
            ]
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
                        rows: [
                            {
                                view: "scrollview",
                                height: 600,
                                scroll: true,
                                body: {
                                    template: canvasTemplate(canvasId)
                                }
                            },
                            { type: "header", template: "Charts", height: 50 },
                            {
                                type: "space",
                                height: 250,
                                align: "center",
                                cols: [
                                    {
                                        id: redChartId,
                                        view: "chart",
                                        type: "bar",
                                        css: "bg_panel",
                                        border: false,
                                        value: "#value#",
                                        color: "red",
                                        width: 300,
                                        xAxis: {
                                            lines: function (value) {
                                                return value.pixel % 32 === 0;
                                            },
                                            template: function (value) {
                                                return value.pixel % 32 === 0 ? value.pixel : "";
                                            }
                                        }
                                    },
                                    {
                                        id: greenChartId,
                                        view: "chart",
                                        type: "bar",
                                        css: "bg_panel",
                                        value: "#value#",
                                        border: false,
                                        color: "green",
                                        width: 300,
                                        xAxis: {
                                            lines: function (value) {
                                                return value.pixel % 32 === 0;
                                            },
                                            template: function (value) {
                                                return value.pixel % 32 === 0 ? value.pixel : "";
                                            }
                                        }
                                    },
                                    {
                                        id: blueChartId,
                                        view: "chart",
                                        type: "bar",
                                        border: false,
                                        css: "bg_panel",
                                        value: "#value#",
                                        color: "blue",
                                        width: 300,
                                        xAxis: {
                                            lines: function (value) {
                                                return value.pixel % 32 === 0;
                                            },
                                            template: function (value) {
                                                return value.pixel % 32 === 0 ? value.pixel : "";
                                            }
                                        }
                                    }
                                ]
                            }
                        ]
                    }
                }
            ]
        }
    ]
};
exports.uploaderId = uploaderId;
exports.canvasId = canvasId;
exports.buttonId = buttonId;
exports.buttonLogParseId = buttonLogParseId;
exports.buttonRobertsId = buttonRobertsId;
exports.buttonLab2Id = buttonLab2Id;
exports.buttonResetId = buttonResetId;
exports.redChartId = redChartId;
exports.logToolbarId = logToolbarId;
exports.logToolbarFormId = logToolbarFormId;
exports.greenChartId = greenChartId;
exports.blueChartId = blueChartId;
exports.ui = ui;
