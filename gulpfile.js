var fs = require('fs');
var path = require('path');

var gulp = require('gulp');
var browserSync = require('browser-sync').create();
var reload      = browserSync.reload;
var sass = require('gulp-sass');
var compass = require('gulp-compass');
var watch = require('gulp-watch');
var gutil = require('gulp-util');

// Load all gulp plugins automatically
// and attach them to the `plugins` object
var plugins = require('gulp-load-plugins')();

// Temporary solution until gulp 4
// https://github.com/gulpjs/gulp/issues/355
var runSequence = require('run-sequence');

var pkg = require('./package.json');
var dirs = pkg['h5bp-configs'].directories;

// ---------------------------------------------------------------------
// | Helper tasks                                                      |
// ---------------------------------------------------------------------

gulp.task('archive:create_archive_dir', function () {
    fs.mkdirSync(path.resolve(dirs.archive), '0755');
});

gulp.task('archive:zip', function (done) {

    var archiveName = path.resolve(dirs.archive, pkg.name + '_v' + pkg.version + '.zip');
    var archiver = require('archiver')('zip');
    var files = require('glob').sync('**/*.*', {
        'cwd': dirs.dist,
        'dot': true // include hidden files
    });
    var output = fs.createWriteStream(archiveName);

    archiver.on('error', function (error) {
        done();
        throw error;
    });

    output.on('close', done);

    files.forEach(function (file) {

        var filePath = path.resolve(dirs.dist, file);

        // `archiver.bulk` does not maintain the file
        // permissions, so we need to add files individually
        archiver.append(fs.createReadStream(filePath), {
            'name': file,
            'mode': fs.statSync(filePath).mode
        });

    });

    archiver.pipe(output);
    archiver.finalize();

});

gulp.task('clean', function (done) {
    require('del')([
        dirs.archive,
        dirs.dist
    ]).then(function () {
        done();
    });
});

gulp.task('copy', [
    'copy:.htaccess',
    'copy:index.html',
    'copy:jquery',
    'copy:license',
    'copy:normalize',
    'copy:image',
    'copy:misc'
]);

gulp.task('copy:.htaccess', function () {
    return gulp.src('node_modules/apache-server-configs/dist/.htaccess')
               .pipe(plugins.replace(/# ErrorDocument/g, 'ErrorDocument'))
               .pipe(gulp.dest(dirs.dist));
});

gulp.task('copy:index.html', function () {
    return gulp.src(dirs.app + '/index.html')
               .pipe(plugins.replace(/{{JQUERY_VERSION}}/g, pkg.devDependencies.jquery))
               .pipe(gulp.dest(dirs.dist));
});

gulp.task('copy:jquery', function () {
    return gulp.src(['node_modules/jquery/dist/jquery.min.js'])
               .pipe(plugins.rename('jquery-' + pkg.devDependencies.jquery + '.min.js'))
               .pipe(gulp.dest(dirs.dist + '/js/vendor'));
});

gulp.task('copy:license', function () {
    return gulp.src('LICENSE.txt')
               .pipe(gulp.dest(dirs.dist));
});

gulp.task('copy:image', function () {
  return gulp.src(dirs.app + '/img/**/*')
    .pipe(gulp.dest(dirs.dist));
});

gulp.task('copy:misc', function () {
    return gulp.src([

        // Copy all files
        dirs.app + '/**/*',

        // Exclude the following files
        // (other tasks will handle the copying of these files)
        '!' + dirs.app + '/css/main.css',
        '!' + dirs.app + '/index.html',
        '!' + dirs.app + '/scss/**/*'

    ], {

        // Include hidden files by default
        dot: true

    }).pipe(gulp.dest(dirs.dist));
});

gulp.task('copy:normalize', function () {
    return gulp.src('node_modules/normalize.css/normalize.css')
               .pipe(gulp.dest(dirs.dist + '/css'));
});

//WE'RE JUST NOT GONNA LINT -- SORRY
gulp.task('lint:js', function () {
    return gulp.src([
        'gulpfile.js',
        dirs.app + '/js/*.js',
        dirs.test + '/*.js'
    ]).pipe(plugins.jscs())
      .pipe(plugins.jshint())
      .pipe(plugins.jshint.reporter('jshint-stylish'))
      .pipe(plugins.jshint.reporter('fail'));
});

gulp.task('compassify', function () {
  gutil.log(gutil.colors.grey('running compass compile'));
  return gulp.src(dirs.app + '/scss/**/*.scss')
    .pipe(compass({
      config_file: dirs.app + '/config.rb',
      sass: dirs.app + '/scss',
      css: dirs.dist + '/css'
    }))
    //ERROR LOGGING
    .on('error', function(error) {
      gutil.log(gutil.colors.red('ERROR --', error));
      this.emit('end');
    })
    .pipe(plugins.autoprefixer({
      browsers: ['last 2 versions', 'ie >= 8', '> 1%'],
      cascade: false
    }))
    .pipe(gulp.dest(dirs.dist + '/css'))
    .pipe(browserSync.stream());
});


// ---------------------------------------------------------------------
// | Main tasks                                                        |
// ---------------------------------------------------------------------

gulp.task('archive', function (done) {
    runSequence(
        'build',
        'archive:create_archive_dir',
        'archive:zip',
    done);
});

gulp.task('build', function (done) {
    runSequence(
        ['clean'],
        'compassify',
        'copy',
    done);
});

gulp.task('serve', function () {
  browserSync.init({
    server: {
      baseDir: "dist"
    }
  });

  //gulp.watch(dirs.app + '/scss/**/*.scss', ['sassify']);
  gulp.watch(dirs.app + '/scss/**/*.scss', ['compassify']);

  //WATCH EVERYTHING ELSE
  gulp.watch(dirs.app + '/js/**', ['copy']);
  gulp.watch(dirs.app + '/index.html', ['copy']);
  gulp.watch(dirs.app + '/img/**/*', ['copy']);
  gulp.watch(dirs.dist + '/index.html').on('change', browserSync.reload);
  gulp.watch(dirs.dist + '/js/**').on('change', browserSync.reload);
});

gulp.task('default', ['build']);
