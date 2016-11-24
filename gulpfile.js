var gulp = require('gulp'),
    sourcemaps = require('gulp-sourcemaps'),
    autoprefixer = require('gulp-autoprefixer'),
    cleanCSS = require('gulp-clean-css'),
    concat = require('gulp-concat'),
    cssLint = require('gulp-csslint'),
    notify = require('gulp-notify'),
    jsHint = require('gulp-jshint'),
    jsStylish = require('jshint-stylish'),
    uglify = require('gulp-uglify');


const PATHS = {
    CSS: {
        SRC: './private/css/*.css',
        DEST: './public/css'
    },
    JS: {
        SRC: './*js'
    }
};

const AUTOPREFIXOPTIONS = {
    browsers: ['last 2 versions']
};

gulp.task('default', function() {
    var cssWatcher = gulp.watch(PATHS.CSS.SRC, ['css']);
    cssWatcher.on('change', function(event) {
        console.log("File: " + event.path + " was " + event.type);
    });

    var jsWatcher = gulp.watch(PATHS.JS.SRC, ['js']);
    cssWatcher.on('change', function(event) {
        console.log("File: " + event.path + " was " + event.type);
    });
});

gulp.task("css", function() {
    gulp.src(PATHS.CSS.SRC)
        .pipe(sourcemaps.init())
        .pipe(autoprefixer(AUTOPREFIXOPTIONS))
        .pipe(cssLint())
        .pipe(concat("bootstrap.min.css"))
        .pipe(cleanCSS({
            debug: true,
            compatibility: '*'
        }, function(details) {
            console.log(details.name + ": " + details.stats.originalSize);
            console.log(details.name + ": " + details.stats.minifiedSize);
        }))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest(PATHS.CSS.DEST))
        .pipe(notify({
            message: "css minified and saved"
        }));
});

gulp.task('js', function() {
    gulp.src(PATHS.JS.SRC)
        .pipe(jsHint())
        .pipe(jsHint.reporter(jsStylish))
        .pipe(jsHint.reporter('fail'))
        .on('error', notify.onError({ message: 'JS hint found some errors'}));
});

// .pipe(notify({
//     message: "watched js, check output for warnings"
// }));
