"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const uniformUi_1 = require("./uniformUi");
let distributionListId = "distributionListId", ui = {
    view: "tabview",
    cells: [
        {
            header: "Uniform",
            body: uniformUi_1.uniformUi
        },
        {
            header: "Form",
            body: {}
        }
    ]
};
exports.distributionListId = distributionListId;
exports.ui = ui;
