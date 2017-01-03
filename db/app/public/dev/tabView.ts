/// <reference path="../typings/webix/webix.d.ts"  />
import { DataTable } from "./clientsView";

webix.ready(() => {
    webix.ui({
        rows: [
            { view: "template",
                type: "header", template: "Фитнез-зал!" },
            {
                view: "tabview",
                type: "space",
                cells: [ {
                        header: "Events",
                        body: DataTable
                    },
                    { header: "Empty",
                        body: {
                        template: "Some content"
                        }
                    }
                ]
            }
        ]
    });

    let eventCollection = new webix.DataCollection({
        url: "./request?type=events"
    });
    $$(DataTable.id).sync(eventCollection);
});
