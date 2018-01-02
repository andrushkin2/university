import { getButton, getTextField, getForm } from "../mod/lab2/uiItems";
import { IButton, IForm } from "../mod/madLab";
import CheckmatePicture from "./svgPicture";
import { debug } from "util";
import Perceptron, { TrainingElement } from "./perceptron";

let runButtonId = "lab7RunButton",
    runButton2Id = "runButton2Id",
    lab7FindButton = "lab7FindButton",
    containerId = "lab7COntainerId",
    lab7COntainer1Id = "lab7COntainer1Id",
    lab7COntainer2Id = "lab7COntainer2Id",
    lab7FormId = "lab7FormId",
    lab7FormOutputId = "lab7FormOutputId",
    ui = {
        id: "lab7",
        type: "space",
        rows: [
            <webix.ui.toolbarConfig>{
                type: "toolbar",
                height: 70,
                cols: [
                    getButton(runButtonId, "Training"),
                    getForm(lab7FormId, [
                        getTextField("error", "Error:", 0.001)
                    ])
                ]
            },
            {
                height: 150,
                template: `<div id="${lab7COntainer1Id}" style="width: 100%; height: auto; overflow-y: auto; padding: 5px; background: grey;"></div>`
            },
            {
                cols: [
                    <webix.ui.toolbarConfig>{
                        type: "toolbar",
                        height: 70,
                        cols: [
                            getButton(runButton2Id, "Classify", 150)
                        ]
                    },
                    {
                        height: 150,
                        width: 150,
                        template: `<div id="${lab7COntainer2Id}" style="width: 100%; height: auto; overflow-y: auto; padding: 5px; background: grey;"></div>`
                    },
                    {}
                ]
            },
            <webix.ui.toolbarConfig>{
                type: "toolbar",
                height: 70,
                cols: [
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
            container2 = document.querySelector(`#${lab7COntainer2Id}`) as HTMLElement,
            runButton = $$(runButtonId) as IButton,
            addNoise = $$(runButton2Id) as IButton,
            form = $$(lab7FormId) as IForm,
            formOutput = $$(lab7FormOutputId) as IForm,
            isLearned = false,
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
            },
            toFlattenArray = (array: number[][]) => {
                let res: number[] = [];
                for (let i = 0, len = array.length; i < len; i++) {
                    res = res.concat(array[i]);
                }
                return res;
            },
            classify = () => {
                let res = perceprtor.classify(toFlattenArray(activeState));
                formOutput.setValues({
                    "1": res[0],
                    "2": res[1],
                    "3": res[2],
                    "4": res[3],
                    "5": res[4]
                });
            },
            getRandomInt = (min: number, max: number) => Math.floor(Math.random() * (max - min)) + min,
            addNoiseToImage = (image: number[][]) => {
                let i = getRandomInt(0, 6),
                    j = getRandomInt(0, 6),
                    value = image[i][j],
                    result = image.slice(0);
                result[i][j] = value === 0 ? 1 : 0;
                return result;
            };
        [d, f, iLatter, nLatter, p].forEach((value, n) => {
            setTrainElement(value, n);
            let svg = new CheckmatePicture();
            svg.updateValues(value);
            svg.container.addEventListener("click", () => {
                activeState = value.slice(0);
                activeSvgEl.updateValues(activeState);
                if (isLearned) {
                    classify();
                }
            }, false);
            container1.appendChild(svg.container);
        });

        let activeSvgEl = new CheckmatePicture(),
            activeState = d.slice(0);

        container2.appendChild(activeSvgEl.container);
        activeSvgEl.updateValues(activeState);

        perceprtor.addHiddenLayer(40);
        perceprtor.setPSI(psi, dpsi);
        perceprtor.init();


        runButton.attachEvent("onItemClick", () => {
            perceprtor.setTrainingSet(trainingElements);
            let error: number;
            do {
                error = perceprtor.train(0.2);
            } while (error > 0.005);
            isLearned = true;
        });


        addNoise.attachEvent("onItemClick", () => {
            if (!isLearned) {
                webix.message({
                    type: "error",
                    text: "The network has not learned yet"
                });
                return;
            }
            activeState = addNoiseToImage(activeState);
            activeSvgEl.updateValues(activeState);
            classify();
        });
    };

export { ui, initLab7 };