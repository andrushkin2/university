
let getButton = (buttonId: string) => (<webix.ui.buttonConfig>{
        view: "button",
        css: "button_primary button_raised",
        id: buttonId,
        width: 100,
        value: "Run"
    }),
    getTextField = (name: string, label: string, value: string | number = "") => (<webix.ui.textConfig>{
        view: "text",
        value: value,
        height: 40,
        name: name,
        label: label,
        labelAlign: "left"
    }),
    getForm = (id: string, items: webix.ui.textareaConfig[], isDisabled = false) => (<webix.ui.formConfig>{
        view: "form",
        disabled: isDisabled,
        id: id,
        height: 50,
        gravity: 1.3,
        cols: items
    }),
    getChart = (id: string) => (<webix.ui.chartConfig>{
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

export { getButton, getChart, getForm, getTextField };