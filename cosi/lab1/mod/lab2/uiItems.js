"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
let getButton = (buttonId, buttonText = "Run", width = 100) => ({
    view: "button",
    css: "button_primary button_raised",
    id: buttonId,
    width: width,
    value: buttonText
}), getTextField = (name, label, value = "") => ({
    view: "text",
    value: value,
    height: 50,
    name: name,
    label: label,
    labelAlign: "left"
}), getForm = (id, items, isDisabled = false) => ({
    view: "form",
    disabled: isDisabled,
    id: id,
    height: 50,
    gravity: 1.3,
    cols: items
}), getChart = (id) => ({
    view: "chart",
    css: "bg_panel",
    id: id,
    type: "bar",
    label: function (value) {
        return parseFloat(value.y).toFixed(4);
    },
    value: "#y#",
    barWidth: 35,
    radius: 0,
    gradient: "falling",
    xAxis: {
        template: function (data) {
            return parseFloat(data.x).toFixed(4);
        }
    },
    yAxis: {
        template: function (data) {
            return data;
        }
    }
});
exports.getButton = getButton;
exports.getTextField = getTextField;
exports.getForm = getForm;
exports.getChart = getChart;
