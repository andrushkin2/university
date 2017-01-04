import * as express from "express";
import * as fs from "fs";
import * as mysql from "mysql";

let bodyParser = require('body-parser');


interface IEventClient {
    clientName: string;
    clientLastName: string;
}
interface IEventService {
    serviceName: string;
}
interface IEventEmployee {
    empName: string;
    empLastName: string;
}

export interface IEventTable {
    clientId: number;
    comment?: string;
    date: string;
    emplyeeId: number;
    holeId: number;
    serviceId: number;
}

export interface IEventDataTable extends IEventTable, IEventEmployee, IEventService, IEventClient {}

let connection = mysql.createConnection({
        host: "localhost",
        user: "root",
        password: "325674kl"
    }),
    queryEvents = "SELECT mydb.client.firstName as clientName,mydb.client.lastName as clientLastName,mydb.event.*,mydb.employee.firstName AS empName,mydb.employee.lastName AS empLastName, mydb.service.name as serviceName FROM mydb.client,mydb.event,mydb.employee,mydb.service WHERE clientId = client.passportId AND emplyeeId = employee.passportId AND serviceId = service.id",
    clientsQuery = "SELECT t1.passportId as id, concat(t1.firstName, ' ', t1.lastName) as value, t1.firstName, t1.lastName from mydb.client as t1",
    holeQuery = "SELECT hole.number as id, hole.number as value from mydb.hole",
    employeeQuery = "SELECT t1.passportId as id, concat(t1.firstName, ' ', t1.lastName) as value, t1.firstName, t1.lastName from mydb.employee as t1",
    serviceQuery = "SELECT distinct service.id, service.name as value FROM mydb.service, mydb.serviceEmployeeHash WHERE serviceEmployeeHash.employeeId = {0}",
    chartQuery = "SELECT service.name, service.id, T.amount FROM mydb.service, (SELECT event.serviceId as id, COUNT(event.serviceId) as amount FROM mydb.event WHERE date >= '{0}' AND date <= '{1}' GROUP BY serviceId) AS T Where service.id = T.id",
    getServiceByEmployeeId = (empId: string): string | null => {
        if (empId) {
            return serviceQuery.replace("{0}", empId);
        } else {
            return null;
        }
    };

connection.connect(function(err){
  if(err){
    console.log('Error connecting to Db');
    return;
  }
  console.log('Connection established');
});

// connection.end(function(err) {
//   // The connection is terminated gracefully
//   // Ensures all previously enqueued queries are still
//   // before sending a COM_QUIT packet to the MySQL server.
//   console.log("Connection ended");
// });

const   pathToPublic = `${__dirname}/../public`;

let app = express(),
    port: number = process.env.PORT || 1234,
    indexContent: string | undefined;
app.use(express.static(pathToPublic));
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true }));
app.get("/", (req, res) => {
    if (indexContent) {
        res.send(indexContent);
    } else {
        indexContent = fs.readFileSync(`${pathToPublic}/index.html`, "UTF-8");
        res.send(indexContent);
    }
});
app.post("/request", function(req, res) {
    switch (req.query.type) {
        case "events": {
            if (req.query.method === "add") {
                let params = <IEventTable>req.body,
                    query = `INSERT into mydb.event (date, holeId, clientId, serviceId, emplyeeId ) values ('${params.date}','${params.holeId}','${params.clientId}','${params.serviceId}','${params.emplyeeId}')`;
                connection.query(query, function (error, rows) {
                    if (error) {
                        res.sendStatus(404);
                    } else {
                        res.send(rows);
                    }
                });
            } else {
                res.sendStatus(404);
            }
            break;
        }
        case "chart": {
            let params = req.body,
            query = chartQuery.replace("{0}", params.fromDate).replace("{1}", params.toDate);
            connection.query(query, function (error, rows) {
                if (error) {
                    res.send([]);
                } else {
                    res.send(rows);
                }
            });
        }
        default:
            break;
    }
});
app.get("/request", (req, res) => {
    switch (req.query.type) {
        case "events": {
            connection.query(queryEvents, (error, rows) => {
                if (error) {
                    throw error;
                }
                res.send(rows);
            });
            break;
        }
        case "clients": {
            connection.query(clientsQuery, (error, rows) => {
                if (error) {
                    throw error;
                }
                res.send(rows);
            });
            break;
        }
        case "holes": {
            connection.query(holeQuery, (error, rows) => {
                if (error) {
                    throw error;
                }
                res.send(rows);
            });
            break;
        }
        case "employees": {
            connection.query(employeeQuery, (error, rows) => {
                if (error) {
                    throw error;
                }
                res.send(rows);
            });
            break;
        }
        case "services": {
            let query = getServiceByEmployeeId(req.query.empId || "");
            if (query) {
                connection.query(query, (error, rows) => {
                    if (error) {
                        throw error;
                    }
                    res.send(rows);
                });
            } else {
                res.send([]);
            }
            break;
        }
        default:
            break;
    }
});
app.listen(port, () => {
    console.log(`Listening port ${port}`);
});