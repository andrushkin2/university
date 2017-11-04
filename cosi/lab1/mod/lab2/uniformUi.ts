import { getButton, getChart, getForm, getTextField } from "./uiItems";

interface IFormData {
    a: number;
    b: number;
    n: number;
}
interface IOutPutFormData {
    mX: number;
    dX: number;
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
                        getTextField("an", "N:", defaultData.n)
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
        let form = <webix.ui.form>$$(uniformFormId);

        (<webix.ui.button>$$(uniformRunButtonId)).attachEvent("onItemClick", function() {
            let data = form.getValues() as IFormData;
            if (!data.a) {
                webix.message("a is not valid");
            }
        });
    };

export { uniformRunButtonId, uniformFormId, uniformOutPutFormId, uniformChartId, uniformUi };