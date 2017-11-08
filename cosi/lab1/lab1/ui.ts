import { getForm, getTextField } from "../mod/lab2/uiItems";

export interface IChartData {
    pixel: number;
    value: number;
}

let uploaderId: string = "imageUploader",
    canvasTemplate = (canvasID: string) => {
        return `<div style="text-align: center;width: 100%; height: 100%; overflow-y: auto;">
            <canvas id="${canvasID}" width="1000" height="500"></canvas>
        </div>`;
    },
    canvasId: string = "canvasImage1",
    buttonId: string = "buttonId",
    buttonLogParseId: string = "buttonLogParseId",
    buttonResetId: string = "buttonResetId",
    redChartId: string = "redChart",
    logToolbarId: string = "logToolbarId",
    logToolbarFormId: string = "logToolbarFormId",
    greenChartId: string = "greenChart",
    blueChartId: string = "blueChart",
    ui = {
        id: "lab5",
        type: "space",
        rows: [
            <webix.ui.toolbarConfig>{
                type: "toolbar",
                height: 50,
                cols: [
                    { template: "Functions", type: "header", width: 100, borderless: true },
                    <webix.ui.uploaderConfig>{
                        view: "uploader",
                        value: "Load file",
                        id: uploaderId,
                        width: 100,
                        autosend: false,
                        multiple: false
                    },
                    <webix.ui.buttonConfig>{
                        view: "button",
                        width: 100,
                        id: buttonId,
                        value: "Parse picture"
                    },
                    <webix.ui.buttonConfig>{
                        view: "button",
                        width: 100,
                        id: buttonLogParseId,
                        value: "Log func"
                    },
                    {},
                    <webix.ui.buttonConfig>{
                        view: "button",
                        width: 100,
                        id: buttonResetId,
                        value: "Reset"
                    }
                ]
            },
            <webix.ui.toolbarConfig>{
                id: logToolbarId,
                type: "toolbar",
                hidden: true,
                cols: [
                    getForm(logToolbarFormId, [
                        getTextField("c", "C:", "15"),
                        getTextField("y", "Y:", 3)
                    ]),
                    {},
                    <webix.ui.buttonConfig>{
                        view: "button",
                        width: 100,
                        value: "Close",
                        click: function() {
                            $$(logToolbarId).hide();
                        }
                    }
                ]
            },
            {
                rows: [
                    <webix.ui.scrollviewConfig>{
                        view: "scrollview",
                        height: 1000,
                        scroll: "auto",
                        type: "space",
                        body: {
                            type: "space",
                            rows: [
                                <webix.ui.scrollviewConfig>{
                                    view: "scrollview",
                                    height: 600,
                                    scroll: true,
                                    body: {
                                        template: canvasTemplate(canvasId)
                                    }
                                },
                                { type: "header", template: "Charts", height: 50 },
                                <webix.ui.layoutConfig>{
                                    type: "space",
                                    height: 250,
                                    align: "center",
                                    cols: [
                                        <webix.ui.chartConfig>{
                                            id: redChartId,
                                            view: "chart",
                                            type: "bar",
                                            preset: "stick",
                                            value: "#value#",
                                            color: "red",
                                            width: 300,
                                            xAxis: {
                                                template: function (value: IChartData) {
                                                    return value.pixel % 32 === 0 ? value.pixel : "";
                                                }
                                            }
                                        },
                                        <webix.ui.chartConfig>{
                                            id: greenChartId,
                                            view: "chart",
                                            type: "bar",
                                            preset: "stick",
                                            value: "#value#",
                                            color: "green",
                                            width: 300,
                                            xAxis: {
                                                template: function (value: IChartData) {
                                                    return value.pixel % 32 === 0 ? value.pixel : "";
                                                }
                                            }
                                        },
                                        <webix.ui.chartConfig>{
                                            id: blueChartId,
                                            view: "chart",
                                            type: "bar",
                                            preset: "stick",
                                            value: "#value#",
                                            color: "blue",
                                            width: 300,
                                            xAxis: {
                                                template: function (value: IChartData) {
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

export { ui, uploaderId, canvasId, buttonId, redChartId, greenChartId, blueChartId, buttonLogParseId, buttonResetId, logToolbarFormId, logToolbarId };