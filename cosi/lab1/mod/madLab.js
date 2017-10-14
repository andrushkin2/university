"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ui_1 = require("./ui");
const dataWorker_1 = require("./dataWorker");
const modTest_1 = require("./modTest");
class ModLab {
    constructor() {
        $$(ui_1.buttonId).attachEvent("onItemClick", () => {
            let worker = new dataWorker_1.default(1567, 68030, 2797), data = this.utils.getData(worker, 200000), period = this.utils.findPeriod(data, worker.current()), chartData = this.utils.getChartData(period.data);
            this.chart.show();
            this.updateChart(chartData);
        });
        this.utils = new modTest_1.default();
        this.chart = $$(ui_1.chartId);
        this.chart.hide();
    }
    updateChart(data) {
        this.chart.clearAll();
        this.chart.parse(data, "json");
    }
}
exports.default = ModLab;
