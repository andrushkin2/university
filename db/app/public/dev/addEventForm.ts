
let formUI = {
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
                "onChange": (newValue: string, oldValue: string) => {
                    let serviceSelect = $$("serviceSelectControl");
                    serviceSelect.define("options", `./request?type=services&empId=${newValue}`);
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
        {cols: [
            { view: "button", value: "Add", id: "addFromButton", type: "form" },
            { view: "button", value: "Cancel", id: "cancelFromButton"}
        ]}
    ]
};

export {formUI as AddEventFormUI}