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
    a: 18,
    b: 30,
    count: 10000
},
    simpsonRunButtonId = "simpsonRunID",
    simpsonFormId = "simpsonFormId",
    simpsonOutPutFormId = "simpsonOutputFromId",
    simpsonChartId = "simpsonChartId",
    simpsonUi = {
        type: "space",
        rows: [
            {
                type: "toolbar",
                css: "bg_panel",
                cols: [
                    getButton(simpsonRunButtonId),
                    getForm(simpsonFormId, [
                        getTextField("a", "A:", defaultData.a),
                        getTextField("b", "B:", defaultData.b),
                        getTextField("count", "Count:", defaultData.count)
                    ]),
                    {}
                ]
            },
            getForm(simpsonOutPutFormId, [
                getTextField("mX", "Mx:"),
                getTextField("dX", "Dx:")
            ], true),
            getChart(simpsonChartId),
            {}
        ]
    },
    initFunction = () => {
        let form = <webix.ui.form>$$(simpsonFormId),
            formOutput = <webix.ui.form>$$(simpsonOutPutFormId),
            chart = <webix.ui.chart>$$(simpsonChartId),
            utils = new ModLabUtils();

        (<webix.ui.button>$$(simpsonRunButtonId)).attachEvent("onItemClick", function () {
            let data = form.getValues() as IFormDataGet,
                results = utils.simpsonDistribution(parseInt(data.a), parseInt(data.b), parseInt(data.count)),
                mX = utils.getMx(results),
                dX = utils.getDx(results, mX),
                chartData = utils.getChartData(results);
            formOutput.setValues({ mX, dX })
            chart.show();
            chart.clearAll();
            chart.parse(chartData, "json");
        });
    };

export { initFunction, simpsonUi };