import { getButton, getChart, getForm, getTextField } from "./uiItems";
import ModLabUtils from "../modTest";

interface IFormData {
    a: number | string;
    b: number | string;
    n: number | string;
}
interface IFormDataGet {
    a: string;
    b: string;
    n: string;
}

let defaultData: IFormData = {
        a: 5,
        b: 10,
        n: 1000
    },
    uniformRunButtonId = "uniformRunID",
    uniformFormId = "uniformFormId",
    uniformOutPutFormId = "uniformOutputFromId",
    uniformChartId = "uniformChartId",
    uniformUi = {
        type: "space",
        rows: [
            {
                type: "toolbar",
                css: "bg_panel",
                cols: [
                    getButton(uniformRunButtonId),
                    getForm(uniformFormId, [
                        getTextField("a", "A:", defaultData.a),
                        getTextField("b", "B:", defaultData.b),
                        getTextField("n", "N:", defaultData.n)
                    ]),
                    {}
                ]
            },
            getForm(uniformOutPutFormId, [
                getTextField("mX", "Mx:"),
                getTextField("dX", "Dx:")
            ], true),
            getChart(uniformChartId),
            {}
        ]
    },
    initFunction = () => {
        let form = <webix.ui.form>$$(uniformFormId),
            formOutput = <webix.ui.form>$$(uniformOutPutFormId),
            chart = <webix.ui.chart>$$(uniformChartId),
            utils = new ModLabUtils();

        (<webix.ui.button>$$(uniformRunButtonId)).attachEvent("onItemClick", function() {
            let data = form.getValues() as IFormDataGet,
                results = utils.uniformDistribution(parseInt(data.a), parseInt(data.b), parseInt(data.n)),
                mX = utils.getMx(results),
                dX = utils.getDx(results, mX),
                chartData = utils.getChartData(results);
            formOutput.setValues({ mX, dX });
            chart.show();
            chart.clearAll();
            chart.parse(chartData, "json");
        });
    };

export { uniformRunButtonId, uniformFormId, uniformOutPutFormId, uniformChartId, uniformUi, initFunction };