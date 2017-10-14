let buttonId: string = "modButtonId1",
    chartId: string = "modChart1Id",
    ui = {
        id: "modId",
        css: "bg_panel_raised",
        type: "space",
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
                    {}
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
                }
            },
            {}
        ]
    };

export { ui as UI, buttonId, chartId };