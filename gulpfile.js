var gulp = require('gulp');//获取 gulp
var util = require('gulp-util');//输出带颜色的提示信息
var autoprefixer = require('gulp-autoprefixer');//自动补全浏览器前缀
var uglify = require('gulp-uglify');//用于压缩js的模块
var watchpath = require('gulp-watch-path');//检测改变的js文件
var watch = require('gulp-watch');//只编译被更改过的文件
var sourcemaps = require('gulp-sourcemaps');//帮助压缩过的js调试
var sass = require('gulp-ruby-sass');//用于编译sass的模块
var cleancss = require('gulp-clean-css');//用于压缩css的模块
var imagemin = require('gulp-imagemin');//用于压缩图片的模块
var rename = require('gulp-rename');//重命名 添加.min后缀

var babel = require('gulp-babel');//ES6
//路径
var jsSrc = 'js/', jsDest = 'dist/js/',
	cssSrc = 'scss/', cssDest = 'dist/sass/',
	imgSrc = 'img/', imgDest = 'img/';

//压缩所有的js文件
gulp.task('alljs',function(){
	gulp.src(jsSrc+'*.js')
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
//检测到某个js文件被修改时，只编写当前修改的js文件
gulp.task('watchjs',function(){
	gulp.watch(jsSrc+'*.js', function(event){
		var paths = watchpath(event, jsSrc, jsDest);
		util.log(util.colors.green(event.type)+' '+paths.srcPath);
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
		util.log('Dist '+paths.distPath);
	})
});

//编译所有的sass文件
gulp.task('allsass',function(){
	sass([cssSrc+'*.scss',cssSrc+'*.sass'])
		.on('error',function(err){
			console.error('Error:', err.message);
		})
		.pipe(autoprefixer({
			browsers: 'last 2 versions'
		}))
		.pipe(gulp.dest(cssDest))
		.pipe(cleancss())
		.pipe(rename({
			suffix: '.min'
		}))
		.pipe(gulp.dest(cssDest));
});
//编译修改的sass文件
gulp.task('watchsass', function(){
	gulp.watch(cssSrc+'*.scss', function(event){
		var paths = watchpath(event, cssSrc, cssDest);
		util.log(util.colors.green(event.type)+' '+paths.srcPath);
		sass(paths.srcPath)
			.on('error',function(err){
				console.error('Error:', err.message);
			})
			.pipe(autoprefixer({
				browsers: 'last 2 versions'
			}))
			.pipe(gulp.dest(cssDest))
			.pipe(cleancss())
			.pipe(rename({
				suffix: '.min'
			}))
			.pipe(gulp.dest(paths.distDir));
		util.log('Dist '+paths.distPath);
	})
});

//压缩图片
gulp.task('image', function(){
	gulp.src(imgSrc+'*')
		.pipe(imagemin({
			propressive: true
		}))
		.pipe(gulp.dest('img'));
});
// gulp.task('watchimage', function(){
// 	gulp.watch(imgSrc+'*', function(event){
// 		var paths = watchpath(event, imgSrc, imgDest);
//
// 		util.log(util.colors.green(event.type)+' '+paths.srcPath);
// 		util.log('Dist '+paths.distPath);
//
// 		glup.src(paths.srcPath)
// 		    .pipe(imagemin({
// 		    	propressive: true
// 		    }))
// 		    .pipe(gulp.dest(paths.distDir));
// 	})
// })

gulp.task('default', ['watchjs','watchsass']);

