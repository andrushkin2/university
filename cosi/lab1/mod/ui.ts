let buttonId: string = "modButtonId1",
    chartId: string = "modChart1Id",
    formDataId: string = "formDataId",
    formOutputDataId: string = "formOutputDataId",
    ui = {
        id: "modId",
        css: "bg_panel_raised",
        type: "space",
        autoheight: true,
        rows: [
            {
                type: "toolbar",
                css: "bg_panel",
                cols: [
                    { template: "MOD", type: "header", width: 100, borderless: true },
                    <webix.ui.buttonConfig>{
                        view: "button",
                        css: "button_primary button_raised",
                        id: buttonId,
                        width: 100,
                        value: "Run"
                    },
                    <webix.ui.formConfig>{
                        view: "form",
                        id: formDataId,
                        gravity: 1.3,
                        cols: [
                            <webix.ui.textConfig>{
                                view: "text",
                                value: "",
                                name: "a",
                                label: "A:",
                                labelAlign: "left"
                            },
                            <webix.ui.textConfig>{
                                view: "text",
                                value: "",
                                name: "m",
                                label: "M:",
                                labelAlign: "left"
                            },
                            <webix.ui.textConfig>{
                                view: "text",
                                value: "",
                                name: "r0",
                                label: "R0:",
                                labelAlign: "left"
                            },
                            {}
                        ]
                    },
                    {}
                ]
            },
            <webix.ui.formConfig>{
                view: "form",
                id: formOutputDataId,
                disabled: true,
                cols: [
                    <webix.ui.textConfig>{
                        view: "text",
                        value: "",
                        name: "period",
                        label: "Period:",
                        labelAlign: "left"
                    },
                    <webix.ui.textConfig>{
                        view: "text",
                        value: "",
                        name: "aPeriod",
                        label: "Aperiod:",
                        labelAlign: "left"
                    },
                    <webix.ui.textConfig>{
                        view: "text",
                        value: "",
                        name: "mX",
                        label: "Mx:",
                        labelAlign: "left"
                    },
                    <webix.ui.textConfig>{
                        view: "text",
                        value: "",
                        name: "dX",
                        label: "Dx:",
                        labelAlign: "left"
                    },
                    <webix.ui.textConfig>{
                        view: "text",
                        value: "",
                        name: "uniformity",
                        label: "Uniformity:",
                        labelAlign: "left"
                    }
                ]
            },
            <webix.ui.chartConfig>{
                view: "chart",
                css: "bg_panel",
                id: chartId,
                type: "bar",
                label: function (value) {
                    return parseFloat(value.y).toFixed(4);
                },
                value: "#y#",
                barWidth: 35,
                radius: 0,
                gradient: "falling",
                xAxis: {
                    template: function(data) {
                        return parseFloat(data.x).toFixed(4);
                    }
                },
                yAxis: {
                    template: function (data) {
                        return data;
                    }
                }
            },
            {}
        ]
    };

export { ui as UI, buttonId, chartId, formDataId, formOutputDataId };