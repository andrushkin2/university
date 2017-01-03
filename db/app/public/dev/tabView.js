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
                type: "space",
                cells: [{
                        header: "Events",
                        body: clientsView_1.DataTable
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
    var eventCollection = new webix.DataCollection({
        url: "./request?type=events"
    });
    $$(clientsView_1.DataTable.id).sync(eventCollection);
});
