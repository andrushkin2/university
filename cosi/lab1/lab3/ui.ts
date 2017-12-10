import { getButton } from "../mod/lab2/uiItems";
import { IButton } from "../mod/madLab";
import Checkmate from "./svgElement";

let runButtonId = "lab6RunButton",
    containerId = "lab6COntainerId",
    ui = {
        id: "lab6",
        type: "space",
        rows: [
            <webix.ui.toolbarConfig>{
                type: "toolbar",
                height: 50,
                cols: [
                    getButton(runButtonId)
                ]
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
                            template: `<div id="${containerId}" style="width: 100%; height: 100%;"></div>`
                        }
                    }
                ]
            }
        ]
    },
    t = [
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 1, 1, 1, 1, 1, 1, 0, 0],
        [0, 0, 1, 1, 1, 1, 1, 1, 0, 0],
        [0, 0, 0, 0, 1, 1, 0, 0, 0, 0],
        [0, 0, 0, 0, 1, 1, 0, 0, 0, 0],
        [0, 0, 0, 0, 1, 1, 0, 0, 0, 0],
        [0, 0, 0, 0, 1, 1, 0, 0, 0, 0],
        [0, 0, 0, 0, 1, 1, 0, 0, 0, 0],
        [0, 0, 0, 0, 1, 1, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
    ],
    b = [
        [0, 0, 1, 1, 1, 1, 1, 0, 0, 0],
        [0, 0, 1, 1, 1, 1, 1, 1, 0, 0],
        [0, 0, 1, 1, 0, 0, 1, 1, 0, 0],
        [0, 0, 1, 1, 0, 0, 1, 1, 0, 0],
        [0, 0, 1, 1, 1, 1, 1, 0, 0, 0],
        [0, 0, 1, 1, 1, 1, 1, 0, 0, 0],
        [0, 0, 1, 1, 0, 0, 1, 1, 0, 0],
        [0, 0, 1, 1, 0, 0, 1, 1, 0, 0],
        [0, 0, 1, 1, 1, 1, 1, 1, 0, 0],
        [0, 0, 1, 1, 1, 1, 1, 0, 0, 0]
    ],
    l = [
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 1, 1, 1, 1, 1, 1, 0, 0],
        [0, 0, 1, 1, 1, 1, 1, 1, 0, 0],
        [0, 0, 1, 1, 0, 0, 1, 1, 0, 0],
        [0, 0, 1, 1, 0, 0, 1, 1, 0, 0],
        [0, 0, 1, 1, 0, 0, 1, 1, 0, 0],
        [0, 0, 1, 1, 0, 0, 1, 1, 0, 0],
        [0, 1, 1, 1, 0, 0, 1, 1, 0, 0],
        [0, 1, 1, 1, 0, 0, 1, 1, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
    ],
    initLab6 = () => {
        let container = document.querySelector(`#${containerId}`) as HTMLElement,
            runButton = $$(runButtonId) as IButton;
        runButton.attachEvent("onItemClick", () => {

        });

        let testSVG = new Checkmate();
        container.appendChild(testSVG.container);
        testSVG.updateValues(t);
        let testSVG1 = new Checkmate();
        container.appendChild(testSVG1.container);
        testSVG1.updateValues(b);
        let testSVG2 = new Checkmate();
        container.appendChild(testSVG2.container);
        testSVG2.updateValues(l);
    };

export { ui, initLab6 };