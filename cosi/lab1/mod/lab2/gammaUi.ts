import { getButton, getChart, getForm, getTextField } from "./uiItems";
import ModLabUtils from "../modTest";

interface IFormData {
    alpha: number | string;
    ny: number | string;
    count: number | string;
}
interface IFormDataGet {
    alpha: string;
    ny: string;
    count: string;
}

let defaultData: IFormData = {
    alpha: 2.5,
    ny: 18,
    count: 10000
},
    gammaRunButtonId = "gammaRunID",
    gammaFormId = "gammaFormId",
    gammaOutPutFormId = "gammaOutputFromId",
    gammaChartId = "gammaChartId",
    gammaUi = {
        type: "space",
        rows: [
            {
                type: "toolbar",
                css: "bg_panel",
                cols: [
                    getButton(gammaRunButtonId),
                    getForm(gammaFormId, [
                        getTextField("alpha", "Alpha:", defaultData.alpha),
                        getTextField("ny", "Ny:", defaultData.ny),
                        getTextField("count", "Count:", defaultData.count)
                    ]),
                    {}
                ]
            },
            getForm(gammaOutPutFormId, [
                getTextField("mX", "Mx:"),
                getTextField("dX", "Dx:")
            ], true),
            getChart(gammaChartId),
            {}
        ]
    },
    initFunction = () => {
        let form = <webix.ui.form>$$(gammaFormId),
            formOutput = <webix.ui.form>$$(gammaOutPutFormId),
            chart = <webix.ui.chart>$$(gammaChartId),
            utils = new ModLabUtils();

        (<webix.ui.button>$$(gammaRunButtonId)).attachEvent("onItemClick", function () {
            let data = form.getValues() as IFormDataGet,
                results = utils.gammaDistribution(parseInt(data.alpha), parseInt(data.ny), parseInt(data.count)),
                mX = utils.getMx(results),
                dX = utils.getDx(results, mX),
                chartData = utils.getChartData(results);
            formOutput.setValues({ mX, dX });
            chart.show();
            chart.clearAll();
            chart.parse(chartData, "json");
        });
    };

export { initFunction, gammaUi };