var gulp = require('gulp');
var util = require('gulp-util');
var autoprefixer = require('gulp-autoprefixer');
var babel = require('gulp-babel');
var uglify = require('gulp-uglify');
var sass = require('gulp-sass');
var cleancss = require('gulp-clean-css');
var imagemin = require('gulp-imagemin');
var rename = require('gulp-rename');
var htmlmin = require('gulp-htmlmin');
var watchpath = require('gulp-watch-path');
var watch = require('gulp-watch');
var rev = require('gulp-rev');
var revCollector = require('gulp-rev-collector');

var jsSrc = 'source/script/', jsDest = 'dist/script/',
    cssSrc = 'source/style/', cssDest = 'dist/style/',
    imgSrc = 'image/', imgDest = 'image/',
    htmlSrc = 'source/pages/', htmlDest = '';
var options = {
    removeComments: true,
    collapseWhitespace: true,
    // collapseBooleanAttributes: true,
    // removeEmptyAttributes: true,
    // removeScriptTypeAttributes: true,
    // removeStyleLinkTypeAttributes: true,
    minifyJS: true,
    minifyCSS: true
};
/**
 * JS 编译、压缩、修改文件版本后缀
 */
gulp.task('js-rev', function () {
    return gulp.src([jsSrc+'*.js','!'+jsSrc+'*.min.js'])
        .pipe(babel({
            presets: ['es2015']
        }))
        .pipe(gulp.dest(jsDest))
        .pipe(uglify())
        .pipe(rename({
            suffix: '.min'
        }))
        .pipe(rev())
        .pipe(gulp.dest(jsDest))
        .pipe(rev.manifest({
            path: 'rev-manifest-js.json'
        }))
        .pipe(gulp.dest('rev'));
});
gulp.task('js',['js-rev'], function(){
    gulp.src(['rev/rev-manifest-js.json',htmlSrc+'*.html',htmlSrc+'*.htm'])
        .pipe(revCollector())
        .pipe(gulp.dest(htmlSrc))
        .pipe(htmlmin(options))
        .pipe(gulp.dest(htmlDest));
});
gulp.task('watchjs', function () {
    gulp.watch([jsSrc+'*.js','!'+jsSrc+'*.min.js'], function (event) {
        var paths = watchpath(event, jsSrc, jsDest);
        util.log(util.colors.green(event.type) + ' ' + paths.srcPath);
        gulp.src(paths.srcPath)
            .pipe(babel({
                presets: ['es2015']
            }))
            .pipe(gulp.dest(jsDest))
            .pipe(uglify())
            .pipe(rename({
                suffix: '.min'
            }))
            .pipe(gulp.dest(paths.distDir));
        util.log('Dist ' + paths.distPath);
    })
});
/**
 * CSS SASS 压缩、修改文件版本后缀
 */
gulp.task('css-rev', function () {
    return gulp.src([cssSrc+'*.css','!'+cssSrc+'*.min.css'])
        .on('error',function(err){
            console.error('Error:', err.message);
        })
        .pipe(autoprefixer({
            browsers: 'last 2 versions'
        }))
        .pipe(cleancss())
        .pipe(rename({
            suffix: '.min'
        }))
        .pipe(rev())
        .pipe(gulp.dest(cssDest))
        .pipe(rev.manifest({
            path: 'rev-manifest-css.json'
        }))
        .pipe(gulp.dest('rev'));
});
gulp.task('css',['css-rev'],function(){
    return gulp.src(['rev/rev-manifest-css.json',htmlSrc+'*.html',htmlSrc+'*.htm'])
        .pipe(revCollector())
        .pipe(gulp.dest(htmlSrc))
        .pipe(htmlmin(options))
        .pipe(gulp.dest(htmlDest));
});
gulp.task('sass-rev', function () {
    return gulp.src([cssSrc+'*.scss',cssSrc+'*.sass'])
        .pipe(sass.sync().on('error', sass.logError))
        .pipe(autoprefixer({
            browsers: 'last 2 versions'
        }))
        .pipe(gulp.dest(cssDest))
        .pipe(cleancss())
        .pipe(rename({
            suffix: '.min'
        }))
        .pipe(rev())
        .pipe(gulp.dest(cssDest))
        .pipe(rev.manifest({
            path: 'rev-manifest-sass.json'
        }))
        .pipe(gulp.dest('rev'));
});
gulp.task('sass',['sass-rev'],function(){
    gulp.src(['rev/rev-manifest-sass.json',htmlSrc+'*.html',htmlSrc+'*.htm'])
        .pipe(revCollector())
        .pipe(gulp.dest(htmlSrc))
        .pipe(htmlmin(options))
        .pipe(gulp.dest(htmlDest));
});
gulp.task('watchsass',function () {
    gulp.watch([cssSrc+'*.scss',cssSrc+'*.sass'], function (event) {
        var paths = watchpath(event, cssSrc, cssDest);
        util.log(util.colors.green(event.type) + ' ' + paths.srcPath);
        gulp.src(paths.srcPath)
            .pipe(sass.sync().on('error', sass.logError))
            .pipe(autoprefixer({
                browsers: 'last 2 versions'
            }))
            .pipe(gulp.dest(cssDest))
            .pipe(cleancss())
            .pipe(rename({
                suffix: '.min'
            }))
            .pipe(gulp.dest(paths.distDir));
        util.log('Dist ' + paths.distPath);
    })
});
/**
 * 压缩图片*
 */
gulp.task('image', function(){
    gulp.src([imgSrc+'*.jpg',imgSrc+'*.png'])
        .pipe(imagemin({
            propressive: true
        }))
        .pipe(gulp.dest(imgDest));
});
/**
 * 压缩 HTML 文件*
 */
gulp.task('html', function () {
    gulp.src([htmlSrc+'*.html',htmlSrc+'*.htm'])
        .pipe(htmlmin(options))
        .pipe(gulp.dest(htmlDest));
});

gulp.task('default', ['watchjs','watchsass']);
