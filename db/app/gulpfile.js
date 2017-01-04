"use strict";
var gulp = require("gulp");
var ts = require("typescript");
var fs = require("fs");
var browserify = require("browserify");
var devFolderPath = "./public/dev", serverFolderPath = "./server", tsConfig = JSON.parse(fs.readFileSync("./tsconfig.json", "utf-8")), outPut = "./public/scripts", outPutJs = outPut + "/js/", createPathToDev = function (file) {
    return devFolderPath + "/" + file;
}, createPathToServer = function (file) {
    return serverFolderPath + "/" + file;
}, compileDevFolder = function (pathToFile) {
    var program = ts.createProgram(pathToFile.map(function (file) {
        return createPathToDev(file);
    }), tsConfig);
    var emitResult = program.emit();
    var allDiagnostics = ts.getPreEmitDiagnostics(program).concat(emitResult.diagnostics);
    allDiagnostics.forEach(function (diagnostic) {
        var stat = diagnostic.file.getLineAndCharacterOfPosition(diagnostic.start);
        var line = stat.line;
        var message = ts.flattenDiagnosticMessageText(diagnostic.messageText, "\n");
        //colorize input
        process.stdout.write("\x1b[31m");
        process.stdout.write("Message: " + message + " \n");
        process.stdout.write("\x1b[37m");
        process.stdout.write("File: " + diagnostic.file.fileName + " \n");
        process.stdout.write("\x1b[32m");
        process.stdout.write("Line: " + diagnostic.file.getText().split("\n")[line].trim() + " \n");
        process.stdout.write("\x1b[37m");
        process.stdout.write("\n");
    });
    if (!allDiagnostics.length) {
        pathToFile.forEach(function (file) {
            var fileName = createPathToDev(file.replace(".ts", ".js"));
            browserify(fileName).bundle();
        });
        process.stdout.write("Compilation end\n");
    }
}, compileServerFolder = function (pathToFile) {
    var program = ts.createProgram(pathToFile.map(function (file) {
        return createPathToServer(file);
    }), tsConfig);
    var emitResult = program.emit();
    var allDiagnostics = ts.getPreEmitDiagnostics(program).concat(emitResult.diagnostics);
    allDiagnostics.forEach(function (diagnostic) {
        var stat = diagnostic.file.getLineAndCharacterOfPosition(diagnostic.start);
        var line = stat.line;
        var message = ts.flattenDiagnosticMessageText(diagnostic.messageText, "\n");
        //colorize input
        process.stdout.write("\x1b[31m");
        process.stdout.write("Message: " + message + " \n");
        process.stdout.write("\x1b[37m");
        process.stdout.write("File: " + diagnostic.file.fileName + " \n");
        process.stdout.write("\x1b[32m");
        process.stdout.write("Line: " + diagnostic.file.getText().split("\n")[line].trim() + " \n");
        process.stdout.write("\x1b[37m");
        process.stdout.write("\n");
    });
    if (!allDiagnostics.length) {
        process.stdout.write("Compilation end\n");
    }
};
gulp.task("tsBuild", function () {
    compileDevFolder(fs.readdirSync(devFolderPath).filter(function (file) {
        return file.endsWith(".ts");
    }));
});
gulp.task("default", function () {
    gulp.start("watcher");
});
gulp.task("watcher", function () {
    fs.watch(devFolderPath, function (e, file) {
        file.endsWith(".ts") && compileDevFolder([file]);
    });
    fs.watch(serverFolderPath, function (e, file) {
        file.endsWith(".ts") && compileServerFolder([file]);
    });
});
