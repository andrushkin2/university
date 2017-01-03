"use strict";
var express = require("express");
var fs = require("fs");
var pathToPublic = __dirname + "/../public";
var app = express(), port = process.env.PORT || 1234, indexContent;
app.use(express.static(pathToPublic));
app.get("/", function (req, res) {
    if (indexContent) {
        res.send(indexContent);
    }
    else {
        indexContent = fs.readFileSync(pathToPublic + "/index.html", "UTF-8");
        res.send(indexContent);
    }
});
app.listen(port, function () {
    console.log("Listening port " + port);
});
