"use strict";
/// <reference path="../typings/webix/webix.d.ts"  />
var clientsView_1 = require("./clientsView");
webix.ready(function () {
    webix.ui({
        rows: [
            { view: "template",
                type: "header", template: "Фитнез-зал!" },
            {
                view: "tabview",
                cells: [
                    clientsView_1.DataTable,
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
