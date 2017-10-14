import { buttonId, chartId } from "./ui";
import DataWorker from "./dataWorker";
import ModLabUtils, { IChartData } from "./modTest";

type IButton = webix.ui.button;
type IChart = webix.ui.chart;

export default class ModLab {
    private chart: IChart;
    private utils: ModLabUtils;
    constructor() {
        (<IButton>$$(buttonId)).attachEvent("onItemClick", () => {
            let worker = new DataWorker(1567, 68030, 2797),
                data = this.utils.getData(worker, 200000),
                period = this.utils.findPeriod(data, worker.current()),
                chartData = this.utils.getChartData(period.data);
            this.chart.show();
            this.updateChart(chartData);
        });
        this.utils = new ModLabUtils();
        this.chart = <IChart>$$(chartId);
        this.chart.hide();
    }
    private updateChart(data: IChartData[]) {
        this.chart.clearAll();
        this.chart.parse(data, "json");
    }
}