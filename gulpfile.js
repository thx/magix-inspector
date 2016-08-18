var wrapNoDepsTMPL = '(function(){\r\n${content}\r\n})();';

var pkg = require('./package.json');
var tmplFolder = 'tmpl'; //template folder
var srcFolder = 'src'; //source folder
var buildFolder = 'build'; //build folder
var excludeTmplFolders = [];

var gulp = require('gulp');
var watch = require('gulp-watch');
var fs = require('fs');
var combineTool = require('magix-combine');
var del = require('del');

combineTool.addProcessor('file:loader', function() {
    return {
        process: function(o) {
            var tmpl = wrapNoDepsTMPL;
            for (var p in o) {
                var reg = new RegExp('\\$\\{' + p + '\\}', 'g');
                tmpl = tmpl.replace(reg, (o[p] + '').replace(/\$/g, '$$$$'));
            }
            return tmpl;
        }
    };
});
combineTool.config({
    tmplFolder: tmplFolder,
    srcFolder: srcFolder,
    buildFolder: buildFolder,
    excludeTmplFolders: excludeTmplFolders,
    prefix: 'mx_ispt_',
    nanoOptions: {
        safe: true
    },
    onlyAllows: {
        '.html': 1,
        '.css': 1
    }
});

gulp.task('cleanSrc', function() {
    return del(srcFolder);
});
gulp.task('combine', ['cleanSrc'], function() {
    combineTool.combine();
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
gulp.task('cleanBuild', function() {
    return del(buildFolder);
});
gulp.task('build', ['cleanBuild'], function() {
    combineTool.build();
    gulp.src(buildFolder + '/**/*.js')
        .pipe(uglify({
            banner: '/*' + pkg.version + ' xinglie.lkf@taobao.com*/',
            compress: {
                drop_console: true
            },
            output: {
                ascii_only: true
            }
        }))
        .pipe(gulp.dest(buildFolder));
});