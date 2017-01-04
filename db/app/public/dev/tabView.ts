/// <reference path="../typings/webix/webix.d.ts"  />
import { DataTable } from "./clientsView";
import { AddEventFormUI } from "./addEventForm";

webix.ready(() => {
    let onRangeChange = (fromDate: Date, toDate: Date) => {
        if (!fromDate) {
            webix.message({type: "error", text: "Please, set start date :("});
            return;
        }
        if (!toDate) {
            webix.message({type: "error", text: "Please, set end date :("});
            return;
        }
        if (fromDate > toDate) {
            webix.message({type: "error", text: "Start date should be less then end date :("});
            return;
        }
        webix.ajax().post("./request?type=chart", {
            fromDate: fromDate,
            toDate: toDate
        }).then(function (result) {
            let data  = result.json(),
                chart = $$("chartId");
            chart.data.clearAll();
            chart.parse(data);
        }).fail(function (xhr) {
            webix.message({type: "error", text: "Cannot load data for current date range :("});
        });
    };
    webix.ui({
        rows: [
            { view: "template",
                type: "header", template: "Фитнез-зал!" },
            {
                view: "tabview",
                type: "space",
                cells: [ {
                        header: "Events",
                        body: {
                            rows: [
                                DataTable,
                                {
                                    view: "button",
                                    id: "addEvent",
                                    value: "Add a new event",
                                    inputWidth: 300,
                                    on: {
                                        "onItemClick": (event) => {
                                            $$(AddEventFormUI.id).clear();
                                            window.show();
                                        }
                                    }
                                }
                            ]}
                    },
                    {
                        header: "Chart",
                        body: {
                            rows: [
                                {
                                    cols: [
                                        {
                                            view: "datepicker",
                                            value: new Date(),
                                            label: "From date",
                                            id: "fromDate",
                                            timepicker: true,
                                            stringResult: false,
                                            width: 300,
                                            format: webix.Date.dateToStr("%d-%M-%y %G:%i:%s"),
                                            labelAlign: "left",
                                            on: {
                                                "onChange": (newValue: Date, oldDate: Date) => {
                                                    let toDate: Date = $$("toDate").getValue();
                                                    onRangeChange(newValue, toDate);
                                                }
                                            }
                                        },
                                        {
                                            view: "datepicker",
                                            value: new Date(),
                                            id: "toDate",
                                            label: "To date",
                                            timepicker: true,
                                            stringResult: false,
                                            width: 300,
                                            format: webix.Date.dateToStr("%d-%M-%y %G:%i:%s"),
                                            labelAlign: "left",
                                            on: {
                                                "onChange": (newValue: Date, oldDate: Date) => {
                                                    let fromDate: Date = $$("fromDate").getValue();
                                                    onRangeChange(fromDate, newValue);
                                                }
                                            }
                                        },
                                        {
                                            view: "template"
                                        }
                                    ]
                                },
                                {
                                    view: "chart",
                                    type: "pie",
                                    id: "chartId",
                                    value: "#amount#",
                                    pieInnerText: "#amount#",
                                    legend: {
                                        width: 300,
                                        align: "right",
                                        valign: "middle",
                                        template: "#name#"
                                    },
                                    shadow: 0,
                                    x: 200,
                                    y: 150,
                                    data: []
                                },
                                {
                                    view: "template",
                                    text: "asdasd"
                                }
                            ]
                        }
                    }
                ]
            }
        ]
    });

    let window = webix.ui({
        view: "window",
        id: "addFormWindow",
        head: "Add an event",
        width: 400,
        height: 400,
        position: "center",
        modal: true,
        body: AddEventFormUI
    });


    $$("cancelFromButton").attachEvent("onItemClick", (event) => {
        let form = $$(AddEventFormUI.id);
        window.hide();
        form.clear();
    });
    $$("addFromButton").attachEvent("onItemClick", (event) => {
        let form = $$(AddEventFormUI.id),
            values = form.getValues();
        webix.ajax().post("./request?type=events&method=add", values).then(function (result) {
            let table = $$(DataTable.id),
                form = $$(AddEventFormUI.id);
            table.data.clearAll();
            table.load("./request?type=events");
            window.hide();
            form.clear();
        }).fail(function (xhr) {
            webix.message({type: "error", text: "Cannot add the event :("});
        });
    });
    $$(DataTable.id).load("./request?type=events");
});
