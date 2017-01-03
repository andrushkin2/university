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

},{"./clientsView":"/public/dev/clientsView.js"}],"/public/dev/clientsView.js":[function(require,module,exports){
"use strict";
var dataTable = {
    view: "datatable",
    columns: [
        { id: "rank", header: "", width: 50 },
        { id: "title", header: "Film title", width: 200 },
        { id: "year", header: "Released", width: 80 },
        { id: "votes", header: "Votes", width: 100 }
    ],
    data: [
        { id: 1, title: "The Shawshank Redemption", year: 1994, votes: 678790, rank: 1 },
        { id: 2, title: "The Godfather", year: 1972, votes: 511495, rank: 2 }
    ]
};
exports.DataTable = dataTable;

},{}]},{},[1]);
