let buttonId: string = "modButtonId1",
    ui = {
        id: "modId",
        rows: [
            {
                type: "toolbar",
                cols: [
                    { template: "MOD", type: "header", width: 100, borderless: true },
                    <webix.ui.buttonConfig>{
                        view: "button",
                        id: buttonId,
                        value: "Run"
                    },
                    {}
                ]
            }
        ]
    };

export { ui as UI, buttonId };