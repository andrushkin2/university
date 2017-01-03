import * as express from "express";
import * as fs from "fs";
import * as mysql from "mysql";


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
    queryEvents = "SELECT mydb.client.firstName as clientName,mydb.client.lastName as clientLastName,mydb.event.*,mydb.employee.firstName AS empName,mydb.employee.lastName AS empLastName, mydb.service.name as serviceName FROM mydb.client,mydb.event,mydb.employee,mydb.service WHERE clientId = client.passportId AND emplyeeId = employee.passportId AND serviceId = service.id";

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
app.get("/", (req, res) => {
    if (indexContent) {
        res.send(indexContent);
    } else {
        indexContent = fs.readFileSync(`${pathToPublic}/index.html`, "UTF-8");
        res.send(indexContent);
    }
});
app.get("/request", (req, res) => {
    debugger;
    switch (req.query.type) {
        case "events": {
            connection.query(queryEvents, (error, rows) => {
                if (error) {
                    throw error;
                }
                res.send(rows);
            });
        }
        default:
            break;
    }
});
app.listen(port, () => {
    console.log(`Listening port ${port}`);
});