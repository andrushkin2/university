"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
let uploaderId = "imageUploader", canvasTemplate = (canvasID) => {
    return `<div style="text-align: center;">
            <canvas id="${canvasID}" width="1000" height="500"></canvas>
        </div>`;
}, canvasId = "canvasImage1", buttonId = "buttonId", ui = {
    id: "lab5",
    rows: [
        { type: "header", template: "Functions", height: 50 },
        {
            cols: [
                {
                    view: "uploader",
                    value: "Load file",
                    id: uploaderId,
                    autosend: false,
                    multiple: false
                },
                {
                    view: "button",
                    id: buttonId,
                    value: "CLick me"
                },
                {}
            ]
        },
        {
            rows: [
                { type: "header", template: "Image", height: 50 },
                {
                    template: canvasTemplate(canvasId)
                }
            ]
        }
    ]
};
exports.uploaderId = uploaderId;
exports.canvasId = canvasId;
exports.buttonId = buttonId;
exports.ui = ui;
