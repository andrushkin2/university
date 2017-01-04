import { IEventDataTable } from "../../server/server";

let parser = webix.Date.dateToStr("%d-%M-%y %G:%i:%s", false),
    dataTable = {
    view: "datatable",
    id: "eventsTable",
    select: true,
    columns: [
        { id: "clientId",    header: "Client", width: 50, fillspace: 1, template: function(obj: IEventDataTable) {
            return `${obj.clientName} ${obj.clientLastName}`;
        }},
        { id: "serviceId",   header: "Service",    width: 200, gravity: 2, fillspace: 1, template: function(obj: IEventDataTable) {
            return `${obj.serviceName}`;
        }},
        { id: "holeId",    header: "Hole",      width: 80, fillspace: 1},
        { id: "emplyeeId",   header: "Employee",         width: 100, fillspace: 1, template: function(obj: IEventDataTable) {
            return `${obj.empName} ${obj.empLastName}`;
        }},
        { id: "date",   header: "Date",         width: 100, fillspace: 1, template: function(obj: IEventDataTable) {
            return parser(new Date(obj.date));
        }}
    ]
};

export {dataTable as DataTable};