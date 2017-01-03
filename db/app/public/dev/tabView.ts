/// <reference path="../typings/webix/webix.d.ts"  />
import { DataTable } from "./clientsView";

webix.ready(() => {
      webix.ui({
        rows: [
            { view: "template",
                type: "header", template: "Фитнез-зал!" },
            {
                view: "tabview",
                cells: [
                    DataTable,
                    { header: "Empty",
                        body: {
                        template: "Some content"
                        }
                    }
                ]
            }
        ]
    });
});
