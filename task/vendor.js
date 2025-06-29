import gulp from 'gulp';

// export default () => {
//   return gulp
//     .src([
//       'src/vendor/css/air-datepicker.css',
//       'src/vendor/css/mobiscroll.javascript.min.css'
//     ])
//     .pipe(gulp.dest('public/css/vendor'));
// };

export default () => {
  const vendorScripts = gulp
    .src([
      'src/vendor/css/air-datepicker.css',
      'src/vendor/css/mobiscroll.javascript.min.css'
    ]).pipe(gulp.dest('public/css/vendor'));

  const appScripts = gulp
    .src([
      'src/js/mobiscroll.javascript.min.js'
    ]).pipe(gulp.dest('public/js'));

  return Promise.all([vendorScripts, appScripts]);
};