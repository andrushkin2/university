"use strict";
var gulp = require("gulp");
var ts = require("gulp-typescript");
var serve = require("gulp-serve"), devFolderPath = "./dev", outPut = "./bin/", outPutTs = outPut + "ts/", outPutJs = outPut + "js/";
gulp.task("tsBuild", function () {
    var tsProject = ts.createProject("./tsconfig.json"), typescriptResult = gulp.src(devFolderPath + "/**/*.ts").pipe(ts(tsProject));
    return typescriptResult.js.pipe(gulp.dest("./build"));
});
gulp.task("serve", serve({
    root: ["public", "build"],
    port: 3000,
    https: true,
    middleware: function (req, res) {
        debugger;
    } // custom optional middleware
}));
gulp.task("default", function () {
});
gulp.task("watcher", function () {
    //gulp.watch();
});
gulp.start("serve");
