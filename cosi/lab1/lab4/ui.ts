import { getButton, getTextField, getForm } from "../mod/lab2/uiItems";
import { IButton, IForm } from "../mod/madLab";
import CheckmatePicture from "./svgPicture";
import { debug } from "util";
import Perceptron, { TrainingElement } from "./perceptron";

let runButtonId = "lab7RunButton",
    lab7FindButton = "lab7FindButton",
    containerId = "lab7COntainerId",
    lab7COntainer1Id = "lab7COntainer1Id",
    lab7FormId = "lab7FormId",
    lab7FormOutputId = "lab7FormOutputId",
    ui = {
        id: "lab7",
        type: "space",
        rows: [
            <webix.ui.toolbarConfig>{
                type: "toolbar",
                height: 50,
                cols: [
                    getButton(runButtonId, "Training"),
                    getForm(lab7FormId, [
                        getTextField("error", "Error:", 0.001)
                    ])
                ]
            },
            {
                template: `<div id="${lab7COntainer1Id}" style="width: 100:; height: auto; overflow-y: auto; padding: 5px; background: grey;"></div>`
            },
            <webix.ui.toolbarConfig>{
                type: "toolbar",
                height: 50,
                cols: [
                    getButton(lab7FindButton),
                    getForm(lab7FormOutputId, [
                        getTextField("1", "1:", 0),
                        getTextField("2", "2:", 0),
                        getTextField("3", "3:", 0),
                        getTextField("4", "4:", 0),
                        getTextField("5", "5:", 0)
                    ])
                ]
            }
        ]
    },
    d = [
        [1, 1, 0, 0, 0, 0],
        [1, 0, 1, 0, 0, 0],
        [1, 0, 1, 0, 0, 0],
        [1, 0, 1, 0, 0, 0],
        [1, 0, 1, 0, 0, 0],
        [1, 1, 0, 0, 0, 0]
    ],
    f = [
        [1, 1, 1, 1, 0, 0],
        [1, 0, 0, 0, 0, 0],
        [1, 0, 0, 0, 0, 0],
        [1, 1, 0, 0, 0, 0],
        [1, 0, 0, 0, 0, 0],
        [1, 0, 0, 0, 0, 0]
    ],
    iLatter = [
        [0, 1, 1, 1, 0, 0],
        [0, 0, 1, 0, 0, 0],
        [0, 0, 1, 0, 0, 0],
        [0, 0, 1, 0, 0, 0],
        [0, 0, 1, 0, 0, 0],
        [0, 1, 1, 1, 0, 0]
    ],
    nLatter = [
        [1, 0, 0, 0, 0, 1],
        [1, 1, 0, 0, 0, 1],
        [1, 0, 1, 0, 0, 1],
        [1, 0, 0, 1, 0, 1],
        [1, 0, 0, 0, 1, 1],
        [1, 0, 0, 0, 0, 1]
    ],
    p = [
        [1, 1, 1, 0, 0, 0],
        [1, 0, 0, 1, 0, 0],
        [1, 0, 0, 1, 0, 0],
        [1, 1, 1, 0, 0, 0],
        [1, 0, 0, 0, 0, 0],
        [1, 0, 0, 0, 0, 0]
    ],
    initLab7 = () => {
        let container1 = document.querySelector(`#${lab7COntainer1Id}`) as HTMLElement,
            runButton = $$(runButtonId) as IButton,
            form = $$(lab7FormId) as IForm,
            a = 0.5,
            psi = (value: number) => 1.0 / (1.0 + Math.exp(-a * value)),
            dpsi = (value: number) => psi(value) * (1.0 - psi(value));

            let perceprtor = new Perceptron(36, 5),
                trainingElements: TrainingElement[] = [],
                setTrainElement = (image: number[][], n: number) => {
                    if (!trainingElements[n]) {
                        trainingElements[n] = new TrainingElement([], []);
                    }
                    let trainingElement = trainingElements[n];
                    for (let i = 0, k = 0; i < 6; i++) {
                        for (let j = 0; j < 6; j++, k++) {
                            trainingElement.in[k] = image[i][j];
                        }
                    }
                    for (let i = 0; i < 5; i++) {
                        if (i !== n) {
                            trainingElement.out[i] = 0.0;
                        } else {
                            trainingElement.out[i] = 1.0;
                        }
                    }
                };
            [d, f, iLatter, nLatter, p].forEach((value, n) => {
                setTrainElement(value, n);
                let svg = new CheckmatePicture();
                svg.updateValues(value);
                container1.appendChild(svg.container);
            });

        perceprtor.addHiddenLayer(40);
        perceprtor.setPSI(psi, dpsi);
        perceprtor.init();
        runButton.attachEvent("onItemClick", () => {
            debugger;
            perceprtor.setTrainingSet(trainingElements);
            let error: number;
            do {
                error = perceprtor.train(0.2);
            } while (error > 0.005);
        });
    };

export { ui, initLab7 };