"use strict";
var express = require("express");
var fs = require("fs");
var mysql = require("mysql");
var bodyParser = require('body-parser');
var connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "325674kl"
}), queryEvents = "SELECT mydb.client.firstName as clientName,mydb.client.lastName as clientLastName,mydb.event.*,mydb.employee.firstName AS empName,mydb.employee.lastName AS empLastName, mydb.service.name as serviceName FROM mydb.client,mydb.event,mydb.employee,mydb.service WHERE clientId = client.passportId AND emplyeeId = employee.passportId AND serviceId = service.id", clientsQuery = "SELECT t1.passportId as id, concat(t1.firstName, ' ', t1.lastName) as value, t1.firstName, t1.lastName from mydb.client as t1", holeQuery = "SELECT hole.number as id, hole.number as value from mydb.hole", employeeQuery = "SELECT t1.passportId as id, concat(t1.firstName, ' ', t1.lastName) as value, t1.firstName, t1.lastName from mydb.employee as t1", serviceQuery = "SELECT distinct service.id, service.name as value FROM mydb.service, mydb.serviceEmployeeHash WHERE serviceEmployeeHash.employeeId = {0}", chartQuery = "SELECT service.name, service.id, T.amount FROM mydb.service, (SELECT event.serviceId as id, COUNT(event.serviceId) as amount FROM mydb.event WHERE date >= '{0}' AND date <= '{1}' GROUP BY serviceId) AS T Where service.id = T.id", getServiceByEmployeeId = function (empId) {
    if (empId) {
        return serviceQuery.replace("{0}", empId);
    }
    else {
        return null;
    }
};
connection.connect(function (err) {
    if (err) {
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
var pathToPublic = __dirname + "/../public";
var app = express(), port = process.env.PORT || 1234, indexContent;
app.use(express.static(pathToPublic));
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true }));
app.get("/", function (req, res) {
    if (indexContent) {
        res.send(indexContent);
    }
    else {
        indexContent = fs.readFileSync(pathToPublic + "/index.html", "UTF-8");
        res.send(indexContent);
    }
});
app.post("/request", function (req, res) {
    switch (req.query.type) {
        case "events": {
            if (req.query.method === "add") {
                var params = req.body, query = "INSERT into mydb.event (date, holeId, clientId, serviceId, emplyeeId ) values ('" + params.date + "','" + params.holeId + "','" + params.clientId + "','" + params.serviceId + "','" + params.emplyeeId + "')";
                connection.query(query, function (error, rows) {
                    if (error) {
                        res.sendStatus(404);
                    }
                    else {
                        res.send(rows);
                    }
                });
            }
            else {
                res.sendStatus(404);
            }
            break;
        }
        case "chart": {
            var params = req.body, query = chartQuery.replace("{0}", params.fromDate).replace("{1}", params.toDate);
            connection.query(query, function (error, rows) {
                if (error) {
                    res.send([]);
                }
                else {
                    res.send(rows);
                }
            });
        }
        default:
            break;
    }
});
app.get("/request", function (req, res) {
    switch (req.query.type) {
        case "events": {
            connection.query(queryEvents, function (error, rows) {
                if (error) {
                    throw error;
                }
                res.send(rows);
            });
            break;
        }
        case "clients": {
            connection.query(clientsQuery, function (error, rows) {
                if (error) {
                    throw error;
                }
                res.send(rows);
            });
            break;
        }
        case "holes": {
            connection.query(holeQuery, function (error, rows) {
                if (error) {
                    throw error;
                }
                res.send(rows);
            });
            break;
        }
        case "employees": {
            connection.query(employeeQuery, function (error, rows) {
                if (error) {
                    throw error;
                }
                res.send(rows);
            });
            break;
        }
        case "services": {
            var query = getServiceByEmployeeId(req.query.empId || "");
            if (query) {
                connection.query(query, function (error, rows) {
                    if (error) {
                        throw error;
                    }
                    res.send(rows);
                });
            }
            else {
                res.send([]);
            }
            break;
        }
        default:
            break;
    }
});
app.listen(port, function () {
    console.log("Listening port " + port);
});
