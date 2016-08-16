'use strict';

var gulp = require("gulp");
var config = require("./gulp/config");

var plugins = {
    eslint: require('gulp-eslint'),
    sass: require('gulp-sass')
};

// default task 
gulp.task("default", function (done) {
    console.log("Hello " + config.projectName);
    done();
});

//linting
//Ensures scripts (.js files in app directory) follow the style standards set in the .eslintrc file

gulp.task("lint", function (done) {
    // Note: To have the process exit with an error code (1) on lint error, return the stream and pipe to failOnError last.
    return gulp.src(config.fileCollections.scripts)
		.pipe(plugins.eslint())
		.pipe(plugins.eslint.format())
		.pipe(plugins.eslint.failAfterError());
});

//bump
//update version number in package.json and assemblyInfo.cs files 
var bump = require('./gulp/bump');
gulp.task('bump:major', bump.bumpMajor);
gulp.task('bump:minor', bump.bumpMinor);
gulp.task('bump:patch', bump.bumpPatch);

//compile
var compile = require('./gulp/compile');
gulp.task('compile:solution', compile.buildSolution);

//release
gulp.task('compile:release', compile.packageRelease)

//minification
// Use App_Start\BundleConfig.cs
// Add in a bundle for your js files.
// Doesn't work well with Angular since you have to manually give it an order and maintain it vs looking at the angular dependencies


//unit test
//https://github.com/keithmorris/gulp-nunit-runner

// saas
// { base: '' } is used to get gulp to write back to the same directory
gulp.task('sass', function () {
    return gulp.src(config.files.mainScss, { base: "./" })
    .pipe(plugins.sass({
        outputStyle: 'compressed'
    }))
    .pipe(gulp.dest("."));
});
