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
// var rev = require('gulp-rev');
// var recCollector = require('gulp-rev-collector');

var jsSrc = 'source/script/', jsDest = 'dist/script/',
    cssSrc = 'source/style/', cssDest = 'dist/style/',
    imgSrc = 'image/', imgDest = 'image/',
    htmlSrc = 'source/pages/', htmlDest = '';

gulp.task('js',function(){
    gulp.src([jsSrc+'*.js','!'+jsSrc+'*.min.js'])
        .pipe(babel({
            presets: ['es2015']
        }))
        .pipe(gulp.dest(jsDest))
        .pipe(uglify())
        .pipe(rename({
            suffix: '.min'
        }))
        .pipe(gulp.dest(jsDest))
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
gulp.task('css',function(){
    gulp.src([cssSrc+'*.css','!'+cssSrc+'*.min.css'])
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
        // .pipe(rev())
        .pipe(gulp.dest(cssDest));
});
gulp.task('sass',function(){
    gulp.src([cssSrc+'*.scss',cssSrc+'*.sass'])
        .pipe(sass.sync().on('error', sass.logError))
        .pipe(autoprefixer({
            browsers: 'last 2 versions'
        }))
        .pipe(gulp.dest(cssDest))
        .pipe(cleancss())
        .pipe(rename({
            suffix: '.min'
        }))
        // .pipe(rev())
        .pipe(gulp.dest(cssDest));
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
gulp.task('image', function(){
    gulp.src([imgSrc+'*.jpg',imgSrc+'*.png'])
        .pipe(imagemin({
            propressive: true
        }))
        .pipe(gulp.dest(imgDest));
});
gulp.task('html', function () {
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
    gulp.src([htmlSrc+'*.html',htmlSrc+'*.htm'])
        .pipe(htmlmin(options))
        .pipe(gulp.dest(htmlDest));
});

// gulp.task('default', ['alljs','allcss','image']);
