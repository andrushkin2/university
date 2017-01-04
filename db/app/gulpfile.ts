
import gulp = require("gulp");
import * as ts from "typescript";
import * as fs from "fs";
import * as browserify from "browserify";
import * as tsify from "tsify";


let devFolderPath = "./public/dev",
    serverFolderPath = "./server",
    tsConfig: ts.CompilerOptions = JSON.parse(fs.readFileSync("./tsconfig.json", "utf-8")),
    outPut = "./public/scripts",
    outPutJs = `${outPut}/js/`,
    createPathToDev = (file: string) => {
        return `${devFolderPath}/${file}`;
    },
    createPathToServer = (file: string) => {
        return `${serverFolderPath}/${file}`;
    },
    compileDevFolder = (pathToFile: string[]) => {
        let program: ts.Program = ts.createProgram(pathToFile.map(file => {
            return createPathToDev(file);
        }), tsConfig);
        let emitResult = program.emit();

        let allDiagnostics = ts.getPreEmitDiagnostics(program).concat(emitResult.diagnostics);

        allDiagnostics.forEach(diagnostic => {
            let stat = diagnostic.file.getLineAndCharacterOfPosition(diagnostic.start);
            let line = stat.line;
            let message = ts.flattenDiagnosticMessageText(diagnostic.messageText, "\n");

            //colorize input
            process.stdout.write("\x1b[31m");
            process.stdout.write(`Message: ${message} \n`);
            process.stdout.write("\x1b[37m");
            process.stdout.write(`File: ${diagnostic.file.fileName} \n`);
            process.stdout.write("\x1b[32m");
            process.stdout.write(`Line: ${ diagnostic.file.getText().split("\n")[line].trim() } \n`);
            process.stdout.write("\x1b[37m");
            process.stdout.write("\n");
        });

        if (!allDiagnostics.length) {
            pathToFile.forEach(file => {
                let fileName: string = createPathToDev(file.replace(".ts", ".js"));
                browserify(fileName).bundle();
            });
            process.stdout.write("Compilation end\n");
        }
    },
    compileServerFolder = (pathToFile: string[]) => {
        let program: ts.Program = ts.createProgram(pathToFile.map(file => {
            return createPathToServer(file);
        }), tsConfig);
        let emitResult = program.emit();

        let allDiagnostics = ts.getPreEmitDiagnostics(program).concat(emitResult.diagnostics);

        allDiagnostics.forEach(diagnostic => {
            let stat = diagnostic.file.getLineAndCharacterOfPosition(diagnostic.start);
            let line = stat.line;
            let message = ts.flattenDiagnosticMessageText(diagnostic.messageText, "\n");

            //colorize input
            process.stdout.write("\x1b[31m");
            process.stdout.write(`Message: ${message} \n`);
            process.stdout.write("\x1b[37m");
            process.stdout.write(`File: ${diagnostic.file.fileName} \n`);
            process.stdout.write("\x1b[32m");
            process.stdout.write(`Line: ${ diagnostic.file.getText().split("\n")[line].trim() } \n`);
            process.stdout.write("\x1b[37m");
            process.stdout.write("\n");
        });

        if (!allDiagnostics.length) {
            process.stdout.write("Compilation end\n");
        }
    };

gulp.task("tsBuild", function() {
    compileDevFolder(fs.readdirSync(devFolderPath).filter(file => {
        return file.endsWith(".ts");
    }));
});


gulp.task("default", () => {
    gulp.start("watcher");
});

gulp.task("watcher", () => {
    fs.watch(devFolderPath, (e, file) => {
        file.endsWith(".ts") && compileDevFolder([file]);
    });
    fs.watch(serverFolderPath, (e, file) => {
        file.endsWith(".ts") && compileServerFolder([file]);
    });
});