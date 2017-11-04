import { uniformUi } from "./uniformUi";

let distributionListId: string = "distributionListId",
    ui = <webix.ui.tabviewConfig>{
        view: "tabview",
        cells: [
            {
                header: "Uniform",
                body: uniformUi
            },
            {
                header: "Form",
                body: {
                    /* id: "formView1asd3",
                    view: "form" */
                }
            }
        ]
    };

export { ui, distributionListId };