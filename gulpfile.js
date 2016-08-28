var gulp = require('gulp'),
    js = require('gulp-uglify');
    rename = require('gulp-rename');

gulp.task('compress-js', function () {
    return gulp.src("image-map.js")
        .pipe(js({output: {comments: /^!|@preserve|@license|@cc_on/i}}))
        .pipe(rename({
            suffix: '.min'
        }))
        .pipe(gulp.dest('./'))
});

gulp.task('default', ['compress-js']);