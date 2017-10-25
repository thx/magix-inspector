let pkg = require('./package.json');
let tmplFolder = 'tmpl'; //template folder
let srcFolder = 'src'; //source folder
let buildFolder = 'build';

let gulp = require('gulp');
let watch = require('gulp-watch');
let fs = require('fs');
let combineTool = require('../magix-combine/index');
let del = require('del');
let ts = require('typescript');

combineTool.config({
    tmplFolder: tmplFolder,
    srcFolder: srcFolder,
    cssSelectorPrefix: 'mxi-',
    loaderType: 'iife',
    revisableStringSplitter: '',
    compileBeforeProcessor(content) {
        let str = ts.transpileModule(content, {
            compilerOptions: {
                lib: ['es7'],
                target: 'es3',
                module: ts.ModuleKind.None
            }
        });
        str = str.outputText;
        return str;
    }
});

gulp.task('combine', function () {
    del(srcFolder).then(combineTool.combine);
});
gulp.task('watch', ['combine'], function () {
    watch(tmplFolder + '/**/*', function (e) {
        console.log(e.path);
        if (fs.existsSync(e.path)) {
            combineTool.processFile(e.path);
        } else {
            combineTool.removeFile(e.path);
        }
    });
});

let uglify = require('gulp-uglify');
let header = require('gulp-header');
gulp.task('cleanBuild', function () {
    return del(buildFolder);
});
gulp.task('build', ['cleanBuild'], function () {
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