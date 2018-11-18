var gulp = require("gulp");
var less = require("gulp-less");

const wwwrootPath = "./";
const publicPath = `${wwwrootPath}`;
const stylesPath = `${wwwrootPath}styles/`;

/*
compile less files
*/
gulp.task("less", function () {
    gulp.src(`${stylesPath}style.less`)
        .pipe(less())
        .pipe(gulp.dest(publicPath));
});

/*
Watch typescript and less
*/
gulp.task("watch", function () {
    gulp.watch(`${stylesPath}**/*.less`, ["less"]);
})

/*
default task
*/
gulp.task("default", function() {
   
});