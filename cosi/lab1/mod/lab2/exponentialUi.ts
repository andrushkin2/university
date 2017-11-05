import { getButton, getChart, getForm, getTextField } from "./uiItems";
import ModLabUtils from "../modTest";

interface IFormData {
    alpha: number | string;
    count: number | string;
}
interface IFormDataGet {
    alpha: string;
    count: string;
}

let defaultData: IFormData = {
    alpha: 10,
    count: 10000
},
    exponentialRunButtonId = "exponentialRunID",
    exponentialFormId = "exponentialFormId",
    exponentialOutPutFormId = "exponentialOutputFromId",
    exponentialChartId = "exponentialChartId",
    exponentialUi = {
        type: "space",
        rows: [
            {
                type: "toolbar",
                css: "bg_panel",
                cols: [
                    getButton(exponentialRunButtonId),
                    getForm(exponentialFormId, [
                        getTextField("alpha", "Alpha:", defaultData.alpha),
                        getTextField("count", "Count:", defaultData.count)
                    ]),
                    {}
                ]
            },
            getForm(exponentialOutPutFormId, [
                getTextField("mX", "Mx:"),
                getTextField("dX", "Dx:")
            ], true),
            getChart(exponentialChartId),
            {}
        ]
    },
    initFunction = () => {
        let form = <webix.ui.form>$$(exponentialFormId),
            formOutput = <webix.ui.form>$$(exponentialOutPutFormId),
            chart = <webix.ui.chart>$$(exponentialChartId),
            utils = new ModLabUtils();

        (<webix.ui.button>$$(exponentialRunButtonId)).attachEvent("onItemClick", function () {
            let data = form.getValues() as IFormDataGet,
                results = utils.exponentialDistribution(parseInt(data.alpha), parseInt(data.count)),
                mX = utils.getMx(results),
                dX = utils.getDx(results, mX),
                chartData = utils.getChartData(results);
            formOutput.setValues({ mX, dX })
            chart.show();
            chart.clearAll();
            chart.parse(chartData, "json");
        });
    };

export { initFunction, exponentialUi };