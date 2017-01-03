import { IEventDataTable } from "../../server/server";

let parser = webix.Date.dateToStr("%d-%M-%y %G:%s", false),
    dataTable = {
    view: "datatable",
    id: "eventsTable",
    columns: [
        { id: "clientId",    header: "Client", width: 50, fillspace: 1, template: function(obj: IEventDataTable) {
            return `${obj.clientName} ${obj.clientLastName}`;
        }},
        { id: "serviceId",   header: "Service",    width: 200, gravity: 2, fillspace: 1, template: function(obj: IEventDataTable) {
            return `${obj.serviceName}`;
        }},
        { id: "holeId",    header: "Hole Id",      width: 80, fillspace: 1},
        { id: "emplyeeId",   header: "Employee",         width: 100, fillspace: 1, template: function(obj: IEventDataTable) {
            return `${obj.empName} ${obj.empLastName}`;
        }},
        { id: "date",   header: "Date",         width: 100, fillspace: 1, template: function(obj: IEventDataTable) {
            return parser(new Date(obj.date));
        }}
    ],
    data: [
        { id: 1, title: "The Shawshank Redemption", year: 1994, votes: 678790, rank: 1},
        { id: 2, title: "The Godfather", year: 1972, votes: 511495, rank: 2}
    ]
};

export {dataTable as DataTable};