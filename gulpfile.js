var gulp = require('gulp'),
  nodemon = require('gulp-nodemon'),
  plumber = require('gulp-plumber'),
  livereload = require('gulp-livereload'),
  less = require('gulp-less');

var concat = require("gulp-concat");

gulp.task('less', function () {
  gulp.src('./public/css/*.less')
    .pipe(plumber())
    .pipe(less())
    .pipe(gulp.dest('./public/css'))
    .pipe(livereload());
});

gulp.task('watch', function () {
  gulp.watch('./public/css/*.less', ['less']);
});

gulp.task('develop', function () {
  livereload.listen();
  nodemon({
    script: 'bin/www',
    ext: 'js jade coffee',
    stdout: false
  }).on('readable', function () {
    this.stdout.on('data', function (chunk) {
      if (/^Express server listening on port/.test(chunk)) {
        livereload.changed(__dirname);
      }
    });
    this.stdout.pipe(process.stdout);
    this.stderr.pipe(process.stderr);
  });
});

//gulp.task('default', [
//  'less',
//  'develop',
//  'watch'
//]);


gulp.task('concat:js', function () {
  gulp.src([
      'src/js/plugins/retina/retina.min.js',
      'src/js/jquery.js',
      'src/js/bootstrap/bootstrap.min.js',
      'src/js/plugins/jquery.easing.min.js',
      'src/js/plugins/classie.js',
      'src/js/plugins/cbpAnimatedHeader.js',
      'src/js/plugins/owl-carousel/owl.carousel.js',
      'src/js/plugins/jquery.magnific-popup/jquery.magnific-popup.min.js',
      'src/js/plugins/background/core.js',
      'src/js/plugins/background/transition.js',
      'src/js/plugins/background/background.js',
      'src/js/plugins/jquery.mixitup.js',
      'src/js/plugins/wow/wow.min.js',
      'src/js/contact_me.js',
      'src/js/plugins/jqBootstrapValidation.js',
      'src/js/vitality.js'
    ])
    .pipe(concat('./public/assets/js/site.js'))
    .pipe(gulp.dest('.'));
});

gulp.task('default', [
  'concat:js'
]);

