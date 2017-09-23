"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
let uploaderId = "imageUploader", canvasId = "canvasImage1", ui = {
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
                {}
            ]
        },
        {
            rows: [
                { type: "header", template: "Image", height: 50 },
                {
                    template: `<div><canvas id="${canvasId}" width="1000" height="500"></canvas></div>`
                }
            ]
        }
    ]
};
exports.uploaderId = uploaderId;
exports.canvasId = canvasId;
exports.ui = ui;
