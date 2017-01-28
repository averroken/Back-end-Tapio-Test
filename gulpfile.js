var gulp = require('gulp'),
    sourcemaps = require('gulp-sourcemaps'),
    autoprefixer = require('gulp-autoprefixer'),
    cleanCSS = require('gulp-clean-css'),
    concat = require('gulp-concat'),
    cssLint = require('gulp-csslint'),
    notify = require('gulp-notify'),
    jsHint = require('gulp-jshint'),
    jsStylish = require('jshint-stylish'),
    uglify = require('gulp-uglify'),
    apidoc = require('gulp-api-doc'),
    imagemin = require('gulp-imagemin'),
    clean = require('gulp-clean'),
    smushit = require('gulp-smushit'),
    runSequence = require('run-sequence'),
    Dropbox = require('dropbox2').Dropbox,
    DropboxUser = require('dropbox2').User;
var notifier = require('node-notifier');


const PATHS = {
    CSS: {
        SRC: './private/css/*.css',
        DEST: './public/css'
    },
    JS: {
        SRC: './*js'
    },
    JSROUTES: {
        SRC: './Routes/*.js'
    },
    APIDOC: {
        SRC: './Routes/*.js',
        DEST: './ApiDoc/'
    }
};

const AUTOPREFIXOPTIONS = {
    browsers: ['last 2 versions']
};

gulp.task('default', function () {
    var cssWatcher = gulp.watch(PATHS.CSS.SRC, ['css']);
    cssWatcher.on('change', function (event) {
        console.log("File: " + event.path + " was " + event.type);
    });

    // var jsWatcher = gulp.watch(PATHS.JS.SRC, ['js']);
    // cssWatcher.on('change', function(event) {
    //     console.log("File: " + event.path + " was " + event.type);
    // });

    var jsRoutesWatcher = gulp.watch(PATHS.JSROUTES.SRC, ['js']);
    cssWatcher.on('change', function (event) {
        console.log("File: " + event.path + " was " + event.type);
    });
});

gulp.task('apidoc', function () {
    var routesWatcher = gulp.watch(PATHS.APIDOC.SRC, ['apidocMaker']);
    routesWatcher.on('change', function (event) {
        console.log("File: " + event.path + " was " + event.type);
        notifier.notify({message: "ApiDoc created"});
    });
});

gulp.task("css", function () {
    gulp.src(PATHS.CSS.SRC)
        .pipe(sourcemaps.init())
        .pipe(autoprefixer(AUTOPREFIXOPTIONS))
        .pipe(cssLint())
        .pipe(concat("bootstrap.min.css"))
        .pipe(cleanCSS({
            debug: true,
            compatibility: '*'
        }, function (details) {
            console.log(details.name + ": " + details.stats.originalSize);
            console.log(details.name + ": " + details.stats.minifiedSize);
        }))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest(PATHS.CSS.DEST))
        .pipe(notify({
            message: "css minified and saved"
        }));
});

gulp.task('js', function () {
    gulp.src(PATHS.JSROUTES.SRC)
        .pipe(jsHint())
        .pipe(jsHint.reporter(jsStylish))
        .pipe(jsHint.reporter('fail'))
        .on('error', notify.onError({
            message: 'JS hint found some errors'
        }));
});

gulp.task('apidocMaker', function () {
    gulp.src('Routes/*.js')
        .pipe(apidoc())
        .pipe(gulp.dest('ApiDoc/'))
});

gulp.task('minifyImages', function(callback) {
    console.log("minifyImages");
    return gulp.src('uploads/*.{jpg,png}')
        .pipe(smushit())
        // .pipe(imagemin())
        .pipe(clean())
        .pipe(gulp.dest('images/compressed'));
});

gulp.task('uploadToDropbox', function() {
    console.log("uploadToDropbox");
    var imageLocation = "images/compressed/" + process.env.original_name;
    console.log("enviroment var: " + imageLocation);
    return Dropbox.upload(process.env.DROPBOX_TOKEN, imageLocation, "/" + process.env.original_name, {
        "mode": "add",
        "autorename": true,
        "mute": false
    });
});

gulp.task('cleanUploads', function() {
    console.log("cleanUploads");
    return gulp.src('uploads/temp/*')
        .pipe(clean());
});

gulp.task('saveAndOptimizeImage', function(callback) {
    runSequence('minifyImages',
        'uploadToDropbox',
        // 'cleanUploads',
        callback);
});
