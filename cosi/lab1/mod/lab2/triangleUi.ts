import { getButton, getChart, getForm, getTextField } from "./uiItems";
import ModLabUtils from "../modTest";

interface IFormData {
    a: number | string;
    b: number | string;
    count: number | string;
}
interface IFormDataGet {
    a: string;
    b: string;
    count: string;
}

let defaultData: IFormData = {
    a: 2.5,
    b: 18,
    count: 10000
},
    triangleRunButtonId = "triangleRunID",
    triangleFormId = "triangleFormId",
    triangleOutPutFormId = "triangleOutputFromId",
    triangleChartId = "triangleChartId",
    triangleUi = {
        type: "space",
        rows: [
            {
                type: "toolbar",
                css: "bg_panel",
                cols: [
                    getButton(triangleRunButtonId),
                    getForm(triangleFormId, [
                        getTextField("a", "A:", defaultData.a),
                        getTextField("b", "B:", defaultData.b),
                        getTextField("count", "Count:", defaultData.count)
                    ]),
                    {}
                ]
            },
            getForm(triangleOutPutFormId, [
                getTextField("mX", "Mx:"),
                getTextField("dX", "Dx:")
            ], true),
            getChart(triangleChartId),
            {}
        ]
    },
    initFunction = () => {
        let form = <webix.ui.form>$$(triangleFormId),
            formOutput = <webix.ui.form>$$(triangleOutPutFormId),
            chart = <webix.ui.chart>$$(triangleChartId),
            utils = new ModLabUtils();

        (<webix.ui.button>$$(triangleRunButtonId)).attachEvent("onItemClick", function () {
            let data = form.getValues() as IFormDataGet,
                results = utils.triangleDistribution(parseInt(data.a), parseInt(data.b), parseInt(data.count)),
                mX = utils.getMx(results),
                dX = utils.getDx(results, mX),
                chartData = utils.getChartData(results);
            formOutput.setValues({ mX, dX });
            chart.show();
            chart.clearAll();
            chart.parse(chartData, "json");
        });
    };

export { initFunction, triangleUi };