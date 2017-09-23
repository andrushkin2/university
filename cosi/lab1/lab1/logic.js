"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ui_1 = require("./ui");
class UiLogic {
    constructor() {
        this.image = new Image();
        let canvas = document.querySelector(`#${ui_1.canvasId}`), context;
        if (canvas === null) {
            throw new Error(`Cannot find canvas element with ID: ${ui_1.canvasId}`);
        }
        context = canvas.getContext("2d");
        if (context === null) {
            throw new Error("Cannot get context of canvas");
        }
        this.image.style.display = "none";
        this.canvas = canvas;
        this.context = context;
        $$(ui_1.uploaderId).attachEvent("onAfterFileAdd", (e) => {
            debugger;
        });
    }
    insertImageToCanvas(urlData) {
        return new Promise((resolve, reject) => {
            this.image.src = urlData;
            this.image.onload = () => {
                this.context.drawImage(this.image, 0, 0);
                resolve({});
            };
            this.image.onerror = e => {
                reject(e);
            };
        });
    }
    loadFile(file) {
        if (file instanceof File) {
            return new Promise((resolve, reject) => {
                if (FileReader) {
                    let loader = new FileReader();
                    loader.onload = () => {
                        resolve(loader.result);
                    };
                    loader.onerror = (e) => {
                        reject(e);
                    };
                    loader.readAsDataURL(file);
                }
                else {
                    reject(new Error("The browser doesn't support FileReader"));
                }
            });
        }
        return Promise.reject(new Error("File not found"));
    }
}
exports.default = UiLogic;
