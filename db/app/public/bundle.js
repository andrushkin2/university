require=(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
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

},{"./clientsView":"/public/dev/clientsView.js"}],"/public/dev/clientsView.js":[function(require,module,exports){
"use strict";
var parser = webix.Date.dateToStr("%d-%M-%y %G:%s", false), dataTable = {
    view: "datatable",
    id: "eventsTable",
    columns: [
        { id: "clientId", header: "Client", width: 50, fillspace: 1, template: function (obj) {
                return obj.clientName + " " + obj.clientLastName;
            } },
        { id: "serviceId", header: "Service", width: 200, gravity: 2, fillspace: 1, template: function (obj) {
                return "" + obj.serviceName;
            } },
        { id: "holeId", header: "Hole Id", width: 80, fillspace: 1 },
        { id: "emplyeeId", header: "Employee", width: 100, fillspace: 1, template: function (obj) {
                return obj.empName + " " + obj.empLastName;
            } },
        { id: "date", header: "Date", width: 100, fillspace: 1, template: function (obj) {
                return parser(new Date(obj.date));
            } }
    ],
    data: [
        { id: 1, title: "The Shawshank Redemption", year: 1994, votes: 678790, rank: 1 },
        { id: 2, title: "The Godfather", year: 1972, votes: 511495, rank: 2 }
    ]
};
exports.DataTable = dataTable;

},{}]},{},[1]);
