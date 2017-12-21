import { getButton, getForm, getTextField } from "../lab2/uiItems";
import { IButton, IForm } from "../madLab";
import Lab3Logic from "./logic";
import { parse } from "path";

let runLab3Id = "runLab3Id",
    formLab3Id = "formLab3Id",
    formOutputLab3Id = "formOutputLab3Id",
    ui = {
        rows: [
            {
                type: "toolbar",
                css: "bg_panel",
                cols: [
                    getButton(runLab3Id),
                    getForm(formLab3Id, [
                        getTextField("p1", "P1:", 0.6),
                        getTextField("p2", "P2:", 0.5),
                        getTextField("ticks", "Ticks:", 10000)
                    ])
                ]
            },
            {
                cols: [
                    getForm(formOutputLab3Id, [
                        getTextField("a", "A:", 0),
                        getTextField("l", "L:", 0),
                        getTextField("w", "W:", 0)
                    ], true)
                ]
            }
        ]
    },
    initLab3 = () => {
        let runButton: IButton = $$(runLab3Id) as IButton,
            formInput: IForm = $$(formLab3Id) as IForm,
            formOutput: IForm = $$(formOutputLab3Id) as IForm,
            parser = new Lab3Logic();
        runButton.attachEvent("onItemClick", () => {
            let inputData = formInput.getValues();
            let result = parser.calcValues(parseFloat(inputData.p1), parseFloat(inputData.p2), parseInt(inputData.ticks));
            formOutput.setValues({
                a: result.a,
                l: result.l,
                w: result.w
            });
        });
    };

export { ui, runLab3Id, formLab3Id, formOutputLab3Id, initLab3 };