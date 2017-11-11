import { getButton, getChart, getForm, getTextField } from "./uiItems";
import ModLabUtils from "../modTest";

interface IFormData {
    m: number | string;
    a: number | string;
    count: number | string;
    n: number | string;
}
interface IFormDataGet {
    m: string;
    a: string;
    n: string;
    count: string;
}

let defaultData: IFormData = {
    m: 5,
    a: 10,
    n: 6,
    count: 10000
},
    gaussRunButtonId = "gaussRunID",
    gaussFormId = "gaussFormId",
    gaussOutPutFormId = "gaussOutputFromId",
    gaussChartId = "gaussChartId",
    gaussUi = {
        type: "space",
        rows: [
            {
                type: "toolbar",
                css: "bg_panel",
                cols: [
                    getButton(gaussRunButtonId),
                    getForm(gaussFormId, [
                        getTextField("m", "M:", defaultData.m),
                        getTextField("a", "A:", defaultData.a),
                        getTextField("n", "N:", defaultData.n),
                        getTextField("count", "Count:", defaultData.count)
                    ]),
                    {}
                ]
            },
            getForm(gaussOutPutFormId, [
                getTextField("mX", "Mx:"),
                getTextField("dX", "Dx:")
            ], true),
            getChart(gaussChartId),
            {}
        ]
    },
    initFunction = () => {
        let form = <webix.ui.form>$$(gaussFormId),
            formOutput = <webix.ui.form>$$(gaussOutPutFormId),
            chart = <webix.ui.chart>$$(gaussChartId),
            utils = new ModLabUtils();

        (<webix.ui.button>$$(gaussRunButtonId)).attachEvent("onItemClick", function () {
            let data = form.getValues() as IFormDataGet,
                results = utils.gaussDistribution(parseInt(data.m), parseInt(data.a), parseInt(data.count), parseInt(data.n)),
                mX = utils.getMx(results),
                dX = utils.getDx(results, mX),
                chartData = utils.getChartData(results);
            formOutput.setValues({ mX, dX });
            chart.show();
            chart.clearAll();
            chart.parse(chartData, "json");
        });
    };

export { initFunction, gaussUi };