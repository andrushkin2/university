import { getButton, getTextField, getForm } from "../mod/lab2/uiItems";
import { IButton, IForm } from "../mod/madLab";
import CheckmatePicture from "./svgPicture";
import { debug } from "util";

let runButtonId = "lab7RunButton",
    containerId = "lab7COntainerId",
    lab7COntainer1Id = "lab7COntainer1Id",
    lab7FormId = "lab7FormId",
    ui = {
        id: "lab7",
        type: "space",
        rows: [
            <webix.ui.toolbarConfig>{
                type: "toolbar",
                height: 50,
                cols: [
                    getButton(runButtonId),
                    getForm(lab7FormId, [
                        getTextField("error", "Error:", 0.001)
                    ])
                ]
            },
            {
                template: `<div id="${lab7COntainer1Id}" style="width: 100%; height: 100%; overflow-y: auto;"></div>`
            },
            {
                rows: [
                    <webix.ui.scrollviewConfig>{
                        view: "scrollview",
                        height: 1000,
                        scroll: "auto",
                        type: "space",
                        body: {
                            type: "space",
                            template: `<div id="${containerId}" style="width: 100%; height: 100%; overflow-y: auto;"></div>`
                        }
                    }
                ]
            }
        ]
    },
    initLab7 = () => {
        let container = document.querySelector(`#${containerId}`) as HTMLElement,
            container1 = document.querySelector(`#${lab7COntainer1Id}`) as HTMLElement,
            runButton = $$(runButtonId) as IButton,
            form = $$(lab7FormId) as IForm;
        runButton.attachEvent("onItemClick", () => {

        });
    };

export { ui, initLab7 };