'use strict';

var gulpUtil = require('gulp-util');


var projectName = 'MusicCityCode'; // must be kebab-case
var moduleName = 'musicCityCode'; // must be camelCase
var dotNetProjectName = 'Gulp for DotNet';

var appRoot = '.';
var distRoot = 'dist';
var buildsBaseDir = '../builds';
var tmpBuildDir = buildsBaseDir + '/tmp';

var paths = {
    app: appRoot,
    buildsBaseDir: buildsBaseDir,
    styles: appRoot + '/content',
    images: appRoot + '/images',
    test: 'test',
    dist: distRoot,
    distStyles: distRoot + '/styles',
    distFonts: distRoot + '/styles/fonts',
    distImages: distRoot + '/images/',
    tmp: appRoot + '/.tmp',
    tmpFonts: appRoot + '/.tmp/fonts',
    bowerComponents: appRoot + '/bower_components',
    vendorScripts: appRoot  + '/Scripts',
    nodeModules: 'node_modules',
    deployFileShare: '//127.0.0.1/shareDemo$/' + projectName,
    tmpBuildDir: tmpBuildDir,
    projectTmpBuildOutput: tmpBuildDir + '/' + '_PublishedWebsites/' + dotNetProjectName + '/**/*'
};

var files = {
    assemblyInfoFiles: paths.app + '/**/AssemblyInfo.cs',
    nodeModules: paths.nodeModules + '/**/*',
    nodeModules: paths.nodeModules + '/**/*',
    templates: paths.app + '/**/*.html',
    vendorScripts: paths.vendorScripts + '/**/*.js',
    scripts: paths.app + '/**/*.js',
    styles: paths.app + '/**/*.scss',
    moduleScripts: paths.app + '/**/*.module.js',
    favicons: paths.app + '/**/*.ico',
    fonts: paths.app + '/**/*.{eot,svg,ttf,woff}',
    images: paths.images + '/**/*',
    json: paths.app + '/**/*.json',
    html: paths.app + '/**/*.html',
    htmlTopLevel: paths.app + '/*.html',
    htmlTemplatecache: paths.app + '/**/*.template.html',
    gulpConfig: 'gulp/config.js',
    tmp: paths.tmp + '/**/*',
    tmpCss: paths.tmp + '/**/*.css',
    tmpFonts: paths.tmpFonts + '/**/*',
    dist: paths.dist + '/**/*',
    distHtml: paths.dist + '/**/*.html',
    distCss: paths.distStyles + '/**/*.css',
    distIndexHtml: paths.dist + '/index.html',
    distScripts: paths.dist + '/**/*.js',
    distManifest: paths.dist + '/rev-manifest.json',
    indexHtml: paths.app + '/index.html',
    html404: paths.app + '/404.html',
    indexJs: paths.app + '/index.js',
    mainScss: paths.styles + '/Site.scss',
    // These files will be moved to your dist folder at build time.
    serverConfig: [
		paths.app + '/nginx.conf',
		paths.app + '/.htaccess',
		paths.app + '/robots.txt',
		paths.app + '/web.config'
    ],
    packageJson: 'package.json',
    tfs: '"C:\\Program Files (x86)\\Microsoft Visual Studio 14.0\\Common7\\IDE\\tf.exe"',
    solutionFiles: '../*.sln',
    footer: paths.app + '/footer.html'
};

// groups of globs that are used more than once
//TODO: give this a better name?
var fileCollections = {
    //all application html except index.html, 404.html, and html templates that are templatecached, all of which are handled differently in the build step	
    htmlRevable: [
		files.html,
		'!' + files.htmlTemplatecache,
		'!' + files.indexHtml,
		'!' + files.html404,
		'!' + files.nodeModules,
		'!' + files.tmp
    ],
    //all application html that will be templatecached
    htmlTemplatecache: [
		files.htmlTemplatecache,
		'!' + files.nodeModules,
		'!' + files.tmp
    ],
    //all application html
    html: [
		files.html,
		'!' + files.nodeModules,
		'!' + files.tmp
    ],
    scripts: [
		files.scripts,
        files.moduleScripts,
		'!' + files.tests,
		'!' + files.nodeModules,
		'!' + files.tmp,
        '!' + files.vendorScripts
    ],
    styles: [
		files.styles,
		'!' + files.nodeModules,
		'!' + files.tmp
    ],
    json: [
		files.json,
		'!' + files.nodeModules,
		'!' + files.tmp
    ],
    favicons: [
		files.favicons,
		'!' + files.nodeModules,
		'!' + files.tmp
    ],
    revReplaceFiles: [
		files.distScripts,
		files.distHtml,
		files.distCss
    ]
};

function errorHandler(title) {
    return function (err) {
        gulpUtil.log(gulpUtil.colors.red('[' + title + ']'), err.toString());
        this.emit('end');
    };
}


module.exports = {
    projectName: projectName,
    moduleName: moduleName,
    paths: paths,
    files: files,
    fileCollections: fileCollections,
    errorHandler: errorHandler,
    minifyHtml: {
        removeComments: true,
        collapseWhitespace: true,
        collapseBooleanAttributes: true,
        removeEmptyAttributes: true,
        removeScriptTypeAttributes: true,
        removeStyleLinkTypeAttributes: true,
        minifyCSS: true,
        minifyJS: true
    }
};