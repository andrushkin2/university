"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const uniformUi_1 = require("./uniformUi");
const gaussUi_1 = require("./gaussUi");
const exponentialUi_1 = require("./exponentialUi");
const triangleUi_1 = require("./triangleUi");
const gammaUi_1 = require("./gammaUi");
const simpsonUi_1 = require("./simpsonUi");
let distributionListId = "distributionListId", ui = {
    view: "tabview",
    cells: [
        {
            header: "Uniform",
            body: uniformUi_1.uniformUi
        },
        {
            header: "Gauss",
            body: gaussUi_1.gaussUi
        },
        {
            header: "Exponential",
            body: exponentialUi_1.exponentialUi
        },
        {
            header: "Gamma",
            body: gammaUi_1.gammaUi
        },
        {
            header: "Triangle",
            body: triangleUi_1.triangleUi
        },
        {
            header: "Simpson",
            body: simpsonUi_1.simpsonUi
        }
    ]
};
exports.distributionListId = distributionListId;
exports.ui = ui;
