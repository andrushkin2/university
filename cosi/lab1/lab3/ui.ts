import { getButton } from "../mod/lab2/uiItems";
import { IButton } from "../mod/madLab";
import Checkmate, { SvgRow } from "./svgElement";
import NetworkUtils from "./network";
import { debug } from "util";

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
                            template: `<div id="${containerId}" style="width: 100%; height: 100%; overflow-y: auto;"></div>`
                        }
                    }
                ]
            }
        ]
    },
    t = [
        [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
        [-1, -1, 1, 1, 1, 1, 1, 1, -1, -1],
        [-1, -1, 1, 1, 1, 1, 1, 1, -1, -1],
        [-1, -1, -1, -1, 1, 1, -1, -1, -1, -1],
        [-1, -1, -1, -1, 1, 1, -1, -1, -1, -1],
        [-1, -1, -1, -1, 1, 1, -1, -1, -1, -1],
        [-1, -1, -1, -1, 1, 1, -1, -1, -1, -1],
        [-1, -1, -1, -1, 1, 1, -1, -1, -1, -1],
        [-1, -1, -1, -1, 1, 1, -1, -1, -1, -1],
        [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1]
    ],
    b = [
        [-1, -1, 1, 1, 1, 1, 1, -1, -1, -1],
        [-1, -1, 1, 1, 1, 1, 1, 1, -1, -1],
        [-1, -1, 1, 1, -1, -1, 1, 1, -1, -1],
        [-1, -1, 1, 1, -1, -1, 1, 1, -1, -1],
        [-1, -1, 1, 1, 1, 1, 1, -1, -1, -1],
        [-1, -1, 1, 1, 1, 1, 1, -1, -1, -1],
        [-1, -1, 1, 1, -1, -1, 1, 1, -1, -1],
        [-1, -1, 1, 1, -1, -1, 1, 1, -1, -1],
        [-1, -1, 1, 1, 1, 1, 1, 1, -1, -1],
        [-1, -1, 1, 1, 1, 1, 1, -1, -1, -1]
    ],
    l = [
        [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
        [-1, -1, 1, 1, 1, 1, 1, 1, -1, -1],
        [-1, -1, 1, 1, 1, 1, 1, 1, -1, -1],
        [-1, -1, 1, 1, -1, -1, 1, 1, -1, -1],
        [-1, -1, 1, 1, -1, -1, 1, 1, -1, -1],
        [-1, -1, 1, 1, -1, -1, 1, 1, -1, -1],
        [-1, -1, 1, 1, -1, -1, 1, 1, -1, -1],
        [-1, 1, 1, 1, -1, -1, 1, 1, -1, -1],
        [-1, 1, 1, 1, -1, -1, 1, 1, -1, -1],
        [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1]
    ],
    initLab6 = () => {
        let container = document.querySelector(`#${containerId}`) as HTMLElement,
            runButton = $$(runButtonId) as IButton,
            network = new NetworkUtils(),
            clearRowItems = () => {
                let elements = container.querySelectorAll(`.rowItem`);
                for (let len = elements.length - 1, i = len; i >= 0; i--) {
                    container.removeChild(elements[i]);
                }
            },
            weights: number[][] | undefined;
        runButton.attachEvent("onItemClick", () => {
            clearRowItems();
            weights = weights || network.learnNetwork([t , b, l], 100);

            let images = [t, b, l],
                percentage = [10, 20, 30, 35, 40, 45, 50, 55, 60, 65, 70, 80, 90, 100];

            for (let i = 0; i < 3; i++) {
                let image = images[i];
                for (let k = 0, len = percentage.length; k < len; k++) {
                    let persent = percentage[k],
                        noise = network.getNoise(image, persent, 10),
                        foundImage = network.recognize(noise, weights),
                        rowItem = new SvgRow(persent);

                    rowItem.updateRow(noise, foundImage);
                    container.appendChild(rowItem.container);
                }
            }
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