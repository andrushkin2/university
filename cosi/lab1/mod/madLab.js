"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ui_1 = require("./ui");
const dataWorker_1 = require("./dataWorker");
const modTest_1 = require("./modTest");
const uniformUi_1 = require("./lab2/uniformUi");
const gaussUi_1 = require("./lab2/gaussUi");
const exponentialUi_1 = require("./lab2/exponentialUi");
const gammaUi_1 = require("./lab2/gammaUi");
const triangleUi_1 = require("./lab2/triangleUi");
const simpsonUi_1 = require("./lab2/simpsonUi");
class ModLab {
    constructor() {
        $$(ui_1.buttonId).attachEvent("onItemClick", () => {
            let startData = this.validateForm(this.formData.getValues());
            if (!startData) {
                webix.message("Start data is not valid");
                return;
            }
            let worker = new dataWorker_1.default(startData["a"], startData["m"], startData["r0"]), data = this.utils.getData(worker, 200000), current = worker.current(), period = this.utils.findPeriod(data, current), chartData = this.utils.getChartData(period.data), mX = this.utils.getMx(period.data), dX = this.utils.getDx(period.data, mX);
            this.formOutputData.setValues({
                period: period.period || "Invalid",
                aPeriod: period.aPeriod || "Invalid",
                mX: mX || "Invalid",
                dX: dX || "Invalid",
                uniformity: this.utils.checkUniformity(period.data) || "Invalid"
            });
            this.chart.config.yAxis.start = this.utils.getMin(period.data);
            this.chart.config.yAxis.end = this.utils.getMax(period.data);
            this.chart.show();
            this.updateChart(chartData);
        });
        this.formData = $$(ui_1.formDataId);
        this.formOutputData = $$(ui_1.formOutputDataId);
        this.utils = new modTest_1.default();
        this.chart = $$(ui_1.chartId);
        this.chart.hide();
        uniformUi_1.initFunction();
        gaussUi_1.initFunction();
        exponentialUi_1.initFunction();
        gammaUi_1.initFunction();
        triangleUi_1.initFunction();
        simpsonUi_1.initFunction();
    }
    validateForm(data) {
        let a = parseInt(data["a"]) || 0, m = parseInt(data["m"]) || 0, r0 = parseInt(data["r0"]) || 0;
        if (!a || a === 0) {
            webix.message("Property A cannot be '0' or empty");
            return false;
        }
        if (!m || m === 0) {
            webix.message("Property M cannot be '0' or empty");
            return false;
        }
        if (!r0 || r0 === 0) {
            webix.message("Property R0 cannot be '0' or empty");
            return false;
        }
        return {
            a: a,
            m: m,
            r0: r0
        };
    }
    updateChart(data) {
        this.chart.clearAll();
        this.chart.parse(data, "json");
    }
}
exports.default = ModLab;
