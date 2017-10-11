"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
let buttonId = "modButtonId1", ui = {
    id: "modId",
    rows: [
        {
            type: "toolbar",
            cols: [
                { template: "MOD", type: "header", width: 100, borderless: true },
                {
                    view: "button",
                    id: buttonId,
                    value: "Run"
                },
                {}
            ]
        }
    ]
};
exports.buttonId = buttonId;
exports.UI = ui;
