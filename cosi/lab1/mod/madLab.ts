import { buttonId, chartId, formDataId, formOutputDataId } from "./ui";
import DataWorker from "./dataWorker";
import ModLabUtils, { IChartData } from "./modTest";
import { initFunction as initUniformLab } from "./lab2/uniformUi";
import { initFunction as initGaussLab } from "./lab2/gaussUi";
import { initFunction as initExponentialLab } from "./lab2/exponentialUi";
import { initFunction as initGammaLab } from "./lab2/gammaUi";
import { initFunction as initTriangleLab } from "./lab2/triangleUi";
import { initFunction as initSimpsonLab } from "./lab2/simpsonUi";
import { formLab3Id, formOutputLab3Id, runLab3Id, initLab3 } from "./lab3/ui";

type IButton = webix.ui.button;
type IChart = webix.ui.chart;
type IForm = webix.ui.form;

export {IButton, IChart, IForm};

interface IFormData<T> {
    [key: string]: T;
}

export default class ModLab {
    private chart: IChart;
    private utils: ModLabUtils;
    private formData: IForm;
    private formOutputData: IForm;
    constructor() {
        (<IButton>$$(buttonId)).attachEvent("onItemClick", () => {
            let startData: IFormData<number> | false = this.validateForm(this.formData.getValues());
            if (!startData) {
                webix.message("Start data is not valid");
                return;
            }
            let worker = new DataWorker(startData["a"], startData["m"], startData["r0"]),
                data = this.utils.getData(worker, 200000),
                current = worker.current(),
                period = this.utils.findPeriod(data, current),
                chartData = this.utils.getChartData(period.data),
                mX = this.utils.getMx(period.data),
                dX = this.utils.getDx(period.data, mX);

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
        this.formData = (<IForm>$$(formDataId));
        this.formOutputData = (<IForm>$$(formOutputDataId));

        this.utils = new ModLabUtils();
        this.chart = <IChart>$$(chartId);
        this.chart.hide();
        initUniformLab();
        initGaussLab();
        initExponentialLab();
        initGammaLab();
        initTriangleLab();
        initSimpsonLab();
        initLab3();
    }
    private validateForm(data: IFormData<string>) {
        let a = parseInt(data["a"]) || 0,
            m = parseInt(data["m"]) || 0,
            r0 = parseInt(data["r0"]) || 0;
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
        return <IFormData<number>>{
            a: a,
            m: m,
            r0: r0
        };
    }
    private updateChart(data: IChartData[]) {
        this.chart.clearAll();
        this.chart.parse(data, "json");
    }
}