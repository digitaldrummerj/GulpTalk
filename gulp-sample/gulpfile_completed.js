var gulp = require('gulp');

var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var concat = require('gulp-concat');
var inject = require('gulp-inject');
var sourcemaps = require('gulp-sourcemaps');
var rimraf = require('rimraf');

var paths = {
          javascript: [
            './www/**/*.js',
			  '!./www/lib/**',
			'!./www/dist/**'
          ],
		  bundledFile: 'bundled.js',
		  bundledFileDest: './www/dist',		  		  
};
		
var bundledFileWithPath = paths.bundledFileDest + paths.bundledFile;
		
gulp.task('js-min', function () {
	gulp.src(paths.javascript)
		.pipe(uglify())
		.pipe(rename({ extname: '.min.js' }))
		.pipe(gulp.dest(paths.bundledFileDest))	
});

gulp.task('js-concat', function () {
	gulp.src(paths.javascript)
		.pipe(concat(paths.bundledFile))
		.pipe(gulp.dest(paths.bundledFileDest))	
});

gulp.task('js-min-combine', function () {
	gulp.src(paths.javascript)
		.pipe(uglify())
		.pipe(concat(paths.bundledFile))		
		.pipe(gulp.dest(paths.bundledFileDest))		
});

gulp.task('default', ['js-min', 'js-concat'], function () {
	console.log('default task');
});

gulp.task('watch', function () {
	gulp.watch(paths.javascript, ['js-min-combine'])
});


gulp.task('inject', ['js-min-combine'], function () {
	return gulp.src('./www/index.html')
		.pipe(inject(gulp.src(['./www/dist/**/*.js'], { read: false }), { relative: true }))
		.pipe(gulp.dest('./www'))	
});

gulp.task('maps', ['clean'], function () {
	gulp.src(paths.javascript)
	  .pipe(sourcemaps.init())
      .pipe(concat(paths.bundledFile))
      .pipe(uglify())
      .pipe(sourcemaps.write())
      .pipe(gulp.dest(paths.bundledFileDest));
});

gulp.task("clean", function (cb) {
    rimraf(bundledFileWithPath, cb);
  });