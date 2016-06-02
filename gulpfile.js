'use strict';

var pkg = require('./package.json'),
    gulp = require('gulp'),
    gutil = require('gulp-util'),
    plumber = require('gulp-plumber'),
    rename = require('gulp-rename'),
    connect = require('gulp-connect'),
    concat = require('gulp-concat'),
    browserify = require('gulp-browserify'),
    uglify = require('gulp-uglify'),
    jade = require('gulp-jade'),
    stylus = require('gulp-stylus'),
    autoprefixer = require('gulp-autoprefixer'),
    csso = require('gulp-csso'),
    copy = require('gulp-copy'),
    del = require('del'),
    through = require('through'),
    opn = require('opn'),
    ghpages = require('gh-pages'),
    path = require('path'),
    isDist = process.argv.indexOf('serve') === -1,
    jshint = require('gulp-jshint');

gulp.task('js', ['clean:js', 'extraJs'], function() {
  return gulp.src('src/scripts/main.js')
    .pipe(browserify({ transform: ['debowerify'], debug: !isDist }))
    .pipe(isDist ? through() : plumber())
   // .pipe(isDist ? uglify() : through())
    .pipe(rename('build.min.js'))
    .pipe(gulp.dest('dist/build'))
    .pipe(connect.reload());
});

gulp.task('html', ['clean:html'], function() {
  return gulp.src('src/index.jade')
    .pipe(isDist ? through() : plumber())
    .pipe(jade({ pretty: true }))
    .pipe(rename('index.html'))
    .pipe(gulp.dest('dist'))
    .pipe(connect.reload());
});

gulp.task('css', ['clean:css', 'fonts'], function() {
  return gulp.src('src/styles/main.styl')
    .pipe(isDist ? through() : plumber())
    .pipe(stylus({
      compress: true,
      // Allow CSS to be imported from node_modules and bower_components
      'include css': true,
      'paths': ['./node_modules', './bower_components', './src/styles']
    }))
    .pipe(autoprefixer('last 2 versions', { map: false }))
    .pipe(isDist ? csso() : through())
    .pipe(rename('build.css'))
    .pipe(gulp.dest('dist/build'))
    .pipe(connect.reload());
});

gulp.task('images', ['clean:images'], function() {
  return gulp.src('src/images/**/*')
    .pipe(gulp.dest('dist/images'))
    .pipe(connect.reload());
});

gulp.task('music', ['clean:music'], function() {
  return gulp.src('src/music/**/*')
    .pipe(gulp.dest('dist/music'))
    .pipe(connect.reload());
});

gulp.task('extraJs', ['clean:extraJs'], function() {
  return gulp.src([
      'bower_components/jquery/dist/jquery.js', 
      'bower_components/angular/angular.js',
      'bower_components/angular-material/angular-material.js',
      'bower_components/angular-animate/angular-animate.js',
      'bower_components/angular-aria/angular-aria.js',
      'bower_components/angular-bootstrap/ui-bootstrap-tpls.js',
      'bower_components/angular-messages/angular-messages.js',
      'bower_components/angular-sanitize/angular-sanitize.js',
      'bower_components/bootstrap/dist/js/bootstrap.js',
      'src/scripts/*/**/*.js'
    ])
   // .pipe(jshint())
   // .pipe(jshint.reporter('default'))
   // .pipe(uglify())
    .pipe(concat('extraJs.min.js'))
    .pipe(gulp.dest('dist/build'))
});

gulp.task('fonts', ['clean:fonts'], function() {
  return gulp.src([
    'bower_components/bootstrap/dist/fonts/*',
    'bower_components/font-awesome/fonts/*'
  ])
  .pipe(gulp.dest('dist/fonts'));
});

gulp.task('clean', function(done) {
  del('dist', done);
});

gulp.task('clean:html', function(done) {
  del('dist/index.html', done);
});

gulp.task('clean:js', function(done) {
  del('dist/build/build.js', done);
});

gulp.task('clean:extraJs', function(done) {
  del('dist/build/extraJs.js', done);
});

gulp.task('clean:css', function(done) {
  del('dist/build/build.css', done);
});

gulp.task('clean:fonts', function(done) {
  del('dist/build/fonts/*', done);
});

gulp.task('clean:images', function(done) {
  del('dist/images', done);
});

gulp.task('clean:music', function(done) {
  del('dist/music', done);
});
gulp.task('connect', ['build'], function() {
  connect.server({
    root: 'dist',
    livereload: false
  });
});

gulp.task('open', ['connect'], function (done) {
  opn('http://localhost:8080', done);
});

gulp.task('watch', function() {
  gulp.watch('src/**/*.jade', ['html']);
  gulp.watch('src/styles/**/*.styl', ['css']);
  gulp.watch('src/images/**/*', ['images']);
  gulp.watch('src/music/**/*', ['music']);
  gulp.watch([
    'src/scripts/*.js',
    'src/scripts/*/**/*.js',
    'bespoke-theme-*/dist/*.js' // Allow themes to be developed in parallel
  ], ['js']);
});

gulp.task('deploy', ['build'], function(done) {
  ghpages.publish(path.join(__dirname, 'dist'), { logger: gutil.log }, done);
});

gulp.task('build', ['js', 'html', 'css', 'images' , 'music']);

gulp.task('serve', ['open', 'watch']);

gulp.task('default', ['build']);
