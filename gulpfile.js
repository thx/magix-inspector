var pkg = require('./package.json');
var tmplFolder = 'tmpl'; //template folder
var srcFolder = 'src'; //source folder
var buildFolder = 'build';

var gulp = require('gulp');
var watch = require('gulp-watch');
var fs = require('fs');
var combineTool = require('magix-combine');
var del = require('del');

combineTool.config({
    tmplFolder: tmplFolder,
    srcFolder: srcFolder,
    compressCss: true,
    compressCssSelectorNames: true,
    md5KeyLen: 2,
    cssSelectorPrefix: 'mxi-',
    loaderType: 'iife'
});

gulp.task('combine', function() {
    del(srcFolder).then(combineTool.combine);
});
gulp.task('watch', ['combine'], function() {
    watch(tmplFolder + '/**/*', function(e) {
        console.log(e.path);
        if (fs.existsSync(e.path)) {
            combineTool.processFile(e.path);
        } else {
            combineTool.removeFile(e.path);
        }
    });
});

var uglify = require('gulp-uglify');
let header = require('gulp-header');
gulp.task('cleanBuild', function() {
    return del(buildFolder);
});
gulp.task('build', ['cleanBuild'], function() {
    gulp.src(srcFolder + '/**/*.js')
        .pipe(uglify({
            compress: {
                drop_console: true
            },
            output: {
                ascii_only: true
            }
        }))
        .pipe(header('/*!<%=ver%> kooboy_li@163.com*/', {
            ver: pkg.version
        }))
        .pipe(gulp.dest(buildFolder));
});