
import gulp = require("gulp");
import fs = require("fs");
import ts = require("gulp-typescript");

let serve = require("gulp-serve"),
    devFolderPath = "./dev",
    outPut = "./bin/",
    outPutTs = `${outPut}ts/`,
    outPutJs = `${outPut}js/`;

gulp.task("tsBuild", function() {
    let tsProject: ts.Project = ts.createProject("./tsconfig.json"),
        typescriptResult = gulp.src(`${devFolderPath}/**/*.ts`).pipe(<any>ts(tsProject));
    return typescriptResult.js.pipe(gulp.dest("./build"));
});

gulp.task("serve", serve({
    root: ["public", "build"],
    port: 3000,
    https: true,
    middleware: function(req, res) {
        debugger;
    }    // custom optional middleware
}));

gulp.task("default", () => {

});

gulp.task("watcher", function() {
    //gulp.watch();
});


gulp.start("serve");