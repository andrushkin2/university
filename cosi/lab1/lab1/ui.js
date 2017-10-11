"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
let uploaderId = "imageUploader", canvasTemplate = (canvasID) => {
    return `<div style="text-align: center;">
            <canvas id="${canvasID}" width="1000" height="500"></canvas>
        </div>`;
}, canvasId = "canvasImage1", buttonId = "buttonId", redChartId = "redChart", greenChartId = "greenChart", blueChartId = "blueChart", ui = {
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
                    value: "Click me"
                },
                {}
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
                                template: canvasTemplate(canvasId)
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
                                        preset: "stick",
                                        value: "#value#",
                                        color: "red",
                                        width: 300,
                                        xAxis: {
                                            template: function (value) {
                                                return value.pixel % 32 === 0 ? value.pixel : "";
                                            }
                                        }
                                    },
                                    {
                                        id: greenChartId,
                                        view: "chart",
                                        type: "bar",
                                        preset: "stick",
                                        value: "#value#",
                                        color: "green",
                                        width: 300,
                                        xAxis: {
                                            template: function (value) {
                                                return value.pixel % 32 === 0 ? value.pixel : "";
                                            }
                                        }
                                    },
                                    {
                                        id: blueChartId,
                                        view: "chart",
                                        type: "bar",
                                        preset: "stick",
                                        value: "#value#",
                                        color: "blue",
                                        width: 300,
                                        xAxis: {
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
exports.redChartId = redChartId;
exports.greenChartId = greenChartId;
exports.blueChartId = blueChartId;
exports.ui = ui;
