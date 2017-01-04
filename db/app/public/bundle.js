require=(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
"use strict";
var parser = webix.Date.dateToStr("%d-%M-%y %G:%i:%s", false), dataTable = {
    view: "datatable",
    id: "eventsTable",
    select: true,
    columns: [
        { id: "clientId", header: "Client", width: 50, fillspace: 1, template: function (obj) {
                return obj.clientName + " " + obj.clientLastName;
            } },
        { id: "serviceId", header: "Service", width: 200, gravity: 2, fillspace: 1, template: function (obj) {
                return "" + obj.serviceName;
            } },
        { id: "holeId", header: "Hole", width: 80, fillspace: 1 },
        { id: "emplyeeId", header: "Employee", width: 100, fillspace: 1, template: function (obj) {
                return obj.empName + " " + obj.empLastName;
            } },
        { id: "date", header: "Date", width: 100, fillspace: 1, template: function (obj) {
                return parser(new Date(obj.date));
            } }
    ]
};
exports.DataTable = dataTable;

},{}],2:[function(require,module,exports){
"use strict";
/// <reference path="../typings/webix/webix.d.ts"  />
var clientsView_1 = require("./clientsView");
var addEventForm_1 = require("./addEventForm");
webix.ready(function () {
    var onRangeChange = function (fromDate, toDate) {
        if (!fromDate) {
            webix.message({ type: "error", text: "Please, set start date :(" });
            return;
        }
        if (!toDate) {
            webix.message({ type: "error", text: "Please, set end date :(" });
            return;
        }
        if (fromDate > toDate) {
            webix.message({ type: "error", text: "Start date should be less then end date :(" });
            return;
        }
        webix.ajax().post("./request?type=chart", {
            fromDate: fromDate,
            toDate: toDate
        }).then(function (result) {
            var data = result.json(), chart = $$("chartId");
            chart.data.clearAll();
            chart.parse(data);
        }).fail(function (xhr) {
            webix.message({ type: "error", text: "Cannot load data for current date range :(" });
        });
    };
    webix.ui({
        rows: [
            { view: "template",
                type: "header", template: "Фитнез-зал!" },
            {
                view: "tabview",
                type: "space",
                cells: [{
                        header: "Events",
                        body: {
                            rows: [
                                clientsView_1.DataTable,
                                {
                                    view: "button",
                                    id: "addEvent",
                                    value: "Add a new event",
                                    inputWidth: 300,
                                    on: {
                                        "onItemClick": function (event) {
                                            $$(addEventForm_1.AddEventFormUI.id).clear();
                                            window.show();
                                        }
                                    }
                                }
                            ]
                        }
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
                                                "onChange": function (newValue, oldDate) {
                                                    var toDate = $$("toDate").getValue();
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
                                                "onChange": function (newValue, oldDate) {
                                                    var fromDate = $$("fromDate").getValue();
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
    var window = webix.ui({
        view: "window",
        id: "addFormWindow",
        head: "Add an event",
        width: 400,
        height: 400,
        position: "center",
        modal: true,
        body: addEventForm_1.AddEventFormUI
    });
    $$("cancelFromButton").attachEvent("onItemClick", function (event) {
        var form = $$(addEventForm_1.AddEventFormUI.id);
        window.hide();
        form.clear();
    });
    $$("addFromButton").attachEvent("onItemClick", function (event) {
        var form = $$(addEventForm_1.AddEventFormUI.id), values = form.getValues();
        webix.ajax().post("./request?type=events&method=add", values).then(function (result) {
            var table = $$(clientsView_1.DataTable.id), form = $$(addEventForm_1.AddEventFormUI.id);
            table.data.clearAll();
            table.load("./request?type=events");
            window.hide();
            form.clear();
        }).fail(function (xhr) {
            webix.message({ type: "error", text: "Cannot add the event :(" });
        });
    });
    $$(clientsView_1.DataTable.id).load("./request?type=events");
});

},{"./addEventForm":"/public/dev/addEventForm.js","./clientsView":1}],"/public/dev/addEventForm.js":[function(require,module,exports){
"use strict";
var formUI = {
    view: "form",
    id: "addEventForm",
    elements: [
        {
            view: "select", label: "Client", value: 1,
            options: "./request?type=clients",
            name: "clientId",
            labelAlign: "left"
        },
        {
            view: "select", label: "Hole", value: 1,
            options: "./request?type=holes",
            name: "holeId",
            labelAlign: "left"
        },
        {
            view: "select", label: "Employee", value: "",
            options: "./request?type=employees",
            name: "emplyeeId",
            labelAlign: "left",
            on: {
                "onChange": function (newValue, oldValue) {
                    var serviceSelect = $$("serviceSelectControl");
                    serviceSelect.define("options", "./request?type=services&empId=" + newValue);
                    serviceSelect.refresh();
                }
            }
        },
        {
            view: "select", label: "Service", id: "serviceSelectControl", value: 1,
            options: [],
            name: "serviceId",
            labelAlign: "left"
        },
        {
            view: "datepicker",
            value: new Date(),
            label: "Date",
            name: "date",
            timepicker: true,
            stringResult: false,
            width: 300,
            format: webix.Date.dateToStr("%d-%M-%y %G:%i:%s"),
            labelAlign: "left"
        },
        { cols: [
                { view: "button", value: "Add", id: "addFromButton", type: "form" },
                { view: "button", value: "Cancel", id: "cancelFromButton" }
            ] }
    ]
};
exports.AddEventFormUI = formUI;

},{}]},{},[1,2]);
