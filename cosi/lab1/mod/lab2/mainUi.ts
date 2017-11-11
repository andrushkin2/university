import { uniformUi } from "./uniformUi";
import { gaussUi } from "./gaussUi";
import { exponentialUi } from "./exponentialUi";
import { triangleUi } from "./triangleUi";
import { gammaUi } from "./gammaUi";
import { simpsonUi } from "./simpsonUi";

let distributionListId = "distributionListId",
    ui = <webix.ui.tabviewConfig>{
        view: "tabview",
        cells: [
            {
                header: "Uniform",
                body: uniformUi
            },
            {
                header: "Gauss",
                body: gaussUi
            },
            {
                header: "Exponential",
                body: exponentialUi
            },
            {
                header: "Gamma",
                body: gammaUi
            },
            {
                header: "Triangle",
                body: triangleUi
            },
            {
                header: "Simpson",
                body: simpsonUi
            }
        ]
    };

export { ui, distributionListId };