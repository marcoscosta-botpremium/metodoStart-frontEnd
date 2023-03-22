const gulp = require('gulp');
const del = require('del');
const paths = require('vinyl-paths');
const through = require('through2');
const concat = require('gulp-concat-util');
const { addToManifest } = require('./gulp/revision');
require('./gulp/build');

gulp.task('clean-bundle', gulp.parallel(() => gulp.src('./public/js/bundle*').pipe(paths(del))));

gulp.task(
    'bundle-js',
    gulp.parallel(done => {
        gulp.src([
            './node_modules/blockly/blockly_compressed.js',
            './node_modules/blockly/blocks_compressed.js',
            './node_modules/blockly/javascript_compressed.js',
            './node_modules/blockly/msg/messages.js',
        ])
            .pipe(concat('bundle.js'))
            // .pipe(rev())
            .pipe(through.obj(addToManifest))
            .pipe(gulp.dest('public/js/'))
            .on('end', () => done());
    })
);

gulp.task('default', gulp.series('bundle-js'));